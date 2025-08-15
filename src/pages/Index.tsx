import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MoneyProblem from "@/components/MoneyProblem";
import Basics from "@/components/Basics";
import WhyBitcoin from "@/components/WhyBitcoin";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { EditModeProvider } from "@/contexts/EditModeContext";

const Index = () => {
  return (
    <EditModeProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
        <Navigation />
        <Hero />
        <MoneyProblem />
        <Basics />
        <WhyBitcoin />
        <Resources />
        <FAQ />
        <Contact />
        
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="fixed top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>
    </EditModeProvider>
  );
};

export default Index;
