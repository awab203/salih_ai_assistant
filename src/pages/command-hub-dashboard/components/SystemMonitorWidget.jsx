import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const SystemMonitorWidget = () => {
  const [systemData, setSystemData] = useState({
    cpu: { usage: 0, temp: 0 },
    gpu: { usage: 0, temp: 0 },
    ram: { used: 0, total: 16 },
    battery: { level: 0, charging: false },
    network: { ping: 0, speed: 0 },
    uptime: 0
  });

  useEffect(() => {
    const updateSystemData = () => {
      setSystemData({
        cpu: { 
          usage: Math.floor(Math.random() * 40) + 20, 
          temp: Math.floor(Math.random() * 20) + 45 
        },
        gpu: { 
          usage: Math.floor(Math.random() * 60) + 10, 
          temp: Math.floor(Math.random() * 25) + 50 
        },
        ram: { 
          used: Math.floor(Math.random() * 8) + 4, 
          total: 16 
        },
        battery: { 
          level: Math.floor(Math.random() * 40) + 60, 
          charging: Math.random() > 0.5 
        },
        network: { 
          ping: Math.floor(Math.random() * 20) + 15, 
          speed: Math.floor(Math.random() * 500) + 100 
        },
        uptime: Math.floor(Math.random() * 168) + 24
      });
    };

    updateSystemData();
    const interval = setInterval(updateSystemData, 3000);
    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (usage) => {
    if (usage < 30) return 'text-accent';
    if (usage < 70) return 'text-warning';
    return 'text-error';
  };

  const getUsageBarColor = (usage) => {
    if (usage < 30) return 'bg-accent';
    if (usage < 70) return 'bg-warning';
    return 'bg-error';
  };

  const formatUptime = (hours) => {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    return `${days}d ${remainingHours}h`;
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">System Monitor</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs text-text-secondary">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* CPU */}
        <div className="bg-surface-light rounded-lg p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Cpu" size={16} className="text-primary" strokeWidth={2} />
              <span className="text-sm font-medium text-text-primary">CPU</span>
            </div>
            <span className={`text-sm font-bold ${getUsageColor(systemData.cpu.usage)}`}>
              {systemData.cpu.usage}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getUsageBarColor(systemData.cpu.usage)}`}
              style={{ width: `${systemData.cpu.usage}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-tertiary">{systemData.cpu.temp}°C</p>
        </div>

        {/* GPU */}
        <div className="bg-surface-light rounded-lg p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="Monitor" size={16} className="text-secondary" strokeWidth={2} />
              <span className="text-sm font-medium text-text-primary">GPU</span>
            </div>
            <span className={`text-sm font-bold ${getUsageColor(systemData.gpu.usage)}`}>
              {systemData.gpu.usage}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${getUsageBarColor(systemData.gpu.usage)}`}
              style={{ width: `${systemData.gpu.usage}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-tertiary">{systemData.gpu.temp}°C</p>
        </div>

        {/* RAM */}
        <div className="bg-surface-light rounded-lg p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="HardDrive" size={16} className="text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-text-primary">RAM</span>
            </div>
            <span className="text-sm font-bold text-text-primary">
              {systemData.ram.used}GB
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 mb-2">
            <div 
              className="h-2 rounded-full bg-accent transition-all duration-500"
              style={{ width: `${(systemData.ram.used / systemData.ram.total) * 100}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-tertiary">of {systemData.ram.total}GB</p>
        </div>

        {/* Battery */}
        <div className="bg-surface-light rounded-lg p-4 border border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon 
                name={systemData.battery.charging ? "BatteryCharging" : "Battery"} 
                size={16} 
                className={systemData.battery.level > 20 ? "text-accent" : "text-error"} 
                strokeWidth={2} 
              />
              <span className="text-sm font-medium text-text-primary">Battery</span>
            </div>
            <span className={`text-sm font-bold ${systemData.battery.level > 20 ? 'text-accent' : 'text-error'}`}>
              {systemData.battery.level}%
            </span>
          </div>
          <div className="w-full bg-surface rounded-full h-2 mb-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                systemData.battery.level > 20 ? 'bg-accent' : 'bg-error'
              }`}
              style={{ width: `${systemData.battery.level}%` }}
            ></div>
          </div>
          <p className="text-xs text-text-tertiary">
            {systemData.battery.charging ? 'Charging' : 'On Battery'}
          </p>
        </div>
      </div>

      {/* Network & Uptime */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-surface-light rounded-lg p-3 border border-white/5">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Wifi" size={14} className="text-primary" strokeWidth={2} />
            <span className="text-xs font-medium text-text-primary">Network</span>
          </div>
          <p className="text-sm font-bold text-text-primary">{systemData.network.ping}ms</p>
          <p className="text-xs text-text-tertiary">{systemData.network.speed} Mbps</p>
        </div>

        <div className="bg-surface-light rounded-lg p-3 border border-white/5">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={14} className="text-secondary" strokeWidth={2} />
            <span className="text-xs font-medium text-text-primary">Uptime</span>
          </div>
          <p className="text-sm font-bold text-text-primary">{formatUptime(systemData.uptime)}</p>
          <p className="text-xs text-text-tertiary">System running</p>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitorWidget;