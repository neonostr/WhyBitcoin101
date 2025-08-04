const WhyBitcoin = () => {
  // Edit these texts easily
  const content = {
    title: "Why Bitcoin Matters",
    subtitle: "Bitcoin represents more than just digital money. It's a new way to think about value, ownership, and financial sovereignty in the digital age.",
    bigPictureTitle: "The Big Picture",
    bigPictureText: "Bitcoin is more than an investment—it's a tool for financial empowerment. Whether you're protecting your savings from inflation or sending money to family abroad, Bitcoin puts you in control."
  };

  const benefits = [
    {
      title: "Financial Freedom",
      description: "Be your own bank. No need to ask permission to send or receive money, anywhere in the world.",
      gradient: "from-primary to-bitcoin-orange"
    },
    {
      title: "Inflation Protection",
      description: "With a fixed supply of 21 million coins, Bitcoin can't be printed at will like traditional currencies.",
      gradient: "from-bitcoin-orange to-accent"
    },
    {
      title: "Global Access",
      description: "Send money across borders instantly, 24/7, without banks or intermediaries charging high fees.",
      gradient: "from-accent to-primary"
    }
  ];

  return (
    <section id="why-bitcoin" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {content.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-bitcoin-orange/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              {content.bigPictureTitle}
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {content.bigPictureText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBitcoin;