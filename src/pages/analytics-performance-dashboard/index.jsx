import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import TopNavigation from 'components/ui/TopNavigation';
import AIAssistantWidget from 'components/ui/AIAssistantWidget';
import KPICard from './components/KPICard';
import StudyAnalyticsChart from './components/StudyAnalyticsChart';
import BusinessMetricsChart from './components/BusinessMetricsChart';
import HabitTrackingChart from './components/HabitTrackingChart';
import SystemPerformanceChart from './components/SystemPerformanceChart';
import AIInsightsPanel from './components/AIInsightsPanel';
import ReportGenerator from './components/ReportGenerator';

const AnalyticsPerformanceDashboard = () => {
  const navigate = useNavigate();
  const [selectedDateRange, setSelectedDateRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isExporting, setIsExporting] = useState(false);
  const [showReportGenerator, setShowReportGenerator] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      id: 'study',
      title: 'Weekly Study Hours',
      value: 42.5,
      unit: 'hrs',
      change: 12.5,
      trend: 'up',
      icon: 'BookOpen',
      color: 'accent',
      target: 45,
      description: 'Total study time this week'
    },
    {
      id: 'business',
      title: 'Monthly Revenue',
      value: 2847.50,
      unit: '£',
      change: -5.2,
      trend: 'down',
      icon: 'TrendingUp',
      color: 'secondary',
      target: 3000,
      description: 'Business earnings this month'
    },
    {
      id: 'health',
      title: 'Health Goals',
      value: 85,
      unit: '%',
      change: 8.3,
      trend: 'up',
      icon: 'Heart',
      color: 'primary',
      target: 90,
      description: 'Goal completion rate'
    },
    {
      id: 'productivity',
      title: 'Productivity Score',
      value: 92,
      unit: 'pts',
      change: 15.7,
      trend: 'up',
      icon: 'Zap',
      color: 'warning',
      target: 95,
      description: 'Overall efficiency rating'
    }
  ];

  // Mock analytics data
  const analyticsData = {
    studyProgress: {
      totalHours: 156.5,
      subjects: [
        { name: 'Mathematics', hours: 68.2, progress: 78, color: '#00D4FF' },
        { name: 'English', hours: 52.8, progress: 65, color: '#8B5CF6' },
        { name: 'Science', hours: 35.5, progress: 45, color: '#10B981' }
      ],
      weeklyTrend: [32, 38, 42, 45, 41, 39, 42.5]
    },
    businessMetrics: {
      totalRevenue: 8542.30,
      platforms: [
        { name: 'eBay', revenue: 3245.80, orders: 45, color: '#00D4FF' },
        { name: 'Depop', revenue: 2876.50, orders: 32, color: '#8B5CF6' },
        { name: 'Vinted', revenue: 2420.00, orders: 28, color: '#10B981' }
      ],
      monthlyTrend: [2100, 2350, 2680, 2847.50]
    },
    habitTracking: {
      streaks: [
        { habit: 'Morning Exercise', current: 12, best: 18, color: '#00D4FF' },
        { habit: 'Reading', current: 8, best: 15, color: '#8B5CF6' },
        { habit: 'Meditation', current: 5, best: 10, color: '#10B981' }
      ],
      consistency: 78.5
    },
    systemPerformance: {
      cpu: 45,
      memory: 62,
      storage: 78,
      network: 95,
      uptime: '7d 14h 32m'
    }
  };

  const dateRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: 'BarChart3' },
    { value: 'study', label: 'Study Progress', icon: 'BookOpen' },
    { value: 'business', label: 'Business Metrics', icon: 'TrendingUp' },
    { value: 'health', label: 'Health & Habits', icon: 'Heart' },
    { value: 'system', label: 'System Performance', icon: 'Monitor' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      // In a real app, this would trigger file download
      console.log('Analytics data exported');
    }, 2000);
  };

  const handleQuickNavigation = (route) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      
      <main className="pt-16">
        {/* Analytics Header */}
        <div className="bg-surface border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Title Section */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow-primary">
                  <Icon name="BarChart3" size={24} color="white" strokeWidth={2} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Analytics & Performance</h1>
                  <p className="text-text-secondary">Comprehensive insights across all your activities</p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Date Range Selector */}
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="px-4 py-2 bg-surface-light border border-white/20 rounded-lg text-text-primary text-sm focus:outline-none focus:border-primary/50"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>

                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-surface-light border border-white/20 rounded-lg text-text-primary text-sm focus:outline-none focus:border-primary/50"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                {/* Export Button */}
                <button
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center space-x-2 px-4 py-2 bg-surface-light hover:bg-surface-lighter border border-white/20 rounded-lg text-text-primary text-sm transition-all duration-150 disabled:opacity-50"
                >
                  <Icon 
                    name={isExporting ? "Loader2" : "Download"} 
                    size={16} 
                    strokeWidth={2}
                    className={isExporting ? "animate-spin" : ""}
                  />
                  <span>{isExporting ? 'Exporting...' : 'Export'}</span>
                </button>

                {/* Report Generator */}
                <button
                  onClick={() => setShowReportGenerator(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/30 rounded-lg text-primary text-sm transition-all duration-150"
                >
                  <Icon name="FileText" size={16} strokeWidth={2} />
                  <span>Generate Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.id} data={kpi} />
            ))}
          </div>

          {/* Main Analytics Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Study Analytics */}
            {(selectedCategory === 'all' || selectedCategory === 'study') && (
              <div className="xl:col-span-2">
                <StudyAnalyticsChart data={analyticsData.studyProgress} />
              </div>
            )}

            {/* AI Insights Panel */}
            <div className={selectedCategory === 'all' ? 'xl:col-span-1' : 'xl:col-span-3'}>
              <AIInsightsPanel />
            </div>
          </div>

          {/* Secondary Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Business Metrics */}
            {(selectedCategory === 'all' || selectedCategory === 'business') && (
              <BusinessMetricsChart data={analyticsData.businessMetrics} />
            )}

            {/* Habit Tracking */}
            {(selectedCategory === 'all' || selectedCategory === 'health') && (
              <HabitTrackingChart data={analyticsData.habitTracking} />
            )}
          </div>

          {/* System Performance */}
          {(selectedCategory === 'all' || selectedCategory === 'system') && (
            <div className="mb-8">
              <SystemPerformanceChart data={analyticsData.systemPerformance} />
            </div>
          )}

          {/* Quick Navigation */}
          <div className="bg-surface rounded-xl border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { route: '/command-hub-dashboard', label: 'Command Hub', icon: 'LayoutDashboard', color: 'primary' },
                { route: '/study-assistant-hub', label: 'Study Hub', icon: 'BookOpen', color: 'accent' },
                { route: '/reselling-business-manager', label: 'Business', icon: 'TrendingUp', color: 'secondary' },
                { route: '/ai-memory-personalization-center', label: 'AI Center', icon: 'Brain', color: 'warning' },
                { route: '/authentication-screen', label: 'Settings', icon: 'Settings', color: 'text-secondary' }
              ].map((nav) => (
                <button
                  key={nav.route}
                  onClick={() => handleQuickNavigation(nav.route)}
                  className="flex flex-col items-center space-y-2 p-4 bg-surface-light hover:bg-surface-lighter rounded-lg transition-all duration-150 group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${nav.color}/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-150`}>
                    <Icon name={nav.icon} size={20} strokeWidth={2} className={`text-${nav.color}`} />
                  </div>
                  <span className="text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-150">
                    {nav.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Report Generator Modal */}
      {showReportGenerator && (
        <ReportGenerator 
          onClose={() => setShowReportGenerator(false)}
          analyticsData={analyticsData}
        />
      )}

      <AIAssistantWidget />
    </div>
  );
};

export default AnalyticsPerformanceDashboard;