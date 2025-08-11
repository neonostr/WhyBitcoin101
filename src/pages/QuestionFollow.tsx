import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import { getPublicKey, finalizeEvent } from "nostr-tools/pure";
import { ArrowLeft, MessageCircle, Calendar, User, Send, Heart } from "lucide-react";
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
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);
  const [likingPost, setLikingPost] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Single pool instance for the entire component
  const poolRef = useRef<SimplePool | null>(null);

  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.snort.social"
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

  useEffect(() => {
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

          // Look for replies to this question (events that mention this event)
          const replyFilter = {
            kinds: [1],
            "#e": [question.id],
            limit: 20
          };

          const replyEvents = await pool.querySync(relays, replyFilter);
          
          // Filter out replies containing hidden phrases
          const filteredReplies = replyEvents.filter(reply => {
            return !hiddenPhrases.some(phrase => reply.content.includes(phrase));
          });
          
          setReplies(filteredReplies);

          // Fetch user profiles for all unique pubkeys
          const allPubkeys = [publicKey, ...replyEvents.map(r => r.pubkey)];
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
      }
    };

    fetchQuestionAndReplies();
  }, [nsec]);

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

  const renderContent = (content: string) => {
    // Split content by URLs to handle text and media separately
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);
    
    return parts.map((part, index) => {
      // Check if this part is a URL
      if (part.match(urlRegex)) {
        // Handle images
        if (part.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          return (
            <img 
              key={index}
              src={part} 
              alt="Shared image" 
              className="max-w-full h-auto rounded-lg my-2 max-h-96 object-contain block"
              loading="lazy"
            />
          );
        }
        // Handle videos
        if (part.match(/\.(mp4|webm|ogg)$/i)) {
          return (
            <video 
              key={index}
              src={part} 
              controls 
              className="max-w-full h-auto rounded-lg my-2 max-h-96 block"
            />
          );
        }
        // Handle GIFs (including URLs with 'gif' in them)
        if (part.includes('gif') || part.match(/\.gif$/i)) {
          return (
            <img 
              key={index}
              src={part} 
              alt="GIF" 
              className="max-w-full h-auto rounded-lg my-2 max-h-96 object-contain block"
              loading="lazy"
            />
          );
        }
        // Handle other URLs as clickable links
        return (
          <a 
            key={index}
            href={part} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline break-all"
          >
            {part}
          </a>
        );
      } else {
        // Handle text content with mentions and hashtags
        return (
          <span key={index} className="whitespace-pre-wrap">
            {part.split(/(\#\w+|@\w+|nostr:\w+)/g).map((textPart, textIndex) => {
              // Handle hashtags
              if (textPart.match(/^\#\w+/)) {
                return (
                  <span key={textIndex} className="text-blue-500 font-medium">
                    {textPart}
                  </span>
                );
              }
              // Handle mentions
              if (textPart.match(/^@\w+/)) {
                return (
                  <span key={textIndex} className="text-purple-500 font-medium">
                    {textPart}
                  </span>
                );
              }
              // Handle nostr: URIs
              if (textPart.match(/^nostr:\w+/)) {
                return (
                  <span key={textIndex} className="text-orange-500 font-medium">
                    {textPart}
                  </span>
                );
              }
              // Regular text
              return textPart;
            })}
          </span>
        );
      }
    });
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
      setReplies(prev => [...prev, newReply]);

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
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
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
            <div className="text-foreground mb-4 leading-relaxed">
              {renderContent(originalQuestion.content.replace(/\n\n#bitcoinbasics #bitcoinknowledgehub$/, ""))}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(originalQuestion.created_at)}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {getUserDisplayName(originalQuestion.pubkey)}
              </div>
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
            replies.map((reply) => (
              <Card key={reply.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">
                        {getUserDisplayName(reply.pubkey)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(reply.created_at)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-foreground leading-relaxed">
                    {renderContent(reply.content)}
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
            ))
          )}
        </div>

        {/* Refresh Note */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center">
            💡 Responses can be almost instant or take a few days, depending on who's online. 
            Refresh this page periodically to check for replies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionFollow;