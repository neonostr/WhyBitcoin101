import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Heart, Share2, MessageCircle, Gift } from "lucide-react";
import { Link } from "react-router-dom";
const Support = () => {
  return <div className="min-h-screen bg-gradient-to-br from-background to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to WhyBitcoin101
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How You Can Help
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mb-6">
            For bitcoiners who want to support Bitcoin education and help newcomers understand why Bitcoin matters.
          </p>

          {/* Mission + Nostr Statement side-by-side on large screens */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl">
            {/* Mission Statement */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-border">
              <p className="text-2xl font-semibold text-foreground mb-4">
                We’re on a mission to orange‑pill the world — not with hype, but with truth,
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
              <p className="text-sm text-muted-foreground italic border-t border-border pt-3">
                Landed here first?{" "}
                <Link to="/" target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                  Visit the educational front
                </Link>{" "}
                to see how we share Bitcoin with the world.
              </p>
            </div>

            {/* Join Nostr Statement */}
            <div className="bg-white rounded-lg p-8 shadow-md border border-border">
              <p className="text-2xl font-semibold text-foreground mb-4">
                Why Bitcoiners Are Moving To Nostr
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To build a free and open future, we must coordinate on
                <strong> permissionless, censorship‑resistant rails</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nostr is open‑source, decentralized, and beyond the control of any single
                party — no one can manipulate, delete, or silence our work together.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                By joining us on Nostr, you help ensure that the important discussions
                and coordination for orange‑pilling the world happen in a place where
                they can’t be taken down.
              </p>
              <Button variant="outline" onClick={() => window.open("https://primal.net/p/npub1whybitcoin101edu", "_blank")} className="w-full">
                Get On Nostr
              </Button>
            </div>
          </div>
        </div>

        {/* Support Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Follow on Nostr */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <MessageCircle className="h-5 w-5" />
                Follow Us on Nostr
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Nostr profile is exclusively used to coordinate educational content.
                Get updates about new educational projects and resources that help you
                educate others about Bitcoin.
              </p>
              <Button variant="outline" onClick={() => window.open("https://primal.net/p/npub1whybitcoin101edu", "_blank")} className="w-full">
                Follow on Nostr
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
                Found great educational content? Link or mention us on Nostr so we get
                notified. We're always looking for quality resources to help newcomers
                understand Bitcoin.
              </p>
              <p className="text-sm text-muted-foreground">
                Tag us: @whybitcoin101 on Nostr
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
                Here's the magic: When someone asks a Bitcoin question through our
                website, it's published on Nostr via a randomly generated key with
                hashtags{" "}
                <span className="font-mono bg-muted px-1 rounded">#asknostr</span> and{" "}
                <span className="font-mono bg-muted px-1 rounded">#whybitcoin101</span>.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This means the entire Bitcoin community on Nostr can see the question
                and help answer it together. The person asking gets a link to follow the
                conversation, and we're building an open collection of Bitcoin FAQ that
                everyone can use.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                The best answers get added to our FAQ section, creating a growing
                resource for Bitcoin education. It's the power of Nostr combined with
                the Bitcoin community's desire to help newcomers.
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
                Create stamps, flyers, or share the website with others to bring
                awareness to this educational project. Every person who discovers
                Bitcoin through education makes the network stronger.
              </p>
              <p className="text-sm text-muted-foreground">
                Share: whybitcoin101.com
              </p>
            </CardContent>
          </Card>

          {/* Donate */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Gift className="h-5 w-5" />
                Support with Sats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">If you'd like to support this project financially, donations help to market, maintain and improve the educational resources.</p>
              <Button variant="outline" onClick={() => window.open("bitcoin:bc1qexample", "_blank")} className="w-full">
                <Heart className="h-4 w-4 mr-2" />
                Donate Sats
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Message */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground leading-relaxed">
            Together, we're building a more educated Bitcoin community. Every
            contribution, whether it's time, content, or sats, helps newcomers
            understand why Bitcoin is important for a freer future.
          </p>
        </div>
      </div>
    </div>;
};
export default Support;