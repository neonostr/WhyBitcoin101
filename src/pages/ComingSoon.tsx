import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-24 md:py-32 text-center">
        <div className="space-y-16">
          {/* Main Headline */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              <span className="text-foreground">The Bitcoin Education</span>
              <br />
              <span className="text-[#f7931a]">Revolution is Coming</span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl font-medium text-muted-foreground tracking-wide">
              LESS HYPE. MORE WHY.
            </p>
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A global movement to transform how the world learns about Bitcoin. No more price hype. 
            No more investment advice. Just the truth about why our broken monetary system needs Bitcoin.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#f7931a]">
            "We're not selling Bitcoin.<br />We're revealing the truth."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            When people understand WHY our current system is broken—how it makes houses unaffordable, 
            erodes savings, and creates inequality—they naturally seek Bitcoin as the solution. 
            This creates genuine understanding that price hype never could.
          </p>
        </div>
      </section>

      {/* The Revolution */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            "For the first time in history, we can coordinate<br />Bitcoin education globally."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Thanks to permissionless technology, every Bitcoiner worldwide can now work together 
            to build the world's best Bitcoin education content. One answer can reach billions of people. 
            This is how we orange-pill the world together.
          </p>
        </div>
      </section>

      {/* What's Coming */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-[#f7931a]">
            "A platform that changes everything."
          </h2>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto text-left">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg font-medium text-foreground leading-relaxed">
                  Hidden edit mode for educators to improve content
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg font-medium text-foreground leading-relaxed">
                  Global coordination on permissionless rails
                </span>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg font-medium text-foreground leading-relaxed">
                  Infinite upscale—one improvement helps millions
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg font-medium text-foreground leading-relaxed">
                  Community-driven content that serves all of humanity
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Vision */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            "Building a society worth living in."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            When money holds its value across time, people think in decades instead of days. 
            They build to last, innovate for future generations, and create lasting value. 
            This isn't just better economics—it's the foundation for human flourishing.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center space-y-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-foreground">
            "Join the revolution. Be notified when we launch."
          </h2>
          
          <div className="space-y-8">
            <Button 
              size="lg" 
              className="bg-[#f7931a] hover:bg-[#e8851f] text-white text-lg px-10 py-4 h-auto font-medium rounded-lg transition-all duration-200 hover:scale-105"
              asChild
            >
              <a 
                href="https://primal.net/p/npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3"
              >
                <span>Join the revolution</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
            
            <p className="text-muted-foreground">
              Follow us on Nostr to see the community grow in real-time
            </p>
          </div>
        </div>
      </section>

      {/* Final Message */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-bold text-[#f7931a]">
            "LESS HYPE. MORE WHY."
          </h3>
          <p className="text-lg text-muted-foreground">
            because the future of humanity depends on it.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ComingSoon;