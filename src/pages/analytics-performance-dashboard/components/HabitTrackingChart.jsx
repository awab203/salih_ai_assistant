import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const HabitTrackingChart = ({ data }) => {
  const [selectedHabit, setSelectedHabit] = useState(0);

  // Mock weekly data for habit consistency
  const weeklyData = [
    [1, 1, 0, 1, 1, 1, 0], // Morning Exercise
    [1, 1, 1, 0, 1, 1, 0], // Reading
    [0, 1, 1, 1, 0, 1, 1]  // Meditation
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getStreakColor = (current, best) => {
    const ratio = current / best;
    if (ratio >= 0.8) return 'text-accent';
    if (ratio >= 0.5) return 'text-warning';
    return 'text-error';
  };

  const getStreakBgColor = (current, best) => {
    const ratio = current / best;
    if (ratio >= 0.8) return 'bg-accent/20 border-accent/30';
    if (ratio >= 0.5) return 'bg-warning/20 border-warning/30';
    return 'bg-error/20 border-error/30';
  };

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
            <Icon name="Heart" size={20} strokeWidth={2} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Habit Tracking</h3>
            <p className="text-sm text-text-secondary">Monitor your daily routines</p>
          </div>
        </div>

        {/* Consistency Score */}
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{data.consistency}%</div>
          <div className="text-sm text-text-secondary">Overall Consistency</div>
        </div>
      </div>

      {/* Habit Streaks */}
      <div className="space-y-4 mb-6">
        {data.streaks.map((habit, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
              selectedHabit === index 
                ? getStreakBgColor(habit.current, habit.best)
                : 'bg-surface-light border-white/10 hover:border-white/20'
            }`}
            onClick={() => setSelectedHabit(index)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: habit.color }}
                />
                <span className="text-text-primary font-medium">{habit.habit}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className={`text-lg font-bold ${getStreakColor(habit.current, habit.best)}`}>
                    {habit.current}
                  </div>
                  <div className="text-xs text-text-secondary">Current</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-text-secondary">
                    {habit.best}
                  </div>
                  <div className="text-xs text-text-secondary">Best</div>
                </div>
                <div className="w-16 bg-surface rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${Math.min((habit.current / habit.best) * 100, 100)}%`,
                      backgroundColor: habit.color
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Weekly Habit Grid */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-text-primary">
          This Week: {data.streaks[selectedHabit].habit}
        </h4>
        
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, dayIndex) => {
            const completed = weeklyData[selectedHabit][dayIndex];
            return (
              <div key={dayIndex} className="text-center">
                <div className="text-xs text-text-secondary mb-2">{day}</div>
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center mx-auto transition-all duration-150 ${
                    completed 
                      ? 'bg-accent/20 border border-accent/30' :'bg-surface-light border border-white/10'
                  }`}
                >
                  {completed ? (
                    <Icon name="Check" size={14} strokeWidth={2} className="text-accent" />
                  ) : (
                    <Icon name="X" size={14} strokeWidth={2} className="text-text-quaternary" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Habit Insights */}
      <div className="mt-6 p-4 bg-surface-light rounded-lg">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="Lightbulb" size={16} strokeWidth={2} className="text-warning" />
          <span className="text-sm font-medium text-text-primary">Insight</span>
        </div>
        <p className="text-sm text-text-secondary">
          {selectedHabit === 0 && "Your morning exercise streak is strong! Try to maintain consistency on weekends."}
          {selectedHabit === 1 && "Reading habit shows good progress. Consider setting a specific time each day."}
          {selectedHabit === 2 && "Meditation practice could benefit from a more consistent schedule. Try morning sessions."}
        </p>
      </div>
    </div>
  );
};

export default HabitTrackingChart;