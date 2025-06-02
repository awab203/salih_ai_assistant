import React from 'react';
import Icon from 'components/AppIcon';

const RecentActivity = ({ sales }) => {
  const activities = [
    {
      id: 1,
      type: 'sale',
      title: 'New Sale',
      description: 'iPhone 14 Pro Max Case sold on eBay',
      amount: 24.99,
      profit: 16.49,
      time: '2 minutes ago',
      icon: 'DollarSign',
      color: 'accent'
    },
    {
      id: 2,
      type: 'stock',
      title: 'Low Stock Alert',
      description: 'LED Strip Lights running low (3 remaining)',
      time: '15 minutes ago',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 3,
      type: 'listing',
      title: 'Item Listed',
      description: 'Gaming Mouse Pad listed on eBay',
      amount: 15.99,
      time: '1 hour ago',
      icon: 'Plus',
      color: 'primary'
    },
    {
      id: 4,
      type: 'delivery',
      title: 'Package Delivered',
      description: 'Wireless Headphones delivered to customer',
      time: '2 hours ago',
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      id: 5,
      type: 'message',
      title: 'Customer Message',
      description: 'Question about iPhone case compatibility',
      time: '3 hours ago',
      icon: 'MessageCircle',
      color: 'secondary'
    },
    {
      id: 6,
      type: 'review',
      title: 'New Review',
      description: '5-star review for Vintage Band T-Shirt',
      time: '5 hours ago',
      icon: 'Star',
      color: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/20 text-primary';
      case 'accent':
        return 'bg-accent/20 text-accent';
      case 'secondary':
        return 'bg-secondary/20 text-secondary';
      case 'warning':
        return 'bg-warning/20 text-warning';
      case 'success':
        return 'bg-success/20 text-success';
      default:
        return 'bg-surface-light text-text-secondary';
    }
  };

  const formatTime = (timeString) => {
    // Simple time formatting for demo
    return timeString;
  };

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
        <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-150">
          <Icon name="MoreHorizontal" size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 p-3 bg-surface-light border border-white/5 rounded-lg hover:border-primary/20 transition-all duration-150">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getColorClasses(activity.color)}`}>
              <Icon name={activity.icon} size={16} strokeWidth={2} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <h4 className="text-sm font-medium text-text-primary">{activity.title}</h4>
                {activity.amount && (
                  <div className="text-right">
                    <div className="text-sm font-medium text-text-primary">
                      £{activity.amount.toFixed(2)}
                    </div>
                    {activity.profit && (
                      <div className="text-xs text-accent">
                        +£{activity.profit.toFixed(2)}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                {activity.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-text-quaternary">
                  {formatTime(activity.time)}
                </span>
                
                {activity.type === 'message' && (
                  <button className="text-xs text-primary hover:text-primary-400 transition-colors duration-150">
                    Reply
                  </button>
                )}
                
                {activity.type === 'stock' && (
                  <button className="text-xs text-warning hover:text-warning-400 transition-colors duration-150">
                    Restock
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-sm font-medium text-text-primary">12</div>
            <div className="text-xs text-text-secondary">Today</div>
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">89</div>
            <div className="text-xs text-text-secondary">This Week</div>
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">324</div>
            <div className="text-xs text-text-secondary">This Month</div>
          </div>
        </div>
      </div>

      {/* View All Button */}
      <div className="mt-4">
        <button className="w-full text-sm text-primary hover:text-primary-400 transition-colors duration-150">
          View All Activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;