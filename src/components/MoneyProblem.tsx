const MoneyProblem = () => {
  return <section id="money-problem" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Why Bitcoin in the First Place?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            To understand Bitcoin, we first need to understand what money should be and why our current system is fundamentally broken.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              What Money Should Be
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">Money is fundamentally a tool to store human energy and time. When you work, you expend your life energy - your time, effort, and skills. Money should allow you to store this energy for future use, so you can later exchange it for things that improve your life: a car, a holiday trip, a home, or simply peace of mind.</p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Good money should reliably preserve the value of your work across time. If you work hard today and save money, that money should retain its purchasing power so you can access the same value months or years later when you need it.
            </p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Money Is Broken
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Our money is so fundamentally broken that people can no longer use it as a store of value. Instead, society has been forced to turn to real estate, stocks, and other assets as savings vehicles—roles that should naturally belong to money itself.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This distortion has created massive problems: skyrocketing housing costs, inflated asset bubbles, and a world where basic necessities like homes have become unaffordable investments rather than places to live.
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              The Human Cost
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              When money fails at its basic function of storing value, entire generations suffer. Young families can't afford homes. People delay having children because they can't provide financial security. Communities are displaced as housing becomes a speculative investment rather than a basic human need.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This isn't just an economic problem - it's tearing apart the social fabric of society, disrupting families and communities that form the foundation of human civilization.
            </p>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">The Manipulation of Money</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">To make matters worse, politicians and central banks have unchecked access to the money supply. When reckless speculators make bad bets and face bankruptcy, they are bailed out with freshly printed money, passing the costs on to the general public through inflation.</p>
            <p className="text-lg text-muted-foreground leading-relaxed">This system creates a rigged game, where those with connections to the money printer reap the benefits, while ordinary people bear the burden. The result is a perverse incentives structure that prioritizes profit over people, undermining the stability and fairness of our economic system.</p>
          </div>

          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-bitcoin-orange/10 to-primary/10 border-2 border-bitcoin-orange/20">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Bitcoin Was Born From This Crisis
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                In 2008, as the financial system collapsed and banks got bailed out while ordinary people lost their homes, an anonymous creator released Bitcoin - a new form of money that no government or bank could control, inflate, or manipulate. A money system designed to serve people, not politicians or Wall Street.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default MoneyProblem;