import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const FocusMode = ({ onExit }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [sessionTime, setSessionTime] = useState(0);

  const ambientTracks = [
    {
      id: 1,
      name: 'Forest Rain',
      duration: '45:00',
      type: 'nature',
      icon: 'CloudRain'
    },
    {
      id: 2,
      name: 'Ocean Waves',
      duration: '60:00',
      type: 'nature',
      icon: 'Waves'
    },
    {
      id: 3,
      name: 'White Noise',
      duration: '∞',
      type: 'noise',
      icon: 'Radio'
    },
    {
      id: 4,
      name: 'Cafe Ambience',
      duration: '30:00',
      type: 'ambient',
      icon: 'Coffee'
    },
    {
      id: 5,
      name: 'Binaural Beats',
      duration: '40:00',
      type: 'focus',
      icon: 'Headphones'
    }
  ];

  const blockedSites = [
    'Social Media',
    'News Sites',
    'Entertainment',
    'Shopping',
    'Gaming'
  ];

  useEffect(() => {
    setIsActive(true);
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Simulate blocking distracting websites
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = 'Focus mode is active. Are you sure you want to leave?';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrackSelect = (index) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit Focus Mode? Your session will be saved.')) {
      onExit();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-500 ${
      isActive ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      {/* Focus Mode Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-surface/80 to-background/90">
        {/* Ambient Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Focus Mode Header */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center animate-pulse">
              <Icon name="Focus" size={20} className="text-primary" strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-text-primary">Focus Mode Active</h1>
              <p className="text-sm text-text-secondary">Session time: {formatTime(sessionTime)}</p>
            </div>
          </div>
          <button
            onClick={handleExit}
            className="flex items-center space-x-2 px-4 py-2 bg-surface/80 hover:bg-surface text-text-secondary rounded-lg transition-colors duration-150"
          >
            <Icon name="X" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Exit Focus</span>
          </button>
        </div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-6">
            {/* Focus Message */}
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                <Icon name="Brain" size={32} color="white" strokeWidth={2} />
              </div>
              <h2 className="text-3xl font-bold text-gradient-primary mb-2">Deep Focus</h2>
              <p className="text-text-secondary text-lg">
                Distractions are blocked. Your mind is clear. Focus on what matters.
              </p>
            </div>

            {/* Ambient Music Player */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-6 border border-white/10 mb-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Ambient Sounds</h3>
              
              {/* Current Track */}
              <div className="flex items-center justify-between mb-4 p-3 bg-surface-light rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name={ambientTracks[currentTrack].icon} size={20} className="text-primary" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{ambientTracks[currentTrack].name}</p>
                    <p className="text-xs text-text-secondary">{ambientTracks[currentTrack].duration}</p>
                  </div>
                </div>
                <button
                  onClick={togglePlayback}
                  className="w-10 h-10 bg-primary hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-150"
                >
                  <Icon name={isPlaying ? "Pause" : "Play"} size={16} color="white" strokeWidth={2} />
                </button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center space-x-3 mb-4">
                <Icon name="Volume2" size={16} className="text-text-secondary" strokeWidth={2} />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    className="w-full h-2 bg-surface-lighter rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <span className="text-xs text-text-secondary w-8">{volume}%</span>
              </div>

              {/* Track Selection */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {ambientTracks.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(index)}
                    className={`flex items-center space-x-2 p-2 rounded-lg transition-colors duration-150 ${
                      index === currentTrack 
                        ? 'bg-primary/20 text-primary border border-primary/30' :'bg-surface-lighter hover:bg-surface text-text-secondary'
                    }`}
                  >
                    <Icon name={track.icon} size={14} strokeWidth={2} />
                    <span className="text-xs font-medium truncate">{track.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Blocked Distractions */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Blocked Distractions</h4>
              <div className="flex flex-wrap gap-2">
                {blockedSites.map((site, index) => (
                  <span key={index} className="px-2 py-1 text-xs bg-error/20 text-error rounded-full">
                    {site}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-center p-3 bg-surface/80 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-lg font-bold text-accent">{Math.floor(sessionTime / 60)}</p>
              <p className="text-xs text-text-secondary">Minutes</p>
            </div>
            <div className="text-center p-3 bg-surface/80 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-lg font-bold text-primary">0</p>
              <p className="text-xs text-text-secondary">Distractions</p>
            </div>
            <div className="text-center p-3 bg-surface/80 backdrop-blur-sm rounded-lg border border-white/10">
              <p className="text-lg font-bold text-secondary">100%</p>
              <p className="text-xs text-text-secondary">Focus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;