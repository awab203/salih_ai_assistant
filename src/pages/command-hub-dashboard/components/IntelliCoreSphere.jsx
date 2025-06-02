import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const IntelliCoreSphere = ({ status = 'optimal' }) => {
  const [pulseIntensity, setPulseIntensity] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [aiThoughts, setAiThoughts] = useState([]);

  const statusConfig = {
    optimal: {
      color: 'text-accent',
      bgColor: 'bg-accent',
      glowColor: 'shadow-glow-primary',
      pulseSpeed: 2000,
      message: 'All systems optimal'
    },
    warning: {
      color: 'text-warning',
      bgColor: 'bg-warning',
      glowColor: 'shadow-glow-secondary',
      pulseSpeed: 1500,
      message: 'Minor issues detected'
    },
    critical: {
      color: 'text-error',
      bgColor: 'bg-error',
      glowColor: 'shadow-glow-primary',
      pulseSpeed: 1000,
      message: 'Critical attention needed'
    },
    thinking: {
      color: 'text-primary',
      bgColor: 'bg-primary',
      glowColor: 'shadow-glow-primary',
      pulseSpeed: 800,
      message: 'Processing your request'
    }
  };

  const thoughts = [
    "Analyzing system performance patterns...",
    "Optimizing workflow efficiency...",
    "Learning from your study habits...",
    "Monitoring business metrics...",
    "Preparing personalized insights...",
    "Scanning for improvement opportunities...",
    "Processing environmental data...",
    "Updating knowledge base..."
  ];

  useEffect(() => {
    const config = statusConfig[status];
    
    // Pulse animation
    const pulseInterval = setInterval(() => {
      setPulseIntensity(prev => prev === 1 ? 1.2 : 1);
    }, config.pulseSpeed);

    // Rotation animation
    const rotationInterval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 50);

    // AI thoughts rotation
    const thoughtInterval = setInterval(() => {
      const randomThought = thoughts[Math.floor(Math.random() * thoughts.length)];
      setAiThoughts(prev => {
        const newThoughts = [randomThought, ...prev.slice(0, 2)];
        return newThoughts;
      });
    }, 4000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(rotationInterval);
      clearInterval(thoughtInterval);
    };
  }, [status]);

  const config = statusConfig[status];

  return (
    <div className="flex flex-col items-center">
      {/* Main Sphere */}
      <div className="relative mb-4">
        {/* Outer Ring */}
        <div 
          className={`w-24 h-24 rounded-full border-2 border-white/20 ${config.glowColor} transition-all duration-300`}
          style={{ 
            transform: `scale(${pulseIntensity}) rotate(${rotationAngle}deg)`,
            filter: `brightness(${pulseIntensity})`
          }}
        >
          {/* Inner Rings */}
          <div className={`absolute inset-2 rounded-full border border-white/30 ${config.bgColor} opacity-20`}></div>
          <div className={`absolute inset-4 rounded-full border border-white/40 ${config.bgColor} opacity-40`}></div>
          
          {/* Core */}
          <div className={`absolute inset-6 rounded-full ${config.bgColor} flex items-center justify-center`}>
            <Icon 
              name="Zap" 
              size={16} 
              color="white" 
              strokeWidth={2}
              className="animate-pulse"
            />
          </div>

          {/* Orbital Elements */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 ${config.bgColor} rounded-full opacity-60`}
              style={{
                top: '50%',
                left: '50%',
                transform: `translate(-50%, -50%) rotate(${rotationAngle + (i * 120)}deg) translateY(-${20 + (i * 5)}px)`,
                animationDelay: `${i * 0.5}s`
              }}
            ></div>
          ))}
        </div>

        {/* Status Indicator */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className={`w-3 h-3 ${config.bgColor} rounded-full animate-pulse`}></div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center mb-4">
        <h4 className="text-sm font-semibold text-text-primary mb-1">IntelliCore</h4>
        <p className={`text-xs ${config.color} font-medium`}>
          {config.message}
        </p>
      </div>

      {/* AI Thoughts */}
      <div className="w-full">
        <h5 className="text-xs font-medium text-text-secondary mb-2 text-center">
          AI Activity
        </h5>
        <div className="space-y-1 max-h-16 overflow-hidden">
          {aiThoughts.slice(0, 2).map((thought, index) => (
            <div
              key={index}
              className={`text-xs text-text-tertiary text-center transition-all duration-500 ${
                index === 0 ? 'opacity-100' : 'opacity-50'
              }`}
              style={{
                transform: `translateY(${index * 100}%)`,
                animation: index === 0 ? 'fadeInUp 0.5s ease-out' : 'none'
              }}
            >
              {thought}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="w-full mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div>
            <p className="text-xs text-text-tertiary">Uptime</p>
            <p className="text-sm font-bold text-text-primary">24h 15m</p>
          </div>
          <div>
            <p className="text-xs text-text-tertiary">Tasks</p>
            <p className="text-sm font-bold text-text-primary">127</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelliCoreSphere;