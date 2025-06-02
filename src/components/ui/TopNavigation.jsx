import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const TopNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isAIActive, setIsAIActive] = useState(true);

  const navigationItems = [
    { label: 'Dashboard', path: '/command-hub-dashboard', icon: 'LayoutDashboard' },
    { label: 'Study', path: '/study-assistant-hub', icon: 'BookOpen' },
    { label: 'Business', path: '/reselling-business-manager', icon: 'TrendingUp' },
    { label: 'AI Center', path: '/ai-memory-personalization-center', icon: 'Brain' },
    { label: 'Analytics', path: '/analytics-performance-dashboard', icon: 'BarChart3' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleAI = () => {
    setIsAIActive(!isAIActive);
  };

  // Hide navigation on authentication screen
  if (location.pathname === '/authentication-screen') {
    return null;
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-glass border-b border-white/10">
      <nav className="flex items-center justify-between px-6 h-16">
        {/* Logo and AI Assistant */}
        <div className="flex items-center space-x-4">
          <div 
            className={`flex items-center space-x-3 cursor-pointer transition-all duration-300 ${
              isAIActive ? 'animate-pulse-glow' : ''
            }`}
            onClick={toggleAI}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow-primary transition-all duration-300 ${
              isAIActive ? 'scale-110' : 'scale-100'
            }`}>
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-gradient-primary">IntelliCore</h1>
              <p className="text-xs text-text-secondary">
                {isAIActive ? 'AI Active' : 'AI Standby'}
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 ${
                isActive(item.path)
                  ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow-primary'
                  : 'text-text-secondary hover:text-text-primary hover:bg-surface-light'
              }`}
            >
              <Icon name={item.icon} size={18} strokeWidth={2} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <Icon name="Search" size={20} strokeWidth={2} />
          </button>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <Icon name="Bell" size={20} strokeWidth={2} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button className="flex items-center space-x-2 p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" strokeWidth={2} />
            </div>
            <span className="hidden md:block text-sm font-medium">Profile</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-white/10 animate-slide-in">
          <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                  isActive(item.path)
                    ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface-light'
                }`}
              >
                <Icon name={item.icon} size={20} strokeWidth={2} />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default TopNavigation;