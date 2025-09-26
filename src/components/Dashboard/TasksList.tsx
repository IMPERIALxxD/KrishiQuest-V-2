import React from 'react';
import { CheckCircle, Circle, Calendar, Award } from 'lucide-react';
import { Task } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface TasksListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export const TasksList: React.FC<TasksListProps> = ({ tasks, onToggleTask }) => {
  const { t } = useLanguage();

  const getCategoryColor = (category: Task['category']) => {
    const colors = {
      planting: 'text-green-600 bg-green-100',
      watering: 'text-blue-600 bg-blue-100',
      fertilizing: 'text-yellow-600 bg-yellow-100',
      harvesting: 'text-orange-600 bg-orange-100',
      maintenance: 'text-purple-600 bg-purple-100'
    };
    return colors[category];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-green-500" />
        {t('dashboard.todayTasks')}
      </h3>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
              task.completed 
                ? 'bg-green-50 border-green-200' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <button
              onClick={() => onToggleTask(task.id)}
              className="flex-shrink-0"
            >
              {task.completed ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : (
                <Circle className="h-5 w-5 text-gray-400 hover:text-green-600" />
              )}
            </button>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className={`font-medium ${
                  task.completed ? 'text-green-700 line-through' : 'text-gray-800'
                }`}>
                  {task.title}
                </h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                  {t(`tasks.${task.category}`)}
                </span>
              </div>
              <p className={`text-sm mt-1 ${
                task.completed ? 'text-green-600' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <div className="flex items-center space-x-1 text-xs text-yellow-600">
                  <Award className="h-3 w-3" />
                  <span>+{task.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};