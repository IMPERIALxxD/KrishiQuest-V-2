import React from 'react';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Cloud className="h-5 w-5 mr-2 text-blue-500" />
        {t('dashboard.weatherToday')}
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <Thermometer className="h-5 w-5 text-red-500" />
          <div>
            <p className="text-sm text-gray-600">{t('weather.temperature')}</p>
            <p className="text-lg font-semibold">{weather.temperature}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Droplets className="h-5 w-5 text-blue-500" />
          <div>
            <p className="text-sm text-gray-600">{t('weather.humidity')}</p>
            <p className="text-lg font-semibold">{weather.humidity}%</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Droplets className="h-5 w-5 text-cyan-500" />
          <div>
            <p className="text-sm text-gray-600">{t('weather.rainfall')}</p>
            <p className="text-lg font-semibold">{weather.rainfall}mm</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Wind className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm text-gray-600">{t('weather.windSpeed')}</p>
            <p className="text-lg font-semibold">{weather.windSpeed} km/h</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Condition:</strong> {weather.condition}
        </p>
      </div>
    </div>
  );
};