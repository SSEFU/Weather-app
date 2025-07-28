import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';

export const TemperatureToggle: React.FC = () => {
  const { temperatureUnit, toggleTemperatureUnit } = useWeather();

  return (
    <motion.div
      className="relative bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-300 dark:border-white/20 rounded-lg p-1 flex"
      whileHover={{ scale: 1.02 }}
    >
      <motion.button
        onClick={() => temperatureUnit === 'fahrenheit' && toggleTemperatureUnit()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          temperatureUnit === 'celsius'
            ? 'bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        °C
      </motion.button>
      <motion.button
        onClick={() => temperatureUnit === 'celsius' && toggleTemperatureUnit()}
        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
          temperatureUnit === 'fahrenheit'
            ? 'bg-slate-200 dark:bg-white/20 text-slate-900 dark:text-white shadow-sm'
            : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
        }`}
        whileTap={{ scale: 0.95 }}
      >
        °F
      </motion.button>
    </motion.div>
  );
};