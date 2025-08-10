import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Contact = () => {
  return <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Connect with Fellow Bitcoiners
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The best way to learn Bitcoin? Talk to people who live and breathe it. 
            Find your local Bitcoin community or dive into the global conversation online.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--card-hover)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Get in the Game</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Bitcoin Twitter is wild, local meetups are gold, and the rabbit hole goes deep. 
                Jump in wherever feels right and start building connections.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2">Where to Start:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Search "Bitcoin meetup" on Meetup.com for local groups</li>
                    <li>• Follow Bitcoin influencers on Twitter/X for daily insights</li>
                    <li>• Join r/Bitcoin and other Bitcoin subreddits</li>
                    <li>• Check out Bitcoin conferences happening near you</li>
                    <li>• Try Nostr - it's like Twitter but for Bitcoiners</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => window.open('https://primal.net', '_blank')}>
                    Explore Bitcoin Social
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Primal makes it easy to join the Bitcoin conversation on Nostr
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Pro tip: Everyone started somewhere. Ask questions, share what you learn, and enjoy the journey down the rabbit hole.</p>
        </div>
      </div>
    </section>;
};
export default Contact;