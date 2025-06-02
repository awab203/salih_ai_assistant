import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SystemPerformanceChart = ({ data }) => {
  const [realTimeData, setRealTimeData] = useState(data);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        cpu: Math.max(20, Math.min(80, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(90, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(70, Math.min(100, prev.network + (Math.random() - 0.5) * 5))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    {
      label: 'CPU Usage',
      value: realTimeData.cpu,
      unit: '%',
      icon: 'Cpu',
      color: realTimeData.cpu > 70 ? '#EF4444' : realTimeData.cpu > 50 ? '#F59E0B' : '#10B981',
      status: realTimeData.cpu > 70 ? 'high' : realTimeData.cpu > 50 ? 'medium' : 'low'
    },
    {
      label: 'Memory',
      value: realTimeData.memory,
      unit: '%',
      icon: 'HardDrive',
      color: realTimeData.memory > 80 ? '#EF4444' : realTimeData.memory > 60 ? '#F59E0B' : '#10B981',
      status: realTimeData.memory > 80 ? 'high' : realTimeData.memory > 60 ? 'medium' : 'low'
    },
    {
      label: 'Storage',
      value: realTimeData.storage,
      unit: '%',
      icon: 'Database',
      color: realTimeData.storage > 85 ? '#EF4444' : realTimeData.storage > 70 ? '#F59E0B' : '#10B981',
      status: realTimeData.storage > 85 ? 'high' : realTimeData.storage > 70 ? 'medium' : 'low'
    },
    {
      label: 'Network',
      value: realTimeData.network,
      unit: '%',
      icon: 'Wifi',
      color: realTimeData.network < 50 ? '#EF4444' : realTimeData.network < 80 ? '#F59E0B' : '#10B981',
      status: realTimeData.network < 50 ? 'poor' : realTimeData.network < 80 ? 'good' : 'excellent'
    }
  ];

  const getStatusText = (metric) => {
    switch (metric.label) {
      case 'CPU Usage':
        return metric.status === 'high' ? 'High Load' : metric.status === 'medium' ? 'Moderate' : 'Optimal';
      case 'Memory':
        return metric.status === 'high' ? 'High Usage' : metric.status === 'medium' ? 'Moderate' : 'Available';
      case 'Storage':
        return metric.status === 'high' ? 'Nearly Full' : metric.status === 'medium' ? 'Moderate' : 'Available';
      case 'Network':
        return metric.status === 'poor' ? 'Poor Signal' : metric.status === 'good' ? 'Good' : 'Excellent';
      default:
        return 'Normal';
    }
  };

  const CircularProgress = ({ value, color, size = 80 }) => {
    const radius = (size - 8) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="4"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth="4"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-text-primary">{Math.round(value)}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
            <Icon name="Monitor" size={20} strokeWidth={2} className="text-warning" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">System Performance</h3>
            <p className="text-sm text-text-secondary">Real-time system monitoring</p>
          </div>
        </div>

        {/* System Uptime */}
        <div className="text-right">
          <div className="text-lg font-bold text-accent">{realTimeData.uptime}</div>
          <div className="text-sm text-text-secondary">Uptime</div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center">
            <div className="flex justify-center mb-3">
              <CircularProgress value={metric.value} color={metric.color} />
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <Icon name={metric.icon} size={14} strokeWidth={2} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{metric.label}</span>
              </div>
              <div className="text-xs text-text-secondary">{getStatusText(metric)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-surface-light rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} strokeWidth={2} className="text-primary" />
            <span className="text-sm font-medium text-text-primary">System Health</span>
          </div>
          <div className="text-lg font-bold text-accent">Excellent</div>
          <div className="text-xs text-text-secondary">All systems operational</div>
        </div>

        <div className="bg-surface-light rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Thermometer" size={16} strokeWidth={2} className="text-warning" />
            <span className="text-sm font-medium text-text-primary">Temperature</span>
          </div>
          <div className="text-lg font-bold text-warning">42°C</div>
          <div className="text-xs text-text-secondary">Within normal range</div>
        </div>
      </div>

      {/* Performance Recommendations */}
      <div className="bg-surface-light rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} strokeWidth={2} className="text-primary" />
          <span className="text-sm font-medium text-text-primary">AI Recommendations</span>
        </div>
        <div className="space-y-2">
          {realTimeData.memory > 70 && (
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="AlertCircle" size={12} strokeWidth={2} className="text-warning" />
              <span>Consider closing unused applications to free up memory</span>
            </div>
          )}
          {realTimeData.storage > 80 && (
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="AlertCircle" size={12} strokeWidth={2} className="text-error" />
              <span>Storage space is running low. Clean up temporary files</span>
            </div>
          )}
          {realTimeData.cpu < 30 && realTimeData.memory < 50 && (
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <Icon name="CheckCircle" size={12} strokeWidth={2} className="text-accent" />
              <span>System performance is optimal for intensive tasks</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemPerformanceChart;