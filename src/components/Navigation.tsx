import { Button } from "@/components/ui/button";

const Navigation = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="font-bold text-2xl text-primary">₿ Bitcoin Basics</div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button 
              onClick={() => scrollToSection('basics')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Basics
            </button>
            <button 
              onClick={() => scrollToSection('why-bitcoin')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Why Bitcoin
            </button>
            <button 
              onClick={() => scrollToSection('resources')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              Resources
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-foreground hover:text-primary transition-colors duration-200"
            >
              FAQ
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;