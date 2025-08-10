import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SimplePool } from "nostr-tools/pool";
import { nip19 } from "nostr-tools";
import { getPublicKey } from "nostr-tools/pure";
import { ArrowLeft, MessageCircle, Calendar, User } from "lucide-react";

interface NostrEvent {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
  tags: string[][];
}

const QuestionFollow = () => {
  const { nsec } = useParams<{ nsec: string }>();
  const [originalQuestion, setOriginalQuestion] = useState<NostrEvent | null>(null);
  const [replies, setReplies] = useState<NostrEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.snort.social"
  ];

  useEffect(() => {
    const fetchQuestionAndReplies = async () => {
      if (!nsec) {
        setError("Invalid follow-up link");
        setLoading(false);
        return;
      }

      try {
        // Decode the nsec private key to get the public key
        const { data: privateKey } = nip19.decode(nsec);
        const publicKey = getPublicKey(privateKey as Uint8Array);

        const pool = new SimplePool();
        
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
          setReplies(replyEvents);
        } else {
          setError("Question not found or not yet propagated to relays");
        }

        pool.close(relays);
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
            Track responses to your question on the decentralized Nostr network
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
            <p className="text-foreground mb-4 leading-relaxed">
              {originalQuestion.content.replace(/\n\n#bitcoinbasics #bitcoinknowledgehub$/, "")}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formatDate(originalQuestion.created_at)}
              </div>
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {truncateKey(originalQuestion.pubkey)}
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
                    Your question is live on Nostr. Check back later for responses from the community.
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
                      <span className="text-sm text-muted-foreground">
                        {truncateKey(reply.pubkey)}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(reply.created_at)}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Refresh Note */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg border">
          <p className="text-sm text-muted-foreground text-center">
            💡 Responses may take time to appear as they propagate across the decentralized network. 
            Refresh this page periodically to check for new replies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionFollow;