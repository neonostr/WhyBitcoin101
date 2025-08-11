import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return <>
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Connect & Learn Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Bitcoin is best learned through community. Connect with local bitcoiners, attend meetups, and join the global conversation.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-primary/20 shadow-[var(--card-hover)]">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Find Local Bitcoin Meetups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Search for Bitcoin meetups in your area on{" "}
                  <a href="https://meetup.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground underline decoration-1 underline-offset-2 transition-colors">
                    Meetup.com
                  </a>
                  . These regular gatherings are perfect for meeting like-minded people, asking questions, and learning from experienced bitcoiners in person.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)]">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Start a Local Study Group</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  If there's no Bitcoin meetup in your area, consider starting one! Many successful Bitcoin communities began with just a few curious people meeting regularly to learn together.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)]">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Attend Bitcoin Conferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Bitcoin conferences happen globally throughout the year. These events feature expert speakers, networking opportunities, and the latest developments in the Bitcoin space.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)]">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Join Online Communities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with thousands of bitcoiners worldwide. The Bitcoin community is known for being welcoming and educational - perfect for beginners and experts alike.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <section className="py-24 px-4 bg-gradient-to-br from-background via-primary/5 to-secondary/10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-foreground leading-tight">
            From Bitcoin to a 
            <span className="bg-gradient-to-r from-primary to-bitcoin-orange bg-clip-text text-transparent"> Freer World</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            The shift has already begun — not in boardrooms or behind closed doors, 
            but in the hands of everyday people. Around the world, individuals are 
            claiming the right to own their time, their work, and their privacy. 
            Together, we're building systems that remain in the hands of the many, 
            never the few. This is more than money. It's a grassroots movement for 
            self‑sovereignty and a fairer future.
          </p>
        </div>

        {/* Enhanced CTA Block */}
        <div className="relative max-w-4xl mx-auto">
          {/* Glow effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-bitcoin-orange/20 to-primary/20 rounded-3xl blur-xl"></div>
          
          <div className="relative bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm border border-border/50 rounded-3xl p-12 text-center shadow-2xl">
            <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Where Change Begins
            </h3>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join a community that values independence, transparency, and innovation. 
              Together, we're not just imagining a freer world — we're making it real, 
              step by step, connection by connection.
            </p>
            
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-bitcoin-orange text-primary-foreground hover:from-primary/90 hover:to-bitcoin-orange/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg px-12 py-6 rounded-xl font-semibold"
              onClick={() => window.open('https://primal.net', '_blank')}
            >
              ✨ Be Part of It
            </Button>
            
            {/* Decorative elements */}
            <div className="flex justify-center items-center gap-8 mt-12 opacity-60">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
              <div className="text-sm text-muted-foreground font-medium">Join thousands worldwide</div>
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1"></div>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
            Remember: Take your time, stay curious, and always do your own research 
            to make informed decisions.
          </p>
        </div>
      </div>
    </section>
  </>;
};

export default Contact;