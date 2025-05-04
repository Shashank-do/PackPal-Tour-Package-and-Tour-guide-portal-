
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <>
      <Navbar />
      
      <Hero 
        title="Discover Your Next Adventure"
        subtitle="Explore the world with our expertly crafted travel packages and create memories that last a lifetime."
        imageSrc="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1080&auto=format&fit=crop"
        ctaLink="/destinations"
        ctaText="Explore Destinations"
      />
      
      <FeaturedDestinations />
      
      <section className="section-padding bg-travel-light">
        <div className="travel-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-md mb-6 text-gradient">Why Travel With PackPal?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="heading-sm mb-2 text-travel-teal">Expert Local Guides</h3>
                  <p className="text-gray-600">
                    Our guides are passionate locals who know hidden gems and authentic experiences 
                    beyond the typical tourist spots.
                  </p>
                </div>
                <div>
                  <h3 className="heading-sm mb-2 text-travel-teal">Tailored Experiences</h3>
                  <p className="text-gray-600">
                    Each journey is crafted to balance iconic highlights with personal discoveries, 
                    allowing for both structure and serendipity.
                  </p>
                </div>
                <div>
                  <h3 className="heading-sm mb-2 text-travel-teal">Sustainable Travel</h3>
                  <p className="text-gray-600">
                    We're committed to minimizing environmental impact while maximizing positive 
                    contributions to local communities.
                  </p>
                </div>
                <div>
                  <Link to="/tours-packages">
                    <Button variant="outline" className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white">
                      Explore Our Tour Packages
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?q=80&w=1080&auto=format&fit=crop" 
                alt="Travel experience" 
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg max-w-[200px]">
                <p className="text-travel-blue font-bold">98%</p>
                <p className="text-sm text-gray-600">Customer satisfaction based on 10,000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="relative py-20">
        <div className="absolute inset-0 bg-travel-blue/90">
          <img 
            src="https://images.unsplash.com/photo-1528543006449-b5b1688383d8?q=80&w=1080&auto=format&fit=crop" 
            alt="Mountains background"
            className="w-full h-full object-cover mix-blend-overlay opacity-20"
          />
        </div>
        <div className="travel-container relative z-10 text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of happy travelers who have explored the world with PackPal.
            Your journey begins here.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/tours-packages">
              <Button className="bg-white text-travel-blue hover:bg-gray-100 min-w-40">
                Browse Packages
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-travel-teal hover:bg-travel-teal/90 text-white min-w-40">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default Index;
