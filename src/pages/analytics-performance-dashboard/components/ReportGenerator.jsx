import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ReportGenerator = ({ onClose, analyticsData }) => {
  const [reportConfig, setReportConfig] = useState({
    title: 'Weekly Performance Report',
    dateRange: '7d',
    categories: {
      study: true,
      business: true,
      health: true,
      system: false
    },
    format: 'pdf',
    includeCharts: true,
    includeInsights: true,
    includeRecommendations: true
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const reportTypes = [
    { id: 'weekly', label: 'Weekly Summary', description: 'Comprehensive 7-day overview' },
    { id: 'monthly', label: 'Monthly Report', description: 'Detailed monthly analysis' },
    { id: 'custom', label: 'Custom Report', description: 'Tailored to your needs' }
  ];

  const formats = [
    { id: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { id: 'excel', label: 'Excel Spreadsheet', icon: 'Table' },
    { id: 'json', label: 'JSON Data', icon: 'Code' }
  ];

  const generationSteps = [
    'Collecting data...',
    'Analyzing patterns...',
    'Generating insights...',
    'Creating visualizations...',
    'Compiling report...',
    'Finalizing document...'
  ];

  const handleCategoryToggle = (category) => {
    setReportConfig(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    setGenerationStep(0);

    // Simulate report generation process
    for (let i = 0; i < generationSteps.length; i++) {
      setGenerationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Simulate file download
    setTimeout(() => {
      setIsGenerating(false);
      onClose();
      // In a real app, this would trigger actual file download
      console.log('Report generated with config:', reportConfig);
    }, 500);
  };

  const getSelectedCategoriesCount = () => {
    return Object.values(reportConfig.categories).filter(Boolean).length;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface rounded-xl border border-white/10 shadow-elevation-4 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} strokeWidth={2} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Generate Report</h2>
              <p className="text-sm text-text-secondary">Create custom analytics reports</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {!isGenerating ? (
            <>
              {/* Report Title */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  value={reportConfig.title}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2 bg-surface-light border border-white/20 rounded-lg text-text-primary placeholder-text-quaternary focus:outline-none focus:border-primary/50"
                  placeholder="Enter report title..."
                />
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Date Range
                </label>
                <select
                  value={reportConfig.dateRange}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, dateRange: e.target.value }))}
                  className="w-full px-4 py-2 bg-surface-light border border-white/20 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
                >
                  <option value="24h">Last 24 Hours</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="30d">Last 30 Days</option>
                  <option value="90d">Last 90 Days</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Include Categories ({getSelectedCategoriesCount()} selected)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'study', label: 'Study Progress', icon: 'BookOpen', color: 'accent' },
                    { key: 'business', label: 'Business Metrics', icon: 'TrendingUp', color: 'secondary' },
                    { key: 'health', label: 'Health & Habits', icon: 'Heart', color: 'primary' },
                    { key: 'system', label: 'System Performance', icon: 'Monitor', color: 'warning' }
                  ].map((category) => (
                    <label
                      key={category.key}
                      className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                        reportConfig.categories[category.key]
                          ? `bg-${category.color}/10 border-${category.color}/30`
                          : 'bg-surface-light border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={reportConfig.categories[category.key]}
                        onChange={() => handleCategoryToggle(category.key)}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reportConfig.categories[category.key]
                          ? `bg-${category.color}/20`
                          : 'bg-surface'
                      }`}>
                        <Icon 
                          name={category.icon} 
                          size={16} 
                          strokeWidth={2}
                          className={reportConfig.categories[category.key] ? `text-${category.color}` : 'text-text-quaternary'}
                        />
                      </div>
                      <span className="text-sm font-medium text-text-primary">{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Export Format
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {formats.map((format) => (
                    <label
                      key={format.id}
                      className={`flex flex-col items-center space-y-2 p-3 rounded-lg border cursor-pointer transition-all duration-150 ${
                        reportConfig.format === format.id
                          ? 'bg-primary/10 border-primary/30' :'bg-surface-light border-white/10 hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio"
                        name="format"
                        value={format.id}
                        checked={reportConfig.format === format.id}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, format: e.target.value }))}
                        className="sr-only"
                      />
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        reportConfig.format === format.id ? 'bg-primary/20' : 'bg-surface'
                      }`}>
                        <Icon 
                          name={format.icon} 
                          size={16} 
                          strokeWidth={2}
                          className={reportConfig.format === format.id ? 'text-primary' : 'text-text-quaternary'}
                        />
                      </div>
                      <span className="text-xs font-medium text-text-primary text-center">{format.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-3">
                  Additional Options
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'includeCharts', label: 'Include Charts & Visualizations' },
                    { key: 'includeInsights', label: 'Include AI Insights' },
                    { key: 'includeRecommendations', label: 'Include Recommendations' }
                  ].map((option) => (
                    <label
                      key={option.key}
                      className="flex items-center space-x-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={reportConfig[option.key]}
                        onChange={(e) => setReportConfig(prev => ({ ...prev, [option.key]: e.target.checked }))}
                        className="w-4 h-4 text-primary bg-surface-light border-white/20 rounded focus:ring-primary/50"
                      />
                      <span className="text-sm text-text-primary">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Generation Progress */
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="FileText" size={24} strokeWidth={2} className="text-primary animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">Generating Report</h3>
              <p className="text-text-secondary mb-6">{generationSteps[generationStep]}</p>
              
              {/* Progress Bar */}
              <div className="w-full bg-surface-light rounded-full h-2 mb-4">
                <div 
                  className="h-2 bg-gradient-primary rounded-full transition-all duration-500"
                  style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
                />
              </div>
              <div className="text-sm text-text-secondary">
                Step {generationStep + 1} of {generationSteps.length}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {!isGenerating && (
          <div className="flex items-center justify-between p-6 border-t border-white/10">
            <button
              onClick={onClose}
              className="px-4 py-2 text-text-secondary hover:text-text-primary transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={generateReport}
              disabled={getSelectedCategoriesCount() === 0}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-primary text-white rounded-lg font-medium shadow-glow-primary hover:scale-105 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon name="Download" size={16} strokeWidth={2} />
              <span>Generate Report</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;