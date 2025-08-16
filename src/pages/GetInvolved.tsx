import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, MessageCircle, Copy } from "lucide-react";
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

          {/* Mission + Nostr Statement */}
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
          {/* ... existing cards ... */}

          {/* New Final Section */}
          <Card className="border-primary/30 col-span-1 md:col-span-2 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-center text-foreground">
                Get Involved – Help Shape the Signal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-muted-foreground leading-relaxed max-w-3xl mx-auto space-y-4">
                <p>Every small action matters.</p>
                <p>
                  When you share great educational content, help answer questions on Nostr,
                  or add your own ideas and resources, it becomes a piece of the bigger picture.
                </p>
                <p>
                  On Nostr these pieces connect. They spread, get repeated, improved, and remembered.  
                  What starts as one spark from you can echo into a lasting signal for others.
                </p>
                <p>
                  WhyBitcoin101 is part of this flow too. Not above, not separate — just another tool,  
                  another hand carrying the message. It gathers what we together create and places it  
                  where more people can find it.
                </p>
                <p>
                  Together we build a library of clear answers.  
                  A place to point the next curious mind - a living orange pill that keeps evolving,  
                  gathering sparks of change, one curious mind at a time.
                </p>
                <p>
                  This is not only about donating sats. It is about contributing your voice, your time,  
                  your experience. Because each effort adds to the strength of the whole.
                </p>
                <p>
                  <strong>Get involved. Shape the signal. Help the world understand why Bitcoin matters.</strong>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Full-Width Call to Action */}
          <div className="col-span-1 md:col-span-2">
            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-foreground">
                  United for Bitcoin Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-center mb-6 max-w-2xl mx-auto">
                  When people grasp the why behind Bitcoin - how broken money fuels unaffordable housing, 
                  erodes savings, and kills long‑term thinking - everything changes. They stop chasing price hype 
                  and start building for generations. They reclaim their right to fair money, strong families, 
                  and a society where human values matter more than quarterly profits. Together, we create the 
                  ultimate orange pill: clear, powerful education that transforms worldviews and makes Bitcoin 
                  the obvious solution. <strong>This is how we leave behind fiat’s decay and step into a sound money future.</strong>
                </p>
                <div className="flex justify-center">
                  <Button
                    variant="default"
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