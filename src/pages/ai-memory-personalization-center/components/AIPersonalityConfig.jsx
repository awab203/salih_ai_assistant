import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AIPersonalityConfig = ({
  personalityProfiles,
  voicePacks,
  selectedPersonality,
  selectedVoicePack,
  isConfiguring,
  onPersonalityChange,
  onVoicePackChange
}) => {
  const [activeTab, setActiveTab] = useState('personality');
  const [isPlayingPreview, setIsPlayingPreview] = useState(null);

  const tabs = [
    { id: 'personality', label: 'Personality', icon: 'User' },
    { id: 'voice', label: 'Voice Packs', icon: 'Volume2' },
    { id: 'responses', label: 'Response Style', icon: 'MessageSquare' },
    { id: 'emotions', label: 'Emotional AI', icon: 'Heart' }
  ];

  const responseStyles = [
    {
      id: 'detailed',
      name: 'Detailed Explanations',
      description: 'Comprehensive responses with context and examples',
      example: 'I understand you are working on mathematics. Let me break down this concept step by step with relevant examples to ensure complete understanding.',
      active: true
    },
    {
      id: 'concise',
      name: 'Concise & Direct',
      description: 'Brief, to-the-point responses focused on key information',
      example: 'Here is the solution: Step 1: Calculate the derivative. Step 2: Apply the chain rule. Result: 2x + 3.',
      active: false
    },
    {
      id: 'conversational',
      name: 'Conversational',
      description: 'Natural, friendly dialogue with personal touches',
      example: 'Hey! I noticed you are working on calculus again. This reminds me of yesterday when you mastered that tricky integration problem. Let me help you with this one too!',
      active: false
    }
  ];

  const emotionalSettings = [
    { id: 'empathy', label: 'Empathy Level', value: 85, color: 'text-accent' },
    { id: 'enthusiasm', label: 'Enthusiasm', value: 70, color: 'text-warning' },
    { id: 'patience', label: 'Patience', value: 95, color: 'text-primary' },
    { id: 'humor', label: 'Humor', value: 45, color: 'text-secondary' }
  ];

  const handleVoicePreview = (voiceId) => {
    setIsPlayingPreview(voiceId);
    setTimeout(() => setIsPlayingPreview(null), 3000);
  };

  const renderPersonalityTab = () => (
    <div className="space-y-4">
      {personalityProfiles.map((profile) => (
        <div
          key={profile.id}
          className={`p-4 rounded-lg border transition-all duration-150 cursor-pointer ${
            selectedPersonality === profile.id
              ? 'bg-primary/10 border-primary/30 shadow-glow-primary'
              : 'bg-surface-light border-white/5 hover:border-white/10'
          }`}
          onClick={() => onPersonalityChange(profile.id)}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">{profile.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{profile.description}</p>
              <div className="flex flex-wrap gap-1">
                {profile.traits.map((trait, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-surface rounded-full text-text-tertiary"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {selectedPersonality === profile.id && (
                <Icon name="Check" size={16} strokeWidth={2} className="text-primary" />
              )}
              {isConfiguring && selectedPersonality === profile.id && (
                <Icon name="Loader2" size={16} strokeWidth={2} className="text-primary animate-spin" />
              )}
            </div>
          </div>
          <div className="text-xs text-text-quaternary">
            Voice Style: {profile.voiceStyle}
          </div>
        </div>
      ))}
    </div>
  );

  const renderVoiceTab = () => (
    <div className="space-y-4">
      {voicePacks.map((voice) => (
        <div
          key={voice.id}
          className={`p-4 rounded-lg border transition-all duration-150 ${
            selectedVoicePack === voice.id
              ? 'bg-secondary/10 border-secondary/30' :'bg-surface-light border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">{voice.name}</h3>
              <p className="text-sm text-text-secondary mb-2">{voice.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-text-quaternary">Accent: </span>
                  <span className="text-text-tertiary">{voice.accent}</span>
                </div>
                <div>
                  <span className="text-text-quaternary">Tone: </span>
                  <span className="text-text-tertiary">{voice.tone}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleVoicePreview(voice.id)}
                className="p-2 bg-surface hover:bg-surface-lighter rounded-lg transition-colors duration-150"
              >
                <Icon 
                  name={isPlayingPreview === voice.id ? "Square" : "Play"} 
                  size={14} 
                  strokeWidth={2} 
                  className="text-text-secondary" 
                />
              </button>
              <button
                onClick={() => onVoicePackChange(voice.id)}
                className={`px-3 py-1 text-xs rounded-lg transition-colors duration-150 ${
                  selectedVoicePack === voice.id
                    ? 'bg-secondary text-white' :'bg-surface text-text-secondary hover:text-text-primary'
                }`}
              >
                {selectedVoicePack === voice.id ? 'Active' : 'Select'}
              </button>
            </div>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-white/5">
            <p className="text-xs text-text-secondary italic">"{voice.preview}"</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderResponsesTab = () => (
    <div className="space-y-4">
      {responseStyles.map((style) => (
        <div
          key={style.id}
          className={`p-4 rounded-lg border transition-all duration-150 ${
            style.active
              ? 'bg-accent/10 border-accent/30' :'bg-surface-light border-white/5 hover:border-white/10'
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary mb-1">{style.name}</h3>
              <p className="text-sm text-text-secondary mb-3">{style.description}</p>
            </div>
            <button className={`px-3 py-1 text-xs rounded-lg transition-colors duration-150 ${
              style.active
                ? 'bg-accent text-white' :'bg-surface text-text-secondary hover:text-text-primary'
            }`}>
              {style.active ? 'Active' : 'Select'}
            </button>
          </div>
          <div className="p-3 bg-surface rounded-lg border border-white/5">
            <p className="text-xs text-text-secondary">{style.example}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEmotionsTab = () => (
    <div className="space-y-6">
      <div className="text-sm text-text-secondary mb-4">
        Adjust how your AI responds emotionally to different situations and contexts.
      </div>
      {emotionalSettings.map((setting) => (
        <div key={setting.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">{setting.label}</label>
            <span className={`text-sm font-medium ${setting.color}`}>{setting.value}%</span>
          </div>
          <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                setting.color === 'text-accent' ? 'bg-accent' :
                setting.color === 'text-warning' ? 'bg-warning' :
                setting.color === 'text-primary' ? 'bg-primary' : 'bg-secondary'
              }`}
              style={{ width: `${setting.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
          <Icon name="Settings" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">AI Personality Configuration</h2>
          <p className="text-sm text-text-secondary">Customize your AI companion's behavior and responses</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-surface-light rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 flex-1 justify-center ${
              activeTab === tab.id
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab.icon} size={16} strokeWidth={2} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'personality' && renderPersonalityTab()}
        {activeTab === 'voice' && renderVoiceTab()}
        {activeTab === 'responses' && renderResponsesTab()}
        {activeTab === 'emotions' && renderEmotionsTab()}
      </div>

      {/* Configuration Status */}
      {isConfiguring && (
        <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
          <div className="flex items-center space-x-3">
            <Icon name="Loader2" size={20} strokeWidth={2} className="text-primary animate-spin" />
            <div>
              <p className="text-sm font-medium text-primary">Configuring AI Personality...</p>
              <p className="text-xs text-text-secondary">This may take a few moments to complete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIPersonalityConfig;