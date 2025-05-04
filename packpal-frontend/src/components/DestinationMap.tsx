
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';

interface DestinationPoint {
  id: string;
  name: string;
  coordinates: [number, number];
  image: string;
  location: string;
}

interface DestinationMapProps {
  destinations: DestinationPoint[];
  onDestinationSelect: (id: string) => void;
}

const DestinationMap = ({ destinations, onDestinationSelect }: DestinationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      projection: 'globe',
      zoom: 1.5,
      center: [20, 20],
      pitch: 40,
      minZoom: 1,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    map.current.scrollZoom.disable();

    map.current.on('style.load', () => {
      if (!map.current) return;
      
      map.current.setFog({
        color: 'rgb(255, 255, 255)',
        'high-color': 'rgb(200, 200, 225)',
        'horizon-blend': 0.2,
      });

      // Add destination markers
      destinations.forEach(destination => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div>
            <img src="${destination.image}" alt="${destination.name}" style="width:100%;height:120px;object-fit:cover;border-radius:4px;" />
            <h3 style="margin:8px 0;font-weight:bold;">${destination.name}</h3>
            <p style="margin:0;color:#666;">${destination.location}</p>
          </div>`
        );

        const marker = new mapboxgl.Marker({ color: '#22c55e' })
          .setLngLat(destination.coordinates)
          .setPopup(popup)
          .addTo(map.current!);
          
        // Add click event to marker
        marker.getElement().addEventListener('click', () => {
          onDestinationSelect(destination.id);
        });
      });

      setIsMapLoaded(true);
    });

    // Globe rotation
    const secondsPerRevolution = 240;
    let userInteracting = false;
    let spinEnabled = true;

    function spinGlobe() {
      if (!map.current) return;
      
      const zoom = map.current.getZoom();
      if (spinEnabled && !userInteracting && zoom < 3) {
        let distancePerSecond = 360 / secondsPerRevolution;
        const center = map.current.getCenter();
        center.lng -= distancePerSecond;
        map.current.easeTo({ center, duration: 1000, easing: (n) => n });
      }
    }

    map.current.on('mousedown', () => {
      userInteracting = true;
    });
    
    map.current.on('dragstart', () => {
      userInteracting = true;
    });
    
    map.current.on('mouseup', () => {
      userInteracting = false;
      spinGlobe();
    });
    
    map.current.on('touchend', () => {
      userInteracting = false;
      spinGlobe();
    });

    map.current.on('moveend', () => {
      spinGlobe();
    });

    // Start spinning
    spinGlobe();

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [destinations, mapboxToken, onDestinationSelect]);

  if (!isMapLoaded) {
    return (
      <div className="relative bg-travel-light rounded-lg">
        <div className="text-center py-10">
          <h3 className="text-xl font-semibold mb-4">Interactive Destination Map</h3>
          <p className="text-gray-600 mb-6">To view our global destinations on an interactive map, please enter your Mapbox public token below:</p>
          
          <div className="max-w-md mx-auto flex flex-col">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox public token..."
              className="px-4 py-2 mb-4 border border-gray-300 rounded-lg"
            />
            <p className="text-sm text-gray-500 mb-4">
              You can get a free Mapbox token from <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-travel-blue hover:underline">mapbox.com</a> by creating an account.
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
    <div className="relative w-full h-[500px]">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg shadow-lg" />
      <div className="absolute inset-x-0 bottom-4 flex justify-center z-10">
        <Button 
          variant="secondary" 
          onClick={() => {
            if (!map.current) return;
            map.current.flyTo({
              center: [20, 20],
              zoom: 1.5,
              pitch: 40,
              bearing: 0,
              duration: 2000
            });
          }}
          className="bg-white text-travel-blue hover:bg-gray-100 shadow-md"
        >
          Reset View
        </Button>
      </div>
    </div>
  );
};

export default DestinationMap;
