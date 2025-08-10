import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    {
      question: "Will Bitcoin replace traditional money?",
      answer: "Bitcoin complements traditional money rather than replacing it entirely. It's useful for savings, international transfers, and as a hedge against inflation."
    }
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
              Don't see your question here? Feel free to reach out - I'm here to help you understand Bitcoin better.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;