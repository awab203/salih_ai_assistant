import React from 'react';
import Icon from 'components/AppIcon';

const SubjectCard = ({ subject, onSelect, onStartLesson, onStartFlashcards }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'accent';
    if (progress >= 60) return 'primary';
    if (progress >= 40) return 'warning';
    return 'error';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'accent';
      case 'intermediate': return 'warning';
      case 'advanced': return 'error';
      default: return 'text-secondary';
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl bg-${subject.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon name={subject.icon} size={24} className={`text-${subject.color}`} strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">{subject.name}</h3>
            <p className="text-sm text-text-secondary">Last activity: {subject.recentActivity}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 text-xs rounded-full bg-${getDifficultyColor(subject.difficulty)}/20 text-${getDifficultyColor(subject.difficulty)}`}>
            {subject.difficulty}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-text-secondary">Progress</span>
          <span className="text-sm font-medium text-text-primary">{subject.progress}%</span>
        </div>
        <div className="w-full bg-surface-lighter rounded-full h-2 mb-2">
          <div 
            className={`bg-${getProgressColor(subject.progress)} h-2 rounded-full transition-all duration-500`}
            style={{ width: `${subject.progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-xs text-text-tertiary">
          <span>{subject.completedLessons} of {subject.totalLessons} lessons</span>
          <span>Next: {subject.nextLesson}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-surface-light rounded-lg">
          <p className="text-lg font-bold text-text-primary">{subject.completedLessons}</p>
          <p className="text-xs text-text-secondary">Completed</p>
        </div>
        <div className="text-center p-2 bg-surface-light rounded-lg">
          <p className="text-lg font-bold text-text-primary">{subject.totalLessons - subject.completedLessons}</p>
          <p className="text-xs text-text-secondary">Remaining</p>
        </div>
        <div className="text-center p-2 bg-surface-light rounded-lg">
          <p className="text-lg font-bold text-text-primary">{Math.round(subject.progress / 10)}</p>
          <p className="text-xs text-text-secondary">Streak</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onStartLesson()}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-${subject.color}/20 hover:bg-${subject.color}/30 text-${subject.color} rounded-lg transition-colors duration-150`}
        >
          <Icon name="Play" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">Continue</span>
        </button>
        <button
          onClick={() => onStartFlashcards()}
          className="flex items-center justify-center p-2 bg-surface-light hover:bg-surface-lighter text-text-secondary rounded-lg transition-colors duration-150"
        >
          <Icon name="Brain" size={16} strokeWidth={2} />
        </button>
        <button
          onClick={() => onSelect(subject)}
          className="flex items-center justify-center p-2 bg-surface-light hover:bg-surface-lighter text-text-secondary rounded-lg transition-colors duration-150"
        >
          <Icon name="MoreHorizontal" size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
};

export default SubjectCard;