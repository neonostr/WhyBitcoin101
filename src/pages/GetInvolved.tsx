import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, MessageCircle, Copy, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";
import NostrContributors from "@/components/NostrContributors";

const Support = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 safe-area-inset">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to WhyBitcoin101
          </Link>
    <div className="max-w-6xl mx-auto">
  <h1
    id="how-you-can-help"
    className="text-4xl md:text-5xl font-bold text-foreground mb-4"
  >
    How You Can Help
  </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-6">
              For bitcoiners who want to support Bitcoin education and help newcomers
              understand why Bitcoin matters.
            </p>
          </div>

          {/* Mission + Nostr Statement side-by-side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* Mission Statement */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-border flex flex-col h-full">
              <div>
                <p className="text-2xl font-semibold text-foreground mb-4">
                  We’re on a mission to orange‑pill the world - not with hype, but with truth,
                  connection, and action.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every conversation, every share, every spark of understanding moves us
                  closer to a future where Bitcoin empowers everyone.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  If you’re a Bitcoiner ready to build, educate, and amplify the signal,
                  this is your place to plug in.
                </p>
              </div>
              <div className="text-sm text-muted-foreground italic border-t border-border pt-3 mt-4 md:mt-auto">
                Landed here first?{" "}
                <Link
                  to="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Visit the educational front
                </Link>{" "}
                to see how we share Bitcoin with the world.
              </div>
            </div>

            {/* Join Nostr Statement */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-border flex flex-col h-full">
              <div className="flex-grow">
                <p className="text-2xl font-semibold text-foreground mb-4">
                  Why Bitcoiners Are Moving To Nostr
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  To build a free and open future, we must coordinate on
                  <strong> permissionless, censorship‑resistant rails</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Nostr is open‑source, decentralized, and beyond the control of any single
                  party - because everyone controls their own keys, our messages and
                  resources can't be altered or taken down.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  By joining Nostr, you help ensure that Bitcoin education and discussions
                  about the future of Bitcoin happen in a place that is permanent,
                  censorship‑free, and safe from manipulation.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open("https://primal.net", "_blank")}
                className="w-full"
              >
                Join Nostr
              </Button>
            </div>
          </div>
        </div>

        {/* Support Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Bitcoin Education Profile & Hub */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5" />
                Turning Hashtags Into Signal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The <strong>WhyBitcoin101</strong> Nostr profile serves as a signal layer of our mission. As conversations and resources about Bitcoin flow into Nostr, this profile curates and amplifies the strongest insights and explanations surfaced through our hashtags. Beyond that, it helps coordinate community efforts, allowing us to achieve more together with less wasted energy. In doing so, scattered voices become a unified signal - one that emphasizes why Bitcoin matters, not just how to buy it.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://primal.net/p/npub1uuhsm53er3xxkq90up6gt2wg5vhaz0aenlw4m4rls04thf24heuq8vf4yh",
                    "_blank"
                  )
                }
                className="w-full"
              >
                Connect on Nostr
              </Button>
            </CardContent>
          </Card>

          {/* Share Content */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Share2 className="h-5 w-5" />
                Share Great Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Found something that helps people understand Bitcoin better? Post it or
                repost it on Nostr with{" "}
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101</span>. All
                tagged posts help build a growing public library of Bitcoin education that
                we can all access and use to help others learn. We’ll also curate and share
                some of these on the WhyBitcoin101 profile and website, so together we
                create both a complete hashtag archive and a focused hub of the most useful
                content.
              </p>
              <p className="text-sm text-muted-foreground">
                Use the hashtag: <strong>#whybitcoin101</strong>
              </p>
            </CardContent>
          </Card>

          {/* Community Q&A */}
          <Card className="border-primary/20 col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5" />
                Help Answer Questions on Nostr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Here's the magic: When someone asks a Bitcoin related question through the
                website, it's published on Nostr via a randomly generated key with hashtags{" "}
                <span className="font-mono bg-muted px-1 rounded">#asknostr</span> and{" "}
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101faq</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This means the entire Bitcoin community on Nostr can see the question and
                help answer it together. The person asking gets a link they can open at any
                time to check for answers to their question (spam filtered).{" "}
                <a
                  href="https://whybitcoin101.com/question/npub1384a86kplad450s7kzz2gen6pyfk3f7f3fme4zkyuf2mnyzdufwswlae8j"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  See Example
                </a>
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This process creates a large, public Bitcoin FAQ that anyone can access and
                reuse for educational projects or in any way they find useful. On top of
                that, we curate and refine the content for the WhyBitcoin101 hub -
                building a polished, ever‑growing knowledge base that’s easy to explore and
                share.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                So from now on, whenever you want to help others understanding Bitcoin, look for{" "}
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101-faq</span>{" "}
                on Nostr, jump in, and share your knowledge. Every answer helps newcomers
                understand Bitcoin better - and for the first time, thanks to the power of
                Nostr, we can truly educate together as one global community.
              </p>
            </CardContent>
          </Card>

          {/* Copy & Improve Content - NEW CARD */}
<Card className="border-primary/20 col-span-1 md:col-span-2">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-foreground">
      <Copy className="h-5 w-5" />
      Copy & Improve Content
    </CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground leading-relaxed mb-4">
      Activate hidden edit mode by clicking the Connect button 5 times within 5 seconds on the main page. This reveals copy buttons on every text section and resource across the site. Each button includes a unique hashtag and copies the content with instructions and a template for your improvements. Post to Nostr with the hashtag - the copied content plus your suggested improvements to contribute to building the world's best Bitcoin education content. Together, we're growing a public knowledge base that serves all of humanity - and this coordinated effort ensures we always have the best content on our educational front to create the ultimate orange pill.
    </p>
  </CardContent>
</Card>


          

          {/* Spread Awareness */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Share2 className="h-5 w-5" />
                Spread Awareness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Create stamps, flyers, or share the website with others to bring awareness
                to this educational project. Every person who discovers Bitcoin through
                education makes the network stronger.
              </p>
              <p className="text-sm text-muted-foreground">Share: whybitcoin101.com</p>
            </CardContent>
          </Card>

          {/* Donate */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Heart className="h-5 w-5" />
                Support with Sats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Fuel the mission by contributing sats. Your support helps us share Bitcoin's why with the world - funding outreach, maintaining resources, and creating better education for all.
              </p>
              <Button
                variant="outline"
                onClick={() => setDonationModalOpen(true)}
                className="w-full flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                Donate Sats
              </Button>
            </CardContent>
          </Card>


          {/* Full-Width Call to Action */}
          <div className="col-span-1 md:col-span-2">
            <Card className="border-primary/20 col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5" />
                  Add Your Spark to the Orange Pill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                 Every small action matters.
                  
                 
                    When you share great educational content, help answer questions on Nostr, or add your own ideas and resources, it becomes a piece of the bigger picture.
                 
                  
                  
                    On Nostr these pieces connect. They spread, get repeated, improved, and remembered. What starts as one spark from you can echo into a lasting signal for others.
                  
                  
                  
                    WhyBitcoin101 is part of this flow too. Not above, not separate — just another tool, another hand carrying the message. It gathers what we together create and places it where more people can find it.
                
                  
                 
                    Together we build a library of clear answers. A place to point the next curious mind - a living orange pill that keeps evolving, gathering sparks of change, one curious mind at a time.
                  
                  
               
                    This is not only about donating sats. It is about contributing your voice, your time, your experience. Because each effort adds to the strength of the whole.
             
                  
                 
                    Get involved. Shape the signal. <strong>Help the world understand why Bitcoin matters.</strong>
                
                </div>
                
                <div className="flex justify-center mt-6">
                  <Button
                    variant="outline"
                    onClick={() => {
                      const section = document.getElementById("how-you-can-help");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="px-6"
                  >
                    Get Involved Today
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="col-span-1 md:col-span-2 mt-8">
          <NostrContributors />
        </div>
      </div>
      
      <DonationModal 
        isOpen={donationModalOpen} 
        onClose={() => setDonationModalOpen(false)} 
      />
    </div>
  );
};

export default Support;