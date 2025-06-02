import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const RecentActivityWidget = () => {
  const [activities, setActivities] = useState([]);
  const [filter, setFilter] = useState('all');

  const mockActivities = [
    {
      id: 1,
      type: 'study',
      title: 'Mathematics Study Session Completed',
      description: 'Completed 45-minute session on Quadratic Equations with 92% accuracy',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      icon: 'BookOpen',
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      id: 2,
      type: 'business',
      title: 'New Sale Recorded',
      description: 'iPhone 13 Case sold on eBay for £24.99 - Profit: £12.50',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20'
    },
    {
      id: 3,
      type: 'ai',
      title: 'AI Insight Generated',
      description: 'Detected optimal study time pattern: 9-11 AM shows highest retention',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      icon: 'Brain',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Optimization Complete',
      description: 'Background processes optimized, 15% performance improvement achieved',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      icon: 'Settings',
      color: 'text-warning',
      bgColor: 'bg-warning/20'
    },
    {
      id: 5,
      type: 'business',
      title: 'Inventory Alert',
      description: 'Low stock warning: Wireless Earbuds (3 remaining)',
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/20'
    },
    {
      id: 6,
      type: 'study',
      title: 'Flashcard Review Session',
      description: 'Reviewed 25 English Literature flashcards - 88% retention rate',
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      icon: 'FileText',
      color: 'text-accent',
      bgColor: 'bg-accent/20'
    },
    {
      id: 7,
      type: 'ai',
      title: 'Behavioral Pattern Update',
      description: 'Updated learning preferences based on recent study sessions',
      timestamp: new Date(Date.now() - 18000000), // 5 hours ago
      icon: 'Zap',
      color: 'text-primary',
      bgColor: 'bg-primary/20'
    },
    {
      id: 8,
      type: 'business',
      title: 'Supplier Update',
      description: 'New products available from CNFans - 12 items added to watchlist',
      timestamp: new Date(Date.now() - 21600000), // 6 hours ago
      icon: 'Package',
      color: 'text-secondary',
      bgColor: 'bg-secondary/20'
    }
  ];

  useEffect(() => {
    setActivities(mockActivities);
  }, []);

  const filteredActivities = activities.filter(activity => {
    if (filter === 'all') return true;
    return activity.type === filter;
  });

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const filterOptions = [
    { value: 'all', label: 'All', icon: 'List' },
    { value: 'study', label: 'Study', icon: 'BookOpen' },
    { value: 'business', label: 'Business', icon: 'TrendingUp' },
    { value: 'ai', label: 'AI', icon: 'Brain' },
    { value: 'system', label: 'System', icon: 'Settings' }
  ];

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-1 mb-4 overflow-x-auto">
        {filterOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setFilter(option.value)}
            className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-xs transition-all duration-150 whitespace-nowrap ${
              filter === option.value
                ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface-light'
            }`}
          >
            <Icon name={option.icon} size={12} strokeWidth={2} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-center">
            <Icon name="Activity" size={32} className="text-text-quaternary mb-2" strokeWidth={1} />
            <p className="text-text-secondary">No recent activity</p>
          </div>
        ) : (
          filteredActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start space-x-3 p-3 bg-surface-light hover:bg-surface-lighter rounded-lg border border-white/5 transition-all duration-150 cursor-pointer group"
            >
              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activity.bgColor} flex-shrink-0`}>
                <Icon 
                  name={activity.icon} 
                  size={16} 
                  className={activity.color} 
                  strokeWidth={2} 
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-text-primary mb-1 group-hover:text-primary transition-colors duration-150">
                  {activity.title}
                </h4>
                <p className="text-xs text-text-tertiary mb-2 line-clamp-2">
                  {activity.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-quaternary">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${activity.color.replace('text-', 'bg-')} opacity-60`}></div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="w-full text-sm text-primary hover:text-primary-400 transition-colors duration-150">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivityWidget;