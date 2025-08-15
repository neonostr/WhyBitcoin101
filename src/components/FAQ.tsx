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
    "wss://relay.nostr.band",
    "wss://relay.primal.net",
    "wss://nostr.wine"
  ];

  const generateRandomUsername = () => {
    const adjectives = ["SteadySats","FreedomLedger", "Learning", "OrangePillJourney", "FutureThinkerBTC", "AskAboutBitcoin", "Bitcoin", "Hope", "Future", "ProofOfCuriosity", "OpenLedgerLearner","BitcoinBeginnerQ","SatoshiStudent","OpenMindSeeker","StackTheFacts","BitcoinSignalQuest","PathToValue","BeyondThePrice","HonestLedger,","ProofOfWhy","DeepMoneyDive","OrangeClarity","OpenSourceWhy"];
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
      
      console.debug("Generated key pair", { publicKey });
      
      const pool = new SimplePool();
      
      // Create user profile first (non-blocking)
      const username = generateRandomUsername();
      const profileEvent = {
        kind: 0,
        created_at: Math.floor(Date.now() / 1000),
        tags: [],
        content: JSON.stringify({
          name: username,
          about: "Learning about Bitcoin and asking questions. #asknostr #whybitcoin-101",
          picture: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.s6ZcC1Tl3_UXQBQBmP6wRQHaHa%3Fpid%3DApi&f=1&ipt=84c58972f1eb5dbe83ab7f5732d5bd86bef6e913a4686ee995c35f8a25e6e2fb&ipo=images",
        }),
        pubkey: publicKey,
      };

      const signedProfileEvent = finalizeEvent(profileEvent, privateKey);
      
      // Publish profile (don't await - let it happen in background)
      console.debug("Publishing profile...");
      pool.publish(relays, signedProfileEvent);
      
      // Auto-follow the specified profile
      const targetPubkey = "01472b55fece0a487dde1dae47fb0c498a043b8b777ae21e2e25078002521368"; // npub1uuhsm53er3xxkq90up6gt2wg5vhaz0aenlw4m4rls04thf24heuq8vf4yh
      const followEvent = {
        kind: 3,
        created_at: Math.floor(Date.now() / 1000),
        tags: [["p", targetPubkey]],
        content: "",
        pubkey: publicKey,
      };
      const signedFollowEvent = finalizeEvent(followEvent, privateKey);
      console.debug("Publishing follow event...");
      pool.publish(relays, signedFollowEvent);
      
      // Create the note event
      const event = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ["t", "whybitcoin-101"],
          ["t", "asknostr"],
          ["client", "Test"]
        ],
        content: question + "\n\n#asknostr #whybitcoin-101",
        pubkey: publicKey,
      };

      // Sign the event
      const signedEvent = finalizeEvent(event, privateKey);
      
      console.debug("Publishing question event...", { eventId: signedEvent.id });
      
      // Publish to relays 
      const pubPromises = pool.publish(relays, signedEvent);
      
      // Wait for at least one relay to confirm with timeout
      try {
        console.debug("Waiting for relay confirmation...");
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 10000)
        );
        
        // Wait for the first promise to resolve or timeout
        await Promise.race([
          ...pubPromises,
          timeoutPromise
        ]);
        console.debug("Event published successfully to at least one relay");
      } catch (error) {
        console.debug("Publish timeout or error, continuing anyway:", error);
        // Continue anyway - the event was likely published
      }
      
      // Create follow-up link with private key in nsec format
      const nsecPrivateKey = nip19.nsecEncode(privateKey);
      const followUpUrl = `${window.location.origin}/question/${nsecPrivateKey}`;
      
      console.debug("Question published successfully", { followUpUrl });
      
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
      <DialogContent className="max-w-2xl w-full p-0 bg-gradient-to-br from-background to-muted/30 border-0 shadow-2xl">
        <div className="relative overflow-hidden rounded-lg">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background p-8 border-b border-border/20">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-foreground">
                {showSuccess ? "✨ Question Posted Successfully!" : "Ask Bitcoin Community"}
              </DialogTitle>
              {!showSuccess && (
                <p className="text-center text-muted-foreground mt-3 text-base leading-relaxed">
                  Ask your Bitcoin related question and get an answer from us or the broader community. Your question will be publicly visible, but you'll remain anonymous.
                </p>
              )}
            </DialogHeader>
          </div>
          
          {/* Content area */}
          <div className="p-8">
            {!showSuccess ? (
              <div className="space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Your Question</label>
                  <Textarea
                    placeholder="What's your Bitcoin question?"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[120px] text-base border-border/50 focus:border-primary/50 bg-background/50 backdrop-blur-sm resize-none"
                    maxLength={500}
                  />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>No account needed • Anonymous posting</span>
                    <span>{question.length}/500</span>
                  </div>
                </div>
                
                <Button 
                  onClick={submitQuestion}
                  disabled={isSubmitting || !question.trim()}
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  <Send className="h-5 w-5 mr-3" />
                  {isSubmitting ? "Posting your question..." : "Post Question"}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-green-500/10 border border-green-500/20">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <span className="font-semibold text-green-700 dark:text-green-400">Your question is now live on Nostr</span>
                  </div>
                </div>
                
                <div className="p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border/30">
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    Your Question:
                  </h4>
                  <p className="text-muted-foreground italic leading-relaxed bg-background/30 p-4 rounded-lg border border-border/20">
                    "{postedQuestion}"
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Follow-up Link
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Save this link to check for responses to your question later. Bookmark it or copy it to your notes.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="text" 
                      value={followUpLink} 
                      readOnly 
                      className="flex-1 px-4 py-3 text-sm bg-background/50 backdrop-blur-sm border border-border/50 rounded-lg focus:border-primary/50 transition-colors"
                    />
                    <Button size="lg" onClick={copyLink} variant="outline" className="px-6 border-border/50 hover:border-primary/50">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <Button 
                  onClick={resetModal}
                  className="w-full h-12 text-base font-medium bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
                  size="lg"
                >
                  Ask Another Question
                </Button>
              </div>
            )}
          </div>
        </div>
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
                className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20 relative"
              >
                <CopyButton text={`${faq.question} - ${faq.answer}`} hashtag={`#whybitcoin101-faq-${index + 1}`} />
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
          <div className="inline-block p-8 rounded-2xl bg-card border border-border relative">
            <CopyButton text="Still Have Questions? Don't see your question here? Ask the Bitcoin community and get help from others who know about Bitcoin." hashtag="#whybitcoin101-still-questions" />
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