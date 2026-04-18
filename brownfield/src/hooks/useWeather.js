import { useState, useEffect } from 'react';
import { getWeather } from '../utils/api';

// Custom hook — used by newer components
export function useWeather(lat, lon) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) {
      setLoading(false);
      setWeather(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);

    getWeather(lat, lon)
      .then((data) => {
        if (!cancelled) setWeather(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [lat, lon]);

  return { weather, loading, error };
}
