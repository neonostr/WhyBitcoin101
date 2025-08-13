import CopyButton from "./CopyButton";

const MoneyProblem = () => {
  const moneyProblemText = `Why Bitcoin in the First Place?

To understand Bitcoin, we first need to understand what money should be and why our current system is fundamentally broken.

What Money Should Be - Money is fundamentally stored energy. Every time you work or take a financial risk, you exchange your time, effort, and focus for a number in your bank account - a representation of the energy you've invested. Money should allow you to store this energy for future use, so you can later exchange it for things that improve your life: a car, a holiday trip, a home, or simply peace of mind. Good money should reliably preserve the value of your work across time.

Money Is Broken - Governments and central banks can print currency at will, diluting the value of your hard-earned energy and effectively stealing lifetime from you. As a result, people can no longer rely on it as a dependable store of value. Instead, society has been compelled to seek refuge in real estate, stocks, and other assets as vehicles for savings - roles that rightfully belong to money itself.

The Human Cost - When money fails at its basic function of storing value, entire generations suffer. Young families can't afford homes. People delay having children because they can't provide financial security. Communities are displaced as housing becomes a speculative investment rather than a basic human need. This isn't just an economic problem - it's tearing apart the social fabric of society.

The Manipulation of Money - Politicians and central banks have unchecked access to the money supply. When reckless speculators make bad bets and face bankruptcy, they are bailed out with freshly printed money, passing the costs on to the general public through inflation. This creates a rigged game where those with connections benefit while ordinary people bear the burden.

Bitcoin Was Born From This Crisis - In 2008, as the financial system collapsed and banks got bailed out while ordinary people lost their homes, an anonymous creator released Bitcoin - a new form of money that no government or bank could control, inflate, or manipulate. A money system designed to serve people, not politicians or Wall Street.`;
  return <section id="money-problem" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto relative">
        <CopyButton text={moneyProblemText} hashtag="#whybitcoin101-money-problem" />
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
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">Money is fundamentally stored energy. Every time you work or take a financial risk, you exchange your time, effort, and focus for a number in your bank account - a representation of the energy you've invested. Money should allow you to store this energy for future use, so you can later exchange it for things that improve your life: a car, a holiday trip, a home, or simply peace of mind.</p>
            <p className="text-lg text-muted-foreground leading-relaxed">Good money should reliably preserve the value of your work across time. If you work hard today and save money, that money should at least retain its purchasing power so you can access the same value months or years later when you need it.</p>
          </div>
          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              Money Is Broken
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">Governments and central banks can print currency at will, diluting the value of your hard-earned energy and effectively stealing lifetime from you. As a result, people can no longer rely on it as a dependable store of value. Instead, society has been compelled to seek refuge in real estate, stocks, and other assets as vehicles for savings - roles that rightfully belong to money itself.</p>
            <p className="text-lg text-muted-foreground leading-relaxed">This distortion has created massive problems: skyrocketing housing costs, inflated asset bubbles, and a world where basic necessities like homes have become unaffordable investments rather than places to live.
          </p>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">
              The Human Cost
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              When money fails at its basic function of storing value, entire generations suffer. Young families can't afford homes. People delay having children because they can't provide financial security. Communities are displaced as housing becomes a speculative investment rather than a basic human need.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">This isn't just an economic problem - it's tearing apart the social fabric of society, disrupting families and communities that form the foundation of our civilization.</p>
          </div>

          <div className="bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-foreground">The Manipulation of Money</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">To make matters worse, because politicians and central banks have unchecked access to the money supply. When reckless speculators make bad bets and face bankruptcy, they are bailed out with freshly printed money, passing the costs on to the general public through inflation.</p>
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