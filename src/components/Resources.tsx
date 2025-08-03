import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const books = [
    {
      title: "The Bitcoin Standard",
      author: "Saifedean Ammous",
      description: "The definitive book on Bitcoin's economic properties and monetary history.",
      type: "Essential Reading"
    },
    {
      title: "Inventing Bitcoin",
      author: "Yan Pritzker",
      description: "A clear, technical introduction to how Bitcoin actually works.",
      type: "Technical Guide"
    },
    {
      title: "The Bullish Case for Bitcoin",
      author: "Vijay Boyapati",
      description: "A compelling argument for Bitcoin as a store of value.",
      type: "Investment Perspective"
    }
  ];

  const websites = [
    {
      title: "Bitcoin.org",
      description: "The original Bitcoin website with comprehensive documentation.",
      url: "bitcoin.org",
      type: "Official"
    },
    {
      title: "River Learn",
      description: "Educational articles from beginner to advanced topics.",
      url: "river.com/learn",
      type: "Education"
    },
    {
      title: "What Is Bitcoin?",
      description: "Interactive guide to understanding Bitcoin fundamentals.",
      url: "whatisbitcoin.com",
      type: "Interactive"
    }
  ];

  const podcasts = [
    {
      title: "What Bitcoin Did",
      host: "Peter McCormack",
      description: "Interviews with Bitcoin experts and industry leaders.",
      type: "Interview"
    },
    {
      title: "The Bitcoin Podcast",
      host: "Various Hosts",
      description: "Deep dives into Bitcoin technology and economics.",
      type: "Technical"
    },
    {
      title: "Tales from the Crypt",
      host: "Marty Bent",
      description: "Bitcoin news and cultural commentary.",
      type: "News & Culture"
    }
  ];

  return (
    <section id="resources" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Dive Deeper
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to learn more? These carefully curated resources will take you from curious beginner to informed enthusiast.
          </p>
        </div>

        {/* Books Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-foreground">📚 Essential Books</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {books.map((book, index) => (
              <Card key={index} className="group hover:shadow-[var(--card-hover)] transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {book.title}
                    </CardTitle>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {book.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{book.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Websites Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-foreground">🌐 Trusted Websites</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {websites.map((site, index) => (
              <Card key={index} className="group hover:shadow-[var(--card-hover)] transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {site.title}
                    </CardTitle>
                    <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                      {site.type}
                    </span>
                  </div>
                  <p className="text-sm text-primary">{site.url}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{site.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Podcasts Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-foreground">🎧 Must-Listen Podcasts</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {podcasts.map((podcast, index) => (
              <Card key={index} className="group hover:shadow-[var(--card-hover)] transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                      {podcast.title}
                    </CardTitle>
                    <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                      {podcast.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">Hosted by {podcast.host}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{podcast.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-bitcoin-orange/5 border border-primary/10">
            <h3 className="text-2xl font-bold mb-4 text-foreground">Start Your Journey</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Take your time exploring these resources. Bitcoin is a marathon, not a sprint.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Have Questions? Get in Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;