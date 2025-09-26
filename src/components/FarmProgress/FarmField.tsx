import React from 'react';
import { FarmProgress } from '../../types';

interface FarmFieldProps {
  progress: FarmProgress;
}

export const FarmField: React.FC<FarmFieldProps> = ({ progress }) => {
  const getFieldStage = (level: number) => {
    if (level < 5) return 'seedling';
    if (level < 10) return 'growing';
    if (level < 15) return 'flowering';
    return 'mature';
  };

  const stage = getFieldStage(progress.level);
  const progressPercentage = (progress.xp / progress.xpToNextLevel) * 100;

  return (
    <div className="bg-gradient-to-b from-sky-200 to-green-200 rounded-lg p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-green-300 to-transparent opacity-50"></div>
      
      {/* Sun */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full shadow-lg animate-pulse"></div>
      
      {/* Clouds */}
      <div className="absolute top-6 left-8 w-8 h-4 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-8 left-12 w-6 h-3 bg-white rounded-full opacity-60"></div>
      
      {/* Farm Field */}
      <div className="relative z-10 mt-16">
        <div className="grid grid-cols-8 gap-2 mb-4">
          {Array.from({ length: 32 }, (_, i) => (
            <div key={i} className="relative">
              {/* Soil */}
              <div className="w-full h-8 bg-amber-800 rounded-sm"></div>
              
              {/* Crops based on progress */}
              {i < Math.floor((progress.completedTasks / progress.totalTasks) * 32) && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  {stage === 'seedling' && (
                    <div className="w-2 h-3 bg-green-400 rounded-t-full"></div>
                  )}
                  {stage === 'growing' && (
                    <div className="w-3 h-6 bg-green-500 rounded-t-lg relative">
                      <div className="absolute -left-1 top-1 w-2 h-2 bg-green-400 rounded-full"></div>
                      <div className="absolute -right-1 top-2 w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  )}
                  {stage === 'flowering' && (
                    <div className="w-4 h-8 bg-green-600 rounded-t-lg relative">
                      <div className="absolute -left-1 top-0 w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute -right-1 top-1 w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-pink-400 rounded-full"></div>
                    </div>
                  )}
                  {stage === 'mature' && (
                    <div className="w-5 h-10 bg-green-700 rounded-t-lg relative">
                      <div className="absolute -left-1 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                      <div className="absolute -right-1 top-1 w-4 h-4 bg-green-600 rounded-full"></div>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="absolute top-2 left-0 w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="absolute top-2 right-0 w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress Bar */}
        <div className="bg-white bg-opacity-80 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Farm Progress</span>
            <span className="text-sm text-gray-600">
              Level {progress.level} ({progress.completedTasks}/{progress.totalTasks} tasks)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-600">
            <span>{progress.xp} XP</span>
            <span>{progress.xpToNextLevel - progress.xp} XP to next level</span>
          </div>
        </div>
      </div>
    </div>
  );
};