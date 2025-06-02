import React from 'react';
import Icon from 'components/AppIcon';

const ProgressTracker = () => {
  const weeklyProgress = [
    { day: 'Mon', hours: 2.5, target: 3 },
    { day: 'Tue', hours: 3.2, target: 3 },
    { day: 'Wed', hours: 1.8, target: 3 },
    { day: 'Thu', hours: 4.1, target: 3 },
    { day: 'Fri', hours: 2.9, target: 3 },
    { day: 'Sat', hours: 3.5, target: 3 },
    { day: 'Sun', hours: 2.1, target: 3 }
  ];

  const achievements = [
    {
      id: 1,
      title: '7-Day Streak',
      description: 'Study for 7 consecutive days',
      icon: 'Flame',
      completed: true,
      progress: 100
    },
    {
      id: 2,
      title: 'Math Master',
      description: 'Complete 10 math lessons',
      icon: 'Calculator',
      completed: false,
      progress: 80
    },
    {
      id: 3,
      title: 'Speed Reader',
      description: 'Read 5 literature pieces',
      icon: 'BookOpen',
      completed: false,
      progress: 60
    }
  ];

  const totalHours = weeklyProgress.reduce((sum, day) => sum + day.hours, 0);
  const averageHours = totalHours / weeklyProgress.length;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Progress Tracker</h3>
      
      {/* Weekly Overview */}
      <div className="bg-surface-light rounded-xl p-4 border border-white/10 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">This Week</h4>
          <span className="text-xs text-text-secondary">{totalHours.toFixed(1)}h total</span>
        </div>
        
        {/* Weekly Chart */}
        <div className="flex items-end justify-between space-x-1 h-20 mb-3">
          {weeklyProgress.map((day, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className="w-full bg-surface-lighter rounded-t relative" style={{ height: '60px' }}>
                <div 
                  className={`absolute bottom-0 w-full rounded-t transition-all duration-300 ${
                    day.hours >= day.target ? 'bg-accent' : 'bg-primary'
                  }`}
                  style={{ height: `${Math.min((day.hours / day.target) * 100, 100)}%` }}
                ></div>
                {day.hours > day.target && (
                  <div 
                    className="absolute bottom-0 w-full bg-warning rounded-t"
                    style={{ height: `${((day.hours - day.target) / day.target) * 100}%` }}
                  ></div>
                )}
              </div>
              <span className="text-xs text-text-tertiary mt-1">{day.day}</span>
            </div>
          ))}
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-text-primary">{averageHours.toFixed(1)}h</p>
            <p className="text-xs text-text-secondary">Daily Average</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-accent">21h</p>
            <p className="text-xs text-text-secondary">Weekly Target</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-surface-light rounded-xl p-4 border border-white/10">
        <h4 className="text-sm font-medium text-text-primary mb-3">Achievements</h4>
        <div className="space-y-3">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                achievement.completed 
                  ? 'bg-accent text-white' :'bg-surface-lighter text-text-secondary'
              }`}>
                <Icon name={achievement.icon} size={16} strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-text-primary">{achievement.title}</p>
                  <span className="text-xs text-text-secondary">{achievement.progress}%</span>
                </div>
                <p className="text-xs text-text-tertiary">{achievement.description}</p>
                <div className="w-full bg-surface-lighter rounded-full h-1 mt-1">
                  <div 
                    className={`h-1 rounded-full transition-all duration-300 ${
                      achievement.completed ? 'bg-accent' : 'bg-primary'
                    }`}
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;