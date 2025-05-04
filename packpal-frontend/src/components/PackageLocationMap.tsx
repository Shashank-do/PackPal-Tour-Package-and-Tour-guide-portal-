
import { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PackageLocationMapProps {
  location: string;
  coordinates?: [number, number];
  title: string;
  description?: string;
  image?: string;
}

const PackageLocationMap = ({ 
  location, 
  coordinates, 
  title, 
  description, 
  image 
}: PackageLocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(location);
  const [mapLocation, setMapLocation] = useState<[number, number]>(
    coordinates || [-74.006, 40.7128] // Default: New York if no coordinates provided
  );

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: mapLocation,
        zoom: 10,
      });

      // Add navigation control
      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      map.current.on('load', () => {
        setIsMapLoaded(true);
        updateMarker();
      });
    } else {
      // Just update center if map exists
      map.current.setCenter(mapLocation);
      updateMarker();
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, mapLocation]);

  useEffect(() => {
    if (coordinates) {
      setMapLocation(coordinates);
    } else {
      // If no coordinates provided, search for location name when component mounts
      handleSearch();
    }
  }, []);

  const updateMarker = () => {
    if (!map.current) return;

    // Remove existing marker
    if (marker.current) {
      marker.current.remove();
    }

    // Add marker for location
    marker.current = new mapboxgl.Marker({ color: "#0F7490" })
      .setLngLat(mapLocation)
      .setPopup(
        new mapboxgl.Popup().setHTML(
          `<div class="p-2">
            ${image ? `<img src="${image}" alt="${title}" class="w-full h-32 object-cover rounded-md mb-2" />` : ''}
            <strong class="text-lg block mb-1">${title}</strong>
            <p class="text-gray-600">${description || location}</p>
          </div>`
        )
      )
      .addTo(map.current);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !mapboxToken) return;

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchQuery
        )}.json?access_token=${mapboxToken}&limit=1`
      );

      if (!response.ok) {
        throw new Error("Location search failed");
      }

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        setMapLocation([lng, lat]);
        toast({
          title: "Location updated",
          description: `Map centered on ${data.features[0].place_name}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "Try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search error",
        description: "Unable to find the location",
        variant: "destructive",
      });
    }
  };

  if (!isMapLoaded) {
    return (
      <div className="relative bg-gray-100 rounded-lg">
        <div className="text-center py-6">
          <h3 className="text-xl font-semibold mb-4">Location Map</h3>
          <p className="text-gray-600 mb-6">To view this location on an interactive map, please enter your Mapbox public token:</p>
          
          <div className="max-w-md mx-auto flex flex-col">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox public token..."
              className="px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            />
            <p className="text-sm text-gray-500 mb-4">
              Get a free token at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-travel-blue hover:underline">mapbox.com</a>
            </p>
            <Button 
              onClick={() => setMapboxToken(mapboxToken)}
              disabled={!mapboxToken}
              className="bg-travel-blue hover:bg-travel-blue/90 self-center"
            >
              Load Map
            </Button>
          </div>
        </div>
        <div ref={mapContainer} className="absolute inset-0 rounded-lg" style={{visibility: "hidden"}} />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a location..."
            className="pl-10"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} className="bg-travel-blue hover:bg-travel-blue/90">
          Find
        </Button>
      </div>
      <div className="relative h-72 rounded-lg overflow-hidden">
        <div ref={mapContainer} className="w-full h-full rounded-lg" />
      </div>
    </div>
  );
};

export default PackageLocationMap;
