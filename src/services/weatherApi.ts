import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = 'de46d946b13240ee8ac154206252007';
const BASE_URL = 'https://api.weatherapi.com/v1';

class WeatherService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getCurrentWeatherAndForecast(city: string): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${this.apiKey}&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error('City not found. Please check the spelling and try again.');
        } else if (error.response?.status === 403) {
          throw new Error('API access denied. Please check your API key.');
        } else if (error.response?.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      throw new Error('Failed to fetch weather data. Please check your internet connection.');
    }
  }

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${this.apiKey}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          throw new Error('API access denied. Please check your API key.');
        } else if (error.response?.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.');
        }
      }
      throw new Error('Failed to fetch weather data using your location.');
    }
  }
}

export const weatherService = new WeatherService(API_KEY);