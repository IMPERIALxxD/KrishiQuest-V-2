import React from 'react';
import { Leaf, Calendar, TrendingUp } from 'lucide-react';
import { CropRecommendation } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface CropRecommendationsProps {
  recommendations: CropRecommendation[];
}

export const CropRecommendations: React.FC<CropRecommendationsProps> = ({ recommendations }) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Leaf className="h-5 w-5 mr-2 text-green-500" />
        {t('dashboard.recommendations')}
      </h3>
      
      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-800 flex items-center">
                <Leaf className="h-4 w-4 mr-2 text-green-600" />
                {crop.cropName}
              </h4>
              <span className="text-sm text-green-600 font-medium flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                {crop.expectedYield}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Plant: {new Date(crop.plantingDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Harvest: {new Date(crop.harvestDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="mt-3 p-3 bg-green-50 rounded-lg">
              <h5 className="font-medium text-green-800 mb-2">Optimal Conditions:</h5>
              <div className="grid grid-cols-3 gap-2 text-xs text-green-700">
                <div>
                  <strong>Temp:</strong> {crop.requirements.temperature}
                </div>
                <div>
                  <strong>Rain:</strong> {crop.requirements.rainfall}
                </div>
                <div>
                  <strong>Soil:</strong> {crop.requirements.soilType}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};