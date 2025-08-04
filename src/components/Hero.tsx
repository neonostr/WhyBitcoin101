import { Button } from "@/components/ui/button";
const Hero = () => {
  return <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-background to-bitcoin-light/20 overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent leading-tight">
            Curious About Bitcoin?
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">Your journey into understanding the future of money starts here. Simple explanations, trusted resources, and expert guidance.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" onClick={() => document.getElementById('basics')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Start Learning
            </Button>
            <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6 rounded-xl transition-all duration-300" onClick={() => document.getElementById('resources')?.scrollIntoView({
            behavior: 'smooth'
          })}>
              Explore Resources
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-primary/10 animate-pulse"></div>
      <div className="absolute bottom-20 left-10 w-16 h-16 rounded-full bg-bitcoin-orange/20 animate-pulse delay-1000"></div>
    </section>;
};
export default Hero;