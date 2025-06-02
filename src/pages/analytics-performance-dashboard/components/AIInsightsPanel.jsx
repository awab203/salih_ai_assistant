import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const AIInsightsPanel = () => {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const insights = [
    {
      id: 1,
      type: 'study',
      title: 'Study Pattern Analysis',
      content: `Your peak learning hours are between 9-11 AM with 92% retention rate. Consider scheduling complex subjects during this window for optimal performance.`,
      confidence: 94,
      action: 'Optimize Schedule',
      icon: 'Brain',
      color: 'accent'
    },
    {
      id: 2,
      type: 'business',
      title: 'Sales Optimization',
      content: `eBay listings with 5+ photos generate 34% more revenue. Your current average is 3.2 photos per listing. Increasing this could boost monthly earnings by £280.`,
      confidence: 87,
      action: 'Update Listings',
      icon: 'TrendingUp',
      color: 'secondary'
    },
    {
      id: 3,
      type: 'health',
      title: 'Habit Correlation',
      content: `Morning exercise sessions correlate with 23% higher study productivity. Your exercise streak directly impacts academic performance metrics.`,
      confidence: 91,
      action: 'Maintain Routine',
      icon: 'Heart',
      color: 'primary'
    },
    {
      id: 4,
      type: 'system',
      title: 'Performance Prediction',
      content: `Based on current usage patterns, system memory will reach 85% capacity by Thursday. Consider scheduling maintenance or upgrading RAM.`,
      confidence: 78,
      action: 'Schedule Maintenance',
      icon: 'AlertTriangle',
      color: 'warning'
    },
    {
      id: 5,
      type: 'productivity',
      title: 'Focus Enhancement',
      content: `Your productivity peaks during 25-minute focused sessions with 5-minute breaks. This Pomodoro pattern shows 41% better task completion rates.`,
      confidence: 89,
      action: 'Apply Technique',
      icon: 'Zap',
      color: 'primary'
    }
  ];

  const achievements = [
    {
      title: 'Study Streak Master',
      description: '7 consecutive days of study goals met',
      xp: 250,
      icon: 'Award',
      unlocked: true
    },
    {
      title: 'Business Growth',
      description: 'Monthly revenue increased by 15%',
      xp: 500,
      icon: 'TrendingUp',
      unlocked: true
    },
    {
      title: 'Habit Champion',
      description: 'Maintained 3 habits for 2 weeks',
      xp: 300,
      icon: 'Target',
      unlocked: false
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsight((prev) => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [insights.length]);

  const generateNewInsight = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      // In a real app, this would fetch new AI insights
      console.log('Generated new insight');
    }, 2000);
  };

  const getColorClasses = (color) => {
    const colorMap = {
      primary: 'text-primary bg-primary/20 border-primary/30',
      secondary: 'text-secondary bg-secondary/20 border-secondary/30',
      accent: 'text-accent bg-accent/20 border-accent/30',
      warning: 'text-warning bg-warning/20 border-warning/30'
    };
    return colorMap[color] || 'text-text-secondary bg-surface-light border-white/20';
  };

  const currentInsightData = insights[currentInsight];

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Brain" size={20} strokeWidth={2} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">AI Insights</h3>
            <p className="text-sm text-text-secondary">Personalized recommendations</p>
          </div>
        </div>

        <button
          onClick={generateNewInsight}
          disabled={isGenerating}
          className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150 disabled:opacity-50"
        >
          <Icon 
            name={isGenerating ? "Loader2" : "RefreshCw"} 
            size={16} 
            strokeWidth={2}
            className={isGenerating ? "animate-spin" : ""}
          />
        </button>
      </div>

      {/* Current Insight */}
      <div className="mb-6">
        <div className={`p-4 rounded-lg border ${getColorClasses(currentInsightData.color)} mb-4`}>
          <div className="flex items-center space-x-2 mb-3">
            <Icon name={currentInsightData.icon} size={16} strokeWidth={2} />
            <span className="text-sm font-medium">{currentInsightData.title}</span>
            <div className="ml-auto flex items-center space-x-1 text-xs">
              <Icon name="Zap" size={12} strokeWidth={2} />
              <span>{currentInsightData.confidence}% confidence</span>
            </div>
          </div>
          <p className="text-sm text-text-primary mb-3 leading-relaxed">
            {currentInsightData.content}
          </p>
          <button className="text-sm font-medium hover:underline transition-all duration-150">
            {currentInsightData.action}
          </button>
        </div>

        {/* Insight Navigation */}
        <div className="flex items-center justify-center space-x-2">
          {insights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentInsight(index)}
              className={`w-2 h-2 rounded-full transition-all duration-150 ${
                index === currentInsight ? 'bg-primary' : 'bg-surface-light'
              }`}
            />
          ))}
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-primary">XP Progress</span>
          <span className="text-sm text-text-secondary">2,847 / 3,000</span>
        </div>
        <div className="w-full bg-surface-light rounded-full h-2 mb-2">
          <div 
            className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
            style={{ width: '94.9%' }}
          />
        </div>
        <div className="text-xs text-text-secondary">153 XP to next level</div>
      </div>

      {/* Recent Achievements */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Recent Achievements</h4>
        {achievements.map((achievement, index) => (
          <div 
            key={index}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-150 ${
              achievement.unlocked 
                ? 'bg-accent/10 border border-accent/20' :'bg-surface-light border border-white/10 opacity-60'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              achievement.unlocked ? 'bg-accent/20' : 'bg-surface'
            }`}>
              <Icon 
                name={achievement.icon} 
                size={16} 
                strokeWidth={2}
                className={achievement.unlocked ? 'text-accent' : 'text-text-quaternary'}
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-text-primary">{achievement.title}</div>
              <div className="text-xs text-text-secondary">{achievement.description}</div>
            </div>
            <div className="text-xs text-accent font-medium">+{achievement.xp} XP</div>
          </div>
        ))}
      </div>

      {/* AI Status */}
      <div className="mt-6 p-3 bg-surface-light rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-xs text-text-secondary">AI is actively learning from your patterns</span>
        </div>
      </div>
    </div>
  );
};

export default AIInsightsPanel;