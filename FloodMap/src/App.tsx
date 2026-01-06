import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FloodMap } from './components/FloodMap';
import { RegionModal } from './components/RegionModal';
import { Legend } from './components/Legend';
import { Header } from './components/Header';
import { fetchFloodData, FloodRegion } from './utils/floodApi';
import { Database } from './pages/Database';

export interface RegionData {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high' | 'very-high';
  rainfall: number;
  lastFlood: string;
  population: string;
  currentDischarge?: number;
  averageDischarge?: number;
  maxDischarge?: number;
  forecastDate?: string;
}

function Home() {
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [floodRegions, setFloodRegions] = useState<FloodRegion[]>([]);
  const [loading, setLoading] = useState(true);

  const loadFloodData = async (forceRefresh = false) => {
    try {
      setLoading(true);
      const data = await fetchFloodData(forceRefresh);
      setFloodRegions(data);
    } catch (error) {
      console.error('Failed to load flood data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFloodData();
  }, []);

  const handleRefresh = () => {
    loadFloodData(true);
  };

  const handleRegionClick = (regionId: string) => {
    const region = floodRegions.find(r => r.id === regionId);
    if (region) {
      setSelectedRegion(region);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Header onRefresh={handleRefresh} loading={loading} />
      <main className="flex-1 relative w-full">
        <FloodMap
          onRegionClick={handleRegionClick}
          regions={floodRegions}
          loading={loading}
        />
        <Legend />
      </main>
      {selectedRegion && (
        <RegionModal
          region={selectedRegion}
          onClose={() => setSelectedRegion(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/database" element={<Database />} />
      </Routes>
    </BrowserRouter>
  );
}
