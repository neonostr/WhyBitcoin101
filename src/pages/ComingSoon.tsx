import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 md:py-32 text-center">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1]">
            The Bitcoin Education
            <br />
            <span className="text-[#f7931a]">Revolution is Coming</span>
          </h1>
          
          {/* Subheadline */}
          <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-muted-foreground">
            LESS HYPE. MORE WHY.
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A global movement to transform how the world learns about Bitcoin. No more price hype. 
            No more investment advice. Just the truth about why our broken monetary system needs Bitcoin.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7931a] leading-tight">
            "We're not selling Bitcoin. We're revealing the truth."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            When people understand WHY our current system is broken - how it makes houses unaffordable, 
            erodes savings, and creates inequality - they naturally seek Bitcoin as the solution. 
            This creates genuine understanding that price hype never could.
          </p>
        </div>
      </div>

      {/* The Revolution */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            "For the first time in history, we can coordinate Bitcoin education globally."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Thanks to permissionless technology, every Bitcoiner worldwide can now work together 
            to build the world's best Bitcoin education content. One answer can reach billions of people. 
            This is how we orange-pill the world together.
          </p>
        </div>
      </div>

      {/* What's Coming */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#f7931a] leading-tight">
            "A platform that changes everything."
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg md:text-xl font-medium text-foreground">Hidden edit mode for educators to improve content</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg md:text-xl font-medium text-foreground">Global coordination on permissionless rails</span>
              </div>
            </div>
            <div className="space-y-6 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg md:text-xl font-medium text-foreground">Infinite upscale - one improvement helps millions</span>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-[#f7931a] rounded-full mt-3 flex-shrink-0"></div>
                <span className="text-lg md:text-xl font-medium text-foreground">Community-driven content that serves all of humanity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Vision */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            "Building a society worth living in."
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            When money holds its value across time, people think in decades instead of days. 
            They build to last, innovate for future generations, and create lasting value. 
            This isn't just better economics - it's the foundation for human flourishing.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            "Join the revolution. Be notified when we launch."
          </h2>
          
          <div className="space-y-8">
            <Button 
              size="lg" 
              className="bg-[#f7931a] hover:bg-[#e8851f] text-white text-lg md:text-xl px-8 py-6 h-auto font-semibold"
              asChild
            >
              <a 
                href="https://primal.net/p/npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>Join the revolution</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            
            <p className="text-base text-muted-foreground">
              Follow us on Nostr to see the community grow in real-time
            </p>
          </div>
          
          <div className="pt-12 space-y-4">
            <div className="text-2xl md:text-3xl font-bold text-[#f7931a]">
              "LESS HYPE. MORE WHY."
            </div>
            <p className="text-lg text-muted-foreground">
              because the future of humanity depends on it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;