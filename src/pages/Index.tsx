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
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <MoneyProblem />
        <Basics />
        <WhyBitcoin />
        <Resources />
        <FAQ />
        <Contact />
      </div>
    </EditModeProvider>
  );
};

export default Index;
