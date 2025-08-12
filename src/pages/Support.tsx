import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, MessageCircle, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import DonationModal from "@/components/DonationModal";
import NostrContributors from "@/components/NostrContributors";

const Support = () => {
  const [donationModalOpen, setDonationModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
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
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Bitcoin Education Profile & Hub */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5" />
                Bitcoin Education Profile & Hub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The <strong>@WhyBitcoin101</strong> profile shares valuable Bitcoin
                education resources and coordinates efforts that advance our shared
                mission. It focuses on finding and sharing the best tools, guides, and
                strategies that help people confidently teach others about Bitcoin.
                Keeping these resources open and accessible ensures that education about
                Bitcoin's future happens in the right place - free from censorship or
                manipulation.
              </p>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    "https://primal.net/p/nprofile1qqsqnlfl9ztzxxtzp674lr7w2pjqdrw3lz73dhwvspx0zegn0j4hgxqglh5xx",
                    "_blank"
                  )
                }
                className="w-full"
              >
                Visit @WhyBitcoin101
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
          <Card className="border-primary/20 md:col-span-2">
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
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101-faq</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This means the entire Bitcoin community on Nostr can see the question and
                help answer it together. The person asking gets a link they can open at any
                time to check for answers to their question (spam filtered).{" "}
                <a
                  href="https://example.com"
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
                that, we curate and refine the content for the WhyBitcoin101 hub —
                building a polished, ever‑growing knowledge base that’s easy to explore and
                share.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                So from now on, whenever you want to help educate others, look for{" "}
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101-faq</span>{" "}
                on Nostr, jump in, and share your knowledge. Every answer helps newcomers
                understand Bitcoin better - and for the first time, thanks to the power of
                Nostr, we can truly educate together as one global community.
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
                If you'd like to support this project financially, donations help to
                market, maintain and improve the educational resources.
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

          {/* Contributors Section */}
          <div className="col-span-2 mt-8">
            <NostrContributors />
          </div>

          {/* Full-Width Call to Action */}
          <div className="col-span-2">
            <Card className="border-primary/40 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center text-foreground">
                  United for Bitcoin Education
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-center mb-6 max-w-2xl mx-auto">
                  Bitcoin needs more than code — it needs people, voices, and action. Every flyer handed out, post shared,
                  and question answered helps build a stronger foundation for future Bitcoiners.
                  Whether you design, share, donate, or simply guide one person to Bitcoin, <strong>you are part of this mission</strong>.
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
      </div>
      
      <DonationModal 
        isOpen={donationModalOpen} 
        onClose={() => setDonationModalOpen(false)} 
      />
    </div>
  );
};

export default Support;