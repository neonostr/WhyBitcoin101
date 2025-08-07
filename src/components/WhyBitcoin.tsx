const WhyBitcoin = () => {
  return (
    <section id="why-bitcoin" className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Building Tomorrow Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Imagine a world where sound money enables humanity to think beyond quarterly profits and election cycles. Where low time preference becomes the foundation for sustainable innovation, genuine prosperity, and decisions that benefit our children's children.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-bitcoin-orange opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                A Society Worth Building
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                When money holds its value across time, people naturally start planning for decades, not months. Cities are built to last centuries. Companies invest in research that might take years to bear fruit. Education focuses on wisdom, not just skills for the next job cycle.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This isn't utopian thinking—it's how humanity operated for most of history before inflationary money shortened our collective attention span.
              </p>
            </div>
          </div>
          
          <div className="relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-bitcoin-orange to-accent opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                Quality Over Quantity
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our educational resources are carefully curated—no affiliate links, no hidden agendas, just the best content we can find. We update this collection constantly because understanding Bitcoin means understanding the future of human coordination.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every book, podcast, and article is selected purely for its quality and insight. This knowledge belongs to everyone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-bitcoin-orange/10 border border-primary/20">
            <h3 className="text-2xl font-bold mb-4 text-foreground">
              The Path Forward
            </h3>
            <p className="text-lg text-muted-foreground max-w-3xl mb-6">
              Every great transformation starts with understanding. As more people grasp these principles, we move closer to a world where patient capital builds lasting value, where innovation serves humanity's long-term flourishing, and where financial sovereignty empowers individuals to think beyond survival.
            </p>
            <p className="text-lg text-muted-foreground max-w-3xl mb-8">
              This transition isn't just about money—it's about reclaiming our ability to build for the future, to invest in ideas that matter, and to create a legacy worth leaving.
            </p>
            <p className="text-sm text-muted-foreground/70">
              This is a volunteer effort. <a href="#donate" className="text-primary hover:underline">Support appreciated</a> but never required.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBitcoin;