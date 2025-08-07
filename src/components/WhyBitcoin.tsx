const WhyBitcoin = () => {
  return (
    <section id="why-bitcoin" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            What's Next?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Imagine a society built on low time preference—where long-term thinking guides our decisions and sound money enables sustainable prosperity for generations.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-bitcoin-orange opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                Educational Resources
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Explore our curated collection of educational content—always up to date with the best resources available. Quality-selected, no referral links, just pure learning.
              </p>
            </div>
          </div>
          
          <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-orange to-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                A Better Future
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When society operates on sound money principles, we naturally develop longer-term thinking, sustainable innovation, and genuine prosperity that spans generations.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-bitcoin-orange/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              Join the Mission
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mb-6">
              This is a voluntary project—we don't earn money here, just spreading knowledge. Feel free to explore our educational content and if you'd like to support our mission, donations are welcome.
            </p>
            <a 
              href="#donate" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
            >
              Support Our Mission
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBitcoin;