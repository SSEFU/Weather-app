import React, { createContext, useContext, useState } from 'react';
import { WeatherData, TemperatureUnit } from '../types/weather';

interface WeatherContextType {
  weatherData: WeatherData | null;
  setWeatherData: (data: WeatherData | null) => void;
  temperatureUnit: TemperatureUnit;
  toggleTemperatureUnit: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: React.ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<TemperatureUnit>(() => {
    const savedUnit = localStorage.getItem('weather-unit') as TemperatureUnit;
    return savedUnit || 'celsius';
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === 'celsius' ? 'fahrenheit' : 'celsius';
    setTemperatureUnit(newUnit);
    localStorage.setItem('weather-unit', newUnit);
  };

  return (
    <WeatherContext.Provider value={{
      weatherData,
      setWeatherData,
      temperatureUnit,
      toggleTemperatureUnit,
      isLoading,
      setIsLoading,
      error,
      setError
    }}>
      {children}
    </WeatherContext.Provider>
  );
};