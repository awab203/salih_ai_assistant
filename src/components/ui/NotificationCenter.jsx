import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationCenter = ({ isOpen, onClose, notifications = [] }) => {
  const [filter, setFilter] = useState('all');
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);

  const mockNotifications = [
    {
      id: 1,
      type: 'ai',
      title: 'AI Insight Available',
      message: 'Your study pattern analysis is ready for review',
      time: '2 minutes ago',
      isRead: false,
      priority: 'high',
      icon: 'Brain'
    },
    {
      id: 2,
      type: 'business',
      title: 'Low Stock Alert',
      message: 'iPhone cases are running low (3 remaining)',
      time: '15 minutes ago',
      isRead: false,
      priority: 'medium',
      icon: 'AlertTriangle'
    },
    {
      id: 3,
      type: 'study',
      title: 'Study Session Complete',
      message: 'Mathematics session completed with 85% accuracy',
      time: '1 hour ago',
      isRead: true,
      priority: 'low',
      icon: 'CheckCircle'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      message: 'IntelliCore AI has been updated to version 2.1.0',
      time: '3 hours ago',
      isRead: true,
      priority: 'low',
      icon: 'Download'
    },
    {
      id: 5,
      type: 'business',
      title: 'New Sale',
      message: 'Wireless headphones sold on eBay for $45.99',
      time: '5 hours ago',
      isRead: false,
      priority: 'medium',
      icon: 'DollarSign'
    }
  ];

  const allNotifications = notifications.length > 0 ? notifications : mockNotifications;

  useEffect(() => {
    const count = allNotifications.filter(n => !n.isRead).length;
    setUnreadCount(count);
  }, [allNotifications]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const filteredNotifications = allNotifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  const markAsRead = (id) => {
    // In a real app, this would update the notification state
    console.log('Marking notification as read:', id);
  };

  const markAllAsRead = () => {
    // In a real app, this would update all notifications
    console.log('Marking all notifications as read');
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'ai': return 'text-primary';
      case 'business': return 'text-secondary';
      case 'study': return 'text-accent';
      case 'system': return 'text-text-secondary';
      default: return 'text-text-secondary';
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 bg-surface/95 backdrop-blur-glass rounded-xl border border-white/10 shadow-elevation-3 animate-slide-in z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={markAllAsRead}
            className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            Mark all read
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-text-secondary hover:text-text-primary transition-colors duration-150"
          >
            <Icon name="X" size={16} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-1 p-4 border-b border-white/10">
        {['all', 'unread', 'ai', 'business', 'study', 'system'].map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`px-3 py-1 text-xs rounded-lg transition-all duration-150 capitalize ${
              filter === filterType
                ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface-light'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Bell" size={32} className="text-text-quaternary mx-auto mb-2" strokeWidth={1} />
            <p className="text-text-secondary">No notifications found</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-surface-light transition-colors duration-150 cursor-pointer ${
                  !notification.isRead ? 'bg-primary/5' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    !notification.isRead ? 'bg-primary/20' : 'bg-surface-light'
                  }`}>
                    <Icon 
                      name={notification.icon} 
                      size={16} 
                      strokeWidth={2}
                      className={getTypeColor(notification.type)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={`text-sm font-medium ${
                        !notification.isRead ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-1">
                        <Icon 
                          name="Clock" 
                          size={12} 
                          strokeWidth={2}
                          className={getPriorityColor(notification.priority)}
                        />
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-text-tertiary mb-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-text-quaternary">
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {filteredNotifications.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <button className="w-full text-sm text-primary hover:text-primary-400 transition-colors duration-150">
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;