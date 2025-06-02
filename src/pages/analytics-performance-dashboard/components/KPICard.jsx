import React from 'react';
import Icon from 'components/AppIcon';

const KPICard = ({ data }) => {
  const { title, value, unit, change, trend, icon, color, target, description } = data;

  const getColorClasses = (colorName) => {
    const colorMap = {
      primary: 'text-primary bg-primary/20 border-primary/30',
      secondary: 'text-secondary bg-secondary/20 border-secondary/30',
      accent: 'text-accent bg-accent/20 border-accent/30',
      warning: 'text-warning bg-warning/20 border-warning/30'
    };
    return colorMap[colorName] || 'text-text-secondary bg-surface-light border-white/20';
  };

  const progressPercentage = target ? Math.min((value / target) * 100, 100) : 0;

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-150 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${getColorClasses(color)} flex items-center justify-center group-hover:scale-110 transition-transform duration-150`}>
          <Icon name={icon} size={20} strokeWidth={2} />
        </div>
        <div className={`flex items-center space-x-1 text-sm ${
          trend === 'up' ? 'text-accent' : trend === 'down' ? 'text-error' : 'text-text-secondary'
        }`}>
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
            size={14} 
            strokeWidth={2} 
          />
          <span className="font-medium">{Math.abs(change)}%</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-3">
        <div className="flex items-baseline space-x-1">
          {unit === '£' && <span className="text-2xl font-bold text-text-primary">{unit}</span>}
          <span className="text-3xl font-bold text-text-primary">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
          {unit !== '£' && <span className="text-lg text-text-secondary">{unit}</span>}
        </div>
        <p className="text-sm text-text-secondary mt-1">{description}</p>
      </div>

      {/* Progress Bar (if target exists) */}
      {target && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
            <span>Progress</span>
            <span>{progressPercentage.toFixed(0)}% of target</span>
          </div>
          <div className="w-full bg-surface-light rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                color === 'primary' ? 'bg-primary' :
                color === 'secondary' ? 'bg-secondary' :
                color === 'accent' ? 'bg-accent' :
                color === 'warning' ? 'bg-warning' : 'bg-text-secondary'
              }`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Title */}
      <h3 className="text-sm font-medium text-text-primary">{title}</h3>
    </div>
  );
};

export default KPICard;