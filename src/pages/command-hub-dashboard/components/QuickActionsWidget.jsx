import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';

const QuickActionsWidget = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 'study-session',
      label: 'Start Study',
      icon: 'BookOpen',
      color: 'text-accent',
      bgColor: 'bg-accent/20',
      action: () => navigate('/study-assistant-hub')
    },
    {
      id: 'business-check',
      label: 'Check Sales',
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20',
      action: () => navigate('/reselling-business-manager')
    },
    {
      id: 'ai-config',
      label: 'AI Settings',
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary/20',
      action: () => navigate('/ai-memory-personalization-center')
    },
    {
      id: 'analytics',
      label: 'View Analytics',
      icon: 'BarChart3',
      color: 'text-warning',
      bgColor: 'bg-warning/20',
      action: () => navigate('/analytics-performance-dashboard')
    },
    {
      id: 'focus-mode',
      label: 'Focus Mode',
      icon: 'Target',
      color: 'text-error',
      bgColor: 'bg-error/20',
      action: () => console.log('Focus mode activated')
    },
    {
      id: 'voice-command',
      label: 'Voice Command',
      icon: 'Mic',
      color: 'text-text-primary',
      bgColor: 'bg-surface-light',
      action: () => console.log('Voice command activated')
    }
  ];

  const systemActions = [
    {
      id: 'screenshot',
      label: 'Screenshot',
      icon: 'Camera',
      action: () => console.log('Screenshot taken')
    },
    {
      id: 'screen-record',
      label: 'Record',
      icon: 'Video',
      action: () => console.log('Screen recording started')
    },
    {
      id: 'clipboard',
      label: 'Clipboard',
      icon: 'Clipboard',
      action: () => console.log('Clipboard accessed')
    },
    {
      id: 'calculator',
      label: 'Calculator',
      icon: 'Calculator',
      action: () => console.log('Calculator opened')
    }
  ];

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Quick Actions</h3>
        <Icon name="Zap" size={16} className="text-primary" strokeWidth={2} />
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickActions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border border-white/5 transition-all duration-150 hover:scale-105 hover:border-white/20 ${action.bgColor} group`}
          >
            <Icon 
              name={action.icon} 
              size={24} 
              className={`${action.color} mb-2 group-hover:scale-110 transition-transform duration-150`} 
              strokeWidth={2} 
            />
            <span className="text-xs font-medium text-text-primary text-center">
              {action.label}
            </span>
          </button>
        ))}
      </div>

      {/* System Tools */}
      <div>
        <h5 className="text-sm font-medium text-text-secondary mb-3">System Tools</h5>
        <div className="grid grid-cols-2 gap-2">
          {systemActions.map((action) => (
            <button
              key={action.id}
              onClick={action.action}
              className="flex items-center space-x-2 p-3 bg-surface-light hover:bg-surface-lighter rounded-lg border border-white/5 transition-all duration-150 group"
            >
              <Icon 
                name={action.icon} 
                size={16} 
                className="text-text-secondary group-hover:text-text-primary transition-colors duration-150" 
                strokeWidth={2} 
              />
              <span className="text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-150">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Actions */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2">
          <button className="flex items-center justify-center space-x-2 p-2 bg-error/20 hover:bg-error/30 text-error rounded-lg transition-all duration-150">
            <Icon name="Power" size={14} strokeWidth={2} />
            <span className="text-xs font-medium">Shutdown</span>
          </button>
          <button className="flex items-center justify-center space-x-2 p-2 bg-warning/20 hover:bg-warning/30 text-warning rounded-lg transition-all duration-150">
            <Icon name="RotateCcw" size={14} strokeWidth={2} />
            <span className="text-xs font-medium">Restart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsWidget;