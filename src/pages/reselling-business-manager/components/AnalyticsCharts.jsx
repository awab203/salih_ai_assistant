import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const AnalyticsCharts = ({ data, sales }) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeChart, setActiveChart] = useState('revenue');

  // Mock analytics data
  const revenueData = [
    { date: '15 Jan', revenue: 245.99, profit: 156.23, orders: 8 },
    { date: '16 Jan', revenue: 189.50, profit: 124.67, orders: 6 },
    { date: '17 Jan', revenue: 324.75, profit: 198.45, orders: 12 },
    { date: '18 Jan', revenue: 278.99, profit: 167.89, orders: 9 },
    { date: '19 Jan', revenue: 412.50, profit: 289.34, orders: 15 },
    { date: '20 Jan', revenue: 356.25, profit: 234.56, orders: 11 },
    { date: '21 Jan', revenue: 298.75, profit: 187.23, orders: 10 }
  ];

  const platformData = [
    { name: 'eBay', value: 45, color: '#00D4FF' },
    { name: 'Depop', value: 28, color: '#8B5CF6' },
    { name: 'Vinted', value: 18, color: '#10B981' },
    { name: 'Facebook', value: 9, color: '#F59E0B' }
  ];

  const categoryData = [
    { category: 'Phone Accessories', sales: 45, profit: 567.89 },
    { category: 'Audio', sales: 28, profit: 423.45 },
    { category: 'Clothing', sales: 32, profit: 389.12 },
    { category: 'Gaming', sales: 19, profit: 234.67 },
    { category: 'Home & Garden', sales: 15, profit: 198.34 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/10 rounded-lg p-3 shadow-elevation-2">
          <p className="text-text-primary font-medium mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'revenue' && '£'}
              {entry.dataKey === 'profit' && '£'}
              {entry.value}
              {entry.dataKey === 'orders' && ' orders'}
              {entry.dataKey === 'revenue' && ' revenue'}
              {entry.dataKey === 'profit' && ' profit'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartOptions = [
    { id: 'revenue', label: 'Revenue & Profit', icon: 'TrendingUp' },
    { id: 'platforms', label: 'Platform Distribution', icon: 'PieChart' },
    { id: 'categories', label: 'Category Performance', icon: 'BarChart3' }
  ];

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">Business Analytics</h3>
          <p className="text-text-secondary">Track your performance across platforms and categories</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 lg:mt-0">
          {/* Time Range Selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          
          <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-150">
            <Icon name="Download" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveChart(option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-150 ${
              activeChart === option.id
                ? 'bg-primary/20 text-primary border border-primary/30' :'bg-surface-light text-text-secondary hover:text-text-primary hover:bg-surface-lighter'
            }`}
          >
            <Icon name={option.icon} size={16} strokeWidth={2} />
            <span className="text-sm font-medium">{option.label}</span>
          </button>
        ))}
      </div>

      {/* Charts */}
      <div className="h-80">
        {activeChart === 'revenue' && (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                stroke="#94A3B8"
                fontSize={12}
              />
              <YAxis 
                stroke="#94A3B8"
                fontSize={12}
                tickFormatter={(value) => `£${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#00D4FF" 
                strokeWidth={3}
                dot={{ fill: '#00D4FF', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#00D4FF', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="profit" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}

        {activeChart === 'platforms' && (
          <div className="flex items-center justify-center h-full">
            <div className="w-full max-w-md">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={platformData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {platformData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-surface border border-white/10 rounded-lg p-3 shadow-elevation-2">
                            <p className="text-text-primary font-medium">{payload[0].payload.name}</p>
                            <p className="text-sm text-text-secondary">{payload[0].value}% of sales</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                {platformData.map((platform, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: platform.color }}
                    ></div>
                    <span className="text-sm text-text-secondary">{platform.name}</span>
                    <span className="text-sm text-text-primary font-medium">{platform.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChart === 'categories' && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="category" 
                stroke="#94A3B8"
                fontSize={12}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="#94A3B8"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="sales" 
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
                name="Sales"
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">£3,250</div>
            <div className="text-sm text-text-secondary">Total Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">£2,156</div>
            <div className="text-sm text-text-secondary">Total Profit</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">89</div>
            <div className="text-sm text-text-secondary">Total Orders</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">66.3%</div>
            <div className="text-sm text-text-secondary">Profit Margin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;