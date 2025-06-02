import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const AIAssistantWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [aiStatus, setAiStatus] = useState('ready'); // ready, thinking, speaking
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  const suggestions = [
    "What would you like to accomplish today?",
    "I can help you organize your study schedule",
    "Let's review your business metrics",
    "Would you like to update your AI preferences?",
    "I noticed some patterns in your workflow"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleVoiceToggle = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setAiStatus('thinking');
      setTimeout(() => setAiStatus('ready'), 2000);
    }
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const getStatusColor = () => {
    switch (aiStatus) {
      case 'thinking': return 'text-warning';
      case 'speaking': return 'text-accent';
      default: return 'text-primary';
    }
  };

  const getStatusIcon = () => {
    switch (aiStatus) {
      case 'thinking': return 'Loader2';
      case 'speaking': return 'Volume2';
      default: return 'Zap';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Widget */}
      {isExpanded && (
        <div className="mb-4 w-80 bg-surface/95 backdrop-blur-glass rounded-xl border border-white/10 shadow-elevation-3 animate-slide-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center ${
                aiStatus === 'thinking' ? 'animate-pulse' : ''
              }`}>
                <Icon 
                  name={getStatusIcon()} 
                  size={16} 
                  color="white" 
                  strokeWidth={2}
                  className={aiStatus === 'thinking' ? 'animate-spin' : ''}
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-text-primary">IntelliCore AI</h3>
                <p className={`text-xs ${getStatusColor()}`}>
                  {aiStatus === 'thinking' ? 'Processing...' : 
                   aiStatus === 'speaking' ? 'Speaking...' : 'Ready to assist'}
                </p>
              </div>
            </div>
            <button
              onClick={handleExpand}
              className="p-1 rounded-lg text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              <Icon name="X" size={16} strokeWidth={2} />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Current Suggestion */}
            <div className="mb-4 p-3 bg-surface-light rounded-lg border border-white/5">
              <p className="text-sm text-text-secondary animate-fade-in">
                {suggestions[currentSuggestion]}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button className="flex items-center space-x-2 p-2 bg-surface-light hover:bg-surface-lighter rounded-lg transition-colors duration-150">
                <Icon name="Calendar" size={14} strokeWidth={2} className="text-primary" />
                <span className="text-xs text-text-secondary">Schedule</span>
              </button>
              <button className="flex items-center space-x-2 p-2 bg-surface-light hover:bg-surface-lighter rounded-lg transition-colors duration-150">
                <Icon name="BarChart3" size={14} strokeWidth={2} className="text-secondary" />
                <span className="text-xs text-text-secondary">Analytics</span>
              </button>
              <button className="flex items-center space-x-2 p-2 bg-surface-light hover:bg-surface-lighter rounded-lg transition-colors duration-150">
                <Icon name="BookOpen" size={14} strokeWidth={2} className="text-accent" />
                <span className="text-xs text-text-secondary">Study</span>
              </button>
              <button className="flex items-center space-x-2 p-2 bg-surface-light hover:bg-surface-lighter rounded-lg transition-colors duration-150">
                <Icon name="Settings" size={14} strokeWidth={2} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">Settings</span>
              </button>
            </div>

            {/* Voice Input */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleVoiceToggle}
                className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-150 ${
                  isListening 
                    ? 'bg-primary/20 text-primary border border-primary/30 shadow-glow-primary' 
                    : 'bg-surface-light hover:bg-surface-lighter text-text-secondary'
                }`}
              >
                <Icon 
                  name={isListening ? "MicOff" : "Mic"} 
                  size={16} 
                  strokeWidth={2}
                  className={isListening ? 'animate-pulse' : ''}
                />
                <span className="text-sm font-medium">
                  {isListening ? 'Listening...' : 'Voice Input'}
                </span>
              </button>
              <button className="p-3 bg-surface-light hover:bg-surface-lighter rounded-lg transition-colors duration-150">
                <Icon name="Type" size={16} strokeWidth={2} className="text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleExpand}
        className={`w-14 h-14 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary transition-all duration-300 hover:scale-110 ${
          isExpanded ? 'rotate-45' : 'animate-float'
        }`}
      >
        <Icon 
          name={isExpanded ? "X" : "MessageCircle"} 
          size={24} 
          color="white" 
          strokeWidth={2}
        />
      </button>

      {/* Status Indicator */}
      {!isExpanded && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-surface rounded-full border-2 border-background flex items-center justify-center">
          <div className={`w-3 h-3 rounded-full ${
            aiStatus === 'ready' ? 'bg-accent animate-pulse' :
            aiStatus === 'thinking'? 'bg-warning animate-pulse' : 'bg-primary animate-pulse'
          }`}></div>
        </div>
      )}
    </div>
  );
};

export default AIAssistantWidget;