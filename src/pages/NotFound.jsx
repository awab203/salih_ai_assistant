import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/authentication-screen');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface to-background">
        <div className="absolute inset-0 opacity-20">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        {/* IntelliCore Sphere */}
        <div className="mb-8 flex justify-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 bg-gradient-primary rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute inset-2 bg-gradient-primary rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute inset-4 bg-gradient-primary rounded-full opacity-60 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute inset-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary">
              <Icon name="AlertTriangle" size={32} color="white" strokeWidth={2} />
            </div>
          </div>
        </div>

        {/* Error Code */}
        <div className="mb-6">
          <h1 className="text-8xl font-bold text-gradient-primary mb-2">404</h1>
          <div className="h-1 w-24 bg-gradient-primary mx-auto rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-text-primary mb-4">
            Neural Pathway Not Found
          </h2>
          <p className="text-text-secondary text-lg leading-relaxed">
            The requested resource has drifted beyond the IntelliCore network. 
            Our AI systems are unable to locate the specified pathway in the current reality matrix.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="flex items-center space-x-3 px-8 py-4 bg-gradient-primary text-white rounded-xl font-semibold shadow-glow-primary hover:scale-105 transition-all duration-300"
          >
            <Icon name="Home" size={20} strokeWidth={2} />
            <span>Return to Base</span>
          </button>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-3 px-8 py-4 bg-surface border border-white/20 text-text-primary rounded-xl font-semibold hover:bg-surface-light transition-all duration-300"
          >
            <Icon name="ArrowLeft" size={20} strokeWidth={2} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-surface/50 backdrop-blur-sm rounded-xl border border-white/10">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <Icon name="Info" size={18} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">System Status</span>
          </div>
          <p className="text-xs text-text-secondary">
            IntelliCore AI is operating normally. All primary systems are online and responsive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;