import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import Icon from 'components/AppIcon';

const StudyAnalyticsChart = ({ data }) => {
  const [activeView, setActiveView] = useState('overview');

  const views = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'subjects', label: 'Subjects', icon: 'PieChart' },
    { id: 'trends', label: 'Trends', icon: 'TrendingUp' }
  ];

  const weeklyData = [
    { day: 'Mon', hours: data.weeklyTrend[0] },
    { day: 'Tue', hours: data.weeklyTrend[1] },
    { day: 'Wed', hours: data.weeklyTrend[2] },
    { day: 'Thu', hours: data.weeklyTrend[3] },
    { day: 'Fri', hours: data.weeklyTrend[4] },
    { day: 'Sat', hours: data.weeklyTrend[5] },
    { day: 'Sun', hours: data.weeklyTrend[6] }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-white/20 rounded-lg p-3 shadow-elevation-2">
          <p className="text-text-primary font-medium">{label}</p>
          <p className="text-primary">
            Hours: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Weekly Hours Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="day" 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <YAxis 
              stroke="rgba(255,255,255,0.6)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="hours" 
              fill="url(#studyGradient)"
              radius={[4, 4, 0, 0]}
            />
            <defs>
              <linearGradient id="studyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Study Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{data.totalHours}</div>
          <div className="text-sm text-text-secondary">Total Hours</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{data.subjects.length}</div>
          <div className="text-sm text-text-secondary">Active Subjects</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">
            {Math.round(data.subjects.reduce((acc, subject) => acc + subject.progress, 0) / data.subjects.length)}%
          </div>
          <div className="text-sm text-text-secondary">Avg Progress</div>
        </div>
      </div>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-6">
      {/* Subject Breakdown Pie Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data.subjects}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="hours"
            >
              {data.subjects.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => [`${value} hours`, 'Study Time']}
              contentStyle={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Subject Details */}
      <div className="space-y-3">
        {data.subjects.map((subject, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-surface-light rounded-lg">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: subject.color }}
              />
              <span className="text-text-primary font-medium">{subject.name}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-text-secondary text-sm">{subject.hours}h</span>
              <div className="w-20 bg-surface rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${subject.progress}%`,
                    backgroundColor: subject.color
                  }}
                />
              </div>
              <span className="text-text-secondary text-sm w-12">{subject.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTrends = () => (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="day" 
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="hours" 
            stroke="#00D4FF" 
            strokeWidth={3}
            dot={{ fill: '#00D4FF', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: '#00D4FF', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="bg-surface rounded-xl border border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
            <Icon name="BookOpen" size={20} strokeWidth={2} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Study Analytics</h3>
            <p className="text-sm text-text-secondary">Track your learning progress</p>
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
                  ? 'bg-accent/20 text-accent border border-accent/30' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={view.icon} size={14} strokeWidth={2} />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeView === 'overview' && renderOverview()}
      {activeView === 'subjects' && renderSubjects()}
      {activeView === 'trends' && renderTrends()}
    </div>
  );
};

export default StudyAnalyticsChart;