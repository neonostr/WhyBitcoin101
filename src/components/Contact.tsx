import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import CopyButton from "./CopyButton";

const Contact = () => {
  return (
    <>
      {/* First Section — Connect & Learn */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5"
      >
        <div className="container mx-auto relative">
          <CopyButton text="Connect & Learn Together - Bitcoin is best learned through community. Connect with local bitcoiners, attend meetups, and join the global conversation." hashtag="#whybitcoin101connectlearn" />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Connect & Learn Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Bitcoin is best learned through community. Connect with local
              bitcoiners, attend meetups, and join the global conversation.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-primary/20 shadow-[var(--card-hover)] relative">
                <CopyButton text="Find Local Bitcoin Meetups - Search for Bitcoin meetups in your area on Meetup.com. These regular gatherings are perfect for meeting like-minded people, asking questions, and learning from experienced bitcoiners in person." hashtag="#whybitcoin101localmeetups" />
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Find Local Bitcoin Meetups
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Search for Bitcoin meetups in your area on{" "}
                    <a
                      href="https://meetup.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground underline decoration-1 underline-offset-2 transition-colors"
                    >
                      Meetup.com
                    </a>
                    . These regular gatherings are perfect for meeting
                    like-minded people, asking questions, and learning from
                    experienced bitcoiners in person.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-[var(--card-hover)] relative">
                <CopyButton text="Start a Local Study Group - If there's no Bitcoin meetup in your area, consider starting one! Many successful Bitcoin communities began with just a few curious people meeting regularly to learn together." hashtag="#whybitcoin101studygroup" />
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Start a Local Study Group
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    If there's no Bitcoin meetup in your area, consider starting
                    one! Many successful Bitcoin communities began with just a
                    few curious people meeting regularly to learn together.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-[var(--card-hover)] relative">
                <CopyButton text="Attend Bitcoin Conferences - Bitcoin conferences happen globally throughout the year. These events feature expert speakers, networking opportunities, and the latest developments in the Bitcoin space." hashtag="#whybitcoin101conferences" />
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Attend Bitcoin Conferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Bitcoin conferences happen globally throughout the year.
                    These events feature expert speakers, networking
                    opportunities, and the latest developments in the Bitcoin
                    space.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 shadow-[var(--card-hover)] relative">
                <CopyButton text="Join a Bitcoin Walk - The Bitcoin Walk is a community walk where people meet, chat, and learn about Bitcoin while enjoying the outdoors. It's a friendly way to connect, get moving, and share ideas - no experience needed." hashtag="#whybitcoin101bitcoinwalk" />
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                   Join a Bitcoin Walk
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    <a
                      href="https://bitcoinwalk.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground underline decoration-1 underline-offset-2 transition-colors"
                    >
                    The Bitcoin Walk</a> is a community walk where people meet, chat, and learn about Bitcoin while enjoying the outdoors. It’s a friendly way to connect, get moving, and share ideas - no experience needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section — From Bitcoin to a Freer World */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto relative">
          <CopyButton text="From Bitcoin to a Freer World - The shift has already begun - not in boardrooms or behind closed doors, but in the hands of everyday people. Around the world, individuals are claiming the right to own their time, their work, and their privacy. Together, we're building systems that remain in the hands of the many, never the few. This is more than money. It's a grassroots movement for self‑sovereignty and a fairer future." hashtag="#whybitcoin101freerworld" />
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              A Movement, Not Just Money
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              The shift has already begun - not in boardrooms or behind closed
              doors, but in the hands of everyday people. Around the world,
              individuals are claiming the right to own their time, their work,
              and their privacy. Together, we're building systems that remain in
              the hands of the many, never the few. This is more than money.
              It's a grassroots movement for self‑sovereignty and a fairer
              future.
            </p>
          </div>

          {/* CTA Block */}
          <div className="bg-gradient-to-br from-bitcoin-orange/10 to-primary/10 rounded-xl p-8 md:p-10 text-center max-w-3xl mx-auto border border-primary/10 shadow-lg relative">
            <CopyButton text="People Building the Future - Join a community that values independence, transparency, and innovation. Together, we're not just imagining a freer world - we're making it real, step by step, connection by connection." hashtag="#whybitcoin101buildingfuture" />
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              People Building the Future
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Join a community that values independence, transparency, and
              innovation. Together, we're not just imagining a freer world -
              we're making it real, step by step, connection by connection.
            </p>
            <Button
              size="lg"
              className="bg-bitcoin-orange hover:bg-bitcoin-orange/90 text-white font-medium rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => window.open("https://primal.net", "_blank")}
            >
              ✨ Be Part of It
            </Button>
          </div>

          <div className="mt-16 text-center relative">
            <CopyButton text="Remember: Take your time, stay curious, and always do your own research to make informed decisions. Already a bitcoiner? Learn how you can help." hashtag="#whybitcoin101footerreminder" />
            <p className="text-muted-foreground mb-4">
              Remember: Take your time, stay curious, and always do your own
              research to make informed decisions.
            </p>
            <div className="border-t border-muted-foreground/20 pt-4">
            <Link 
              to="/get-involved" 
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
            >
              Already a bitcoiner? Learn how you can help →
            </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;