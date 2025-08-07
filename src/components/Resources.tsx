import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoModal from "./VideoModal";

const Resources = () => {
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: ""
  });

  // Video resources
  const videos = [
    {
      title: "Bitcoin Not Crypto",
      description: "Bitcoin: Learn why nothing else compares.",
      type: "Beginner",
      url: "https://youtu.be/Q9athzFaFfc?t=83" 
    },
    {
      title: "Why do we need Bitcoin?",
      description: "This is going to change the way you understand money forever.",
      type: "Beginner",
      url: "https://www.youtube.com/watch?v=Pef22g53zsg" 
    },
    {
      title: "Am I Too Late To Bitcoin?",
      description: "Find out if you are too late to buy Bitcoin",
      type: "Beginner",
      url: "https://www.youtubetrimmer.com/view/?v=5893JBg7r9k&start=773&end=1000&loop=0" 
    },
    {
      title: "Should I Diversify?",
      description: "Find out if you should diversify.",
      type: "Beginner",
      url: "https://www.youtube.com/watch?v=kunaljk_Psc" 
    }
  ];

  // Articles & Essays
  const articles = [
    {
      title: "21 Lessons,
      author: "Gigi",
      description: "A persoal journey of discovering bitcoin",
      type: "Essay",
      url: "https://21lessons.com"
    },
    {
      title: "Deep Dive Bitcoin & Society",
      author: "Gigi",
      description: "Some of the best essays about Bitcoin.",
      type: "Blog",
      url: "http://dergigi.com"
    }
  ];

  // Books
  const books = [
    {
      title: "The Fiat Standard",
      author: "Saifedean Ammous",
      description: "Understand the technology behind the current analog global monetary system.",
      type: "Essential Reading",
      url: "https://saifedean.com/tfs"
    },
    {
      title: "The Bitcoin Standard",
      author: "Saifedean Ammous",
      description: "A comprehensive and authoritative exploration of Bitcoin and its place in monetary history.",
      type: "Essential Reading",
      url: "https://saifedean.com/tbs"
    },
    {
      title: "The Bullish Case for Bitcoin",
      author: "Vijay Boyapati",
      description: "A compelling argument for Bitcoin as a store of value.",
      type: "Investment Perspective",
      url: "https://example.com/bullish-case"
    }
  ];

  // Podcasts
  const podcasts = [
    {
      title: "What Bitcoin Did",
      host: "Peter McCormack",
      description: "Interviews with Bitcoin experts and industry leaders.",
      type: "Interview",
      url: "https://example.com/what-bitcoin-did"
    },
    {
      title: "The Bitcoin Podcast",
      host: "Various Hosts",
      description: "Deep dives into Bitcoin technology and economics.",
      type: "Technical",
      url: "https://example.com/bitcoin-podcast"
    }
  ];

  // Mobile Wallets
  const mobileWallets = [
    {
      title: "Muun Wallet",
      description: "User-friendly Bitcoin wallet with Lightning support.",
      type: "iOS/Android",
      url: "https://muun.com/"
    },
    {
      title: "Phoenix",
      description: "Self-custodial Lightning wallet by ACINQ.",
      type: "Lightning",
      url: "https://phoenix.acinq.co"
    }
  ];

  // Hardware Wallets
  const hardwareWallets = [
    {
      title: "Coldcard",
      description: "Bitcoin-only hardware wallet focused on security.",
      type: "Bitcoin-only",
      url: "https://coldcard.com"
    },
    {
      title: "Trezor",
      description: "Pioneer in hardware wallet technology.",
      type: "Multi-coin",
      url: "https://trezor.io"
    }
  ];

  // Exchanges
  const exchanges = [
    {
      title: "River",
      description: "River is the most trusted place in the U.S. to buy Bitcoin.",
      type: "USA",
      url: "https://river.com/buy-bitcoin"
    },
    {
      title: "Bittr",
      description: "Buy Bitcoin directly into your wallet",
      type: "CH/EU",
      url: "https://getbittr.com/"
    },
    {
      title: "Bitcoin Well",
      description: "Buy Bitcoin directly into your wallet",
      type: "CA",
      url: "https://bitcoinwell.com/buy-bitcoin"
    },
    {
      title: "HodlHodl",
      description: "Buy Bitcoin via P2P directly into your wallet",
      type: "Worldwide",
      url: "https://hodlhodl.com"
    }
  ];

  // Living On Bitcoin
  const livingOnBitcoin = [
    {
      title: "Bitcoin Beach",
      description: "How El Salvador's Bitcoin Beach became a circular economy.",
      type: "Case Study",
      url: "https://example.com/bitcoin-beach"
    },
    {
      title: "Bitcoin Accepted Here Map",
      description: "Find businesses that accept Bitcoin near you.",
      type: "Directory",
      url: "https://coinmap.org"
    }
  ];

  // Fun Stuff
  const funStuff = [
    {
      title: "Bitcoin Pizza Day",
      description: "The story of the first Bitcoin transaction for physical goods.",
      type: "History",
      url: "https://example.com/pizza-day"
    },
    {
      title: "Bitcoin Memes",
      description: "The best Bitcoin memes and culture.",
      type: "Culture",
      url: "https://example.com/bitcoin-memes"
    }
  ];

  const handleVideoClick = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url });
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };

  const renderSection = (title: string, emoji: string, items: any[], isVideo = false) => (
    <div className="mb-16">
      <h3 className="text-3xl font-bold text-center mb-10 text-foreground">{emoji} {title}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-[var(--card-hover)] transition-all duration-300 cursor-pointer"
            onClick={() => isVideo ? handleVideoClick(item.title, item.url) : handleLinkClick(item.url)}
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.type}
                </span>
              </div>
              {item.author && (
                <p className="text-sm text-muted-foreground">by {item.author}</p>
              )}
              {item.host && (
                <p className="text-sm text-muted-foreground">Hosted by {item.host}</p>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <section id="resources" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Dive Deeper
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to learn more? These carefully curated resources will take you from curious beginner to informed enthusiast.
            </p>
          </div>

          {renderSection("Videos", "🎥", videos, true)}
          {renderSection("Articles & Essays", "📄", articles)}
          {renderSection("Books", "📚", books)}
          {renderSection("Podcasts", "🎧", podcasts)}
          {renderSection("Mobile Wallets", "📱", mobileWallets)}
          {renderSection("Hardware Wallets", "🔒", hardwareWallets)}
          {renderSection("Exchanges", "💱", exchanges)}
          {renderSection("Living On Bitcoin", "🌍", livingOnBitcoin)}
          {renderSection("Fun Stuff", "🎉", funStuff)}

          <div className="text-center">
            <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-bitcoin-orange/5 border border-primary/10">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Start Your Journey</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                Take your time exploring these resources. Bitcoin is a marathon, not a sprint.
              </p>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Have Questions? Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, title: "", url: "" })}
        title={videoModal.title}
        videoUrl={videoModal.url}
      />
    </>
  );
};

export default Resources;