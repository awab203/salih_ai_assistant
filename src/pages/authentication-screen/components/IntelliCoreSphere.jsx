import React, { useEffect, useState } from 'react';
import Icon from 'components/AppIcon';

const IntelliCoreSphere = ({ state }) => {
  const [rotation, setRotation] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    switch (state) {
      case 'processing':
        setPulseIntensity(2);
        break;
      case 'success':
        setPulseIntensity(3);
        break;
      case 'active':
        setPulseIntensity(1.5);
        break;
      default:
        setPulseIntensity(1);
    }
  }, [state]);

  const getSphereColor = () => {
    switch (state) {
      case 'processing': return 'from-warning to-warning-600';
      case 'success': return 'from-accent to-accent-600';
      case 'active': return 'from-primary to-secondary';
      default: return 'from-text-quaternary to-text-tertiary';
    }
  };

  const getSphereIcon = () => {
    switch (state) {
      case 'processing': return 'Loader2';
      case 'success': return 'CheckCircle';
      case 'active': return 'Zap';
      default: return 'Circle';
    }
  };

  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Outer Rings */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`absolute rounded-full border-2 opacity-20 ${
            state === 'processing' ? 'animate-spin' : ''
          }`}
          style={{
            width: `${200 + i * 20}px`,
            height: `${200 + i * 20}px`,
            borderColor: state === 'processing' ? '#F59E0B' : 
                        state === 'success' ? '#10B981' : 
                        state === 'active' ? '#00D4FF' : '#64748B',
            transform: `rotate(${rotation * (i + 1) * 0.5}deg)`,
            animationDuration: `${4 + i}s`
          }}
        />
      ))}

      {/* Pulse Rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          className={`absolute rounded-full bg-gradient-to-r ${getSphereColor()} opacity-10 animate-ping`}
          style={{
            width: `${160 + i * 40}px`,
            height: `${160 + i * 40}px`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${2 + i * 0.5}s`
          }}
        />
      ))}

      {/* Main Sphere */}
      <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${getSphereColor()} shadow-2xl flex items-center justify-center`}
           style={{
             boxShadow: state === 'processing' ? '0 0 60px rgba(245, 158, 11, 0.5)' :
                       state === 'success' ? '0 0 60px rgba(16, 185, 129, 0.5)' :
                       state === 'active' ? '0 0 60px rgba(0, 212, 255, 0.5)' :
                       '0 0 30px rgba(100, 116, 139, 0.3)',
             transform: `scale(${1 + (pulseIntensity - 1) * 0.1 * Math.sin(rotation * 0.1)})`
           }}>
        
        {/* Inner Glow */}
        <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${getSphereColor()} opacity-60`} />
        
        {/* Core */}
        <div className="relative z-10">
          <Icon 
            name={getSphereIcon()} 
            size={40} 
            color="white" 
            strokeWidth={2}
            className={state === 'processing' ? 'animate-spin' : state === 'success' ? 'animate-bounce' : ''}
          />
        </div>

        {/* Floating Particles */}
        {state === 'active' && [...Array(8)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-ping"
            style={{
              left: `${50 + 30 * Math.cos((rotation + i * 45) * Math.PI / 180)}%`,
              top: `${50 + 30 * Math.sin((rotation + i * 45) * Math.PI / 180)}%`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Data Streams */}
      {state === 'processing' && (
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={`stream-${i}`}
              className="absolute w-px h-8 bg-gradient-to-t from-transparent to-warning opacity-60 animate-pulse"
              style={{
                left: `${50 + 40 * Math.cos((rotation * 2 + i * 60) * Math.PI / 180)}%`,
                top: `${50 + 40 * Math.sin((rotation * 2 + i * 60) * Math.PI / 180)}%`,
                transform: `rotate(${rotation * 2 + i * 60}deg)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default IntelliCoreSphere;