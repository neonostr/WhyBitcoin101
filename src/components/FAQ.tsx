import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const NostrQuestionModal = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const hashtags = "#bitcoinbasics #bitcoinknowledgehub";

  const copyHashtags = () => {
    navigator.clipboard.writeText(hashtags);
    toast({
      title: "Copied!",
      description: "Hashtags copied to clipboard",
    });
  };

  const openNostr = () => {
    window.open("https://www.asknostr.io", "_blank");
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
          <DialogTitle>Ask on Nostr</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            When you click "Ask Question", you'll post a public note to the Nostr network where I or other Bitcoin enthusiasts will answer you. Since this is a public network, be mindful of what you share.
          </p>
          <p className="text-sm text-muted-foreground">
            Responses can be almost instant or take a few days, depending on who's online.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm font-medium mb-2">Make sure to include these hashtags:</p>
            <div className="flex items-center gap-2">
              <code className="bg-background px-2 py-1 rounded text-sm flex-1">
                {hashtags}
              </code>
              <Button
                size="sm"
                variant="outline"
                onClick={copyHashtags}
                className="shrink-0"
              >
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            No account needed • No personal data required • Decentralized network
          </p>
          <Button 
            onClick={openNostr} 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ask Question on Nostr
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FAQ = () => {
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
      <div className="container mx-auto">
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
              Don't see your question here? Ask the Bitcoin community on Nostr and get answers from experts worldwide.
            </p>
            <NostrQuestionModal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;