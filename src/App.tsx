import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthPage } from './components/Auth/AuthPage';
import { Navbar } from './components/Layout/Navbar';
import { WeatherCard } from './components/Dashboard/WeatherCard';
import { TasksList } from './components/Dashboard/TasksList';
import { CropRecommendations } from './components/Dashboard/CropRecommendations';
import { FarmField } from './components/FarmProgress/FarmField';
import { useWeatherData } from './hooks/useWeatherData';
import { useFarmData } from './hooks/useFarmData';
import { useLanguage } from './contexts/LanguageContext';
import { Loader2 } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { weather, loading: weatherLoading } = useWeatherData();
  const { tasks, recommendations, progress, loading: farmLoading, toggleTask } = useFarmData();
  const { t } = useLanguage();

  if (weatherLoading || farmLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your farm data...</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {t('dashboard.welcome')}
              </h1>
              <p className="text-gray-600">
                Manage your farm with intelligent insights and recommendations
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {weather && <WeatherCard weather={weather} />}
              <TasksList tasks={tasks.slice(0, 5)} onToggleTask={toggleTask} />
            </div>
            
            <CropRecommendations recommendations={recommendations} />
          </div>
        );
      
      case 'planning':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.planning')}</h1>
            <CropRecommendations recommendations={recommendations} />
          </div>
        );
      
      case 'weather':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.weather')}</h1>
            {weather && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeatherCard weather={weather} />
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Day Forecast</h3>
                  <div className="space-y-3">
                    {weather.forecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{new Date(day.date).toLocaleDateString()}</p>
                          <p className="text-sm text-gray-600">{day.condition}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{day.temp}°C</p>
                          <p className="text-sm text-blue-600">{day.rainfall}mm</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'tasks':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.tasks')}</h1>
            <TasksList tasks={tasks} onToggleTask={toggleTask} />
          </div>
        );
      
      case 'progress':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">{t('nav.progress')}</h1>
            <FarmField progress={progress} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('progress.level')}</h3>
                <p className="text-3xl font-bold text-green-600">{progress.level}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('progress.xp')}</h3>
                <p className="text-3xl font-bold text-blue-600">{progress.xp}</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{t('progress.tasksCompleted')}</h3>
                <p className="text-3xl font-bold text-purple-600">
                  {progress.completedTasks}/{progress.totalTasks}
                </p>
              </div>
            </div>
            
            {progress.achievements.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                <div className="flex flex-wrap gap-2">
                  {progress.achievements.map((achievement, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium"
                    >
                      🏆 {achievement}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-green-600" />
      </div>
    );
  }

  return user ? <Dashboard /> : <AuthPage />;
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;