import React from 'react';
import { motion } from 'framer-motion';
import { useWeather } from '../context/WeatherContext';
import { formatTemperature } from '../utils/formatters';

export const HourlyForecast: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();

  if (!weatherData) return null;

  const todayHours = weatherData.forecast.forecastday[0].hour;
  const currentHour = new Date().getHours();
  
  // Get next 24 hours starting from current hour
  const nextHours = todayHours.slice(currentHour).concat(
    weatherData.forecast.forecastday[1]?.hour.slice(0, currentHour) || []
  ).slice(0, 24);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-2xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        24-Hour Forecast
      </h2>
      
      <div className="overflow-x-auto">
        <div className="flex gap-4 pb-2" style={{ width: 'max-content' }}>
          {nextHours.map((hour, index) => {
            const time = new Date(hour.time);
            const isCurrentHour = index === 0;
            
            return (
              <motion.div
                key={hour.time}
                className={`flex-shrink-0 text-center p-3 rounded-lg border ${
                  isCurrentHour 
                    ? 'bg-blue-500/20 border-blue-500/30' 
                    : 'bg-white/60 dark:bg-white/5 border-slate-200 dark:border-white/10'
                } min-w-[80px]`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm text-slate-700 dark:text-slate-400 mb-2">
                  {isCurrentHour ? 'Now' : time.toLocaleTimeString([], { 
                    hour: 'numeric',
                    hour12: true 
                  })}
                </div>
                
                <motion.img
                  src={`https:${hour.condition.icon}`}
                  alt={hour.condition.text}
                  className="w-8 h-8 mx-auto mb-2"
                  whileHover={{ scale: 1.2 }}
                />
                
                <div className="font-semibold text-slate-800 dark:text-white text-sm">
                  {formatTemperature(hour.temp_c, hour.temp_f, temperatureUnit)}
                </div>
                
                <div className="text-xs text-blue-400 mt-1">
                  {hour.chance_of_rain}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};