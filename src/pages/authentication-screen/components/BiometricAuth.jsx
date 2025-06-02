import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const BiometricAuth = ({ onBiometricAuth, isVisible, onClose }) => {
  const [scanState, setScanState] = useState('idle'); // 'idle', 'scanning', 'success', 'error'
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (isVisible && scanState === 'idle') {
      startScan();
    }
  }, [isVisible]);

  const startScan = () => {
    setScanState('scanning');
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanState('success');
          setTimeout(() => {
            onBiometricAuth();
          }, 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 60);
  };

  const resetScan = () => {
    setScanState('idle');
    setScanProgress(0);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-surface/95 backdrop-blur-glass rounded-2xl border border-white/10 shadow-elevation-4 p-8 max-w-md w-full mx-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Biometric Authentication</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-300"
          >
            <Icon name="X" size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Biometric Scanner */}
        <div className="flex flex-col items-center space-y-6">
          {/* Scanner Visual */}
          <div className="relative w-32 h-32">
            {/* Outer Ring */}
            <div className={`absolute inset-0 rounded-full border-4 transition-all duration-300 ${
              scanState === 'scanning' ? 'border-primary animate-pulse' :
              scanState === 'success' ? 'border-accent' :
              scanState === 'error'? 'border-error' : 'border-white/20'
            }`} />
            
            {/* Progress Ring */}
            {scanState === 'scanning' && (
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="60"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-primary"
                  strokeDasharray={`${2 * Math.PI * 60}`}
                  strokeDashoffset={`${2 * Math.PI * 60 * (1 - scanProgress / 100)}`}
                  style={{ transition: 'stroke-dashoffset 0.1s ease' }}
                />
              </svg>
            )}

            {/* Center Icon */}
            <div className={`absolute inset-4 rounded-full flex items-center justify-center transition-all duration-300 ${
              scanState === 'scanning' ? 'bg-primary/20 animate-pulse' :
              scanState === 'success' ? 'bg-accent/20' :
              scanState === 'error'? 'bg-error/20' : 'bg-surface-light'
            }`}>
              <Icon 
                name={
                  scanState === 'success' ? 'CheckCircle' :
                  scanState === 'error'? 'XCircle' : 'Fingerprint'
                } 
                size={32} 
                strokeWidth={2}
                className={
                  scanState === 'scanning' ? 'text-primary animate-pulse' :
                  scanState === 'success' ? 'text-accent' :
                  scanState === 'error'? 'text-error' : 'text-text-secondary'
                }
              />
            </div>

            {/* Scanning Lines */}
            {scanState === 'scanning' && (
              <div className="absolute inset-0 overflow-hidden rounded-full">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse"
                    style={{
                      top: `${30 + i * 20}%`,
                      animationDelay: `${i * 0.2}s`,
                      animationDuration: '1.5s'
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Status Text */}
          <div className="text-center space-y-2">
            <h4 className="text-lg font-medium text-text-primary">
              {scanState === 'scanning' ? 'Scanning...' :
               scanState === 'success' ? 'Authentication Successful' :
               scanState === 'error'? 'Authentication Failed' : 'Place Your Finger'}
            </h4>
            <p className="text-sm text-text-secondary">
              {scanState === 'scanning' ? `${scanProgress}% complete` :
               scanState === 'success' ? 'Access granted to IntelliCore AI' :
               scanState === 'error'? 'Please try again' : 'Touch the sensor to authenticate'}
            </p>
          </div>

          {/* Progress Bar */}
          {scanState === 'scanning' && (
            <div className="w-full bg-surface-light rounded-full h-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
                style={{ width: `${scanProgress}%` }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 w-full">
            {scanState === 'error' && (
              <button
                onClick={resetScan}
                className="flex-1 flex items-center justify-center space-x-2 py-3 bg-primary/10 border border-primary/30 text-primary rounded-lg hover:bg-primary/20 transition-all duration-300"
              >
                <Icon name="RotateCcw" size={16} strokeWidth={2} />
                <span>Try Again</span>
              </button>
            )}
            
            <button
              onClick={onClose}
              className="flex-1 flex items-center justify-center space-x-2 py-3 bg-surface-light border border-white/10 text-text-secondary rounded-lg hover:bg-surface-lighter transition-all duration-300"
            >
              <Icon name="X" size={16} strokeWidth={2} />
              <span>Cancel</span>
            </button>
          </div>

          {/* Alternative Methods */}
          <div className="w-full pt-4 border-t border-white/10">
            <p className="text-xs text-text-tertiary text-center mb-3">Alternative methods</p>
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center space-y-1 p-3 bg-surface-light rounded-lg hover:bg-surface-lighter transition-all duration-300">
                <Icon name="Eye" size={16} strokeWidth={2} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">Face ID</span>
              </button>
              <button className="flex flex-col items-center space-y-1 p-3 bg-surface-light rounded-lg hover:bg-surface-lighter transition-all duration-300">
                <Icon name="Smartphone" size={16} strokeWidth={2} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">Phone</span>
              </button>
              <button className="flex flex-col items-center space-y-1 p-3 bg-surface-light rounded-lg hover:bg-surface-lighter transition-all duration-300">
                <Icon name="Key" size={16} strokeWidth={2} className="text-text-secondary" />
                <span className="text-xs text-text-secondary">PIN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiometricAuth;