import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VideoModal from "./VideoModal";
const Resources = () => {
  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    url: string;
  }>({
    isOpen: false,
    title: "",
    url: ""
  });

  // Video resources
  const videos = [{
    title: "Bitcoin Not Crypto",
    description: "Understand the true value of BTC. Discover Bitcoin's unique history, why it was created, and what problems Bitcoin solves.",
    type: "Beginner",
    url: "https://youtu.be/Q9athzFaFfc?t=83"
  }, {
    title: "Why do we need Bitcoin?",
    description: "This is going to change the way you understand money forever.",
    type: "Beginner",
    url: "https://www.youtube.com/watch?v=Pef22g53zsg"
  }, {
    title: "Am I Too Late To Bitcoin?",
    description: "Find out if you are too late to buy Bitcoin.",
    type: "Beginner",
    url: "https://www.youtubetrimmer.com/view/?v=5893JBg7r9k&start=773&end=1000&loop=0"
  }, {
    title: "Should I Diversify?",
    description: "Find out if you should diversify.",
    type: "Beginner",
    url: "https://www.youtube.com/watch?v=kunaljk_Psc"
  }, {
    title: "The Federal Reserve",
    description: "A Private Central Bank. Not Federal. No Reserves.",
    type: "Central Banking",
    url: "https://cascdr-chads-stay-winning.nyc3.digitaloceanspaces.com/jamie-pro/226249/uploads/1754431069365-4w6Uyc1zns7g_0vF.mp4"
  }, {
    title: "Inflation",
    description: "How inflation affects society.",
    type: "Inflation",
    url: "https://www.youtubetrimmer.com/view/?v=qfeMas1zU6Q&start=2327&end=2512&loop=0"
  }];

  // Articles & Essays
  const articles = [{
    title: "21 Lessons",
    author: "Gigi",
    description: "A personal journey of discovering bitcoin",
    type: "Essay",
    url: "https://21lessons.com"
  }, {
    title: "Deep Dive Bitcoin & Society",
    author: "Gigi",
    description: "Some of the best essays about Bitcoin.",
    type: "Blog",
    url: "http://dergigi.com"
  }, {
    title: "Bitcoin, Freedom and Sovereignty",
    author: "Aleksandar Svetski",
    description: "An article on why moving into Bitcoin is not just an economic imperative, but a moral duty.",
    type: "Article",
    url: "https://svetski.medium.com/fiat-fascism-and-communism-d185e66733b"
  }];

  // Books
  const books = [{
    title: "The Fiat Standard",
    author: "Saifedean Ammous",
    description: "Understand the technology behind the current analog global monetary system.",
    type: "Essential Reading",
    url: "https://saifedean.com/tfs"
  }, {
    title: "The Bitcoin Standard",
    author: "Saifedean Ammous",
    description: "A comprehensive and authoritative exploration of Bitcoin and its place in monetary history.",
    type: "Essential Reading",
    url: "https://saifedean.com/tbs"
  }, {
    title: "Broken Money",
    author: "Lyn Alden",
    description: "Broken Money explores the history of money through the lens of technology. Politics can affect things temporarily and locally, but technology is what drives things forward globally and permanently.",
    type: "Essential Reading",
    url: "https://thesaifhouse.com/bmsample"
  }];

  // Podcasts
  const podcasts = [{
    title: "What Bitcoin Did",
    host: "Peter McCormack",
    description: "Interviews with Bitcoin experts and industry leaders.",
    type: "Interview",
    url: "https://example.com/what-bitcoin-did"
  }, {
    title: "The Bitcoin Podcast",
    host: "Various Hosts",
    description: "Deep dives into Bitcoin technology and economics.",
    type: "Technical",
    url: "https://example.com/bitcoin-podcast"
  }];

  // Mobile Wallets
  const mobileWallets = [{
    title: "Muun Wallet",
    description: "A wallet app that lets you send and receive bitcoin and lightning payments with low fees and high security.",
    type: "iOS/Android",
    url: "https://muun.com/"
  }, {
    title: "Blue Wallet",
    description: "Bitcoin wallet and Lightning wallet for iOS and Android focus on security and UX.",
    type: "iOS/Android",
    url: "https://bluewallet.io"
  }, {
    title: "Nunchuck Wallet",
    description: "Nunchuk is a Bitcoin wallet that offers state-of-the-art security, inheritance planning, and privacy. All in one package.",
    type: "iOS/Android",
    url: "https://nunchuk.io"
  }];

  // Hardware Wallets
  const hardwareWallets = [{
    title: "Coldcard",
    description: "COLDCARD is a hardware wallet that stores your Bitcoin seed words in dual secure elements and avoids being connected to a computer. It supports PSBT, NFC, QR scanner, trick PIN and other features for maximum security and usability.",
    type: "Wallet",
    url: "https://coldcard.com"
  }, {
    title: "Foundation",
    description: "Self custody is finally attainable. Secure your Bitcoin with an unprecedented combination of elegance and ease of use.",
    type: "Wallet",
    url: "https://foundation.xyz"
  }, {
    title: "Bitkey",
    description: "A bitcoin wallet to own your private keys. Bitkey includes an app, hardware wallet, and recovery tools in case you lose your phone, or hardware, or both.",
    type: "Wallet",
    url: "https://bitkey.world"
  }];

  // Exchanges
  const exchanges = [{
    title: "River",
    description: "River is the most trusted place in the U.S. to buy Bitcoin.",
    type: "USA",
    url: "https://river.com/buy-bitcoin"
  }, {
    title: "Bittr",
    description: "Buy Bitcoin directly into your wallet",
    type: "CH/EU",
    url: "https://getbittr.com/"
  }, {
    title: "Bitcoin Well",
    description: "Buy Bitcoin directly into your wallet",
    type: "CANADA",
    url: "https://bitcoinwell.com/buy-bitcoin"
  }, {
    title: "HodlHodl",
    description: "Buy Bitcoin via P2P directly into your wallet",
    type: "Worldwide",
    url: "https://hodlhodl.com"
  }];

  // Living On Bitcoin
  const livingOnBitcoin = [{
    title: "BTC Map",
    description: "Find businesses that accept Bitcoin near you.",
    type: "Map",
    url: "https://btcmap.org/"
  }, 
  {
    title: "Bitcoin Directory",
    description: "Find online shop and local businesses that accept Bitcoin",
    type: "Directory",
    url: "https://bitcoinlistings.org/"
  },
  {
    title: "Bitcoin Directory",
    description: "A comprehensive directory of stores/apps/services that accept Bitcoin.",
    type: "Directory",
    url: "https://lightningnetworkstores.com/"
  },                           
  {
    title: "Bitrefill",
    description: "Bitrefill is a website that allows you to buy gift cards, phone refills, eSIMs, and gaming products with Bitcoin",
    type: "Gift Cards",
    url: "https://www.bitrefill.com"
  },
    {
    title: "Opportunity Costs",
    description: "Convert prices to Bitcoin as you browse the web. Opportunity Cost automatically displays fiat prices in BTC or sats, helping you think in a Bitcoin standard.",
    type: "Tool",
    url: "https://www.opportunitycost.app"
  },
  {
    title: "Travala",
    description: "Book over 3 Million travel products around the world with Bitcoin. Find and book Hotels, Flights, Tours and Activities.",
    type: "Travel",
    url: "https://www.travala.com"
  }
      ];

  // Fun Stuff
  const funStuff = [{
    title: "Lightning Cats",
    description: "Do you want to feed cats using the Bitcoin Lightning Network? Here you can do it! Visit us and experience it for yourself!",
    type: "Cats",
    url: "https://lightningcats.io/"
  }, {
    title: "Lightning Goats",
    description: "The Lightning Goats bitcoin-powered interactive goat feeder is open for business. Send treats using the QR code, zap the herd on Nostr, or send sats to lightning:herd@lightning-goats.com.",
    type: "Goats",
    url: "https://lightning-goats.com/"
  }, {
    title: "Lightning Sheep",
    description: "Yes, you can also feed sheep with bitcoin ;-)",
    type: "Sheep",
    url: "https://www.twitch.tv/tanglesheep"
  }];
  const handleVideoClick = (title: string, url: string) => {
    setVideoModal({
      isOpen: true,
      title,
      url
    });
  };
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };
  const renderSection = (title: string, emoji: string, items: any[], isVideo = false) => <div className="mb-16">
      <h3 className="text-3xl font-bold text-center mb-10 text-foreground">{emoji} {title}</h3>
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, index) => <Card key={index} className="group hover:shadow-[var(--card-hover)] transition-all duration-300 cursor-pointer" onClick={() => isVideo ? handleVideoClick(item.title, item.url) : handleLinkClick(item.url)}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                  {item.title}
                </CardTitle>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                  {item.type}
                </span>
              </div>
              {item.author && <p className="text-sm text-muted-foreground">by {item.author}</p>}
              {item.host && <p className="text-sm text-muted-foreground">Hosted by {item.host}</p>}
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{item.description}</p>
            </CardContent>
          </Card>)}
      </div>
    </div>;
  return <>
      <section id="resources" className="py-20 px-4 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Dive Deeper
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Ready to learn more? These carefully curated resources will guide you towards a deeper understanding.</p>
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
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => document.getElementById('contact')?.scrollIntoView({
              behavior: 'smooth'
            })}>
                Have Questions? Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <VideoModal isOpen={videoModal.isOpen} onClose={() => setVideoModal({
      isOpen: false,
      title: "",
      url: ""
    })} title={videoModal.title} videoUrl={videoModal.url} />
    </>;
};
export default Resources;