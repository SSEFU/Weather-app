import React from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { useWeather } from '../../context/WeatherContext';
import { useTheme } from '../../context/ThemeContext';
import { getDayName } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const TemperatureChart: React.FC = () => {
  const { weatherData, temperatureUnit } = useWeather();
  const { theme } = useTheme();

  if (!weatherData) return null;

  const forecast = weatherData.forecast.forecastday;
  
  const labels = forecast.map(day => getDayName(day.date));
  const maxTemps = forecast.map(day => 
    temperatureUnit === 'celsius' ? day.day.maxtemp_c : day.day.maxtemp_f
  );
  const minTemps = forecast.map(day => 
    temperatureUnit === 'celsius' ? day.day.mintemp_c : day.day.mintemp_f
  );

  const isDark = theme === 'dark';
  const textColor = isDark ? '#e2e8f0' : '#1e293b';
  const gridColor = isDark ? '#374151' : '#cbd5e1';

  const data = {
    labels,
    datasets: [
      {
        label: `Max Temperature (°${temperatureUnit === 'celsius' ? 'C' : 'F'})`,
        data: maxTemps,
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: 'origin',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
      },
      {
        label: `Min Temperature (°${temperatureUnit === 'celsius' ? 'C' : 'F'})`,
        data: minTemps,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: 'origin',
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
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
            return `${context.dataset.label}: ${context.parsed.y}°${temperatureUnit === 'celsius' ? 'C' : 'F'}`;
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
            return `${value}°${temperatureUnit === 'celsius' ? 'C' : 'F'}`;
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#ffffff',
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
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-slate-200 dark:border-white/20 rounded-2xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
        Temperature Trend
      </h2>
      
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};