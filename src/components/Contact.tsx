import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Contact = () => {
  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-bitcoin-orange/5">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Ready to Learn More?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            After exploring the resources, if you still have questions or want personalized guidance, 
            I'm here to help you on your Bitcoin journey.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <Card className="border-primary/20 shadow-[var(--card-hover)]">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-foreground">Let's Connect</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-muted-foreground leading-relaxed">
                Bitcoin can seem overwhelming at first, but it doesn't have to be. Whether you're wondering about 
                getting started, have technical questions, or want to discuss the bigger picture, I'm here to help.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold text-foreground mb-2">What I Can Help With:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 text-left">
                    <li>• Getting started with your first Bitcoin purchase</li>
                    <li>• Choosing the right wallet for your needs</li>
                    <li>• Understanding Bitcoin's technology and economics</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => window.open('mailto:contact@example.com?subject=Bitcoin Questions', '_blank')}
                  >
                    Send Me an Email
                  </Button>
                  
                  <p className="text-sm text-muted-foreground">
                    Or reach out through your preferred platform - I'm always happy to chat about Bitcoin!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Remember: Take your time, do your own research, and never invest more than you can afford to lose.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;