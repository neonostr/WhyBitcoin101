import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Send, Copy, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { finalizeEvent, generateSecretKey, getPublicKey } from "nostr-tools/pure";
import { nip19 } from "nostr-tools";
import { SimplePool } from "nostr-tools/pool";
import CopyButton from "./CopyButton";

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
    "wss://relay.primal.net",
    "wss://relay.nostr.band",
    "wss://relay.primal.net"    
  ];

  const generateRandomUsername = () => {
    const adjectives = ["Curious", "Learning", "New", "Eager", "Smart", "Bitcoin", "Hope", "Future", "Wise"];
    const nouns = ["Student", "Explorer", "Learner", "Seeker", "Beginner", "Enthusiast", "User", "Person", "Individual", "Member"];
    const numbers = Math.floor(Math.random() * 999) + 1;
    
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    
    return `${adjective}${noun}${numbers}`;
  };

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
      
      const pool = new SimplePool();
      
      // Create user profile first
      const username = generateRandomUsername();
      const profileEvent = {
        kind: 0,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: JSON.stringify({
          name: username,
          about: "Created by whybitcoin101.com so this person can get help on his Bitcoin journey. Thanks for helping 🙏\n\nIf you want to help actively orange pilling, check out @npub1umxzqd3zsnxfg7uxtwc0cc5dksjcj46c4dpmn32yaj5sluc66lxskzn2e5 for further guidance.",
          picture: "https://i.nostr.build/2U0f2VceVxNxy3LV.jpg",
        }),
        pubkey: publicKey,
      };

      const signedProfileEvent = finalizeEvent(profileEvent, privateKey);
      
      // Publish profile
      await Promise.race(pool.publish(relays, signedProfileEvent));
      
      // Create the note event
      const event = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ["t", "teststr"],
          ["t", "bitcoinbasics"], 
          ["t", "bitcoinknowledgehub"],
          ["client", "BitcoinBasics"]
        ],
        content: question,
        pubkey: publicKey,
      };

      // Sign the event
      const signedEvent = finalizeEvent(event, privateKey);
      
      // Publish to relays
      const relayPromises = pool.publish(relays, signedEvent);
      
      // Wait for at least one relay to confirm
      await Promise.race(relayPromises);
      
      // Create follow-up link with private key in nsec format
      const nsecPrivateKey = nip19.nsecEncode(privateKey);
      const followUpUrl = `${window.location.origin}/question/${nsecPrivateKey}`;
      
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
              <span className="font-medium">Your question is now live</span>
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
  const faqText = `Common Questions

Here are answers to the questions most people have when they're first learning about Bitcoin.

Is Bitcoin safe to use? - Bitcoin's blockchain is extremely secure and has never been hacked. However, you need to keep your Bitcoin wallet safe, just like you would with cash or credit cards.

How much Bitcoin should I buy? - Invest as much as you feel comfortable with. It makes no sense to go all-in without understanding Bitcoin. Start with an amount that feels good for you, then continue learning - as your understanding grows, you'll know when and how much more to invest.

Can Bitcoin keep going up forever? - Bitcoin has no theoretical ceiling because humans will never stop inventing, improving, and creating value. With Bitcoin's fixed supply of 21 million coins and humanity's endless capacity for innovation, your purchasing power can increase indefinitely. As we develop better technology, more efficient systems, and new solutions, there's more value to capture - and Bitcoin's scarcity ensures your savings benefit from all of human progress.

Can Bitcoin be shut down? - Bitcoin is decentralized across thousands of computers worldwide. There's no central authority that can shut it down, making it very resilient.

How do I store Bitcoin safely? - For small amounts, a reputable mobile wallet is fine. For larger amounts, consider a hardware wallet for maximum security.

Is Bitcoin bad for the environment? - Bitcoin mining increasingly uses renewable energy. The network's energy use secures a global financial system and drives renewable energy innovation.`;

  const faqs = [
    {
      question: "Is Bitcoin safe to use?",
      answer: "Bitcoin's blockchain is extremely secure and has never been hacked. However, you need to keep your Bitcoin wallet safe, just like you would with cash or credit cards."
    },
    {
      question: "How much Bitcoin should I buy?",
      answer: "Invest as much as you feel comfortable with. It makes no sense to go all-in without understanding Bitcoin. Start with an amount that feels good for you, then continue learning - as your understanding grows, you'll know when and how much more to invest."
    },
    {
      question: "Can Bitcoin keep going up forever?",
      answer: "Bitcoin has no theoretical ceiling because humans will never stop inventing, improving, and creating value. With Bitcoin's fixed supply of 21 million coins and humanity's endless capacity for innovation, your purchasing power can increase indefinitely. As we develop better technology, more efficient systems, and new solutions, there's more value to capture - and Bitcoin's scarcity ensures your savings benefit from all of human progress."
    },
    {
      question: "Can Bitcoin be shut down?",
      answer: "Bitcoin is decentralized across thousands of computers worldwide. There's no central authority that can shut it down, making it very resilient."
    },
    {
      question: "How do I store Bitcoin safely?",
      answer: "For small amounts, a reputable mobile wallet is fine. For larger amounts, consider a hardware wallet for maximum security."
    },
    {
      question: "Is Bitcoin bad for the environment?",
      answer: "Bitcoin mining increasingly uses renewable energy. The network's energy use secures a global financial system and drives renewable energy innovation."
    },
  ];

  return (
    <section id="faq" className="py-20 px-4 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto relative">
        <CopyButton text={faqText} hashtag="#whybitcoin101-faq" />
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Common Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Here are answers to the questions most people have when they're first learning about Bitcoin.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-card border border-border">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Still Have Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Don't see your question here? Ask the Bitcoin community and get help from others who know about Bitcoin.
            </p>
            <NostrQuestionModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;