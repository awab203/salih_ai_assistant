import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PersonalizationControls = ({ glowIntensity, onGlowIntensityChange }) => {
  const [activeSection, setActiveSection] = useState('appearance');
  const [settings, setSettings] = useState({
    theme: 'dark',
    animations: true,
    particles: true,
    soundEffects: true,
    notifications: true,
    autoSave: true,
    dataCollection: true,
    voiceActivation: false
  });

  const sections = [
    { id: 'appearance', label: 'Appearance', icon: 'Palette' },
    { id: 'behavior', label: 'Behavior', icon: 'Zap' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' }
  ];

  const themeOptions = [
    { id: 'dark', name: 'Dark Mode', description: 'Deep space aesthetic with neon accents' },
    { id: 'light', name: 'Light Mode', description: 'Clean bright interface with subtle shadows' },
    { id: 'auto', name: 'Auto', description: 'Adapts to system preferences' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const renderAppearanceSection = () => (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Theme</h4>
        <div className="space-y-2">
          {themeOptions.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleSettingChange('theme', theme.id)}
              className={`w-full p-3 rounded-lg border text-left transition-all duration-150 ${
                settings.theme === theme.id
                  ? 'bg-primary/10 border-primary/30 text-primary' :'bg-surface-light border-white/5 hover:border-white/10 text-text-secondary'
              }`}
            >
              <div className="font-medium text-sm">{theme.name}</div>
              <div className="text-xs opacity-75">{theme.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Glow Intensity */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-text-primary">Glow Intensity</h4>
          <span className="text-sm text-primary">{glowIntensity}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={glowIntensity}
          onChange={(e) => onGlowIntensityChange(parseInt(e.target.value))}
          className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-text-quaternary mt-1">
          <span>Subtle</span>
          <span>Intense</span>
        </div>
      </div>

      {/* Visual Effects */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Visual Effects</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-primary">Animations</div>
              <div className="text-xs text-text-secondary">Smooth transitions and micro-interactions</div>
            </div>
            <button
              onClick={() => handleSettingChange('animations', !settings.animations)}
              className={`w-12 h-6 rounded-full transition-colors duration-150 ${
                settings.animations ? 'bg-primary' : 'bg-surface-lighter'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
                settings.animations ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-primary">Particle Effects</div>
              <div className="text-xs text-text-secondary">Background particles and ambient effects</div>
            </div>
            <button
              onClick={() => handleSettingChange('particles', !settings.particles)}
              className={`w-12 h-6 rounded-full transition-colors duration-150 ${
                settings.particles ? 'bg-primary' : 'bg-surface-lighter'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
                settings.particles ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBehaviorSection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-primary">Sound Effects</div>
            <div className="text-xs text-text-secondary">Audio feedback for interactions</div>
          </div>
          <button
            onClick={() => handleSettingChange('soundEffects', !settings.soundEffects)}
            className={`w-12 h-6 rounded-full transition-colors duration-150 ${
              settings.soundEffects ? 'bg-primary' : 'bg-surface-lighter'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
              settings.soundEffects ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-primary">Voice Activation</div>
            <div className="text-xs text-text-secondary">Wake word detection for hands-free control</div>
          </div>
          <button
            onClick={() => handleSettingChange('voiceActivation', !settings.voiceActivation)}
            className={`w-12 h-6 rounded-full transition-colors duration-150 ${
              settings.voiceActivation ? 'bg-primary' : 'bg-surface-lighter'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
              settings.voiceActivation ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-primary">Smart Notifications</div>
            <div className="text-xs text-text-secondary">AI-powered notification prioritization</div>
          </div>
          <button
            onClick={() => handleSettingChange('notifications', !settings.notifications)}
            className={`w-12 h-6 rounded-full transition-colors duration-150 ${
              settings.notifications ? 'bg-primary' : 'bg-surface-lighter'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
              settings.notifications ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-primary">Auto-Save</div>
            <div className="text-xs text-text-secondary">Automatically save preferences and data</div>
          </div>
          <button
            onClick={() => handleSettingChange('autoSave', !settings.autoSave)}
            className={`w-12 h-6 rounded-full transition-colors duration-150 ${
              settings.autoSave ? 'bg-primary' : 'bg-surface-lighter'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
              settings.autoSave ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-text-primary">Data Collection</div>
            <div className="text-xs text-text-secondary">Allow AI to learn from your interactions</div>
          </div>
          <button
            onClick={() => handleSettingChange('dataCollection', !settings.dataCollection)}
            className={`w-12 h-6 rounded-full transition-colors duration-150 ${
              settings.dataCollection ? 'bg-primary' : 'bg-surface-lighter'
            }`}
          >
            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-150 ${
              settings.dataCollection ? 'translate-x-6' : 'translate-x-0.5'
            }`} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-surface-light rounded-lg border border-white/5">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} strokeWidth={2} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-text-primary mb-1">Privacy Notice</p>
            <p className="text-xs text-text-secondary">
              All data is processed locally on your device. No personal information is shared with external services without your explicit consent.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <button className="w-full p-3 bg-surface-light hover:bg-surface-lighter rounded-lg border border-white/5 text-left transition-colors duration-150">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-primary">View Privacy Policy</div>
              <div className="text-xs text-text-secondary">Learn how your data is handled</div>
            </div>
            <Icon name="ExternalLink" size={16} strokeWidth={2} className="text-text-secondary" />
          </div>
        </button>
        <button className="w-full p-3 bg-surface-light hover:bg-surface-lighter rounded-lg border border-white/5 text-left transition-colors duration-150">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-text-primary">Download My Data</div>
              <div className="text-xs text-text-secondary">Export all stored information</div>
            </div>
            <Icon name="Download" size={16} strokeWidth={2} className="text-text-secondary" />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center">
          <Icon name="Sliders" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-text-primary">Personalization</h2>
          <p className="text-sm text-text-secondary">Customize your experience</p>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface-light rounded-lg p-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex-1 justify-center ${
              activeSection === section.id
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={section.icon} size={14} strokeWidth={2} />
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div>
        {activeSection === 'appearance' && renderAppearanceSection()}
        {activeSection === 'behavior' && renderBehaviorSection()}
        {activeSection === 'privacy' && renderPrivacySection()}
      </div>
    </div>
  );
};

export default PersonalizationControls;