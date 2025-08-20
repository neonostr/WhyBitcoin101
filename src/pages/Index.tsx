import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import MoneyProblem from "@/components/MoneyProblem";
import Basics from "@/components/Basics";
import WhyBitcoin from "@/components/WhyBitcoin";
import Resources from "@/components/Resources";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import VideoModal from "@/components/VideoModal";
import { EditModeProvider } from "@/contexts/EditModeContext";

const Index = () => {
  const [sharedVideo, setSharedVideo] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
  }>({
    isOpen: false,
    title: "",
    url: ""
  });

  useEffect(() => {
    // Check for shared video parameters in URL
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    const videoTitle = urlParams.get('title');
    
    if (videoUrl && videoTitle) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Open video modal with shared content
      setSharedVideo({
        isOpen: true,
        title: decodeURIComponent(videoTitle),
        url: decodeURIComponent(videoUrl)
      });
      
      // Clean URL without reloading
      window.history.replaceState({}, document.title, window.location.pathname);
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
        <Resources />
        <FAQ />
        <Contact />
        
        <VideoModal 
          isOpen={sharedVideo.isOpen} 
          onClose={() => setSharedVideo({ isOpen: false, title: "", url: "" })} 
          title={sharedVideo.title} 
          videoUrl={sharedVideo.url} 
        />
      </div>
    </EditModeProvider>
  );
};

export default Index;
