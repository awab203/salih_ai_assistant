import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from 'components/AppIcon';

const BusinessMetricsChart = ({ data }) => {
  const [activeView, setActiveView] = useState('revenue');

  const views = [
    { id: 'revenue', label: 'Revenue', icon: 'DollarSign' },
    { id: 'platforms', label: 'Platforms', icon: 'Store' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' }
  ];

  const monthlyData = data.monthlyTrend.map((revenue, index) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr'][index] || `Month ${index + 1}`,
    revenue
  }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/20 rounded-lg p-3 shadow-elevation-2">
          <p className="text-text-primary font-medium">{label}</p>
          <p className="text-secondary">
            {payload[0].dataKey === 'revenue' ? '£' : ''}{payload[0].value}
            {payload[0].dataKey === 'orders' ? ' orders' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderRevenue = () => (
    <div className="space-y-6">
      {/* Monthly Revenue Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="month" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
              tickFormatter={(value) => `£${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="revenue" 
              fill="url(#businessGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="businessGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">£{data.totalRevenue.toLocaleString()}</div>
          <div className="text-sm text-text-secondary">Total Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {data.platforms.reduce((acc, platform) => acc + platform.orders, 0)}
          </div>
          <div className="text-sm text-text-secondary">Total Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">
            £{Math.round(data.totalRevenue / data.platforms.reduce((acc, platform) => acc + platform.orders, 0))}
          </div>
          <div className="text-sm text-text-secondary">Avg Order Value</div>
        </div>
      </div>
    </div>
  );

  const renderPlatforms = () => (
    <div className="space-y-6">
      {/* Platform Revenue Pie Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.platforms}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="revenue"
            >
              {data.platforms.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`£${value}`, 'Revenue']}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Platform Details */}
      <div className="space-y-3">
        {data.platforms.map((platform, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: platform.color }}
              />
              <span className="text-text-primary font-medium">{platform.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-text-secondary text-sm">£{platform.revenue}</span>
              <span className="text-text-secondary text-sm">{platform.orders} orders</span>
              <div className="w-20 bg-surface rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${(platform.revenue / data.totalRevenue) * 100}%`,
                    backgroundColor: platform.color
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="space-y-6">
      {/* Growth Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-surface-light rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} strokeWidth={2} className="text-accent" />
            <span className="text-sm text-text-secondary">Monthly Growth</span>
          </div>
          <div className="text-xl font-bold text-accent">+18.5%</div>
        </div>
        <div className="bg-surface-light rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} strokeWidth={2} className="text-warning" />
            <span className="text-sm text-text-secondary">Profit Margin</span>
          </div>
          <div className="text-xl font-bold text-warning">32.4%</div>
        </div>
      </div>

      {/* Platform Performance */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">Platform Performance</h4>
        {data.platforms.map((platform, index) => {
          const avgOrderValue = platform.revenue / platform.orders;
          return (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-text-primary text-sm">{platform.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <span className="text-text-secondary">AOV: £{avgOrderValue.toFixed(2)}</span>
                <span className={`flex items-center space-x-1 ${
                  index === 0 ? 'text-accent' : index === 1 ? 'text-warning' : 'text-error'
                }`}>
                  <Icon 
                    name={index === 0 ? 'TrendingUp' : index === 1 ? 'Minus' : 'TrendingDown'} 
                    size={12} 
                    strokeWidth={2} 
                  />
                  <span>{index === 0 ? '+12%' : index === 1 ? '0%' : '-5%'}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} strokeWidth={2} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Business Metrics</h3>
            <p className="text-sm text-text-secondary">Track your sales performance</p>
          </div>
        </div>

        {/* View Selector */}
        <div className="flex items-center space-x-1 bg-surface-light rounded-lg p-1">
          {views.map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${
                activeView === view.id
                  ? 'bg-secondary/20 text-secondary border border-secondary/30' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={view.icon} size={14} strokeWidth={2} />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeView === 'revenue' && renderRevenue()}
      {activeView === 'platforms' && renderPlatforms()}
      {activeView === 'trends' && renderTrends()}
    </div>
  );
};

export default BusinessMetricsChart;