import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CopyButton from "./CopyButton";

const Basics = () => {
  const basicsText = `Bitcoin Basics

Understanding Bitcoin doesn't have to be complicated. Let's start with the fundamentals.

What is Bitcoin? - Bitcoin is money owned by the people that operates without a central authority. It's money that is truly yours, can't be manipulated, and can be sent directly to anyone in the world.

How Does It Work? - Bitcoin securely records all transactions in a public record book distributed globally. A unique system ensures the record can't be altered, eliminating the need for banks or other intermediaries.

Why Is It Special? - Built by the people, free from control, Bitcoin is the world's most scarce asset. Limited to 21 million, it's designed to be perfect money - a secure store of your time and energy.

Bitcoin is for Everyone - Just as one U.S. Dollar equals 100 cents, one Bitcoin equals 100 million satoshis. This divisibility means you can get involved with Bitcoin starting with any amount - even $1.`;

  return <section id="basics" className="py-20 px-4 bg-background">
      <div className="container mx-auto relative">
        <CopyButton text={basicsText} hashtag="#whybitcoin101-basics" />
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Bitcoin Basics</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Understanding Bitcoin doesn't have to be complicated. Let's start with the fundamentals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ₿
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                What is Bitcoin?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">Bitcoin is money owned by the people that operates without a central authority. It's money that is truly yours, can't be manipulated, and can be sent directly to anyone in the world
            </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🔗
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                How Does It Work?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">Bitcoin securely records all transactions in a public record book distributed globally. A unique system ensures the record can't be altered, eliminating the need for banks or other intermediaries.</p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                ⭐
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                Why Is It Special?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">
                Built by the people, free from control, Bitcoin is the world’s most scarce asset. Limited to 21 million, it’s designed to be perfect money - a secure store of your time and energy.
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-[var(--card-hover)] transition-all duration-300 border-border/50 hover:border-primary/20">
            <CardHeader className="text-center">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🚀
              </div>
              <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors duration-300">Bitcoin is for Everyone</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center leading-relaxed">Just as one U.S. Dollar equals 100 cents, one Bitcoin equals 100 million satoshis. This divisibility means you can get involved with Bitcoin starting with any amount - even $1.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default Basics;