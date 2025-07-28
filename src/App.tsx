import React from 'react';
import { motion } from 'framer-motion';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import { HourlyForecast } from './components/HourlyForecast';
import { DailyForecast } from './components/DailyForecast';
import { TemperatureChart } from './components/charts/TemperatureChart';
import { PrecipitationChart } from './components/charts/PrecipitationChart';
import { ThemeToggle } from './components/ThemeToggle';
import { TemperatureToggle } from './components/TemperatureToggle';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ThemeProvider } from './context/ThemeContext';
import { WeatherProvider, useWeather } from './context/WeatherContext';

const WeatherDashboard: React.FC = () => {
  const { weatherData, isLoading, error, setError } = useWeather();

  const handleRetry = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900 transition-colors duration-300">
      <div className="min-h-screen backdrop-blur-sm bg-white/5 dark:bg-black/20">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.header
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <SearchBar />
            </div>
            <div className="flex items-center gap-3">
              <TemperatureToggle />
              <ThemeToggle />
            </div>
          </motion.header>

          {/* Loading State */}
          {isLoading && (
            <motion.div
              className="flex items-center justify-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center">
                <LoadingSpinner size="lg" className="mb-4" />
                <p className="text-slate-700 dark:text-slate-300">
                  Loading weather data...
                </p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          )}

          {/* Welcome Screen */}
          {!weatherData && !isLoading && !error && <WelcomeScreen />}

          {/* Weather Content */}
          {weatherData && !isLoading && (
            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Left Column - Main Weather & Hourly */}
              <div className="lg:col-span-2 space-y-6">
                <WeatherCard />
                <HourlyForecast />
                <div className="grid grid-cols-1 xl:grid-cols-1 gap-6">
                  <TemperatureChart />
                  <PrecipitationChart />
                </div>
              </div>

              {/* Right Column - Daily Forecast */}
              <div className="space-y-6">
                <DailyForecast />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <WeatherDashboard />
      </WeatherProvider>
    </ThemeProvider>
  );
}

export default App;