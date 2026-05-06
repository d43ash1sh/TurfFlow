import { useState, useCallback } from 'react';

interface Location {
  lat: number;
  lng: number;
}

export const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`
      );
      const data = await response.json();
      const addr = data.address;
      
      // Build a precise location string
      const parts = [];
      const main = addr.suburb || addr.neighbourhood || addr.road || addr.village || addr.town;
      const secondary = addr.city || addr.county || addr.state;
      
      if (main) parts.push(main);
      if (secondary && secondary !== main) parts.push(secondary);
      
      if (parts.length > 0) {
        setCity(parts.join(', '));
      }
    } catch (err) {
      console.error('Failed to fetch address:', err);
    }
  };

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
        fetchAddress(latitude, longitude).finally(() => setLoading(false));
      },
      (err) => {
        let message = 'An unknown error occurred';
        if (err.code === 1) message = 'Permission denied. Please enable location in settings.';
        else if (err.code === 2) message = 'Location unavailable.';
        else if (err.code === 3) message = 'Timeout while fetching location.';
        
        setError(message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  return { location, city, loading, error, requestLocation };
};
