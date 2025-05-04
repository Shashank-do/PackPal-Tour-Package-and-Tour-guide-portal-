
import { useState } from "react";
import DestinationCard, { DestinationProps } from "./DestinationCard";
import { Button } from "@/components/ui/button";

const featuredDestinations: DestinationProps[] = [
  {
    id: "bali",
    title: "Exotic Bali",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080&auto=format&fit=crop",
    price: 899,
    rating: 4.8
  },
  {
    id: "santorini",
    title: "Santorini Island",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080&auto=format&fit=crop",
    price: 1299,
    rating: 4.9
  },
  {
    id: "kyoto",
    title: "Historic Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080&auto=format&fit=crop",
    price: 1099,
    rating: 4.7
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1080&auto=format&fit=crop",
    price: 1499,
    rating: 4.8
  },
  {
    id: "maldives",
    title: "Maldives Paradise",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop",
    price: 1799,
    rating: 4.9
  },
  {
    id: "morocco",
    title: "Marrakech Experience",
    location: "Morocco",
    image: "https://unsplash.com/photos/white-and-brown-tent-on-brown-field-under-blue-sky-during-night-time-VtGLcivTXtk",
    price: 799,
    rating: 4.6
  }
];

const FeaturedDestinations = () => {
  const [visible, setVisible] = useState(3);
  const showMore = () => {
    setVisible(prev => Math.min(prev + 3, featuredDestinations.length));
  };

  return (
    <section className="section-padding">
      <div className="travel-container">
        <div className="text-center mb-12">
          <h2 className="heading-lg mb-4 text-gradient">Popular Destinations</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most popular travel destinations loved by travelers around the world.
            Unforgettable experiences await you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.slice(0, visible).map((destination) => (
            <DestinationCard key={destination.id} {...destination} />
          ))}
        </div>

        {visible < featuredDestinations.length && (
          <div className="mt-10 text-center">
            <Button 
              onClick={showMore} 
              variant="outline" 
              className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
            >
              Load More Destinations
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedDestinations;
