import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import TopNavigation from 'components/ui/TopNavigation';
import ContextualSidebar from 'components/ui/ContextualSidebar';
import AIAssistantWidget from 'components/ui/AIAssistantWidget';
import NotificationCenter from 'components/ui/NotificationCenter';
import NeuralMemoryBank from './components/NeuralMemoryBank';
import AIPersonalityConfig from './components/AIPersonalityConfig';
import PersonalizationControls from './components/PersonalizationControls';
import IntelliCoreSphere from './components/IntelliCoreSphere';

const AIMemoryPersonalizationCenter = () => {
  const [selectedMemoryCategory, setSelectedMemoryCategory] = useState('all');
  const [aiPersonality, setAiPersonality] = useState('adaptive');
  const [voicePack, setVoicePack] = useState('jarvis');
  const [glowIntensity, setGlowIntensity] = useState(75);
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock data for AI memory patterns
  const memoryData = [
    {
      id: 1,
      category: 'study',
      type: 'Learning Pattern',
      description: 'User prefers visual learning with diagrams and charts',
      confidence: 92,
      timestamp: new Date(Date.now() - 86400000 * 2),
      impact: 'high',
      interactions: 156
    },
    {
      id: 2,
      category: 'business',
      type: 'Work Schedule',
      description: 'Most productive during evening hours (6-10 PM)',
      confidence: 87,
      timestamp: new Date(Date.now() - 86400000 * 5),
      impact: 'medium',
      interactions: 89
    },
    {
      id: 3,
      category: 'personal',
      type: 'Communication Style',
      description: 'Prefers concise, direct responses with actionable insights',
      confidence: 94,
      timestamp: new Date(Date.now() - 86400000 * 1),
      impact: 'high',
      interactions: 234
    },
    {
      id: 4,
      category: 'health',
      type: 'Activity Pattern',
      description: 'Regular exercise routine on weekdays, rest on weekends',
      confidence: 78,
      timestamp: new Date(Date.now() - 86400000 * 7),
      impact: 'medium',
      interactions: 67
    }
  ];

  const personalityProfiles = [
    {
      id: 'adaptive',
      name: 'Adaptive Assistant',
      description: 'Learns and adapts to your communication style over time',
      traits: ['Empathetic', 'Learning-focused', 'Contextual'],
      voiceStyle: 'Warm and supportive'
    },
    {
      id: 'professional',
      name: 'Professional Advisor',
      description: 'Formal, efficient, and business-oriented responses',
      traits: ['Direct', 'Analytical', 'Goal-oriented'],
      voiceStyle: 'Clear and authoritative'
    },
    {
      id: 'creative',
      name: 'Creative Companion',
      description: 'Encouraging creativity and innovative thinking',
      traits: ['Inspiring', 'Imaginative', 'Encouraging'],
      voiceStyle: 'Enthusiastic and motivating'
    },
    {
      id: 'mentor',
      name: 'Learning Mentor',
      description: 'Patient teacher focused on educational growth',
      traits: ['Patient', 'Educational', 'Supportive'],
      voiceStyle: 'Calm and instructional'
    }
  ];

  const voicePacks = [
    {
      id: 'jarvis',
      name: 'J.A.R.V.I.S',
      description: 'Sophisticated AI assistant with British accent',
      preview: 'Good morning. I have analyzed your schedule and prepared your daily briefing.',
      accent: 'British',
      tone: 'Sophisticated'
    },
    {
      id: 'cortana',
      name: 'Cortana',
      description: 'Friendly and helpful digital assistant',
      preview: 'Hello! I am ready to assist you with your tasks today.',
      accent: 'American',
      tone: 'Friendly'
    },
    {
      id: 'friday',
      name: 'F.R.I.D.A.Y',
      description: 'Casual and conversational AI companion',
      preview: 'Hey there! What can I help you accomplish today?',
      accent: 'Irish',
      tone: 'Casual'
    }
  ];

  const handlePersonalityChange = (personalityId) => {
    setIsConfiguring(true);
    setAiPersonality(personalityId);
    setTimeout(() => setIsConfiguring(false), 2000);
  };

  const handleVoicePackChange = (voiceId) => {
    setVoicePack(voiceId);
  };

  const handleMemoryDelete = (memoryId) => {
    console.log('Deleting memory:', memoryId);
  };

  const handleDataExport = () => {
    console.log('Exporting AI memory data...');
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <ContextualSidebar />
      
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gradient-primary mb-2">
                  AI Memory & Personalization Center
                </h1>
                <p className="text-text-secondary">
                  Configure your AI companion's personality, review learned behaviors, and customize interaction preferences
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-3 bg-surface hover:bg-surface-light rounded-xl border border-white/10 transition-all duration-150"
                >
                  <Icon name="Bell" size={20} strokeWidth={2} className="text-text-secondary" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                    3
                  </span>
                </button>
                <button
                  onClick={handleDataExport}
                  className="flex items-center space-x-2 px-4 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl border border-primary/30 transition-all duration-150"
                >
                  <Icon name="Download" size={18} strokeWidth={2} />
                  <span className="font-medium">Export Data</span>
                </button>
              </div>
            </div>

            {/* Status Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-surface p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Brain" size={20} strokeWidth={2} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Memory Patterns</p>
                    <p className="text-xl font-semibold text-text-primary">{memoryData.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Icon name="Zap" size={20} strokeWidth={2} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">AI Confidence</p>
                    <p className="text-xl font-semibold text-text-primary">89%</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                    <Icon name="MessageCircle" size={20} strokeWidth={2} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Interactions</p>
                    <p className="text-xl font-semibold text-text-primary">1,247</p>
                  </div>
                </div>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-warning/20 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={20} strokeWidth={2} className="text-warning" />
                  </div>
                  <div>
                    <p className="text-sm text-text-secondary">Learning Rate</p>
                    <p className="text-xl font-semibold text-text-primary">+12%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Neural Memory Bank - Left Panel */}
            <div className="xl:col-span-4">
              <NeuralMemoryBank
                memoryData={memoryData}
                selectedCategory={selectedMemoryCategory}
                onCategoryChange={setSelectedMemoryCategory}
                onMemoryDelete={handleMemoryDelete}
              />
            </div>

            {/* AI Personality Configuration - Center */}
            <div className="xl:col-span-5">
              <AIPersonalityConfig
                personalityProfiles={personalityProfiles}
                voicePacks={voicePacks}
                selectedPersonality={aiPersonality}
                selectedVoicePack={voicePack}
                isConfiguring={isConfiguring}
                onPersonalityChange={handlePersonalityChange}
                onVoicePackChange={handleVoicePackChange}
              />
            </div>

            {/* Personalization Controls - Right Panel */}
            <div className="xl:col-span-3">
              <div className="space-y-6">
                <PersonalizationControls
                  glowIntensity={glowIntensity}
                  onGlowIntensityChange={setGlowIntensity}
                />
                <IntelliCoreSphere
                  aiPersonality={aiPersonality}
                  isConfiguring={isConfiguring}
                  glowIntensity={glowIntensity}
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings Section */}
          <div className="mt-8 bg-surface rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Advanced Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-surface-light rounded-lg border border-white/5">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Shield" size={20} strokeWidth={2} className="text-primary" />
                  <h4 className="font-medium text-text-primary">Privacy Controls</h4>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  Manage data retention and privacy settings for AI learning
                </p>
                <button className="text-sm text-primary hover:text-primary-400 transition-colors duration-150">
                  Configure Privacy →
                </button>
              </div>
              <div className="p-4 bg-surface-light rounded-lg border border-white/5">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="Database" size={20} strokeWidth={2} className="text-secondary" />
                  <h4 className="font-medium text-text-primary">Data Management</h4>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  Backup, sync, and manage your AI memory data
                </p>
                <button className="text-sm text-secondary hover:text-secondary-400 transition-colors duration-150">
                  Manage Data →
                </button>
              </div>
              <div className="p-4 bg-surface-light rounded-lg border border-white/5">
                <div className="flex items-center space-x-3 mb-3">
                  <Icon name="RotateCcw" size={20} strokeWidth={2} className="text-warning" />
                  <h4 className="font-medium text-text-primary">Reset Options</h4>
                </div>
                <p className="text-sm text-text-secondary mb-3">
                  Reset AI memory or restore default settings
                </p>
                <button className="text-sm text-warning hover:text-warning-400 transition-colors duration-150">
                  Reset Settings →
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <AIAssistantWidget />
      
      {showNotifications && (
        <div className="fixed top-16 right-6 z-50">
          <NotificationCenter
            isOpen={showNotifications}
            onClose={() => setShowNotifications(false)}
          />
        </div>
      )}
    </div>
  );
};

export default AIMemoryPersonalizationCenter;