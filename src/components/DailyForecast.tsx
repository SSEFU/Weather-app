import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { formatTemperature, getDayName } from '../utils/formatters';

export const DailyForecast: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();

  if (!weatherData) return null;

  const forecast = weatherData.forecast.forecastday;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-2xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        7-Day Forecast
      </h2>
      
      <div className="space-y-3">
        {forecast.map((day, index) => (
          <motion.div
            key={day.date}
            className="flex items-center justify-between p-3 rounded-lg bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10
                     hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 text-sm font-medium text-slate-800 dark:text-slate-300">
                {getDayName(day.date)}
              </div>
              
              <motion.img
                src={`https:${day.day.condition.icon}`}
                alt={day.day.condition.text}
                className="w-8 h-8"
                whileHover={{ scale: 1.2 }}
              />
              
              <div className="flex-1">
                <div className="text-sm text-slate-700 dark:text-slate-400 capitalize">
                  {day.day.condition.text}
                </div>
                <div className="text-xs text-blue-400">
                  {day.day.daily_chance_of_rain}% rain
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-slate-700 dark:text-slate-400 text-sm">
                {formatTemperature(day.day.mintemp_c, day.day.mintemp_f, temperatureUnit)}
              </span>
              <span className="font-semibold text-slate-800 dark:text-white">
                {formatTemperature(day.day.maxtemp_c, day.day.maxtemp_f, temperatureUnit)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};