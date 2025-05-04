
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Package, User } from "lucide-react";
import { Link } from "react-router-dom";

interface TourPackage {
  id: string;
  title: string;
  description: string;
  location: string;
  image: string;
  additionalImages: string[];
  price: number;
  duration: string;
  groupSize: string;
  startDate: string;
  featured: boolean;
  activities: string[];
}

const tourPackages: TourPackage[] = [
  {
    id: "bali-adventure",
    title: "Bali Adventure Package",
    description: "Experience the beauty of Bali with this adventure package including visits to sacred temples, rice terraces, and pristine beaches. Enjoy snorkeling, temple hopping, and authentic Balinese cuisine.",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558005530-a7958896ec60?q=80&w=800&auto=format&fit=crop"
    ],
    price: 899,
    duration: "7 days",
    groupSize: "Up to 12 people",
    startDate: "Flexible dates",
    featured: true,
    activities: ["Temple visits", "Rice terrace hikes", "Snorkeling", "Traditional dance shows"]
  },
  {
    id: "santorini-escape",
    title: "Santorini Island Escape",
    description: "Enjoy the stunning views of Santorini's caldera, explore whitewashed villages, and witness the famous sunset from Oia. This package includes wine tasting, boat tours, and plenty of time to relax.",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1299,
    duration: "5 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    featured: true,
    activities: ["Sunset viewing in Oia", "Wine tasting", "Boat tour to volcanic islands", "Beach time"]
  },
  {
    id: "kyoto-cultural",
    title: "Kyoto Cultural Experience",
    description: "Immerse yourself in Japanese culture with visits to ancient temples, traditional tea ceremonies, and beautiful gardens in historic Kyoto. Learn about Japanese history and traditions.",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551041777-ed277b8dd348?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1099,
    duration: "6 days",
    groupSize: "Up to 10 people",
    startDate: "Flexible dates",
    featured: true,
    activities: ["Tea ceremony", "Temple visits", "Kimono experience", "Japanese cooking class"]
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps Adventure",
    description: "Experience the majestic Swiss Alps with this adventure package including hiking, cable car rides, and stays in charming mountain villages. Breathtaking views and adventurous activities await.",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1613395877539-9bdbdb73f8b1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502943693086-33b5b1cfdf2f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531210483974-4f8c1f33fd35?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1499,
    duration: "8 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Alpine hiking", "Cable car rides", "Cheese tasting", "Mountain biking"]
  },
  {
    id: "maldives-luxury",
    title: "Maldives Luxury Retreat",
    description: "Indulge in luxury with overwater bungalows, pristine beaches, and world-class snorkeling in the crystal-clear waters of the Maldives. Perfect for honeymooners and those seeking relaxation.",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1799,
    duration: "6 days",
    groupSize: "Couples or families",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Snorkeling", "Spa treatments", "Sunset cruises", "Water sports"]
  },
  {
    id: "morocco-desert",
    title: "Moroccan Desert Safari",
    description: "Journey through the Sahara desert on camelback, sleep in luxury desert camps, and explore the vibrant markets of Marrakech. Experience authentic Moroccan culture and hospitality.",
    location: "Morocco",
    image: "https://images.unsplash.com/photo-1597212720418-f9f761487039?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548026143-21572dce8a74?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553138201-7da48d4cc7d8?q=80&w=800&auto=format&fit=crop"
    ],
    price: 799,
    duration: "5 days",
    groupSize: "Up to 10 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Camel trekking", "Desert camping", "Market exploration", "Traditional music performances"]
  },
  {
    id: "new-york-city",
    title: "New York City Explorer",
    description: "Experience the energy of New York City with visits to iconic landmarks, Broadway shows, and world-class museums. Discover why this city never sleeps with our curated urban adventure.",
    location: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1555109307-f7d9da25c244?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1500916434205-0c77489c6cf7?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1199,
    duration: "4 days",
    groupSize: "Up to 15 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Broadway shows", "Museum visits", "Statue of Liberty tour", "Central Park exploration"]
  },
  {
    id: "african-safari",
    title: "African Wildlife Safari",
    description: "Witness the amazing wildlife of Africa with guided safaris through national parks and stays in luxury tented camps. See lions, elephants, giraffes and more in their natural habitat.",
    location: "Kenya",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=800&auto=format&fit=crop"
    ],
    price: 2299,
    duration: "10 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Game drives", "Hot air balloon rides", "Maasai village visits", "Bird watching"]
  },
  {
    id: "amazon-expedition",
    title: "Amazon Rainforest Expedition",
    description: "Discover the incredible biodiversity of the Amazon rainforest with guided hikes, river cruises, and overnight stays in eco-friendly jungle lodges. A paradise for nature enthusiasts.",
    location: "Brazil",
    image: "https://images.unsplash.com/photo-1518182170546-07661fd94144?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1551866442-64e75e911c23?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572902538060-e35204fb4e6f?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1599,
    duration: "7 days",
    groupSize: "Up to 12 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Jungle trekking", "River cruises", "Wildlife spotting", "Indigenous community visits"]
  },
  {
    id: "amalfi-coast",
    title: "Amalfi Coast Getaway",
    description: "Explore the stunning Amalfi Coast with its colorful villages, delicious cuisine, and beautiful Mediterranean views. Visit Positano, Ravello, and take a boat tour to Capri.",
    location: "Italy",
    image: "https://images.unsplash.com/photo-1533934245112-408e3f2bc98f?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1560860446-c821e910a0a7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495434942214-9b525bba74e9?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1299,
    duration: "6 days",
    groupSize: "Up to 10 people",
    startDate: "Flexible dates",
    featured: false,
    activities: ["Coastal drives", "Boat tours", "Cooking classes", "Beach relaxation"]
  },
  {
    id: "caribbean-cruise",
    title: "Caribbean Island Hopping",
    description: "Set sail on a luxury cruise through the pristine waters of the Caribbean. Visit multiple islands, enjoy water activities, and experience the unique culture of each destination.",
    location: "Caribbean",
    image: "https://images.unsplash.com/photo-1468746556241-529969a7c7d0?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517630776892-ee0903b3d0e4?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1599,
    duration: "8 days",
    groupSize: "Up to 20 people",
    startDate: "Monthly departures",
    featured: false,
    activities: ["Snorkeling", "Island tours", "Beach parties", "Cultural performances"]
  },
  {
    id: "northern-lights-iceland",
    title: "Northern Lights Adventure",
    description: "Chase the magical Northern Lights in Iceland while exploring glaciers, hot springs, and volcanic landscapes. A perfect combination of natural wonders and relaxing experiences.",
    location: "Iceland",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a9?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520169358720-c32b3fac3420?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1899,
    duration: "7 days",
    groupSize: "Up to 12 people",
    startDate: "September to March",
    featured: true,
    activities: ["Northern Lights tours", "Blue Lagoon", "Glacier hiking", "Waterfall exploration"]
  },
  {
    id: "vietnam-culture",
    title: "Vietnam Cultural Journey",
    description: "Travel from north to south Vietnam exploring ancient cities, floating markets, and breathtaking landscapes. Enjoy authentic cuisine and learn about the rich cultural heritage.",
    location: "Vietnam",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1080&auto=format&fit=crop",
    additionalImages: [
      "https://images.unsplash.com/photo-1557750255-c76072a7aad1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464817739973-0128fe77aaa1?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470723710355-95304d8aece4?q=80&w=800&auto=format&fit=crop"
    ],
    price: 1099,
    duration: "10 days",
    groupSize: "Up to 14 people",
    startDate: "Flexible dates",
    featured: true,
    activities: ["Ha Long Bay cruise", "Cu Chi Tunnels", "Street food tours", "Traditional craft villages"]
  },
];

const ToursPackages = () => {
  const [filter, setFilter] = useState<string | null>(null);
  
  const filteredPackages = filter 
    ? tourPackages.filter(pkg => filter === "featured" ? pkg.featured : true)
    : tourPackages;

  return (
    <>
      <Navbar />
      
      <div className="bg-travel-blue/5 py-10">
        <div className="travel-container">
          <div className="text-center mb-12">
            <h1 className="heading-lg mb-4">Discover Our Tour Packages</h1>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our carefully curated tour packages designed to give you unforgettable 
              travel experiences across the globe. From beach getaways to cultural explorations, 
              we have something for every type of traveler.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 mb-8">
            <Button 
              variant={filter === null ? "default" : "outline"} 
              className={filter === null ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
              onClick={() => setFilter(null)}
            >
              All Packages
            </Button>
            <Button 
              variant={filter === "featured" ? "default" : "outline"}
              className={filter === "featured" ? "bg-travel-blue hover:bg-travel-blue/90" : ""}
              onClick={() => setFilter("featured")}
            >
              Featured
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <Card key={pkg.id} className="overflow-hidden card-hover">
                <div className="h-56 overflow-hidden relative">
                  <img 
                    src={pkg.image} 
                    alt={pkg.title} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {pkg.featured && (
                    <div className="absolute top-4 right-4 bg-travel-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-travel-dark">{pkg.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin size={16} className="mr-1 text-travel-teal" />
                        {pkg.location}
                      </CardDescription>
                    </div>
                    <div className="bg-travel-blue text-white px-3 py-1 rounded-md">
                      ${pkg.price}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="line-clamp-2 text-gray-600">{pkg.description}</p>

                  {/* Preview images */}
                  <div className="flex gap-1.5 overflow-x-auto pb-2">
                    {pkg.additionalImages.map((img, idx) => (
                      <img 
                        key={idx}
                        src={img} 
                        alt={`${pkg.title} preview ${idx + 1}`} 
                        className="w-20 h-16 object-cover rounded-md flex-shrink-0"
                      />
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap justify-between text-sm text-gray-500 gap-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-travel-teal" />
                      {pkg.duration}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-travel-teal" />
                      {pkg.startDate}
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1 text-travel-teal" />
                      {pkg.groupSize}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold mb-1 text-travel-dark">Activities:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.activities.slice(0, 3).map((activity, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-travel-light px-2 py-1 rounded-full text-travel-dark"
                        >
                          {activity}
                        </span>
                      ))}
                      {pkg.activities.length > 3 && (
                        <span className="text-xs bg-travel-light px-2 py-1 rounded-full text-travel-dark">
                          +{pkg.activities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link to={`/package/${pkg.id}`} className="w-full">
                    <Button variant="default" className="w-full bg-travel-teal hover:bg-travel-teal/90">
                      <Package className="mr-2 h-4 w-4" /> View Package
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ToursPackages;
