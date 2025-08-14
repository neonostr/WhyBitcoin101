import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            The Bitcoin Education
            <span className="block text-primary">Revolution is Coming</span>
          </h1>
          
          {/* Subheadline */}
          <div className="text-xl md:text-2xl lg:text-3xl font-semibold text-muted-foreground mb-6">
            LESS HYPE. MORE WHY.
          </div>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A global movement to transform how the world learns about Bitcoin. No more price hype. 
            No more investment advice. Just the truth about why our broken monetary system needs Bitcoin.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            "We're not selling Bitcoin. We're revealing the truth."
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When people understand WHY our current system is broken - how it makes houses unaffordable, 
            erodes savings, and creates inequality - they naturally seek Bitcoin as the solution. 
            This creates genuine understanding that price hype never could.
          </p>
        </div>
      </div>

      {/* The Revolution */}
      <div className="container mx-auto px-4 py-12 bg-card/50 rounded-lg mx-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            "For the first time in history, we can coordinate Bitcoin education globally."
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Thanks to permissionless technology, every Bitcoiner worldwide can now work together 
            to build the world's best Bitcoin education content. One answer can reach billions of people. 
            This is how we orange-pill the world together.
          </p>
        </div>
      </div>

      {/* What's Coming */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
            "A platform that changes everything."
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-lg font-medium">Hidden edit mode for educators to improve content</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-lg font-medium">Global coordination on permissionless rails</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-lg font-medium">Infinite upscale - one improvement helps millions</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-lg font-medium">Community-driven content that serves all of humanity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Vision */}
      <div className="container mx-auto px-4 py-12 bg-primary/10 rounded-lg mx-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            "Building a society worth living in."
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            When money holds its value across time, people think in decades instead of days. 
            They build to last, innovate for future generations, and create lasting value. 
            This isn't just better economics - it's the foundation for human flourishing.
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
            "Join the revolution. Be notified when we launch."
          </h2>
          
          <div className="space-y-6">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 h-auto"
              asChild
            >
              <a 
                href="https://primal.net/p/npub1qny3tkh0acurzla8x3zy4nhrjz5zd8l9sy9jys09umwng00manysew95gx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <span>Join the revolution</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Follow us on Nostr to see the community grow in real-time
            </p>
          </div>
          
          <div className="pt-8">
            <div className="text-xl md:text-2xl font-bold text-primary">
              "LESS HYPE. MORE WHY."
            </div>
            <p className="text-lg text-muted-foreground mt-2">
              because the future of humanity depends on it.
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
    </div>
  );
};

export default ComingSoon;