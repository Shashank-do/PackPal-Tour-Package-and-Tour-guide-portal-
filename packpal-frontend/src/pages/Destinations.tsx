import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageCard, { PackageProps } from "@/components/PackageCard";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

// Sample tour packages data
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
    id: "europe-explorer",
    title: "Europe Explorer",
    location: "France, Italy, Germany",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1080&auto=format&fit=crop",
    price: 3199,
    duration: "14 days",
    groupSize: "Up to 12 people",
    startDate: "July 15, 2025",
    description: "Discover Europe's charm on a cultural tour through Paris, Rome, and Berlin with historical insights and gourmet experiences."
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

// Map destination points with properly typed coordinates
const mapDestinations = [
  { 
    id: "bali",
    name: "Bali", 
    location: "Indonesia", 
    coordinates: [115.1889, -8.4095] as [number, number], 
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "santorini",
    name: "Santorini", 
    location: "Greece", 
    coordinates: [25.4615, 36.3932] as [number, number], 
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "kyoto",
    name: "Kyoto", 
    location: "Japan", 
    coordinates: [135.7681, 35.0116] as [number, number], 
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "switzerland",
    name: "Swiss Alps", 
    location: "Switzerland", 
    coordinates: [8.2275, 46.8182] as [number, number], 
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "maldives",
    name: "Maldives", 
    location: "Maldives", 
    coordinates: [73.2207, 3.2028] as [number, number], 
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "morocco",
    name: "Morocco", 
    location: "North Africa", 
    coordinates: [-7.0926, 31.7917] as [number, number], 
    image: "https://images.unsplash.com/photo-1597212720418-f9f761487039?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "new-york",
    name: "New York", 
    location: "United States", 
    coordinates: [-74.0060, 40.7128] as [number, number], 
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=400&auto=format&fit=crop" 
  },
  { 
    id: "kenya",
    name: "Kenya", 
    location: "East Africa", 
    coordinates: [37.9062, 0.0236] as [number, number], 
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=400&auto=format&fit=crop" 
  }
];

const Destinations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    duration: {
      short: false,
      medium: false,
      long: false
    },
    regions: {
      asia: false,
      europe: false,
      americas: false,
      africa: false,
      oceania: false
    }
  });

  const handleFilterChange = (category: "duration" | "regions", name: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: checked
      }
    }));
  };

  const filterPackages = () => {
    return travelPackages.filter(pkg => {
      // Search term filter
      const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Selected destination filter
      const matchesDestination = selectedDestination ? pkg.id.includes(selectedDestination) : true;
      
      // Price range filter
      const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
      
      // If no filters are selected, return true
      const noDurationFilters = !Object.values(filters.duration).some(value => value);
      const noRegionFilters = !Object.values(filters.regions).some(value => value);
      
      // Duration filter
      let matchesDuration = noDurationFilters;
      if (!matchesDuration) {
        const days = parseInt(pkg.duration.split(" ")[0]);
        if ((filters.duration.short && days <= 5) ||
            (filters.duration.medium && days > 5 && days <= 8) ||
            (filters.duration.long && days > 8)) {
          matchesDuration = true;
        }
      }
      
      // Region filter (simplified for demo)
      let matchesRegion = noRegionFilters;
      if (!matchesRegion) {
        const location = pkg.location.toLowerCase();
        if ((filters.regions.asia && (location.includes("japan") || location.includes("bali") || location.includes("indonesia") || location.includes("maldives"))) ||
            (filters.regions.europe && (location.includes("greece") || location.includes("switzerland"))) ||
            (filters.regions.americas && location.includes("united states")) ||
            (filters.regions.africa && (location.includes("morocco") || location.includes("kenya"))) ||
            (filters.regions.oceania && location.includes("australia"))) {
          matchesRegion = true;
        }
      }
      
      return matchesSearch && matchesDestination && matchesPrice && matchesDuration && matchesRegion;
    });
  };

  const filteredPackages = filterPackages();

  return (
    <>
      <Navbar />
      
      <div className="bg-travel-blue/5 py-10">
        <div className="travel-container">
          <h1 className="heading-lg mb-4 text-center">Explore Our Destinations</h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Discover our carefully curated collection of travel experiences designed to create 
            unforgettable memories and authentic adventures across the globe.
          </p>
          
          <div id="packages-section" className="relative">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search destinations, experiences, or activities..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="font-bold text-lg mb-4">Filters</h2>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 2500]}
                      min={0}
                      max={2500}
                      step={50}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Duration</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="short" 
                        checked={filters.duration.short}
                        onCheckedChange={(checked) => 
                          handleFilterChange("duration", "short", checked as boolean)
                        }
                      />
                      <Label htmlFor="short" className="ml-2 text-sm font-normal">
                        Short (1-5 days)
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="medium" 
                        checked={filters.duration.medium}
                        onCheckedChange={(checked) => 
                          handleFilterChange("duration", "medium", checked as boolean)
                        }
                      />
                      <Label htmlFor="medium" className="ml-2 text-sm font-normal">
                        Medium (6-8 days)
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="long" 
                        checked={filters.duration.long}
                        onCheckedChange={(checked) => 
                          handleFilterChange("duration", "long", checked as boolean)
                        }
                      />
                      <Label htmlFor="long" className="ml-2 text-sm font-normal">
                        Long (9+ days)
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-2">Regions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox 
                        id="asia" 
                        checked={filters.regions.asia}
                        onCheckedChange={(checked) => 
                          handleFilterChange("regions", "asia", checked as boolean)
                        }
                      />
                      <Label htmlFor="asia" className="ml-2 text-sm font-normal">
                        Asia
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="europe" 
                        checked={filters.regions.europe}
                        onCheckedChange={(checked) => 
                          handleFilterChange("regions", "europe", checked as boolean)
                        }
                      />
                      <Label htmlFor="europe" className="ml-2 text-sm font-normal">
                        Europe
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="americas" 
                        checked={filters.regions.americas}
                        onCheckedChange={(checked) => 
                          handleFilterChange("regions", "americas", checked as boolean)
                        }
                      />
                      <Label htmlFor="americas" className="ml-2 text-sm font-normal">
                        Americas
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="africa" 
                        checked={filters.regions.africa}
                        onCheckedChange={(checked) => 
                          handleFilterChange("regions", "africa", checked as boolean)
                        }
                      />
                      <Label htmlFor="africa" className="ml-2 text-sm font-normal">
                        Africa
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox 
                        id="oceania" 
                        checked={filters.regions.oceania}
                        onCheckedChange={(checked) => 
                          handleFilterChange("regions", "oceania", checked as boolean)
                        }
                      />
                      <Label htmlFor="oceania" className="ml-2 text-sm font-normal">
                        Oceania
                      </Label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                  onClick={() => {
                    setSearchTerm("");
                    setPriceRange([0, 2500]);
                    setSelectedDestination(null);
                    setFilters({
                      duration: { short: false, medium: false, long: false },
                      regions: { asia: false, europe: false, americas: false, africa: false, oceania: false }
                    });
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
              
              <div className="lg:col-span-3">
                {filteredPackages.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPackages.map(pkg => (
                      <PackageCard key={pkg.id} {...pkg} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">No Packages Found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any packages matching your criteria.
                    </p>
                    <Button 
                      variant="default" 
                      className="bg-travel-blue hover:bg-travel-blue/90"
                      onClick={() => {
                        setSearchTerm("");
                        setPriceRange([0, 2500]);
                        setSelectedDestination(null);
                        setFilters({
                          duration: { short: false, medium: false, long: false },
                          regions: { asia: false, europe: false, americas: false, africa: false, oceania: false }
                        });
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Destinations;
