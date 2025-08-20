import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

const VideoPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
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
    if (slug) {
      // Try to get video data from localStorage
      const videoData = localStorage.getItem(`video-${slug}`);
      
      if (videoData) {
        try {
          const parsed = JSON.parse(videoData);
          
          // Scroll to top
          window.scrollTo(0, 0);
          
          // Open video modal with shared content
          setSharedVideo({
            isOpen: true,
            title: parsed.title,
            url: parsed.videoUrl
          });
        } catch (error) {
          console.error('Error parsing video data:', error);
          navigate('/');
        }
      } else {
        // Video not found, redirect to homepage
        navigate('/');
      }
    }
  }, [slug, navigate]);

  const handleCloseVideo = () => {
    setSharedVideo({ isOpen: false, title: "", url: "" });
    // Navigate back to homepage after closing
    navigate('/');
  };

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
          onClose={handleCloseVideo} 
          title={sharedVideo.title} 
          videoUrl={sharedVideo.url} 
        />
      </div>
    </EditModeProvider>
  );
};

export default VideoPage;