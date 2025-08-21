import { useState, useEffect, useRef } from "react";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Copy, ExternalLink, Quote, Eye, EyeOff, Shield, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NostrEvent {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
  tags: string[][];
  quotedEvents?: NostrEvent[];
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
  const [quotedEvents, setQuotedEvents] = useState<Record<string, NostrEvent>>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAuthors, setShowAuthors] = useState(false);
  const [webOfTrustEnabled, setWebOfTrustEnabled] = useState(false);
  const [webOfTrustNpub, setWebOfTrustNpub] = useState("");
  const [webOfTrustLevel, setWebOfTrustLevel] = useState<1 | 2>(1);
  const [trustedPubkeys, setTrustedPubkeys] = useState<Set<string>>(new Set());
  const [webOfTrustLoading, setWebOfTrustLoading] = useState(false);
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
  }, [searchTerm, events, webOfTrustEnabled, trustedPubkeys]);

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
      
      // Process quoted events
      const eventsWithQuotes = await processQuotedEvents(enrichedEvents);
      
      setEvents(eventsWithQuotes);
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

  const processQuotedEvents = async (events: NostrEvent[]): Promise<NostrEvent[]> => {
    if (!poolRef.current) return events;

    const eventsWithQuotes = [];
    const quotedEventIds = new Set<string>();
    let quotedEventsMap: Record<string, NostrEvent> = {};

    // First pass: collect all quoted event IDs
    for (const event of events) {
      const quotes = extractNostrReferences(event.content);
      quotes.forEach(quote => {
        if ((quote.type === 'nevent' || quote.type === 'note') && quote.eventId) {
          quotedEventIds.add(quote.eventId);
        }
      });
    }

    // Fetch all quoted events in batch
    if (quotedEventIds.size > 0) {
      try {
        const quotedEventsData = await poolRef.current.querySync(relays, {
          kinds: [1],
          ids: Array.from(quotedEventIds),
          limit: quotedEventIds.size
        });

        quotedEventsData.forEach(event => {
          quotedEventsMap[event.id] = event;
        });
        setQuotedEvents(prev => ({ ...prev, ...quotedEventsMap }));

        // Fetch profiles for quoted event authors
        const quotedAuthors = quotedEventsData.map(e => e.pubkey);
        if (quotedAuthors.length > 0) {
          await fetchUserProfiles(quotedAuthors);
        }
      } catch (error) {
        console.error("Error fetching quoted events:", error);
      }
    }

    // Second pass: attach quoted events to main events
    for (const event of events) {
      const quotes = extractNostrReferences(event.content);
      const eventQuotedEvents = quotes
        .filter(quote => (quote.type === 'nevent' || quote.type === 'note') && quote.eventId)
        .map(quote => quotedEventsMap[quote.eventId!])
        .filter(Boolean);

      eventsWithQuotes.push({
        ...event,
        quotedEvents: eventQuotedEvents.length > 0 ? eventQuotedEvents : undefined
      });
    }

    return eventsWithQuotes;
  };

  const extractNostrReferences = (content: string) => {
    const nostrRegex = /nostr:(nevent1[a-zA-Z0-9]+|note1[a-zA-Z0-9]+|npub1[a-zA-Z0-9]+)/g;
    const references = [];
    let match;

    while ((match = nostrRegex.exec(content)) !== null) {
      const reference = match[1];
      try {
        const decoded = nip19.decode(reference);
        
        if (decoded.type === 'nevent') {
          references.push({
            type: 'nevent' as const,
            raw: match[0],
            eventId: decoded.data.id,
            relays: decoded.data.relays
          });
        } else if (decoded.type === 'note') {
          references.push({
            type: 'note' as const,
            raw: match[0],
            eventId: decoded.data
          });
        }
      } catch (error) {
        console.warn('Failed to decode nostr reference:', reference);
      }
    }

    return references;
  };

  const fetchUserProfiles = async (pubkeys: string[]) => {
    if (!poolRef.current) return;

    try {
      const profileFilter = {
        kinds: [0],
        authors: pubkeys,
        limit: pubkeys.length * 5 // Get multiple profile events per author
      };

      const profileEvents = await poolRef.current.querySync(relays, profileFilter);
      const profiles: Record<string, UserProfile> = {};

      // Sort by created_at to get the most recent profile for each pubkey
      const sortedEvents = profileEvents.sort((a, b) => b.created_at - a.created_at);
      
      sortedEvents.forEach(event => {
        // Only use the most recent profile for each pubkey
        if (!profiles[event.pubkey]) {
          try {
            const profileData = JSON.parse(event.content);
            profiles[event.pubkey] = profileData;
          } catch (error) {
            console.error("Error parsing profile:", error);
          }
        }
      });

      setUserProfiles(prev => ({ ...prev, ...profiles }));
    } catch (error) {
      console.error("Error fetching user profiles:", error);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(event => 
        event.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply Web of Trust filter
    if (webOfTrustEnabled && trustedPubkeys.size > 0) {
      filtered = filtered.filter(event => trustedPubkeys.has(event.pubkey));
    }

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

  const buildWebOfTrust = async () => {
    if (!webOfTrustNpub.trim() || !poolRef.current) return;

    setWebOfTrustLoading(true);
    try {
      let trustPubkey: string;
      
      // Decode npub if provided
      try {
        const decoded = nip19.decode(webOfTrustNpub.trim());
        if (decoded.type === 'npub') {
          trustPubkey = decoded.data;
        } else {
          throw new Error('Invalid npub format');
        }
      } catch (error) {
        toast({
          title: "Invalid npub",
          description: "Please enter a valid npub",
          variant: "destructive"
        });
        return;
      }

      // Fetch the follow list (kind 3) for the trust root
      const followListEvents = await poolRef.current.querySync(relays, {
        kinds: [3],
        authors: [trustPubkey],
        limit: 1
      });

      if (followListEvents.length === 0) {
        toast({
          title: "No follow list found",
          description: "Could not find follow list for this npub",
          variant: "destructive"
        });
        return;
      }

      const followList = followListEvents[0];
      const directFollows = followList.tags
        .filter(tag => tag[0] === 'p')
        .map(tag => tag[1]);

      let trustedSet = new Set([trustPubkey, ...directFollows]);

      // If level 2, also fetch follows of follows
      if (webOfTrustLevel === 2 && directFollows.length > 0) {
        const secondLevelEvents = await poolRef.current.querySync(relays, {
          kinds: [3],
          authors: directFollows,
          limit: directFollows.length
        });

        secondLevelEvents.forEach(event => {
          const secondLevelFollows = event.tags
            .filter(tag => tag[0] === 'p')
            .map(tag => tag[1]);
          secondLevelFollows.forEach(pubkey => trustedSet.add(pubkey));
        });
      }

      setTrustedPubkeys(trustedSet);
      toast({
        title: "Web of Trust built",
        description: `Trusting ${trustedSet.size} pubkeys (Level ${webOfTrustLevel})`,
      });
    } catch (error) {
      console.error("Error building Web of Trust:", error);
      toast({
        title: "Error",
        description: "Failed to build Web of Trust",
        variant: "destructive"
      });
    } finally {
      setWebOfTrustLoading(false);
    }
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

  const removeNostrReferences = (content: string): string => {
    return content.replace(/nostr:(nevent1[a-zA-Z0-9]+|note1[a-zA-Z0-9]+|npub1[a-zA-Z0-9]+)/g, '').trim();
  };

  const renderQuotedEvent = (quotedEvent: NostrEvent) => {
    const profile = userProfiles[quotedEvent.pubkey];
    const { textContent, mediaElements } = renderMedia(removeHashtags(quotedEvent.content));
    
    return (
      <div className="border-l-4 border-primary/30 pl-4 mt-3 bg-muted/30 rounded-r-lg p-3">
        {showAuthors && (
          <div className="flex items-center gap-2 mb-2">
            <Quote className="h-4 w-4 text-primary flex-shrink-0" />
            <img
              src={profile?.picture || `https://robohash.org/${quotedEvent.pubkey}?set=set4&size=24x24`}
              alt="Quoted author"
              className="w-6 h-6 rounded-full flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-primary"
              onClick={() => openNostrProfile(quotedEvent.pubkey)}
            />
            <span 
              className="text-sm font-medium truncate cursor-pointer hover:text-primary"
              onClick={() => openNostrProfile(quotedEvent.pubkey)}
            >
              {getUserDisplayName(quotedEvent.pubkey)}
            </span>
            <span className="text-xs text-muted-foreground flex-shrink-0">
              {formatDate(quotedEvent.created_at)}
            </span>
          </div>
        )}
        
        {textContent && (
          <div className="prose prose-sm max-w-none mb-2">
            <p className="whitespace-pre-wrap text-foreground text-sm break-words">
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
    );
  };

  const renderMedia = (content: string) => {
    // Image URLs
    const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp))/gi;
    const videoRegex = /(https?:\/\/[^\s]+\.(?:mp4|webm|mov))/gi;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/gi;
    const youtubeTrimmerRegex = /https?:\/\/www\.youtubetrimmer\.com\/view\/\?v=([a-zA-Z0-9_-]+)&start=(\d+)&end=(\d+)(?:&loop=\d+)?/gi;

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
          className="w-full max-w-full h-auto max-h-48 object-cover rounded-lg mt-2"
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
          className="w-full max-w-full max-h-48 rounded-lg mt-2"
        />
      );
      processedContent = processedContent.replace(match[1], '');
    }

    // Extract and render YouTube Trimmer videos
    while ((match = youtubeTrimmerRegex.exec(content)) !== null) {
      const videoId = match[1];
      const startTime = match[2];
      const endTime = match[3];
      mediaElements.push(
        <div key={`trimmer-${videoId}-${startTime}`} className="mt-2 w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&end=${endTime}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
      processedContent = processedContent.replace(match[0], '');
    }

    // Extract and render YouTube videos
    while ((match = youtubeRegex.exec(content)) !== null) {
      const videoId = match[1];
      mediaElements.push(
        <div key={videoId} className="mt-2 w-full">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
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
    const url = `https://primal.net/p/${pubkey}`;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold">Bitcoin Base Layer</h1>
            <Badge variant="secondary">#whybitcoin101</Badge>
          </div>
          
          <div className="flex flex-col gap-4">
            {/* Main Controls Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="relative flex-1 max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search bitcoin knowledge..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              
              <div className="flex gap-2 w-full sm:w-auto">
                <Button 
                  onClick={() => setShowAuthors(!showAuthors)} 
                  variant="outline" 
                  size="sm"
                  className="flex-1 sm:flex-initial"
                >
                  {showAuthors ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {showAuthors ? "Hide Authors" : "Show Authors"}
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant={webOfTrustEnabled ? "default" : "outline"} 
                      size="sm"
                      className="flex-1 sm:flex-initial"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Web of Trust Filter
                      {webOfTrustEnabled && trustedPubkeys.size > 0 && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          {trustedPubkeys.size}
                        </Badge>
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Web of Trust Filter
                      </DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Enable Filter</span>
                        <Button
                          onClick={() => setWebOfTrustEnabled(!webOfTrustEnabled)}
                          variant={webOfTrustEnabled ? "default" : "outline"}
                          size="sm"
                        >
                          {webOfTrustEnabled ? "Enabled" : "Disabled"}
                        </Button>
                      </div>
                      
                      {webOfTrustEnabled && (
                        <>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Trust Root (npub)</label>
                            <Input
                              placeholder="Enter npub (e.g., npub123...)"
                              value={webOfTrustNpub}
                              onChange={(e) => setWebOfTrustNpub(e.target.value)}
                              className="text-sm"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Trust Level</label>
                            <Select value={webOfTrustLevel.toString()} onValueChange={(value) => setWebOfTrustLevel(parseInt(value) as 1 | 2)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3 w-3" />
                                    Level 1 (Direct follows)
                                  </div>
                                </SelectItem>
                                <SelectItem value="2">
                                  <div className="flex items-center gap-2">
                                    <Users className="h-3 w-3" />
                                    Level 2 (Extended network)
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Button
                            onClick={buildWebOfTrust}
                            disabled={!webOfTrustNpub.trim() || webOfTrustLoading}
                            className="w-full"
                          >
                            {webOfTrustLoading ? "Building Trust Network..." : "Build Web of Trust"}
                          </Button>
                          
                          {trustedPubkeys.size > 0 && (
                            <div className="text-xs text-muted-foreground p-3 bg-muted/30 rounded-lg">
                              ✓ Filtering by {trustedPubkeys.size} trusted pubkeys (Level {webOfTrustLevel})
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button onClick={copyVisibleContent} variant="outline" size="sm" className="flex-1 sm:flex-initial">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Visible ({filteredEvents.length})
                </Button>
              </div>
            </div>
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

        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredEvents.map((event) => {
            const profile = userProfiles[event.pubkey];
            const cleanContent = removeNostrReferences(removeHashtags(event.content));
            const { textContent, mediaElements } = renderMedia(cleanContent);
            
            return (
              <Card key={event.id} className="hover:shadow-md transition-shadow h-fit">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {showAuthors && (
                      <img
                        src={profile?.picture || `https://robohash.org/${event.pubkey}?set=set4&size=40x40`}
                        alt="Profile"
                        className="w-10 h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-primary flex-shrink-0"
                        onClick={() => openNostrProfile(event.pubkey)}
                      />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      {showAuthors && (
                        <div className="flex items-center gap-2 mb-2">
                          <span 
                            className="font-medium cursor-pointer hover:text-primary truncate"
                            onClick={() => openNostrProfile(event.pubkey)}
                          >
                            {getUserDisplayName(event.pubkey)}
                          </span>
                          <span className="text-xs text-muted-foreground flex-shrink-0">
                            {formatDate(event.created_at)}
                          </span>
                        </div>
                      )}
                      
                      {textContent && (
                        <div className="prose prose-sm max-w-none mb-2">
                          <p className="whitespace-pre-wrap text-foreground break-words">
                            {textContent}
                          </p>
                        </div>
                      )}
                      
                      {mediaElements.length > 0 && (
                        <div className="space-y-2">
                          {mediaElements}
                        </div>
                      )}

                      {/* Render quoted events */}
                      {event.quotedEvents && event.quotedEvents.map((quotedEvent, index) => (
                        <div key={`${event.id}-quote-${index}`}>
                          {renderQuotedEvent(quotedEvent)}
                        </div>
                      ))}
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
