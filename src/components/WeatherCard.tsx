import React from 'react';
import { motion } from 'framer-motion';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun, 
  Sunset,
  Sunrise
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { formatTemperature, formatWind, formatPressure, formatVisibility, formatTime } from '../utils/formatters';

export const WeatherCard: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();

  if (!weatherData) return null;

  const { current, location } = weatherData;
  const todayForecast = weatherData.forecast.forecastday[0];

  const weatherMetrics = [
    {
      icon: Thermometer,
      label: 'Feels like',
      value: formatTemperature(current.feelslike_c, current.feelslike_f, temperatureUnit),
      color: 'text-orange-500'
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${current.humidity}%`,
      color: 'text-blue-500'
    },
    {
      icon: Wind,
      label: 'Wind',
      value: formatWind(current.wind_kph, current.wind_mph, temperatureUnit),
      color: 'text-cyan-500'
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: formatPressure(current.pressure_mb, current.pressure_in, temperatureUnit),
      color: 'text-purple-500'
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: formatVisibility(current.vis_km, current.vis_miles, temperatureUnit),
      color: 'text-green-500'
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: current.uv.toString(),
      color: 'text-yellow-500'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-2xl p-6 shadow-xl"
    >
      {/* Main Weather Info */}
      <div className="text-center mb-8">
        <motion.h1 
          className="text-2xl font-bold text-slate-800 dark:text-white mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {location.name}, {location.country}
        </motion.h1>
        
        <motion.div 
          className="flex items-center justify-center gap-4 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <img 
            src={`https:${current.condition.icon}`} 
            alt={current.condition.text}
            className="w-20 h-20"
          />
          <div>
            <div className="text-5xl font-bold text-slate-800 dark:text-white">
              {formatTemperature(current.temp_c, current.temp_f, temperatureUnit)}
            </div>
            <div className="text-lg text-slate-700 dark:text-slate-300 capitalize">
              {current.condition.text}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Weather Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {weatherMetrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-slate-200 dark:border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center gap-3">
              <metric.icon className={`w-5 h-5 ${metric.color}`} />
              <div>
                <div className="text-sm text-slate-700 dark:text-slate-400">
                  {metric.label}
                </div>
                <div className="font-semibold text-slate-800 dark:text-white">
                  {metric.value}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Sun Times */}
      <motion.div
        className="flex justify-center gap-8 pt-4 border-t border-slate-200 dark:border-white/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Sunrise className="w-5 h-5 text-orange-400" />
          <span className="text-sm">Sunrise</span>
          <span className="font-medium">{formatTime(todayForecast.astro.sunrise)}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
          <Sunset className="w-5 h-5 text-orange-600" />
          <span className="text-sm">Sunset</span>
          <span className="font-medium">{formatTime(todayForecast.astro.sunset)}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};