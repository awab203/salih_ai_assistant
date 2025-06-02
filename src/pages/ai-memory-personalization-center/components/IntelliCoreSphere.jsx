import React, { useEffect, useRef, useState } from 'react';
import Icon from 'components/AppIcon';

const IntelliCoreSphere = ({ aiPersonality, isConfiguring, glowIntensity }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const [sphereState, setSphereState] = useState('idle');
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Initialize particles
    const particleCount = 50;
    const newParticles = [];
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }
    setParticles(newParticles);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      time += 0.02;

      // Draw particles
      newParticles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.phase += 0.02;

        // Wrap around edges
        if (particle.x < 0) particle.x = rect.width;
        if (particle.x > rect.width) particle.x = 0;
        if (particle.y < 0) particle.y = rect.height;
        if (particle.y > rect.height) particle.y = 0;

        // Pulsing effect
        const pulseOpacity = particle.opacity + Math.sin(particle.phase) * 0.2;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${pulseOpacity * (glowIntensity / 100)})`;
        ctx.fill();
      });

      // Draw central sphere
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const baseRadius = 40;
      const pulseRadius = baseRadius + Math.sin(time * 2) * (isConfiguring ? 8 : 3);

      // Outer glow
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius * 2);
      gradient.addColorStop(0, `rgba(0, 212, 255, ${0.3 * (glowIntensity / 100)})`);
      gradient.addColorStop(0.5, `rgba(139, 92, 246, ${0.2 * (glowIntensity / 100)})`);
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner sphere
      const innerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseRadius);
      if (isConfiguring) {
        innerGradient.addColorStop(0, 'rgba(255, 193, 7, 0.8)');
        innerGradient.addColorStop(1, 'rgba(255, 193, 7, 0.2)');
      } else {
        innerGradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)');
        innerGradient.addColorStop(1, 'rgba(139, 92, 246, 0.4)');
      }
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2);
      ctx.fillStyle = innerGradient;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseRadius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = isConfiguring ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.6)';
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [glowIntensity, isConfiguring]);

  useEffect(() => {
    if (isConfiguring) {
      setSphereState('configuring');
    } else {
      setSphereState('idle');
    }
  }, [isConfiguring]);

  const getPersonalityColor = () => {
    switch (aiPersonality) {
      case 'professional': return 'text-secondary';
      case 'creative': return 'text-accent';
      case 'mentor': return 'text-warning';
      default: return 'text-primary';
    }
  };

  const getPersonalityIcon = () => {
    switch (aiPersonality) {
      case 'professional': return 'Briefcase';
      case 'creative': return 'Palette';
      case 'mentor': return 'GraduationCap';
      default: return 'Brain';
    }
  };

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">IntelliCore Sphere</h2>
          <p className="text-sm text-text-secondary">AI state visualization</p>
        </div>
      </div>

      {/* Sphere Visualization */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="w-full h-48 rounded-lg bg-surface-light border border-white/5"
          style={{ width: '100%', height: '192px' }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={`text-center ${isConfiguring ? 'animate-pulse' : ''}`}>
            <Icon 
              name={getPersonalityIcon()} 
              size={24} 
              strokeWidth={2} 
              className={`mx-auto mb-2 ${getPersonalityColor()}`}
            />
            <div className="text-xs text-text-secondary">
              {isConfiguring ? 'Configuring...' : 'Active'}
            </div>
          </div>
        </div>
      </div>

      {/* Status Information */}
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-surface-light rounded-lg border border-white/5">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isConfiguring ? 'bg-warning animate-pulse' : 'bg-accent'}`} />
            <span className="text-sm text-text-primary">
              {isConfiguring ? 'Configuring' : 'Ready'}
            </span>
          </div>
          <span className="text-xs text-text-secondary">
            {isConfiguring ? 'Please wait...' : 'All systems operational'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-surface-light rounded-lg border border-white/5 text-center">
            <div className="text-lg font-semibold text-primary">{glowIntensity}%</div>
            <div className="text-xs text-text-secondary">Glow Intensity</div>
          </div>
          <div className="p-3 bg-surface-light rounded-lg border border-white/5 text-center">
            <div className="text-lg font-semibold text-accent">89ms</div>
            <div className="text-xs text-text-secondary">Response Time</div>
          </div>
        </div>

        <div className="p-3 bg-surface-light rounded-lg border border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-primary">Neural Activity</span>
            <span className="text-xs text-text-secondary">Real-time</span>
          </div>
          <div className="space-y-1">
            {['Processing', 'Learning', 'Memory'].map((activity, index) => (
              <div key={activity} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: `${index * 0.2}s` }} />
                <span className="text-xs text-text-secondary">{activity}</span>
                <div className="flex-1 h-1 bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelliCoreSphere;