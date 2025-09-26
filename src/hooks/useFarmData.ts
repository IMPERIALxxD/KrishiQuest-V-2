import { useState, useEffect } from 'react';
import { Task, CropRecommendation, FarmProgress } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useFarmData = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [progress, setProgress] = useState<FarmProgress>({
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    completedTasks: 0,
    totalTasks: 0,
    achievements: []
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchFarmData = async () => {
      if (!user) return;

      setLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Water the wheat field',
            description: 'Morning irrigation for section A',
            dueDate: new Date().toISOString(),
            completed: false,
            category: 'watering',
            xpReward: 10
          },
          {
            id: '2',
            title: 'Apply fertilizer to tomatoes',
            description: 'NPK fertilizer application',
            dueDate: new Date(Date.now() + 86400000).toISOString(),
            completed: false,
            category: 'fertilizing',
            xpReward: 15
          },
          {
            id: '3',
            title: 'Harvest carrots',
            description: 'Ready for harvest in section B',
            dueDate: new Date().toISOString(),
            completed: true,
            category: 'harvesting',
            xpReward: 20
          },
          {
            id: '4',
            title: 'Plant new seeds',
            description: 'Sow winter vegetables',
            dueDate: new Date(Date.now() + 172800000).toISOString(),
            completed: false,
            category: 'planting',
            xpReward: 25
          }
        ];

        const mockRecommendations: CropRecommendation[] = [
          {
            cropName: 'Winter Wheat',
            plantingDate: '2024-01-20',
            harvestDate: '2024-05-15',
            expectedYield: '4.5 tons/hectare',
            requirements: {
              temperature: '15-25°C',
              rainfall: '400-600mm',
              soilType: 'Loamy'
            },
            tasks: []
          },
          {
            cropName: 'Mustard',
            plantingDate: '2024-01-25',
            harvestDate: '2024-04-10',
            expectedYield: '1.2 tons/hectare',
            requirements: {
              temperature: '18-28°C',
              rainfall: '300-500mm',
              soilType: 'Sandy loam'
            },
            tasks: []
          }
        ];

        const completedCount = mockTasks.filter(task => task.completed).length;
        const totalXp = mockTasks.filter(task => task.completed).reduce((sum, task) => sum + task.xpReward, 0);
        
        const mockProgress: FarmProgress = {
          level: Math.floor(totalXp / 100) + 1,
          xp: totalXp,
          xpToNextLevel: (Math.floor(totalXp / 100) + 1) * 100,
          completedTasks: completedCount,
          totalTasks: mockTasks.length,
          achievements: completedCount > 0 ? ['First Harvest'] : []
        };

        setTasks(mockTasks);
        setRecommendations(mockRecommendations);
        setProgress(mockProgress);
      } catch (error) {
        console.error('Failed to fetch farm data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFarmData();
  }, [user]);

  const toggleTask = (taskId: string) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          
          // Update progress
          setProgress(prevProgress => {
            const completedCount = updatedTasks.filter(t => t.completed).length;
            const totalXp = updatedTasks.filter(t => t.completed).reduce((sum, t) => sum + t.xpReward, 0);
            
            return {
              ...prevProgress,
              xp: totalXp,
              level: Math.floor(totalXp / 100) + 1,
              xpToNextLevel: (Math.floor(totalXp / 100) + 1) * 100,
              completedTasks: completedCount
            };
          });
          
          return updatedTask;
        }
        return task;
      });
      
      return updatedTasks;
    });
  };

  return { tasks, recommendations, progress, loading, toggleTask };
};