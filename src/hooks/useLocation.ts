
import { useState, useEffect } from 'react';

interface LocationData {
  lat: number;
  lng: number;
  city?: string;
  state?: string;
  error?: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Mock reverse geocoding - in real app, use proper service
          const mockCityMapping = [
            { lat: 28.7041, lng: 77.1025, city: 'Delhi', state: 'Delhi' },
            { lat: 19.0760, lng: 72.8777, city: 'Mumbai', state: 'Maharashtra' },
            { lat: 22.5726, lng: 88.3639, city: 'Kolkata', state: 'West Bengal' },
            { lat: 13.0827, lng: 80.2707, city: 'Chennai', state: 'Tamil Nadu' },
            { lat: 12.9716, lng: 77.5946, city: 'Bangalore', state: 'Karnataka' },
          ];

          // Find closest city (simplified)
          let closestCity = mockCityMapping[0];
          let minDistance = Math.abs(latitude - closestCity.lat) + Math.abs(longitude - closestCity.lng);

          mockCityMapping.forEach(city => {
            const distance = Math.abs(latitude - city.lat) + Math.abs(longitude - city.lng);
            if (distance < minDistance) {
              minDistance = distance;
              closestCity = city;
            }
          });

          setLocation({
            lat: latitude,
            lng: longitude,
            city: closestCity.city,
            state: closestCity.state
          });
        } catch (err) {
          setLocation({
            lat: latitude,
            lng: longitude,
            city: 'Unknown',
            state: 'Unknown'
          });
        }
        
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  return { location, loading, error, getCurrentLocation };
};
