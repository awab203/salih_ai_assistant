import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const StudyTimer = ({ isActive, onStart, onStop }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState('study'); // study, break
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && isActive) {
      interval = setInterval(() => {
        setTime(time => time + 1);
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, isActive]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    onStart();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTime(0);
    onStop();
  };

  const handlePomodoroComplete = () => {
    setPomodoroCount(count => count + 1);
    setSessionType(sessionType === 'study' ? 'break' : 'study');
    setTime(0);
    setIsRunning(false);
  };

  const getSessionDuration = () => {
    if (sessionType === 'study') return 25 * 60; // 25 minutes
    return 5 * 60; // 5 minutes break
  };

  const progress = (time / getSessionDuration()) * 100;

  return (
    <div className="mb-6">
      <div className="bg-surface-light rounded-xl p-4 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Study Timer</h3>
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={16} className="text-primary" strokeWidth={2} />
            <span className="text-sm text-text-secondary">{pomodoroCount} sessions</span>
          </div>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-4">
          <div className="relative w-32 h-32 mx-auto mb-3">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#gradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 54}`}
                strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress / 100)}`}
                className="transition-all duration-1000"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--color-primary)" />
                  <stop offset="100%" stopColor="var(--color-secondary)" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{formatTime(time)}</p>
                <p className="text-xs text-text-secondary capitalize">{sessionType}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Session Type Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className={`w-3 h-3 rounded-full ${
            sessionType === 'study' ? 'bg-primary' : 'bg-surface-lighter'
          }`}></div>
          <span className="text-sm text-text-secondary">Study</span>
          <div className={`w-3 h-3 rounded-full ${
            sessionType === 'break' ? 'bg-accent' : 'bg-surface-lighter'
          }`}></div>
          <span className="text-sm text-text-secondary">Break</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-2">
          {!isRunning ? (
            <button
              onClick={handleStart}
              className="flex items-center space-x-2 px-4 py-2 bg-primary hover:bg-primary-600 text-white rounded-lg transition-colors duration-150"
            >
              <Icon name="Play" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">Start</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center space-x-2 px-4 py-2 bg-warning hover:bg-warning-600 text-white rounded-lg transition-colors duration-150"
            >
              <Icon name="Pause" size={16} strokeWidth={2} />
              <span className="text-sm font-medium">Pause</span>
            </button>
          )}
          
          <button
            onClick={handleStop}
            className="flex items-center space-x-2 px-4 py-2 bg-surface-lighter hover:bg-surface text-text-secondary rounded-lg transition-colors duration-150"
          >
            <Icon name="Square" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Stop</span>
          </button>
        </div>

        {/* Pomodoro Progress */}
        {time >= getSessionDuration() && (
          <div className="mt-4 p-3 bg-accent/20 rounded-lg border border-accent/30">
            <div className="flex items-center justify-between">
              <p className="text-sm text-accent font-medium">Session Complete!</p>
              <button
                onClick={handlePomodoroComplete}
                className="text-sm text-accent hover:text-accent-400 transition-colors duration-150"
              >
                Next Session
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyTimer;