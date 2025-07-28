import React, { useState } from 'react';
import { Search, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { weatherService } from '../services/weatherApi';
import { useWeather } from '../context/WeatherContext';
import { useGeolocation } from '../hooks/useGeolocation';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { SearchHistory } from '../types/weather';
import { LoadingSpinner } from './LoadingSpinner';

export const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { setWeatherData, setIsLoading, setError } = useWeather();
  const { getCurrentPosition, loading: geoLoading, error: geoError, latitude, longitude } = useGeolocation();
  const [searchHistory, setSearchHistory] = useLocalStorage<SearchHistory[]>('weather-search-history', []);

  const handleSearch = async (city: string) => {
    if (!city.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getCurrentWeatherAndForecast(city);
      setWeatherData(data);
      
      // Add to search history
      const newEntry: SearchHistory = {
        id: Date.now().toString(),
        city: data.location.name,
        timestamp: Date.now(),
      };
      
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.city.toLowerCase() !== city.toLowerCase());
        return [newEntry, ...filtered].slice(0, 5); // Keep only 5 recent searches
      });
      
      setQuery('');
      setShowHistory(false);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeolocationWeather = async (lat: number, lon: number) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await weatherService.getCurrentWeatherByCoords(lat, lon);
      setWeatherData(data);
      
      // Add to search history
      const newEntry: SearchHistory = {
        id: Date.now().toString(),
        city: `${data.location.name}, ${data.location.country}`,
        timestamp: Date.now(),
      };
      
      setSearchHistory(prev => {
        const filtered = prev.filter(item => item.city.toLowerCase() !== newEntry.city.toLowerCase());
        return [newEntry, ...filtered].slice(0, 5);
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data for your location');
    } finally {
      setIsLoading(false);
    }
  };
  const handleGeolocation = async () => {
    getCurrentPosition();
  };

  // Effect to handle successful geolocation
  React.useEffect(() => {
    if (latitude !== null && longitude !== null && !geoLoading) {
      handleGeolocationWeather(latitude, longitude);
    }
  }, [latitude, longitude, geoLoading]);
  // Effect to handle geolocation errors
  React.useEffect(() => {
    if (geoError) {
      setError(geoError);
    }
  }, [geoError, setError]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleHistorySelect = (city: string) => {
    handleSearch(city);
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            placeholder="Search for a city..."
            className="w-full pl-12 pr-16 py-3 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 rounded-lg 
                     text-slate-900 dark:text-white placeholder-slate-600 dark:placeholder-slate-400
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-500/50 focus:border-blue-500 dark:focus:border-blue-500/50
                     transition-colors"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-600 dark:text-slate-400" />
          <motion.button
            type="button"
            onClick={handleGeolocation}
            disabled={geoLoading}
            title="Use current location"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md
                     text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400
                     hover:bg-slate-100 dark:hover:bg-white/10 transition-colors disabled:opacity-50"
            
            whileTap={{ scale: 0.95 }}
          >
            {geoLoading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <MapPin className="w-5 h-5" />
            )}
          </motion.button>
        </motion.div>
      </form>

      <AnimatePresence>
        {showHistory && searchHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white/10 backdrop-blur-sm border border-white/20 
                     rounded-lg shadow-lg z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-white/10">
              <span className="text-sm text-slate-700 dark:text-slate-400 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Recent searches
              </span>
            </div>
            {searchHistory.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => handleHistorySelect(item.city)}
                className="w-full px-4 py-2 text-left text-slate-800 dark:text-slate-300 bg-white/90 dark:bg-transparent
                         hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {item.city}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};