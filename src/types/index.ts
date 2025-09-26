export interface User {
  id: string;
  email: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    country: string;
  };
  farmSize?: number;
  cropTypes?: string[];
  experience?: string;
  createdAt: string;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  condition: string;
  forecast: {
    date: string;
    temp: number;
    condition: string;
    rainfall: number;
  }[];
}

export interface CropRecommendation {
  cropName: string;
  plantingDate: string;
  harvestDate: string;
  expectedYield: string;
  requirements: {
    temperature: string;
    rainfall: string;
    soilType: string;
  };
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  category: 'planting' | 'watering' | 'fertilizing' | 'harvesting' | 'maintenance';
  xpReward: number;
}

export interface FarmProgress {
  level: number;
  xp: number;
  xpToNextLevel: number;
  completedTasks: number;
  totalTasks: number;
  achievements: string[];
}

export type Language = 'en' | 'hi' | 'mr' | 'gu';

export interface Translation {
  [key: string]: {
    [K in Language]: string;
  };
}