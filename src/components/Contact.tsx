import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return <>
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Join the Revolution</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Don't go down the Bitcoin rabbit hole alone. Connect with thousands of passionate bitcoiners who are changing the world.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
            <Card className="border-primary/20 shadow-[var(--card-hover)] hover-scale group">
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">🤝 Find Local Bitcoin Meetups</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Meet real bitcoiners in your city! Search for meetups on{" "}
                  <a href="https://meetup.com" target="_blank" rel="noopener noreferrer" className="story-link text-primary font-semibold">
                    Meetup.com
                  </a>
                  {" "}and discover a community of people who get it. Free pizza, great conversations, and lifelong connections guaranteed.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)] hover-scale group">
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">🚀 Start Your Own Group</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  No Bitcoin community nearby? Be the change! Start with just 2-3 curious friends. Some of today's biggest Bitcoin communities started in someone's living room. Your city could be next.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)] hover-scale group">
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">🎯 Experience Bitcoin Conferences</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ready to level up? Bitcoin conferences are where legends are made. Network with industry leaders, discover cutting-edge projects, and return home inspired to orange-pill everyone you know.
                </p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 shadow-[var(--card-hover)] hover-scale group">
              <CardHeader>
                <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">💬 Join the Global Conversation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  24/7 discussions, breaking news, and the best Bitcoin memes. Connect instantly with 100k+ bitcoiners worldwide who never sleep and always deliver the hottest takes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>

    <section className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-bitcoin-orange/5"></div>
      <div className="container mx-auto relative">
        <div className="text-center animate-fade-in">
          <Card className="border-primary/20 shadow-[var(--card-hover)] max-w-2xl mx-auto hover-scale bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="p-8 relative">
              <div className="absolute top-4 right-4 pulse">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-3xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-bitcoin-orange bg-clip-text text-transparent">Your Tribe Awaits</h3>
              <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                Join <span className="text-primary font-bold">50,000+</span> bitcoiners on the fastest-growing Bitcoin social network. 
                Real conversations. Real people. Real alpha. <span className="text-bitcoin-orange font-semibold">No corporate overlords.</span>
              </p>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-bitcoin-orange hover:from-primary/90 hover:to-bitcoin-orange/90 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105" 
                onClick={() => window.open('https://primal.net', '_blank')}
              >
                🚀 Join the Movement Now
              </Button>
              <p className="text-sm text-muted-foreground mt-4 opacity-75">Free forever. No KYC. Pure Bitcoin.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center animate-fade-in">
          <p className="text-muted-foreground italic">Remember: We're early, but we're not alone. 🧡</p>
        </div>
      </div>
    </section>
  </>;
};

export default Contact;