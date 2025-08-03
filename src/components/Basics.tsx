import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Basics = () => {
  const basicConcepts = [
    {
      title: "What is Bitcoin?",
      description: "Bitcoin is a digital currency that operates without a central authority. It's like digital cash that you can send directly to anyone in the world.",
      icon: "₿"
    },
    {
      title: "How Does It Work?",
      description: "Bitcoin uses blockchain technology - a public ledger that records all transactions. Think of it as a transparent, tamper-proof record book.",
      icon: "🔗"
    },
    {
      title: "Why Is It Special?",
      description: "Unlike traditional money, Bitcoin is decentralized, scarce (only 21 million will ever exist), and gives you complete control over your money.",
      icon: "⭐"
    },
    {
      title: "Getting Started",
      description: "You can start by learning more, getting a wallet app, and buying your first small amount from a reputable exchange.",
      icon: "🚀"
    }
  ];

  return (
    <section id="basics" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Bitcoin Basics
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding Bitcoin doesn't have to be complicated. Let's start with the fundamentals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {basicConcepts.map((concept, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20"
            >
              <CardHeader className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {concept.icon}
                </div>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                  {concept.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {concept.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Basics;