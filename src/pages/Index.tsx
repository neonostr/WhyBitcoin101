import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Basics from "@/components/Basics";
import WhyBitcoin from "@/components/WhyBitcoin";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Basics />
      <WhyBitcoin />
      <Resources />
      <FAQ />
      <Contact />
    </div>
  );
};

export default Index;
