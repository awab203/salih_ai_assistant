import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const NeuralMemoryBank = ({ 
  memoryData, 
  selectedCategory, 
  onCategoryChange, 
  onMemoryDelete 
}) => {
  const [expandedMemory, setExpandedMemory] = useState(null);

  const categories = [
    { id: 'all', label: 'All Patterns', icon: 'Brain', count: memoryData.length },
    { id: 'study', label: 'Study Habits', icon: 'BookOpen', count: memoryData.filter(m => m.category === 'study').length },
    { id: 'business', label: 'Work Patterns', icon: 'Briefcase', count: memoryData.filter(m => m.category === 'business').length },
    { id: 'personal', label: 'Personal Traits', icon: 'User', count: memoryData.filter(m => m.category === 'personal').length },
    { id: 'health', label: 'Health & Wellness', icon: 'Heart', count: memoryData.filter(m => m.category === 'health').length }
  ];

  const filteredMemories = selectedCategory === 'all' 
    ? memoryData 
    : memoryData.filter(memory => memory.category === selectedCategory);

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      default: return 'text-accent';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-accent';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6 h-fit">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
          <Icon name="Brain" size={20} color="white" strokeWidth={2} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Neural Memory Bank</h2>
          <p className="text-sm text-text-secondary">Behavioral patterns and learned preferences</p>
        </div>
      </div>

      {/* Category Filters */}
      <div className="space-y-2 mb-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-150 ${
              selectedCategory === category.id
                ? 'bg-primary/20 text-primary border border-primary/30' :'text-text-secondary hover:text-text-primary hover:bg-surface-light'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Icon name={category.icon} size={16} strokeWidth={2} />
              <span className="text-sm font-medium">{category.label}</span>
            </div>
            <span className="text-xs px-2 py-1 bg-surface-light rounded-full">
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Memory Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-text-primary">Memory Timeline</h3>
          <button className="text-xs text-text-secondary hover:text-text-primary transition-colors duration-150">
            Sort by confidence
          </button>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              className="p-4 bg-surface-light rounded-lg border border-white/5 hover:border-white/10 transition-all duration-150"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="text-sm font-medium text-text-primary">{memory.type}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full bg-surface ${getImpactColor(memory.impact)}`}>
                      {memory.impact} impact
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{memory.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-text-tertiary">
                    <span>{formatTimestamp(memory.timestamp)}</span>
                    <span>{memory.interactions} interactions</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className={`text-sm font-medium ${getConfidenceColor(memory.confidence)}`}>
                      {memory.confidence}%
                    </div>
                    <div className="text-xs text-text-quaternary">confidence</div>
                  </div>
                  <button
                    onClick={() => setExpandedMemory(expandedMemory === memory.id ? null : memory.id)}
                    className="p-1 rounded text-text-secondary hover:text-text-primary transition-colors duration-150"
                  >
                    <Icon 
                      name={expandedMemory === memory.id ? "ChevronUp" : "ChevronDown"} 
                      size={14} 
                      strokeWidth={2} 
                    />
                  </button>
                </div>
              </div>

              {/* Confidence Bar */}
              <div className="mb-3">
                <div className="w-full bg-surface h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      memory.confidence >= 90 ? 'bg-accent' :
                      memory.confidence >= 70 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${memory.confidence}%` }}
                  />
                </div>
              </div>

              {/* Expanded Details */}
              {expandedMemory === memory.id && (
                <div className="pt-3 border-t border-white/5 animate-slide-in">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Learning Source</p>
                      <p className="text-xs text-text-primary">User Interaction Analysis</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary mb-1">Last Updated</p>
                      <p className="text-xs text-text-primary">{formatTimestamp(memory.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-2 py-1 text-xs bg-surface hover:bg-surface-lighter rounded transition-colors duration-150">
                      <Icon name="Edit" size={12} strokeWidth={2} className="text-text-secondary" />
                      <span className="text-text-secondary">Edit</span>
                    </button>
                    <button 
                      onClick={() => onMemoryDelete(memory.id)}
                      className="flex items-center space-x-1 px-2 py-1 text-xs bg-error/10 hover:bg-error/20 text-error rounded transition-colors duration-150"
                    >
                      <Icon name="Trash2" size={12} strokeWidth={2} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Memory Statistics */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">89%</div>
            <div className="text-xs text-text-secondary">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-accent">546</div>
            <div className="text-xs text-text-secondary">Total Interactions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeuralMemoryBank;