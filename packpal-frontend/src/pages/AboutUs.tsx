
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <>
      <Navbar />
      
      <div className="bg-travel-blue/10 py-16">
        <div className="travel-container">
          <h1 className="heading-lg mb-2 text-center text-gradient">About PackPal</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Your trusted travel companion for exploring the world's most amazing destinations.
          </p>
        </div>
      </div>
      
      <section className="section-padding">
        <div className="travel-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="heading-md mb-6 text-travel-blue">Our Story</h2>
              <p className="text-gray-700 mb-6">
                PackPal was born out of a passion for travel and a desire to create meaningful experiences 
                for travelers around the world. Founded in 2015 by a team of avid explorers, 
                we've spent years crafting journeys that combine adventure, cultural immersion, 
                and authentic experiences.
              </p>
              <p className="text-gray-700">
                Our mission is simple: to connect travelers with transformative experiences that 
                create lifelong memories. We believe that travel has the power to change lives, 
                broaden perspectives, and foster connections between cultures.
              </p>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?q=80&w=1080&auto=format&fit=crop" 
                alt="Team exploring" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-travel-light">
        <div className="travel-container">
          <h2 className="heading-md mb-12 text-center text-travel-blue">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-travel-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-travel-blue">🌍</span>
              </div>
              <h3 className="heading-sm mb-4 text-travel-blue">Sustainable Tourism</h3>
              <p className="text-gray-600">
                We're committed to minimizing our environmental footprint and supporting local communities 
                through ethical and sustainable travel practices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-travel-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-travel-blue">🤝</span>
              </div>
              <h3 className="heading-sm mb-4 text-travel-blue">Cultural Respect</h3>
              <p className="text-gray-600">
                We value and respect the diverse cultures we encounter, fostering meaningful exchanges 
                and promoting cross-cultural understanding.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-20 h-20 bg-travel-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-travel-blue">✨</span>
              </div>
              <h3 className="heading-sm mb-4 text-travel-blue">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of your journey, from meticulous planning 
                to thoughtful execution and responsive support.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding">
        <div className="travel-container">
          <h2 className="heading-md mb-12 text-center text-travel-blue">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop" 
                  alt="CEO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-travel-dark">Michael Robertson</h3>
              <p className="text-travel-teal font-medium">CEO & Co-founder</p>
            </div>
            <div className="text-center">
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" 
                  alt="COO" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-travel-dark">Sarah Chen</h3>
              <p className="text-travel-teal font-medium">COO & Co-founder</p>
            </div>
            <div className="text-center">
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" 
                  alt="Lead Guide" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-travel-dark">Carlos Mendez</h3>
              <p className="text-travel-teal font-medium">Lead Travel Guide</p>
            </div>
            <div className="text-center">
              <div className="mb-4 aspect-square relative overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop" 
                  alt="Experience Designer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-lg text-travel-dark">Aisha Johnson</h3>
              <p className="text-travel-teal font-medium">Experience Designer</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-travel-blue text-white">
        <div className="travel-container text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us on Our Next Adventure</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Ready to explore the world with a team that's passionate about creating unforgettable experiences?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/destinations">
              <Button className="bg-white text-travel-blue hover:bg-gray-100">
                Browse Destinations
              </Button>
            </Link>
            <Link to="/register">
              <Button className="bg-travel-teal hover:bg-travel-teal/90 text-white">
                Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
};

export default AboutUs;
