import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Main Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-tight tracking-tight">
              The Bitcoin Education
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/80 mt-2">
                Revolution is Coming
              </span>
            </h1>
            
            {/* Subheadline */}
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
              <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-wide">
                LESS HYPE. MORE WHY.
              </span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
            A global movement to transform how the world learns about Bitcoin. No more price hype. 
            No more investment advice. Just the truth about why our broken monetary system needs Bitcoin.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-card/80 to-card/60 backdrop-blur-sm border border-border/50 rounded-3xl p-12 shadow-2xl">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                We're not selling Bitcoin. We're revealing the truth.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                When people understand WHY our current system is broken - how it makes houses unaffordable, 
                erodes savings, and creates inequality - they naturally seek Bitcoin as the solution. 
                This creates genuine understanding that price hype never could.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Revolution */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 backdrop-blur-sm border border-primary/20 rounded-3xl p-12 shadow-xl">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                For the first time in history, we can coordinate Bitcoin education globally.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Thanks to permissionless technology, every Bitcoiner worldwide can now work together 
                to build the world's best Bitcoin education content. One answer can reach billions of people. 
                This is how we orange-pill the world together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Ultimate Orange Pill */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              The Ultimate Orange Pill
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg font-medium text-foreground text-left leading-relaxed">A unified voice, built together, refined endlessly, and shared freely with the world.</p>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg font-medium text-foreground text-left leading-relaxed">Global coordination on permissionless rails - no gates, no leaders, just unstoppable collaboration.</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg font-medium text-foreground text-left leading-relaxed">Impact at infinite scale - one spark of insight can ignite infinite minds.</p>
                </div>
                <div className="flex items-start space-x-4 p-6 bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl hover:border-primary/30 transition-all duration-300">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg font-medium text-foreground text-left leading-relaxed">A collective legacy - knowledge created for humanity, belonging to everyone, forever.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Vision */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 backdrop-blur-sm border border-primary/20 rounded-3xl p-12 shadow-xl">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Building a society worth living in.
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                When money holds its value across time, people think in decades instead of days. 
                They build to last, innovate for future generations, and create lasting value. 
                This isn't just better economics - it's the foundation for human flourishing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Let's change how the world understands money
          </h2>
          
          <div className="space-y-8">
            <Button 
              size="lg" 
              className="text-xl px-10 py-8 h-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-2xl hover:shadow-primary/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a 
                href="https://primal.net/p/npub1uuhsm53er3xxkq90up6gt2wg5vhaz0aenlw4m4rls04thf24heuq8vf4yh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>Get involved</span>
                <ExternalLink className="w-6 h-6" />
              </a>
            </Button>
            
            <p className="text-base text-muted-foreground">
              We’re building a new home for Bitcoin education. Join us on Nostr while we create it together.
            </p>
          </div>
          
          <div className="pt-12">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-2xl">
              <div className="text-2xl md:text-3xl font-bold text-primary tracking-wide">
                LESS HYPE. MORE WHY.
              </div>
            </div>
            <p className="text-lg text-muted-foreground mt-4">
              Because the future of humanity depends on it.
            </p>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
    </div>
  );
};

export default ComingSoon;