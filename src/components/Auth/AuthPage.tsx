import React, { useState } from 'react';
import { Sprout } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { LanguageSelector } from '../LanguageSelector';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sprout className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Smart Farm</h1>
          <p className="text-gray-600 mt-2">
            Your intelligent farming companion
          </p>
        </div>
        
        {isLogin ? (
          <LoginForm onToggleMode={() => setIsLogin(false)} />
        ) : (
          <SignupForm onToggleMode={() => setIsLogin(true)} />
        )}
      </div>
    </div>
  );
};