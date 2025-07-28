import { TemperatureUnit } from '../types/weather';

export const formatTemperature = (tempC: number, tempF: number, unit: TemperatureUnit): string => {
  return unit === 'celsius' ? `${Math.round(tempC)}°C` : `${Math.round(tempF)}°F`;
};

export const formatWind = (speedKph: number, speedMph: number, unit: TemperatureUnit): string => {
  const speed = unit === 'celsius' ? speedKph : speedMph;
  const unitLabel = unit === 'celsius' ? 'km/h' : 'mph';
  return `${Math.round(speed)} ${unitLabel}`;
};

export const formatPressure = (pressureMb: number, pressureIn: number, unit: TemperatureUnit): string => {
  return unit === 'celsius' ? `${pressureMb} mb` : `${pressureIn} in`;
};

export const formatVisibility = (visKm: number, visMiles: number, unit: TemperatureUnit): string => {
  return unit === 'celsius' ? `${visKm} km` : `${visMiles} mi`;
};

export const formatTime = (timeString: string): string => {
  const time = new Date(`2000-01-01 ${timeString}`);
  return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString([], { weekday: 'long' });
  }
};