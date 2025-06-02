import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import TopNavigation from 'components/ui/TopNavigation';
import AIAssistantWidget from 'components/ui/AIAssistantWidget';
import SystemMonitorWidget from './components/SystemMonitorWidget';
import WeatherWidget from './components/WeatherWidget';
import QuickActionsWidget from './components/QuickActionsWidget';
import IntelliCoreSphere from './components/IntelliCoreSphere';
import RecentActivityWidget from './components/RecentActivityWidget';
import PerformanceOverviewWidget from './components/PerformanceOverviewWidget';

const CommandHubDashboard = () => {
  const navigate = useNavigate();
  const [widgets, setWidgets] = useState([]);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [systemStatus, setSystemStatus] = useState('optimal');
  const [currentTime, setCurrentTime] = useState(new Date());

  const availableWidgets = [
    { id: 'system-monitor', name: 'System Monitor', component: SystemMonitorWidget, size: 'large' },
    { id: 'weather', name: 'Weather', component: WeatherWidget, size: 'medium' },
    { id: 'quick-actions', name: 'Quick Actions', component: QuickActionsWidget, size: 'medium' },
    { id: 'recent-activity', name: 'Recent Activity', component: RecentActivityWidget, size: 'large' },
    { id: 'performance-overview', name: 'Performance Overview', component: PerformanceOverviewWidget, size: 'large' }
  ];

  const defaultWidgets = [
    { id: 'system-monitor', position: { x: 0, y: 0 }, size: 'large' },
    { id: 'weather', position: { x: 1, y: 0 }, size: 'medium' },
    { id: 'quick-actions', position: { x: 2, y: 0 }, size: 'medium' },
    { id: 'recent-activity', position: { x: 0, y: 1 }, size: 'large' },
    { id: 'performance-overview', position: { x: 1, y: 1 }, size: 'large' }
  ];

  useEffect(() => {
    setWidgets(defaultWidgets);
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleWidgetAdd = (widgetId) => {
    const newWidget = {
      id: widgetId,
      position: { x: 0, y: widgets.length },
      size: availableWidgets.find(w => w.id === widgetId)?.size || 'medium'
    };
    setWidgets([...widgets, newWidget]);
  };

  const handleWidgetRemove = (widgetId) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderWidget = (widget) => {
    const WidgetComponent = availableWidgets.find(w => w.id === widget.id)?.component;
    if (!WidgetComponent) return null;

    return (
      <div
        key={widget.id}
        className={`relative bg-surface/80 backdrop-blur-glass rounded-xl border border-white/10 shadow-elevation-2 transition-all duration-300 hover:shadow-elevation-3 hover:border-white/20 ${
          widget.size === 'large' ? 'col-span-2 row-span-2' :
          widget.size === 'medium'? 'col-span-1 row-span-1' : 'col-span-1 row-span-1'
        }`}
      >
        {isCustomizing && (
          <button
            onClick={() => handleWidgetRemove(widget.id)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-error rounded-full flex items-center justify-center text-white text-xs hover:scale-110 transition-transform duration-150 z-10"
          >
            <Icon name="X" size={12} strokeWidth={2} />
          </button>
        )}
        <WidgetComponent />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/20 to-background">
        <div className="absolute inset-0 opacity-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      <TopNavigation />

      <div className="pt-16 relative z-10">
        {/* Main Content */}
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-64 h-[calc(100vh-4rem)] bg-surface/80 backdrop-blur-glass border-r border-white/10 p-6">
            {/* User Greeting */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gradient-primary mb-2">
                {getGreeting()}
              </h2>
              <p className="text-text-secondary">
                {currentTime.toLocaleDateString('en-GB', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long' 
                })}
              </p>
              <p className="text-text-tertiary text-sm">
                {currentTime.toLocaleTimeString('en-GB', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>

            {/* IntelliCore Sphere */}
            <div className="mb-8">
              <IntelliCoreSphere status={systemStatus} />
            </div>

            {/* Navigation Shortcuts */}
            <div className="space-y-2 mb-8">
              <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-3">
                Quick Access
              </h3>
              {[
                { label: 'Study Hub', path: '/study-assistant-hub', icon: 'BookOpen', color: 'text-accent' },
                { label: 'Business Manager', path: '/reselling-business-manager', icon: 'TrendingUp', color: 'text-secondary' },
                { label: 'AI Center', path: '/ai-memory-personalization-center', icon: 'Brain', color: 'text-primary' },
                { label: 'Analytics', path: '/analytics-performance-dashboard', icon: 'BarChart3', color: 'text-warning' }
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="w-full flex items-center space-x-3 p-3 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150 group"
                >
                  <Icon name={item.icon} size={18} strokeWidth={2} className={`${item.color} group-hover:scale-110 transition-transform duration-150`} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* Widget Customization */}
            <div className="space-y-3">
              <button
                onClick={() => setIsCustomizing(!isCustomizing)}
                className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-150 ${
                  isCustomizing 
                    ? 'bg-primary/20 text-primary border border-primary/30' :'bg-surface-light hover:bg-surface-lighter text-text-secondary hover:text-text-primary'
                }`}
              >
                <Icon name="Settings" size={18} strokeWidth={2} />
                <span className="text-sm font-medium">
                  {isCustomizing ? 'Done Customizing' : 'Customize Widgets'}
                </span>
              </button>

              {isCustomizing && (
                <div className="space-y-2 animate-slide-in">
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Add Widgets
                  </h4>
                  {availableWidgets
                    .filter(widget => !widgets.find(w => w.id === widget.id))
                    .map((widget) => (
                      <button
                        key={widget.id}
                        onClick={() => handleWidgetAdd(widget.id)}
                        className="w-full flex items-center space-x-2 p-2 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
                      >
                        <Icon name="Plus" size={14} strokeWidth={2} />
                        <span className="text-xs">{widget.name}</span>
                      </button>
                    ))}
                </div>
              )}
            </div>
          </aside>

          {/* Main Dashboard Area */}
          <main className="flex-1 p-6">
            {/* Dashboard Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Command Hub</h1>
                <p className="text-text-secondary">
                  Monitor your systems and manage your digital workspace
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                  systemStatus === 'optimal' ? 'bg-accent/20 text-accent' :
                  systemStatus === 'warning'? 'bg-warning/20 text-warning' : 'bg-error/20 text-error'
                }`}>
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    systemStatus === 'optimal' ? 'bg-accent' :
                    systemStatus === 'warning'? 'bg-warning' : 'bg-error'
                  }`}></div>
                  <span className="text-sm font-medium capitalize">{systemStatus}</span>
                </div>
              </div>
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-3 gap-6 auto-rows-fr">
              {widgets.map(renderWidget)}
            </div>

            {/* Empty State */}
            {widgets.length === 0 && (
              <div className="flex flex-col items-center justify-center h-96 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4 shadow-glow-primary">
                  <Icon name="Layout" size={32} color="white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No Widgets Active
                </h3>
                <p className="text-text-secondary mb-4">
                  Add widgets to customize your command hub dashboard
                </p>
                <button
                  onClick={() => setIsCustomizing(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-primary text-white rounded-lg font-medium shadow-glow-primary hover:scale-105 transition-all duration-300"
                >
                  <Icon name="Plus" size={18} strokeWidth={2} />
                  <span>Add Widgets</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      <AIAssistantWidget />
    </div>
  );
};

export default CommandHubDashboard;