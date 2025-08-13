import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useEditing } from "@/contexts/EditingContext";
import EditingOverlay from "./EditingOverlay";

const Navigation = () => {
  const [clickCount, setClickCount] = useState(0);
  const lastClickTime = useRef(0);
  const { editingMode, setEditingMode } = useEditing();
  
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const handleContactClick = () => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime.current;
    
    if (timeSinceLastClick > 3000) {
      // Reset count if more than 3 seconds have passed
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    
    lastClickTime.current = now;
    
    if (clickCount >= 4) { // 5th click (0-indexed)
      setEditingMode(true);
      setClickCount(0);
      document.body.classList.add('editing-mode-active');
    } else {
      scrollToSection('contact');
    }
  };

  useEffect(() => {
    if (editingMode) {
      document.body.classList.add('editing-mode-active');
    } else {
      document.body.classList.remove('editing-mode-active');
    }
    
    return () => {
      document.body.classList.remove('editing-mode-active');
    };
  }, [editingMode]);

  const handleCloseEditing = () => {
    setEditingMode(false);
    document.body.classList.remove('editing-mode-active');
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="font-bold text-2xl text-primary">₿ Bitcoin Basics</div>
            
            <div className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection('money-problem')} className="text-foreground hover:text-primary transition-colors duration-200">
                Why Bitcoin
              </button>
              <button onClick={() => scrollToSection('resources')} className="text-foreground hover:text-primary transition-colors duration-200">
                Resources
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-foreground hover:text-primary transition-colors duration-200">
                FAQ
              </button>
              <Button onClick={handleContactClick} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">Connect</Button>
            </div>
          </div>
        </div>
      </nav>
      
      <EditingOverlay isActive={editingMode} onClose={handleCloseEditing} />
    </>
  );
};

export default Navigation;