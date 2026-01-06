export interface FloodRegion {
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
  latitude: number;
  longitude: number;
}

// Major districts and river locations across Bangladesh
const BANGLADESH_REGIONS = [
  // Northern regions
  { id: 'sylhet', name: 'Sylhet', lat: 24.8949, lon: 91.8687, population: '500K', lastFlood: '2022' },
  { id: 'sunamganj', name: 'Sunamganj', lat: 25.0658, lon: 91.3987, population: '280K', lastFlood: '2022' },
  { id: 'moulvibazar', name: 'Moulvibazar', lat: 24.4821, lon: 91.7315, population: '195K', lastFlood: '2021' },
  { id: 'rangpur', name: 'Rangpur', lat: 25.7439, lon: 89.2752, population: '300K', lastFlood: '2020' },
  { id: 'kurigram', name: 'Kurigram', lat: 25.8073, lon: 89.6286, population: '235K', lastFlood: '2022' },
  { id: 'lalmonirhat', name: 'Lalmonirhat', lat: 25.9923, lon: 89.2847, population: '145K', lastFlood: '2021' },
  { id: 'dinajpur', name: 'Dinajpur', lat: 25.6217, lon: 88.6354, population: '210K', lastFlood: '2019' },

  // Northwestern regions
  { id: 'rajshahi', name: 'Rajshahi', lat: 24.3745, lon: 88.6042, population: '450K', lastFlood: '2019' },
  { id: 'bogra', name: 'Bogra', lat: 24.8465, lon: 89.3770, population: '400K', lastFlood: '2020' },
  { id: 'pabna', name: 'Pabna', lat: 24.0064, lon: 89.2372, population: '280K', lastFlood: '2020' },
  { id: 'sirajganj', name: 'Sirajganj', lat: 24.4533, lon: 89.7006, population: '320K', lastFlood: '2021' },

  // Central regions
  { id: 'dhaka', name: 'Dhaka', lat: 23.8103, lon: 90.4125, population: '8.9M', lastFlood: '2020' },
  { id: 'mymensingh', name: 'Mymensingh', lat: 24.7471, lon: 90.4203, population: '500K', lastFlood: '2021' },
  { id: 'jamalpur', name: 'Jamalpur', lat: 24.9375, lon: 89.9403, population: '180K', lastFlood: '2021' },
  { id: 'tangail', name: 'Tangail', lat: 24.2513, lon: 89.9167, population: '350K', lastFlood: '2020' },
  { id: 'gazipur', name: 'Gazipur', lat: 24.0958, lon: 90.4125, population: '340K', lastFlood: '2020' },
  { id: 'narayanganj', name: 'Narayanganj', lat: 23.6238, lon: 90.5000, population: '300K', lastFlood: '2020' },
  { id: 'munshiganj', name: 'Munshiganj', lat: 23.4981, lon: 90.4127, population: '160K', lastFlood: '2021' },

  // Eastern regions
  { id: 'chittagong', name: 'Chittagong', lat: 22.3569, lon: 91.7832, population: '2.6M', lastFlood: '2021' },
  { id: 'coxsbazar', name: "Cox's Bazar", lat: 21.4272, lon: 92.0058, population: '230K', lastFlood: '2022' },
  { id: 'comilla', name: 'Comilla', lat: 23.4607, lon: 91.1809, population: '390K', lastFlood: '2020' },
  { id: 'brahmanbaria', name: 'Brahmanbaria', lat: 23.9608, lon: 91.1115, population: '200K', lastFlood: '2021' },
  { id: 'feni', name: 'Feni', lat: 23.0159, lon: 91.4070, population: '145K', lastFlood: '2021' },
  { id: 'noakhali', name: 'Noakhali', lat: 22.8696, lon: 91.0995, population: '180K', lastFlood: '2021' },

  // Southern regions
  { id: 'barisal', name: 'Barisal', lat: 22.7010, lon: 90.3535, population: '330K', lastFlood: '2022' },
  { id: 'patuakhali', name: 'Patuakhali', lat: 22.3596, lon: 90.3298, population: '220K', lastFlood: '2022' },
  { id: 'bhola', name: 'Bhola', lat: 22.6859, lon: 90.6482, population: '180K', lastFlood: '2022' },
  { id: 'pirojpur', name: 'Pirojpur', lat: 22.5791, lon: 89.9759, population: '125K', lastFlood: '2021' },

  // Southwestern regions
  { id: 'khulna', name: 'Khulna', lat: 22.8456, lon: 89.5403, population: '660K', lastFlood: '2021' },
  { id: 'satkhira', name: 'Satkhira', lat: 22.7185, lon: 89.0705, population: '200K', lastFlood: '2021' },
  { id: 'jessore', name: 'Jessore', lat: 23.1697, lon: 89.2118, population: '240K', lastFlood: '2020' },
  { id: 'kushtia', name: 'Kushtia', lat: 23.9013, lon: 89.1199, population: '280K', lastFlood: '2020' },
  { id: 'faridpur', name: 'Faridpur', lat: 23.6070, lon: 89.8429, population: '150K', lastFlood: '2021' },
  { id: 'madaripur', name: 'Madaripur', lat: 23.1641, lon: 90.1897, population: '125K', lastFlood: '2021' },
  { id: 'shariatpur', name: 'Shariatpur', lat: 23.2423, lon: 90.4348, population: '110K', lastFlood: '2021' },
];

interface FloodApiResponse {
  daily: {
    time: string[];
    river_discharge_mean: number[];
    river_discharge_max: number[];
    river_discharge_min: number[];
  };
}

// Calculate risk level based on river discharge (m³/s)
function calculateRiskLevel(discharge: number, maxDischarge: number): 'low' | 'medium' | 'high' | 'very-high' {
  const ratio = discharge / maxDischarge;

  if (ratio > 0.80) return 'very-high';
  if (ratio > 0.60) return 'high';
  if (ratio > 0.40) return 'medium';
  if (ratio > 0.40) return 'medium';
  return 'low';
}

const CACHE_duration = 5 * 60 * 1000; // 5 minutes
const cache: { [key: string]: { data: FloodRegion; timestamp: number } } = {};

async function fetchRegionFloodData(region: typeof BANGLADESH_REGIONS[0], forceRefresh = false): Promise<FloodRegion> {
  // Check cache first
  if (!forceRefresh) {
    const cached = cache[region.id];
    if (cached && Date.now() - cached.timestamp < CACHE_duration) {
      return cached.data;
    }
  }

  const url = `https://flood-api.open-meteo.com/v1/flood?latitude=${region.lat}&longitude=${region.lon}&daily=river_discharge_mean,river_discharge_max,river_discharge_min&forecast_days=7`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FloodApiResponse = await response.json();

    // Get today's data (first element in arrays)
    const currentDischarge = data.daily?.river_discharge_mean?.[0] ?? 0;

    // Safety check for empty data
    if (data.daily?.river_discharge_mean?.length === 0) {
      throw new Error("No discharge data available");
    }

    // Calculate max discharge over the forecast period (7 days) for relative risk
    // Default to 100 to avoid division by zero if all are 0
    const weekMaxDischarge = Math.max(...(data.daily?.river_discharge_max || [0]));
    const maxDischarge = weekMaxDischarge > 0 ? weekMaxDischarge : 100;

    const averageDischarge = (data.daily?.river_discharge_mean || []).reduce((a, b) => a + b, 0) / (data.daily?.river_discharge_mean?.length || 1);

    // Calculate rainfall estimate based on discharge (approximate)
    const rainfall = Math.round(currentDischarge * 2.5);

    // Use the 7-day max as the baseline for "high water" reference
    // IMPROVEMENT: Add minimum threshold. If discharge is very low (< 50 m3/s), risk is low regardless of ratio.
    let riskLevel: 'low' | 'medium' | 'high' | 'very-high' = 'low';

    if (currentDischarge > 50) {
      riskLevel = calculateRiskLevel(currentDischarge, maxDischarge);
    }

    const result: FloodRegion = {
      id: region.id,
      name: region.name,
      riskLevel,
      rainfall,
      lastFlood: region.lastFlood,
      population: region.population,
      currentDischarge: Math.round(currentDischarge * 10) / 10,
      averageDischarge: Math.round(averageDischarge * 10) / 10,
      maxDischarge: Math.round(maxDischarge * 10) / 10,
      forecastDate: data.daily.time[0],
      latitude: region.lat,
      longitude: region.lon,
    };

    // Update cache
    cache[region.id] = { data: result, timestamp: Date.now() };

    return result;
  } catch (error) {
    console.error(`Failed to fetch data for ${region.name}:`, error);

    // Return default data if API fails
    return {
      id: region.id,
      name: region.name,
      riskLevel: 'low',
      rainfall: 0,
      lastFlood: region.lastFlood,
      population: region.population,
      latitude: region.lat,
      longitude: region.lon,
    };
  }
}

export async function fetchFloodData(forceRefresh = false): Promise<FloodRegion[]> {
  const promises = BANGLADESH_REGIONS.map(region => fetchRegionFloodData(region, forceRefresh));
  return Promise.all(promises);
}