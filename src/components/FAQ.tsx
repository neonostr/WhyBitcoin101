import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { finalizeEvent, generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { SimplePool } from "nostr-tools/pool";

const NostrQuestionModal = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [followUpLink, setFollowUpLink] = useState("");
  const [postedQuestion, setPostedQuestion] = useState("");
  const { toast } = useToast();

  const relays = [
    "wss://relay.damus.io",
    "wss://nos.lol",
    "wss://relay.snort.social"
  ];

  const submitQuestion = async () => {
    if (!question.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Generate a temporary key pair for this question
      const privateKey = generateSecretKey();
      const publicKey = getPublicKey(privateKey);
      
      // Create the note event
      const event = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [["t", "bitcoinbasics"], ["t", "bitcoinknowledgehub"]],
        content: `${question}\n\n#bitcoinbasics #bitcoinknowledgehub`,
        pubkey: publicKey,
      };

      // Sign the event
      const signedEvent = finalizeEvent(event, privateKey);
      
      // Publish to relays
      const pool = new SimplePool();
      const relayPromises = pool.publish(relays, signedEvent);
      
      // Wait for at least one relay to confirm
      await Promise.race(relayPromises);
      
      // Create follow-up link with private key
      const privateKeyHex = Array.from(privateKey, byte => byte.toString(16).padStart(2, '0')).join('');
      const followUpUrl = `${window.location.origin}/${privateKeyHex}`;
      
      setPostedQuestion(question);
      setFollowUpLink(followUpUrl);
      setShowSuccess(true);
      setQuestion("");
      pool.close(relays);
      
    } catch (error) {
      console.error("Error posting to Nostr:", error);
      toast({
        title: "Error",
        description: "Failed to post question. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(followUpLink);
    toast({
      title: "Link copied!",
      description: "Follow-up link copied to clipboard",
    });
  };

  const resetModal = () => {
    setShowSuccess(false);
    setPostedQuestion("");
    setFollowUpLink("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Ask the Community
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {showSuccess ? "Question Posted Successfully!" : "Ask Bitcoin Community"}
          </DialogTitle>
        </DialogHeader>
        
        {!showSuccess ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ask your Bitcoin related question and get an answer from us or the broader community. Your question will be publicly visible, but you'll remain anonymous.
            </p>
            
            <Textarea
              placeholder="What's your Bitcoin question?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px]"
              maxLength={280}
            />
            
            <p className="text-xs text-muted-foreground">
              No account needed • Anonymous posting • Decentralized network
            </p>
            
            <Button 
              onClick={submitQuestion}
              disabled={isSubmitting || !question.trim()}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Posting..." : "Post Question"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Your question is now live on Nostr!</span>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-foreground">Your Question:</h4>
              <p className="text-sm text-muted-foreground italic">"{postedQuestion}"</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">Follow-up Link</h4>
              <p className="text-xs text-muted-foreground">
                Save this link to check for responses to your question later:
              </p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={followUpLink} 
                  readOnly 
                  className="flex-1 px-3 py-2 text-xs bg-background border border-border rounded-md"
                />
                <Button size="sm" onClick={copyLink} variant="outline">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={resetModal}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

const FAQ = () => {
  const communityTips = [
    {
      question: "Find Local Bitcoin Meetups",
      answer: "Search for Bitcoin meetups in your area on Meetup.com. These regular gatherings are perfect for meeting like-minded people, asking questions, and learning from experienced bitcoiners in person."
    },
    {
      question: "Join Online Bitcoin Communities",
      answer: "Connect with thousands of bitcoiners worldwide through platforms like Nostr, Bitcoin Twitter, and specialized forums. The Bitcoin community is known for being welcoming and educational."
    },
    {
      question: "Attend Bitcoin Conferences",
      answer: "Bitcoin conferences happen globally throughout the year. These events feature expert speakers, networking opportunities, and the latest developments in the Bitcoin space."
    },
    {
      question: "Start a Local Study Group",
      answer: "If there's no Bitcoin meetup in your area, consider starting one! Many successful Bitcoin communities began with just a few curious people meeting regularly to learn together."
    },
    {
      question: "Follow Bitcoin Educators",
      answer: "Learn from respected Bitcoin educators and content creators who regularly share insights, updates, and educational content about Bitcoin's technology and economics."
    },
    {
      question: "Engage in Meaningful Discussions",
      answer: "Don't be afraid to ask questions and share your learning journey. The Bitcoin community values genuine curiosity and is eager to help newcomers understand this revolutionary technology."
    },
  ];

  // Force rebuild to clear cache

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Connect & Learn Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bitcoin is best learned through community. Connect with local bitcoiners, attend meetups, and join the global conversation.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {communityTips.map((tip, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {tip.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {tip.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Join the Global Bitcoin Community</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Connect with thousands of bitcoiners worldwide, ask questions, share insights, and stay updated on the latest Bitcoin developments.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                onClick={() => window.open('https://primal.net', '_blank')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Join Community
              </Button>
              <NostrQuestionModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;