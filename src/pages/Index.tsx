import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MoneyProblem from "@/components/MoneyProblem";
import Basics from "@/components/Basics";
import WhyBitcoin from "@/components/WhyBitcoin";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { useState, useEffect } from "react";

const Index = () => {
  const [videoModal, setVideoModal] = useState({
    isOpen: false,
    title: "",
    url: ""
  });

  useEffect(() => {
    // Check for shared video URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const sharedVideoUrl = urlParams.get('video');
    const sharedTitle = urlParams.get('title');
    
    if (sharedVideoUrl && sharedTitle) {
      setVideoModal({
        isOpen: true,
        title: decodeURIComponent(sharedTitle),
        url: decodeURIComponent(sharedVideoUrl)
      });
    }
  }, []);

  return (
    <EditModeProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <MoneyProblem />
        <Basics />
        <WhyBitcoin />
        <Resources 
          videoModal={videoModal}
          setVideoModal={setVideoModal}
        />
        <FAQ />
        <Contact />
      </div>
    </EditModeProvider>
  );
};

export default Index;
