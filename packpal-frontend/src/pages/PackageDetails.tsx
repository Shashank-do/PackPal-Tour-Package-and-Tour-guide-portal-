
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, Calendar, Clock, User, MapPin, Check } from "lucide-react";
import BookingForm from "@/components/BookingForm";
import { PackageProps } from "@/components/PackageCard";
import { useState, useEffect } from "react";
import PackageLocationMap from "@/components/PackageLocationMap";

// Sample tour packages data for demo
const travelPackages: PackageProps[] = [
  {
    id: "bali-adventure",
    title: "Bali Adventure Package",
    location: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1080&auto=format&fit=crop",
    price: 899,
    duration: "7 days",
    groupSize: "Up to 12 people",
    startDate: "Flexible dates",
    description: "Experience the beauty of Bali with this 7-day adventure package including visits to sacred temples, rice terraces, and pristine beaches."
  },
  {
    id: "santorini-escape",
    title: "Santorini Island Escape",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1080&auto=format&fit=crop",
    price: 1299,
    duration: "5 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    description: "Enjoy the stunning views of Santorini's caldera, explore whitewashed villages, and witness the famous sunset from Oia."
  },
  {
    id: "kyoto-cultural",
    title: "Kyoto Cultural Experience",
    location: "Kyoto, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1080&auto=format&fit=crop",
    price: 1099,
    duration: "6 days",
    groupSize: "Up to 10 people",
    startDate: "Flexible dates",
    description: "Immerse yourself in Japanese culture with visits to ancient temples, traditional tea ceremonies, and beautiful gardens in historic Kyoto."
  },
  {
    id: "swiss-alps",
    title: "Swiss Alps Adventure",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1080&auto=format&fit=crop",
    price: 1499,
    duration: "8 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    description: "Experience the majestic Swiss Alps with this adventure package including hiking, cable car rides, and stays in charming mountain villages."
  },
  {
    id: "maldives-luxury",
    title: "Maldives Luxury Retreat",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1080&auto=format&fit=crop",
    price: 1799,
    duration: "6 days",
    groupSize: "Couples or families",
    startDate: "Flexible dates",
    description: "Indulge in luxury with overwater bungalows, pristine beaches, and world-class snorkeling in the crystal-clear waters of the Maldives."
  },
  {
    id: "morocco-desert",
    title: "Moroccan Desert Safari",
    location: "Morocco",
    image: "https://images.unsplash.com/photo-1597212720418-f9f761487039?q=80&w=1080&auto=format&fit=crop",
    price: 799,
    duration: "5 days",
    groupSize: "Up to 10 people",
    startDate: "Flexible dates",
    description: "Journey through the Sahara desert on camelback, sleep in luxury desert camps, and explore the vibrant markets of Marrakech."
  },
  {
    id: "new-york-city",
    title: "New York City Explorer",
    location: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1080&auto=format&fit=crop",
    price: 1199,
    duration: "4 days",
    groupSize: "Up to 15 people",
    startDate: "Flexible dates",
    description: "Experience the energy of New York City with visits to iconic landmarks, Broadway shows, and world-class museums."
  },
  {
    id: "african-safari",
    title: "African Wildlife Safari",
    location: "Kenya",
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1080&auto=format&fit=crop",
    price: 2299,
    duration: "10 days",
    groupSize: "Up to 8 people",
    startDate: "Flexible dates",
    description: "Witness the amazing wildlife of Africa with guided safaris through national parks and stays in luxury tented camps."
  }
];

// Extended package details with coordinates for maps
interface ExtendedPackageDetails extends PackageProps {
  highlights: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
  }[];
  inclusions: string[];
  exclusions: string[];
  coordinates: [number, number]; // Add coordinates property
}

// Extended details for packages with coordinates
const getExtendedPackageDetails = (id: string): ExtendedPackageDetails | undefined => {
  const basePackage = travelPackages.find(pkg => pkg.id === id);
  
  if (!basePackage) return undefined;
  
  // Extended details based on package ID
  if (id === "bali-adventure") {
    return {
      ...basePackage,
      coordinates: [115.1889, -8.4095],
      highlights: [
        "Visit the sacred Uluwatu Temple perched on cliff edges",
        "Explore the lush Tegalalang Rice Terraces",
        "Relax on pristine beaches of Nusa Dua",
        "Experience traditional Balinese dance performances",
        "Discover hidden waterfalls in the jungle"
      ],
      itinerary: [
        {
          day: 1,
          title: "Arrival in Bali",
          description: "Welcome to Bali! Upon arrival at Denpasar International Airport, you'll be greeted by our representative and transferred to your hotel in Kuta. Enjoy a welcome dinner featuring traditional Balinese cuisine."
        },
        {
          day: 2,
          title: "Uluwatu Temple & Kecak Dance",
          description: "Visit the stunning Uluwatu Temple perched on the cliff edge. In the evening, witness the mesmerizing Kecak dance performance at sunset with the ocean as backdrop."
        },
        {
          day: 3,
          title: "Ubud Exploration",
          description: "Travel to Ubud, Bali's cultural heart. Explore the Sacred Monkey Forest, visit art galleries, and learn about traditional crafts at local workshops."
        },
        {
          day: 4,
          title: "Rice Terraces & Waterfalls",
          description: "Visit the iconic Tegalalang Rice Terraces in the morning. Later, hike to Tegenungan Waterfall for a refreshing swim in natural pools."
        },
        {
          day: 5,
          title: "Mount Batur Sunrise Trek",
          description: "Optional early morning trek to Mount Batur to witness a spectacular sunrise. Afternoon at leisure to relax or explore local markets."
        },
        {
          day: 6,
          title: "Beach Day in Nusa Dua",
          description: "Enjoy a full day of relaxation on the pristine beaches of Nusa Dua. Optional water sports activities available."
        },
        {
          day: 7,
          title: "Departure Day",
          description: "Free time for last-minute shopping before transfer to the airport for your departure flight."
        }
      ],
      inclusions: [
        "6 nights accommodation in 4-star hotels",
        "Daily breakfast and select meals",
        "Airport transfers and all transportation",
        "English-speaking guide throughout the tour",
        "Entrance fees to all attractions mentioned",
        "Welcome dinner with traditional Balinese dance",
        "24/7 customer support"
      ],
      exclusions: [
        "International flights",
        "Travel insurance",
        "Optional activities not mentioned in the itinerary",
        "Personal expenses and tips",
        "Visa fees if applicable"
      ]
    };
  }
  
  // Default coordinates for other packages
  const defaultCoordinates: Record<string, [number, number]> = {
    "santorini-escape": [25.4615, 36.3932],
    "kyoto-cultural": [135.7681, 35.0116],
    "swiss-alps": [8.2275, 46.8182],
    "maldives-luxury": [73.2207, 3.2028],
    "morocco-desert": [-7.0926, 31.7917],
    "new-york-city": [-74.0060, 40.7128],
    "african-safari": [37.9062, 0.0236]
  };
  
  // Default extended details for other packages
  return {
    ...basePackage,
    coordinates: defaultCoordinates[id] || [-74.0060, 40.7128], // Default to NYC if not found
    highlights: [
      "Explore iconic landmarks and natural wonders",
      "Experience local culture and traditions",
      "Enjoy comfortable accommodations in prime locations",
      "Taste authentic local cuisine",
      "Create unforgettable memories with expert guides"
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival Day",
        description: "Arrive at your destination and transfer to your hotel. Enjoy a welcome dinner and briefing about your upcoming adventure."
      },
      {
        day: 2,
        title: "Exploration Day",
        description: "Visit key landmarks and attractions with an expert local guide who will share insights about the history and culture."
      },
      {
        day: 3,
        title: "Cultural Immersion",
        description: "Immerse yourself in local traditions with cultural activities, workshops, and visits to authentic neighborhoods."
      },
      {
        day: 4,
        title: "Natural Wonders",
        description: "Explore the natural beauty of the region with visits to parks, viewpoints, and outdoor activities."
      },
      {
        day: 5,
        title: "Leisure Day",
        description: "Enjoy a day at leisure to explore on your own or take part in optional activities tailored to your interests."
      },
      {
        day: 6,
        title: "Farewell Experience",
        description: "Final exploration day followed by a special farewell dinner featuring local cuisine and entertainment."
      }
    ],
    inclusions: [
      "Accommodation as specified in the itinerary",
      "Daily breakfast and select meals",
      "Transportation during the tour",
      "English-speaking guide",
      "Entrance fees to attractions mentioned",
      "Welcome and farewell dinners",
      "24/7 customer support"
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Optional activities",
      "Personal expenses and tips",
      "Visa fees if applicable",
      "Meals not mentioned in the inclusions"
    ]
  };
};

const PackageDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<ExtendedPackageDetails | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Simulate API call to fetch package details
    setTimeout(() => {
      const details = getExtendedPackageDetails(id || "");
      setPackageDetails(details);
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 w-48 bg-gray-200 rounded mb-4 mx-auto"></div>
              <div className="h-6 w-64 bg-gray-200 rounded mx-auto"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (!packageDetails) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h2 className="heading-md mb-4">Package Not Found</h2>
            <p className="text-gray-600 mb-6">
              We couldn't find the travel package you're looking for.
            </p>
            <Link to="/destinations">
              <Button className="bg-travel-blue hover:bg-travel-blue/90">
                Browse All Destinations
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      
      <div className="bg-travel-blue/10 py-8">
        <div className="travel-container">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="heading-lg mb-2">{packageDetails.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-1" />
                {packageDetails.location}
              </div>
            </div>
            <Button variant="outline" className="flex gap-2 border-travel-blue text-travel-blue">
              <Heart className="h-5 w-5" />
              Save to Wishlist
            </Button>
          </div>
        </div>
      </div>
      
      <div className="travel-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-6 rounded-lg overflow-hidden h-[400px]">
              <img 
                src={packageDetails.image} 
                alt={packageDetails.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-travel-teal" />
                <div>
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-medium">{packageDetails.duration}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-travel-teal" />
                <div>
                  <p className="text-sm text-gray-500">Start Date</p>
                  <p className="font-medium">{packageDetails.startDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 mr-2 text-travel-teal" />
                <div>
                  <p className="text-sm text-gray-500">Group Size</p>
                  <p className="font-medium">{packageDetails.groupSize}</p>
                </div>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="mb-10">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">What's Included</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="heading-sm mb-4">About This Tour Package</h2>
                  <p className="text-gray-700">
                    {packageDetails.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Highlights</h3>
                  <ul className="space-y-2">
                    {packageDetails.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-travel-teal flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="itinerary" className="space-y-6">
                <h2 className="heading-sm mb-4">Tour Itinerary</h2>
                <div className="space-y-6">
                  {packageDetails.itinerary.map((day) => (
                    <div key={day.day} className="border-l-4 border-travel-blue pl-4 py-2">
                      <h3 className="font-bold text-lg mb-1">
                        Day {day.day}: {day.title}
                      </h3>
                      <p className="text-gray-700">{day.description}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="inclusions" className="space-y-6">
                <div>
                  <h2 className="heading-sm mb-4">What's Included</h2>
                  <ul className="space-y-2">
                    {packageDetails.inclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 mr-2 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="heading-sm mb-4">What's Not Included</h2>
                  <ul className="space-y-2">
                    {packageDetails.exclusions.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-gray-700">• {item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="location" className="space-y-6">
                <div>
                  <h2 className="heading-sm mb-4">Location</h2>
                  <p className="text-gray-700 mb-6">
                    Explore the destination on the interactive map below. You can search for specific landmarks or areas of interest.
                  </p>
                  
                  <PackageLocationMap 
                    location={packageDetails.location}
                    coordinates={packageDetails.coordinates}
                    title={packageDetails.title}
                    description={`Experience ${packageDetails.title} in ${packageDetails.location}`}
                    image={packageDetails.image}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-2xl font-bold text-travel-blue mb-2">${packageDetails.price}</h3>
              <p className="text-gray-500 mb-6">per person</p>
              
              <BookingForm 
                packageId={packageDetails.id} 
                packageTitle={packageDetails.title}
                price={packageDetails.price}
              />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default PackageDetails;
