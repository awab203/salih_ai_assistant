import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Icon from 'components/AppIcon';

const PerformanceOverviewWidget = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [performanceData, setPerformanceData] = useState([]);
  const [metrics, setMetrics] = useState({
    productivity: 0,
    studyEfficiency: 0,
    businessGrowth: 0,
    systemHealth: 0
  });

  const generateMockData = (range) => {
    const points = range === '24h' ? 24 : range === '7d' ? 7 : 30;
    const data = [];
    
    for (let i = 0; i < points; i++) {
      const baseProductivity = 70 + Math.random() * 25;
      const baseStudy = 65 + Math.random() * 30;
      const baseBusiness = 60 + Math.random() * 35;
      const baseSystem = 80 + Math.random() * 15;
      
      data.push({
        time: range === '24h' ? `${i}:00` : 
              range === '7d' ? `Day ${i + 1}` : 
              `Week ${i + 1}`,
        productivity: Math.round(baseProductivity),
        study: Math.round(baseStudy),
        business: Math.round(baseBusiness),
        system: Math.round(baseSystem)
      });
    }
    
    return data;
  };

  useEffect(() => {
    const data = generateMockData(timeRange);
    setPerformanceData(data);
    
    // Calculate average metrics
    const avgProductivity = Math.round(data.reduce((sum, item) => sum + item.productivity, 0) / data.length);
    const avgStudy = Math.round(data.reduce((sum, item) => sum + item.study, 0) / data.length);
    const avgBusiness = Math.round(data.reduce((sum, item) => sum + item.business, 0) / data.length);
    const avgSystem = Math.round(data.reduce((sum, item) => sum + item.system, 0) / data.length);
    
    setMetrics({
      productivity: avgProductivity,
      studyEfficiency: avgStudy,
      businessGrowth: avgBusiness,
      systemHealth: avgSystem
    });
  }, [timeRange]);

  const timeRanges = [
    { value: '24h', label: '24H' },
    { value: '7d', label: '7D' },
    { value: '30d', label: '30D' }
  ];

  const metricCards = [
    {
      key: 'productivity',
      label: 'Overall Productivity',
      value: metrics.productivity,
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      key: 'studyEfficiency',
      label: 'Study Efficiency',
      value: metrics.studyEfficiency,
      icon: 'BookOpen',
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      key: 'businessGrowth',
      label: 'Business Growth',
      value: metrics.businessGrowth,
      icon: 'DollarSign',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20'
    },
    {
      key: 'systemHealth',
      label: 'System Health',
      value: metrics.systemHealth,
      icon: 'Activity',
      color: 'text-warning',
      bgColor: 'bg-warning/20'
    }
  ];

  const getPerformanceColor = (value) => {
    if (value >= 80) return 'text-accent';
    if (value >= 60) return 'text-warning';
    return 'text-error';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/95 backdrop-blur-sm border border-white/10 rounded-lg p-3 shadow-elevation-2">
          <p className="text-text-primary font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-text-secondary capitalize">{entry.dataKey}:</span>
              <span className="text-text-primary font-medium">{entry.value}%</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Performance Overview</h3>
        <div className="flex items-center space-x-1">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setTimeRange(range.value)}
              className={`px-3 py-1 text-xs rounded-lg transition-all duration-150 ${
                timeRange === range.value
                  ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface-light'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {metricCards.map((metric) => (
          <div key={metric.key} className={`p-3 rounded-lg border border-white/5 ${metric.bgColor}`}>
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric.icon} size={16} className={metric.color} strokeWidth={2} />
              <span className={`text-lg font-bold ${getPerformanceColor(metric.value)}`}>
                {metric.value}%
              </span>
            </div>
            <p className="text-xs text-text-secondary">{metric.label}</p>
          </div>
        ))}
      </div>

      {/* Performance Chart */}
      <div className="flex-1 min-h-0">
        <h4 className="text-sm font-medium text-text-secondary mb-3">Performance Trends</h4>
        <div className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748B' }}
              />
              <YAxis 
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#64748B' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="productivity" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-primary)' }}
              />
              <Line 
                type="monotone" 
                dataKey="study" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-accent)' }}
              />
              <Line 
                type="monotone" 
                dataKey="business" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-secondary)' }}
              />
              <Line 
                type="monotone" 
                dataKey="system" 
                stroke="var(--color-warning)" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: 'var(--color-warning)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-text-tertiary">Productivity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-text-tertiary">Study</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full"></div>
            <span className="text-text-tertiary">Business</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-text-tertiary">System</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceOverviewWidget;