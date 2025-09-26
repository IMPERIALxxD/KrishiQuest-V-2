import { useState, useEffect } from 'react';
import { WeatherData } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useWeatherData = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!user?.location) return;

      setLoading(true);
      try {
        // Simulate API call - in real app, use weather API like OpenWeatherMap
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockWeather: WeatherData = {
          temperature: 28,
          humidity: 65,
          rainfall: 2.5,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          forecast: [
            { date: '2024-01-15', temp: 30, condition: 'Sunny', rainfall: 0 },
            { date: '2024-01-16', temp: 27, condition: 'Cloudy', rainfall: 1.2 },
            { date: '2024-01-17', temp: 25, condition: 'Rainy', rainfall: 8.5 },
            { date: '2024-01-18', temp: 29, condition: 'Sunny', rainfall: 0 },
            { date: '2024-01-19', temp: 31, condition: 'Hot', rainfall: 0 }
          ]
        };
        
        setWeather(mockWeather);
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [user]);

  return { weather, loading };
};