import { useState, useEffect, useRef } from "react";
import { SimplePool } from "nostr-tools/pool";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Copy, ExternalLink } from "lucide-react";
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
  display_name?: string;
}

const BaseLayers = () => {
  const [events, setEvents] = useState<NostrEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<NostrEvent[]>([]);
  const [userProfiles, setUserProfiles] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const poolRef = useRef<SimplePool | null>(null);

  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.nostr.band",
    "wss://relay.primal.net",
    "wss://nostr.wine"
  ];

  useEffect(() => {
    poolRef.current = new SimplePool();
    
    return () => {
      if (poolRef.current) {
        poolRef.current.close(relays);
        poolRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    fetchHashtagContent();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [searchTerm, events]);

  const fetchHashtagContent = async () => {
    if (!poolRef.current) return;

    setLoading(true);
    
    try {
      const filter = {
        kinds: [1],
        "#t": ["whybitcoin101"],
        limit: 200
      };

      const fetchedEvents = await poolRef.current.querySync(relays, filter);
      
      // Sort by created_at descending (newest first)
      const sortedEvents = fetchedEvents.sort((a, b) => b.created_at - a.created_at);
      
      // Fetch user profiles
      const uniquePubkeys = [...new Set(sortedEvents.map(e => e.pubkey))];
      await fetchUserProfiles(uniquePubkeys);
      
      // For events that are just hashtags and are replies, try to get the original content
      const enrichedEvents = await enrichReplyEvents(sortedEvents);
      
      setEvents(enrichedEvents);
    } catch (error) {
      console.error("Error fetching hashtag content:", error);
    } finally {
      setLoading(false);
    }
  };

  const enrichReplyEvents = async (events: NostrEvent[]): Promise<NostrEvent[]> => {
    if (!poolRef.current) return events;

    const enrichedEvents = [];
    
    for (const event of events) {
      // Check if event is mostly just hashtags and has reply tags
      const isJustHashtags = event.content.trim().split(/\s+/).every(word => 
        word.startsWith('#') || word.length < 3
      );
      
      const replyTags = event.tags.filter(tag => tag[0] === 'e');
      
      if (isJustHashtags && replyTags.length > 0) {
        // Try to fetch the original event being replied to
        try {
          const originalEventId = replyTags[0][1];
          const originalEvents = await poolRef.current.querySync(relays, {
            kinds: [1],
            ids: [originalEventId],
            limit: 1
          });
          
          if (originalEvents.length > 0) {
            // Use original content but keep the reply metadata
            enrichedEvents.push({
              ...event,
              content: originalEvents[0].content,
              originalEvent: originalEvents[0]
            });
            continue;
          }
        } catch (error) {
          console.error("Error fetching original event:", error);
        }
      }
      
      enrichedEvents.push(event);
    }
    
    return enrichedEvents;
  };

  const fetchUserProfiles = async (pubkeys: string[]) => {
    if (!poolRef.current) return;

    try {
      const profileFilter = {
        kinds: [0],
        authors: pubkeys,
        limit: pubkeys.length
      };

      const profileEvents = await poolRef.current.querySync(relays, profileFilter);
      const profiles: Record<string, UserProfile> = {};

      profileEvents.forEach(event => {
        try {
          const profileData = JSON.parse(event.content);
          profiles[event.pubkey] = profileData;
        } catch (error) {
          console.error("Error parsing profile:", error);
        }
      });

      setUserProfiles(profiles);
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  const filterEvents = () => {
    if (!searchTerm.trim()) {
      setFilteredEvents(events);
      return;
    }

    const filtered = events.filter(event => 
      event.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const copyVisibleContent = () => {
    const content = filteredEvents.map(event => {
      const cleanContent = event.content.replace(/#whybitcoin101/gi, '').trim();
      const author = getUserDisplayName(event.pubkey);
      const date = new Date(event.created_at * 1000).toLocaleDateString();
      
      return `[${date}] ${author}: ${cleanContent}`;
    }).join('\n\n');

    navigator.clipboard.writeText(content);
    toast({
      title: "Content copied!",
      description: `Copied ${filteredEvents.length} notes to clipboard`,
    });
  };

  const getUserDisplayName = (pubkey: string): string => {
    const profile = userProfiles[pubkey];
    return profile?.name || profile?.display_name || `${pubkey.slice(0, 8)}...`;
  };

  const formatDate = (timestamp: number): string => {
    return new Date(timestamp * 1000).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const removeHashtags = (content: string): string => {
    return content.replace(/#whybitcoin101/gi, '').trim();
  };

  const renderMedia = (content: string) => {
    // Image URLs
    const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/gi;
    const videoRegex = /(https?:\/\/[^\s]+\.(?:mp4|webm|mov))/gi;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/gi;

    let processedContent = content;
    const mediaElements = [];

    // Extract and render images
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
      mediaElements.push(
        <img 
          key={match[1]} 
          src={match[1]} 
          alt="Shared content" 
          className="max-w-full h-auto rounded-lg mt-2"
          loading="lazy"
        />
      );
      processedContent = processedContent.replace(match[1], '');
    }

    // Extract and render videos
    while ((match = videoRegex.exec(content)) !== null) {
      mediaElements.push(
        <video 
          key={match[1]} 
          src={match[1]} 
          controls 
          className="max-w-full h-auto rounded-lg mt-2"
        />
      );
      processedContent = processedContent.replace(match[1], '');
    }

    // Extract and render YouTube videos
    while ((match = youtubeRegex.exec(content)) !== null) {
      const videoId = match[1];
      mediaElements.push(
        <div key={videoId} className="mt-2">
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      );
      processedContent = processedContent.replace(match[0], '');
    }

    return {
      textContent: processedContent.trim(),
      mediaElements
    };
  };

  const openNostrProfile = (pubkey: string) => {
    window.open(`https://primal.net/p/${pubkey}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Bitcoin consciousness...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">Bitcoin Base Layer</h1>
            <Badge variant="secondary">#whybitcoin101</Badge>
          </div>
          
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search bitcoin knowledge..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Button onClick={copyVisibleContent} variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Copy Visible ({filteredEvents.length})
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {filteredEvents.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 
                `No notes found containing "${searchTerm}"` : 
                "No content found"
              }
            </p>
            <p className="text-sm text-muted-foreground">
              Have some great Bitcoin insights? Share them on{" "}
              <a 
                href="https://nostr.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Nostr
              </a>{" "}
              with hashtag #whybitcoin101
            </p>
          </div>
        )}

        <div className="grid gap-4">
          {filteredEvents.map((event) => {
            const profile = userProfiles[event.pubkey];
            const { textContent, mediaElements } = renderMedia(removeHashtags(event.content));
            
            return (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={profile?.picture || `https://robohash.org/${event.pubkey}?set=set4&size=40x40`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary"
                      onClick={() => openNostrProfile(event.pubkey)}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span 
                          className="font-medium cursor-pointer hover:text-primary"
                          onClick={() => openNostrProfile(event.pubkey)}
                        >
                          {getUserDisplayName(event.pubkey)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.created_at)}
                        </span>
                      </div>
                      
                      {textContent && (
                        <div className="prose prose-sm max-w-none mb-2">
                          <p className="whitespace-pre-wrap text-foreground">
                            {textContent}
                          </p>
                        </div>
                      )}
                      
                      {mediaElements.length > 0 && (
                        <div className="space-y-2">
                          {mediaElements}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BaseLayers;
