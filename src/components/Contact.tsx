import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Contact = () => {
  return <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Join the Bitcoin Community
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Bitcoin is more than just money - it's a global community of people working toward a better financial future. 
            Connect with fellow Bitcoiners to learn, share experiences, and build lasting relationships.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--card-hover)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Connect & Learn Together</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                The Bitcoin community is welcoming and eager to help newcomers. Whether you prefer meeting in person 
                or joining online discussions, there are countless ways to connect and accelerate your learning.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2">Ways to Connect:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Find local Bitcoin meetups on Meetup.com</li>
                    <li>• Join Twitter/X Bitcoin conversations and follow thought leaders</li>
                    <li>• Participate in Bitcoin Reddit communities and forums</li>
                    <li>• Attend Bitcoin conferences and events in your area</li>
                    <li>• Connect with Bitcoiners on Nostr - the decentralized social network</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => window.open('https://primal.net', '_blank')}>
                    Join the Community
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Start with Primal - a user-friendly gateway to the global Bitcoin community on Nostr
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Remember: The Bitcoin community values learning, sharing knowledge, and helping others. Don't hesitate to ask questions - everyone was new once!</p>
        </div>
      </div>
    </section>;
};
export default Contact;