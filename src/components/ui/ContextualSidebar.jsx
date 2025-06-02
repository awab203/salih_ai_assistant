import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const ContextualSidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const getSidebarContent = () => {
    switch (location.pathname) {
      case '/study-assistant-hub':
        return {
          title: 'Study Tools',
          sections: [
            {
              title: 'Subjects',
              items: [
                { label: 'Mathematics', icon: 'Calculator', badge: 3 },
                { label: 'Science', icon: 'Atom', badge: 2 },
                { label: 'Literature', icon: 'BookOpen', badge: 1 },
                { label: 'History', icon: 'Clock', badge: 0 },
                { label: 'Languages', icon: 'Globe', badge: 4 },
              ]
            },
            {
              title: 'Study Sessions',
              items: [
                { label: 'Active Session', icon: 'Play', badge: 0 },
                { label: 'Scheduled', icon: 'Calendar', badge: 5 },
                { label: 'Completed', icon: 'CheckCircle', badge: 12 },
                { label: 'Notes', icon: 'FileText', badge: 8 },
              ]
            },
            {
              title: 'AI Tutoring',
              items: [
                { label: 'Ask Question', icon: 'MessageCircle', badge: 0 },
                { label: 'Practice Tests', icon: 'Target', badge: 3 },
                { label: 'Study Plan', icon: 'Map', badge: 1 },
              ]
            }
          ]
        };

      case '/reselling-business-manager':
        return {
          title: 'Business Tools',
          sections: [
            {
              title: 'Inventory',
              items: [
                { label: 'Products', icon: 'Package', badge: 156 },
                { label: 'Low Stock', icon: 'AlertTriangle', badge: 8 },
                { label: 'Categories', icon: 'Grid3X3', badge: 12 },
                { label: 'Suppliers', icon: 'Truck', badge: 5 },
              ]
            },
            {
              title: 'Sales Channels',
              items: [
                { label: 'eBay', icon: 'ShoppingBag', badge: 23 },
                { label: 'Amazon', icon: 'Store', badge: 45 },
                { label: 'Facebook', icon: 'Facebook', badge: 12 },
                { label: 'Local Sales', icon: 'MapPin', badge: 7 },
              ]
            },
            {
              title: 'Analytics',
              items: [
                { label: 'Revenue', icon: 'DollarSign', badge: 0 },
                { label: 'Profit Margins', icon: 'TrendingUp', badge: 0 },
                { label: 'Customer Data', icon: 'Users', badge: 0 },
              ]
            }
          ]
        };

      case '/ai-memory-personalization-center':
        return {
          title: 'AI Configuration',
          sections: [
            {
              title: 'Memory Banks',
              items: [
                { label: 'Personal Preferences', icon: 'Heart', badge: 24 },
                { label: 'Work Patterns', icon: 'Briefcase', badge: 18 },
                { label: 'Learning Style', icon: 'Brain', badge: 12 },
                { label: 'Communication', icon: 'MessageSquare', badge: 9 },
              ]
            },
            {
              title: 'AI Personality',
              items: [
                { label: 'Tone Settings', icon: 'Volume2', badge: 0 },
                { label: 'Response Style', icon: 'Type', badge: 0 },
                { label: 'Proactivity Level', icon: 'Zap', badge: 0 },
                { label: 'Expertise Areas', icon: 'Award', badge: 6 },
              ]
            },
            {
              title: 'Data Management',
              items: [
                { label: 'Export Data', icon: 'Download', badge: 0 },
                { label: 'Privacy Settings', icon: 'Shield', badge: 0 },
                { label: 'Reset Memory', icon: 'RotateCcw', badge: 0 },
              ]
            }
          ]
        };

      default:
        return null;
    }
  };

  const sidebarContent = getSidebarContent();

  // Don't render sidebar for routes that don't need it
  if (!sidebarContent || location.pathname === '/authentication-screen' || 
      location.pathname === '/command-hub-dashboard' || 
      location.pathname === '/analytics-performance-dashboard') {
    return null;
  }

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-surface border-r border-white/10 transition-all duration-300 z-40 ${
      isCollapsed ? 'w-16' : 'w-64'
    } lg:translate-x-0 ${isCollapsed ? '' : 'shadow-elevation-2'}`}>
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!isCollapsed && (
          <h2 className="text-lg font-semibold text-text-primary">{sidebarContent.title}</h2>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
        >
          <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Sidebar Content */}
      <div className="overflow-y-auto h-full pb-4">
        {sidebarContent.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="p-4">
            {!isCollapsed && (
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  className="w-full flex items-center justify-between p-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150 group"
                  title={isCollapsed ? item.label : ''}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={item.icon} size={18} strokeWidth={2} />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">{item.label}</span>
                    )}
                  </div>
                  {!isCollapsed && item.badge > 0 && (
                    <span className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                      {item.badge}
                    </span>
                  )}
                  {isCollapsed && item.badge > 0 && (
                    <span className="absolute left-8 top-2 w-2 h-2 bg-primary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      {!isCollapsed && (
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10 bg-surface">
          <button className="w-full flex items-center justify-center space-x-2 p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-150">
            <Icon name="Plus" size={18} strokeWidth={2} />
            <span className="text-sm font-medium">Quick Add</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default ContextualSidebar;