import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const Contact = () => {
  return <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Connect &amp; Learn Together</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Bitcoin is best learned through community. Connect with local bitcoiners, attend meetups, and join the global conversation.</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
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

          <div className="text-center">
            <Card className="border-primary/20 shadow-[var(--card-hover)] max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Find Your People</h3>
                <p className="text-muted-foreground mb-6">Bitcoin is more than just technology – it's a growing community of people from all walks of life. Whether you're just starting to learn or you’re a seasoned bitcoiner, finding others to share ideas with can make all the difference.</p>
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => window.open('https://primal.net', '_blank')}>Take Me There</Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">Remember: Take your time, stay curious, and always do your own research to make informed decisions.</p>
        </div>
      </div>
    </section>;
};
export default Contact;