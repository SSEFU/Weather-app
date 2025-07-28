import React from 'react';
import { Bar } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useWeather } from '../../context/WeatherContext';
import { useTheme } from '../../context/ThemeContext';
import { getDayName } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PrecipitationChart: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();
  const { theme } = useTheme();

  if (!weatherData) return null;

  const forecast = weatherData.forecast.forecastday;
  
  const labels = forecast.map(day => getDayName(day.date));
  const rainChance = forecast.map(day => day.day.daily_chance_of_rain);
  const windSpeed = forecast.map(day => 
    temperatureUnit === 'celsius' ? day.day.maxwind_kph : day.day.maxwind_mph
  );

  const isDark = theme === 'dark';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const gridColor = isDark ? '#374151' : '#cbd5e1';

  const data = {
    labels,
    datasets: [
      {
        label: 'Rain Chance (%)',
        data: rainChance,
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: '#3b82f6',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y',
      },
      {
        label: `Wind Speed (${temperatureUnit === 'celsius' ? 'km/h' : 'mph'})`,
        data: windSpeed,
        backgroundColor: 'rgba(34, 197, 94, 0.7)',
        borderColor: '#22c55e',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y1',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : '#ffffff',
        titleColor: textColor,
        bodyColor: textColor,
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label;
            if (label.includes('Rain')) {
              return `${label}: ${context.parsed.y}%`;
            }
            return `${label}: ${context.parsed.y} ${temperatureUnit === 'celsius' ? 'km/h' : 'mph'}`;
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
        },
      },
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        max: 100,
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return `${value}%`;
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: textColor,
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return `${value} ${temperatureUnit === 'celsius' ? 'km/h' : 'mph'}`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-2xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        Rain & Wind Forecast
      </h2>
      
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </motion.div>
  );
};