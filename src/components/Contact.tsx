import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return (
    <>
      {/* First Section — Connect & Learn */}
      <section
        id="contact"
        className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5"
      >
        <div className="container mx-auto">
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
              <Card className="border-primary/20 shadow-[var(--card-hover)]">
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

              <Card className="border-primary/20 shadow-[var(--card-hover)]">
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

              <Card className="border-primary/20 shadow-[var(--card-hover)]">
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

              <Card className="border-primary/20 shadow-[var(--card-hover)]">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">
                    Join Online Communities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Connect with thousands of bitcoiners worldwide. The Bitcoin
                    community is known for being welcoming and educational -
                    perfect for beginners and experts alike.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Second Section — From Bitcoin to a Freer World */}
      <section className="py-20 px-4 bg-gradient-to-br from-background to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              From Bitcoin to a Freer World
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
          <div className="bg-gradient-to-br from-bitcoin-orange/10 to-primary/10 rounded-xl p-8 md:p-10 text-center max-w-3xl mx-auto border border-primary/10 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Where Change Begins
            </h3>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Join a community that values independence, transparency, and
              innovation. Together, we're not just imagining a freer world —
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

          <div className="mt-16 text-center">
            <p className="text-muted-foreground">
              Remember: Take your time, stay curious, and always do your own
              research to make informed decisions.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;