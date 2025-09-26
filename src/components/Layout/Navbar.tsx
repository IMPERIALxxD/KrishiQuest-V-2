import React from 'react';
import { Home, Cloud, Calendar, TrendingUp, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { LanguageSelector } from '../LanguageSelector';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  const navItems = [
    { id: 'dashboard', icon: Home, label: t('nav.dashboard') },
    { id: 'planning', icon: TrendingUp, label: t('nav.planning') },
    { id: 'weather', icon: Cloud, label: t('nav.weather') },
    { id: 'tasks', icon: Calendar, label: t('nav.tasks') },
    { id: 'progress', icon: User, label: t('nav.progress') }
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-green-600">🌱 Smart Farm</span>
            </div>
            
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-green-100 text-green-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-700">
                Welcome, {user?.name}
              </span>
              <button
                onClick={logout}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200">
        <div className="flex justify-around py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex flex-col items-center space-y-1 px-2 py-2 text-xs ${
                  activeTab === item.id
                    ? 'text-green-700'
                    : 'text-gray-600'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};