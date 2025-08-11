import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import { getPublicKey, finalizeEvent } from "nostr-tools/pure";
import { ArrowLeft, MessageCircle, Calendar, User, Send, Heart, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NostrEvent {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
  tags: string[][];
}

interface UserProfile {
  name?: string;
  about?: string;
  picture?: string;
}

const QuestionFollow = () => {
  const { nsec } = useParams<{ nsec: string }>();
  const [originalQuestion, setOriginalQuestion] = useState<NostrEvent | null>(null);
  const [replies, setReplies] = useState<NostrEvent[]>([]);
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [likingPost, setLikingPost] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Single pool instance for the entire component
  const poolRef = useRef<SimplePool | null>(null);
  const lastRefreshRef = useRef<number>(0);

  // Better, more reliable relays
  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.nostr.band",
    "wss://relay.primal.net",
    "wss://nostr.wine"
  ];

  // Phrases to filter out from replies
  const hiddenPhrases = ["https://rizful.com"];

  // Initialize pool once
  useEffect(() => {
    poolRef.current = new SimplePool();
    
    // Cleanup on unmount
    return () => {
      if (poolRef.current) {
        poolRef.current.close(relays);
        poolRef.current = null;
      }
    };
  }, []);

  const fetchQuestionAndReplies = async () => {
    if (!nsec || !poolRef.current) {
      setError("Invalid follow-up link");
      setLoading(false);
      return;
    }

    try {
      // Decode the nsec private key to get the public key
      const { data: privateKey } = nip19.decode(nsec);
      const publicKey = getPublicKey(privateKey as Uint8Array);

      const pool = poolRef.current;
      
      // Find the original question by this pubkey with bitcoinbasics tag
      const questionFilter = {
        kinds: [1],
        authors: [publicKey],
        "#t": ["bitcoinbasics"],
        limit: 1
      };

      const questionEvents = await pool.querySync(relays, questionFilter);
      
      if (questionEvents.length > 0) {
        const question = questionEvents[0];
        setOriginalQuestion(question);

        // Get all reply event IDs that we need to search for
        let allReplyEventIds = [question.id];
        let allReplies: NostrEvent[] = [];

        // First, get direct replies to the original question
        const directReplyFilter = {
          kinds: [1],
          "#e": [question.id],
          limit: 100
        };

        const directReplies = await pool.querySync(relays, directReplyFilter);
        allReplies = [...directReplies];
        
        // Add direct reply IDs to search for nested replies
        allReplyEventIds = [...allReplyEventIds, ...directReplies.map(r => r.id)];

        // Now get replies to replies (nested/threaded replies)
        if (directReplies.length > 0) {
          const nestedReplyFilter = {
            kinds: [1],
            "#e": directReplies.map(r => r.id),
            limit: 200
          };

          const nestedReplies = await pool.querySync(relays, nestedReplyFilter);
          
          // Add nested replies that aren't already in our list
          nestedReplies.forEach(nestedReply => {
            if (!allReplies.find(r => r.id === nestedReply.id)) {
              allReplies.push(nestedReply);
            }
          });
        }

        // Get likes for all events (question + all replies)
        const allEventIds = [question.id, ...allReplies.map(r => r.id)];
        const likeFilter = {
          kinds: [7],
          "#e": allEventIds,
          limit: 500
        };

        const likeEvents = await pool.querySync(relays, likeFilter);
        
        // Count likes per event
        const likeCounts: Record<string, number> = {};
        likeEvents.forEach(like => {
          const eventId = like.tags.find(tag => tag[0] === 'e')?.[1];
          if (eventId) {
            likeCounts[eventId] = (likeCounts[eventId] || 0) + 1;
          }
        });
        setLikes(likeCounts);

        // Filter out replies containing hidden phrases and sort by timestamp
        const filteredReplies = allReplies
          .filter(reply => {
            return !hiddenPhrases.some(phrase => reply.content.includes(phrase));
          })
          .sort((a, b) => a.created_at - b.created_at); // Sort oldest first
        
        console.log("Total replies found (including nested):", allReplies.length);
        console.log("Filtered replies:", filteredReplies.length);
        console.log("Like counts:", likeCounts);
        
        setReplies(filteredReplies);

        // Fetch user profiles for all unique pubkeys
        const allPubkeys = [publicKey, ...allReplies.map(r => r.pubkey)];
        const uniquePubkeys = [...new Set(allPubkeys)];
        
        const profileFilter = {
          kinds: [0],
          authors: uniquePubkeys,
        };

        const profileEvents = await pool.querySync(relays, profileFilter);
        
        // Process profiles
        const profiles: Record<string, UserProfile> = {};
        profileEvents.forEach(event => {
          try {
            const profile = JSON.parse(event.content);
            profiles[event.pubkey] = profile;
          } catch (e) {
            console.warn("Failed to parse profile:", e);
          }
        });
        
        setUserProfiles(profiles);
      } else {
        setError("Question not found or not yet propagated to relays");
      }

    } catch (err) {
      console.error("Error fetching question:", err);
      setError("Failed to load question and replies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuestionAndReplies();
  }, [nsec]);

  const handleRefresh = async () => {
    const now = Date.now();
    const timeSinceLastRefresh = now - lastRefreshRef.current;
    
    // Rate limit: only allow refresh every 60 seconds
    if (timeSinceLastRefresh < 60000) {
      return; // Silently ignore if too soon
    }
    
    lastRefreshRef.current = now;
    setRefreshing(true);
    
    toast({
      title: "Refreshing...",
      description: "Checking for new replies and updates.",
    });
    
    await fetchQuestionAndReplies();
    
    toast({
      title: "Refreshed!",
      description: "Content has been updated.",
    });
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const truncateKey = (key: string) => {
    return `${key.slice(0, 8)}...${key.slice(-8)}`;
  };

  const getUserDisplayName = (pubkey: string) => {
    const profile = userProfiles[pubkey];
    return profile?.name || truncateKey(pubkey);
  };

  const renderMedia = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = content.match(urlRegex) || [];
    
    return urls.map((url, index) => {
      // Enhanced GIF detection - check for .gif extension OR gif in URL OR common GIF hosting patterns
      if (url.match(/\.gif(\?|$)/i) || 
          url.includes('gif') || 
          url.includes('giphy.com') || 
          url.includes('tenor.com') ||
          url.includes('imgur.com/') && url.includes('gif')) {
        return (
          <img 
            key={index}
            src={url} 
            alt="GIF" 
            className="max-w-full h-auto rounded-lg mt-2 max-h-96 object-contain"
            loading="lazy"
          />
        );
      }
      // Regular images
      if (url.match(/\.(jpg|jpeg|png|webp)(\?|$)/i)) {
        return (
          <img 
            key={index}
            src={url} 
            alt="Shared image" 
            className="max-w-full h-auto rounded-lg mt-2 max-h-96 object-contain"
            loading="lazy"
          />
        );
      }
      // Videos
      if (url.match(/\.(mp4|webm|ogg)(\?|$)/i)) {
        return (
          <video 
            key={index}
            src={url} 
            controls 
            className="max-w-full h-auto rounded-lg mt-2 max-h-96"
          />
        );
      }
      return null;
    });
  };

  const formatContent = (content: string) => {
    // Remove URLs that will be rendered as media
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const textContent = content.replace(urlRegex, (url) => {
      // Enhanced media URL detection
      if (url.match(/\.(jpg|jpeg|png|gif|webp|mp4|webm|ogg)(\?|$)/i) ||
          url.includes('gif') || 
          url.includes('giphy.com') || 
          url.includes('tenor.com')) {
        return '';
      }
      return url;
    }).trim();
    
    return textContent;
  };

  // Helper function to get what this reply is replying to
  const getReplyContext = (reply: NostrEvent) => {
    const eTags = reply.tags.filter(tag => tag[0] === 'e');
    if (eTags.length === 0) return null;
    
    // Find if this is replying to the original question or another reply
    const replyToId = eTags[eTags.length - 1][1]; // Last e tag is usually the direct reply target
    
    if (replyToId === originalQuestion?.id) {
      return { type: 'question', target: originalQuestion };
    }
    
    const parentReply = replies.find(r => r.id === replyToId);
    if (parentReply) {
      return { type: 'reply', target: parentReply };
    }
    
    return null;
  };

  const handleReply = async (replyToEventId: string) => {
    if (!nsec || !replyText.trim() || !poolRef.current) return;

    setSubmittingReply(true);
    try {
      const { data: privateKey } = nip19.decode(nsec);
      const publicKey = getPublicKey(privateKey as Uint8Array);

      const replyEvent = finalizeEvent({
        kind: 1,
        content: replyText.trim(),
        tags: [
          ["e", replyToEventId, "", "reply"],
          ["p", originalQuestion?.pubkey || ""]
        ],
        created_at: Math.floor(Date.now() / 1000),
      }, privateKey as Uint8Array);

      // Use the existing pool
      try {
        await poolRef.current.publish(relays, replyEvent);
      } catch (e) {
        console.log("Publish error:", e);
      }

      // Add reply to local state immediately
      const newReply = {
        id: replyEvent.id,
        content: replyEvent.content,
        created_at: replyEvent.created_at,
        pubkey: replyEvent.pubkey,
        tags: replyEvent.tags
      };
      setReplies(prev => [...prev, newReply].sort((a, b) => a.created_at - b.created_at));

      // Add user profile if not present
      if (!userProfiles[publicKey]) {
        setUserProfiles(prev => ({
          ...prev,
          [publicKey]: { name: "You" }
        }));
      }

      toast({
        title: "Reply posted!",
        description: "Your reply has been published to the network.",
      });

      setReplyText("");
      setReplyingTo(null);

    } catch (error) {
      console.error("Reply error:", error);
      toast({
        title: "Failed to post reply",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleLike = async (eventId: string) => {
    if (!nsec || !poolRef.current) return;

    setLikingPost(eventId);
    try {
      const { data: privateKey } = nip19.decode(nsec);
      const targetReply = replies.find(r => r.id === eventId) || originalQuestion;

      const likeEvent = finalizeEvent({
        kind: 7,
        content: "❤️",
        tags: [
          ["e", eventId],
          ["p", targetReply?.pubkey || ""]
        ],
        created_at: Math.floor(Date.now() / 1000),
      }, privateKey as Uint8Array);

      // Use the existing pool
      try {
        await poolRef.current.publish(relays, likeEvent);
      } catch (e) {
        console.log("Publish error:", e);
      }

      // Optimistically update like count
      setLikes(prev => ({
        ...prev,
        [eventId]: (prev[eventId] || 0) + 1
      }));

      toast({
        title: "Liked!",
        description: "Your reaction has been published.",
      });

    } catch (error) {
      console.error("Like error:", error);
      toast({
        title: "Failed to like post",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLikingPost(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your question...</p>
        </div>
      </div>
    );
  }

  if (error || !originalQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4 text-foreground">Question Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error || "We couldn't find your question. It may still be propagating across the network or the link may be invalid."}
          </p>
          <Link to="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 relative">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          {/* Refresh Button */}
          <Button
            onClick={handleRefresh}
            disabled={refreshing}
            className="absolute top-0 right-0 bg-orange-500 hover:bg-orange-600 text-white"
            size="sm"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          
          <h1 className="text-3xl font-bold text-foreground">Your Bitcoin Question</h1>
          <p className="text-muted-foreground mt-2">
            Track responses to your question
          </p>
        </div>

        {/* Original Question */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg text-foreground">Your Question</CardTitle>
              <Badge variant="secondary">Original Post</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                {formatContent(originalQuestion.content.replace(/\n\n#bitcoinbasics #bitcoinknowledgehub$/, ""))}
              </p>
              {renderMedia(originalQuestion.content)}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(originalQuestion.created_at)}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {getUserDisplayName(originalQuestion.pubkey)}
              </div>
              {likes[originalQuestion.id] && (
                <div className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>{likes[originalQuestion.id]}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Replies Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold text-foreground">
              Replies ({replies.length})
            </h2>
          </div>

          {replies.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No replies yet</h3>
                  <p className="text-muted-foreground">
                    Your question is live. Check back later for responses from the community.
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            replies.map((reply) => {
              const replyContext = getReplyContext(reply);
              
              return (
                <Card key={reply.id} className={replyContext?.type === 'reply' ? 'ml-8 border-l-4 border-l-muted-foreground/30' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {getUserDisplayName(reply.pubkey)}
                        </span>
                        {replyContext?.type === 'reply' && (
                          <span className="text-xs text-muted-foreground">
                            replying to {getUserDisplayName(replyContext.target.pubkey)}
                          </span>
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(reply.created_at)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {formatContent(reply.content)}
                      </p>
                      {renderMedia(reply.content)}
                    </div>
                    <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-primary"
                        onClick={() => setReplyingTo(replyingTo === reply.id ? null : reply.id)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" />
                        Reply
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-muted-foreground hover:text-red-500"
                        onClick={() => handleLike(reply.id)}
                        disabled={likingPost === reply.id}
                      >
                        <Heart className={`h-4 w-4 mr-1 ${likingPost === reply.id ? 'animate-pulse' : ''}`} />
                        {likingPost === reply.id ? 'Liking...' : 'Like'}
                        {likes[reply.id] && <span className="ml-1">({likes[reply.id]})</span>}
                      </Button>
                    </div>
                    
                    {/* Reply Input */}
                    {replyingTo === reply.id && (
                      <div className="mt-4 space-y-3 border-t border-border pt-4">
                        <Textarea
                          placeholder="Write your reply..."
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setReplyingTo(null);
                              setReplyText("");
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleReply(reply.id)}
                            disabled={!replyText.trim() || submittingReply}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            {submittingReply ? 'Posting...' : 'Post Reply'}
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Refresh Note */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center">
            💡 Responses can be almost instant or take a few days, depending on who's online. 
            Use the refresh button above to check for new replies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionFollow;