import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { FloodRegion } from '../utils/floodApi';
import L from 'leaflet';

interface FloodMapProps {
  regions: FloodRegion[];
  onRegionClick: (regionId: string) => void;
  loading?: boolean;
}

const RISK_COLORS = {
  'low': '#4CAF50',     // Green
  'medium': '#FFC107',  // Amber
  'high': '#FF9800',    // Orange
  'very-high': '#F44336' // Red
};

export function FloodMap({ regions, onRegionClick, loading = false }: FloodMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.CircleMarker[]>([]);
  const [mapReady, setMapReady] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(containerRef.current, {
      center: [23.8103, 90.4125],
      zoom: 7,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(map);

    mapRef.current = map;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMapReady(true);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update Markers
  useEffect(() => {
    if (!mapRef.current || !mapReady) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    regions.forEach(region => {
      const color = RISK_COLORS[region.riskLevel];

      const marker = L.circleMarker([region.latitude, region.longitude], {
        radius: 24, // Slightly larger as in screenshot
        fillColor: color,
        color: '#fff', // White border
        weight: 1,     // Thin border
        opacity: 1,
        fillOpacity: 0.7
      });

      const popupContent = `
        <div class="p-2 font-sans">
          <h3 class="font-bold text-sm mb-1">${region.name}</h3>
          <div class="text-xs">
            <p>Risk: <span style="color: ${color}; font-weight: bold; text-transform: uppercase;">${region.riskLevel}</span></p>
            <p>Rainfall: ${region.rainfall}mm</p>
          </div>
          <p class="text-[10px] text-gray-500 mt-1 italic">Click for details</p>
        </div>
      `;

      marker.bindPopup(popupContent, { closeButton: false });

      marker.on('mouseover', () => marker.openPopup());
      marker.on('mouseout', () => marker.closePopup());
      marker.on('click', () => onRegionClick(region.id));

      marker.addTo(map);
      markersRef.current.push(marker);
    });

  }, [regions, mapReady, onRegionClick]);

  return (
    <div className="relative w-full h-full bg-gray-50 z-0">
      {loading && (
        <div className="absolute inset-0 z-[500] bg-white/50 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium text-gray-900 bg-white/80 px-3 py-1 rounded-full shadow-sm">Updating flood data...</p>
        </div>
      )}
      <div ref={containerRef} className="w-full h-full outline-none" />
    </div>
  );
}
