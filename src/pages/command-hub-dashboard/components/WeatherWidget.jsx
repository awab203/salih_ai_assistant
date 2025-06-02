import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState({
    location: 'London, UK',
    temperature: 0,
    condition: 'Partly Cloudy',
    humidity: 0,
    windSpeed: 0,
    forecast: []
  });

  const weatherConditions = [
    { condition: 'Sunny', icon: 'Sun', temp: [18, 25] },
    { condition: 'Partly Cloudy', icon: 'CloudSun', temp: [15, 22] },
    { condition: 'Cloudy', icon: 'Cloud', temp: [12, 18] },
    { condition: 'Rainy', icon: 'CloudRain', temp: [8, 15] },
    { condition: 'Stormy', icon: 'CloudLightning', temp: [10, 16] }
  ];

  useEffect(() => {
    const updateWeather = () => {
      const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
      const tempRange = randomCondition.temp;
      const temperature = Math.floor(Math.random() * (tempRange[1] - tempRange[0] + 1)) + tempRange[0];
      
      const forecast = Array.from({ length: 5 }, (_, i) => {
        const futureCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const futureTemp = Math.floor(Math.random() * (futureCondition.temp[1] - futureCondition.temp[0] + 1)) + futureCondition.temp[0];
        const date = new Date();
        date.setDate(date.getDate() + i + 1);
        
        return {
          day: date.toLocaleDateString('en-GB', { weekday: 'short' }),
          condition: futureCondition.condition,
          icon: futureCondition.icon,
          temp: futureTemp
        };
      });

      setWeatherData({
        location: 'London, UK',
        temperature,
        condition: randomCondition.condition,
        humidity: Math.floor(Math.random() * 40) + 40,
        windSpeed: Math.floor(Math.random() * 15) + 5,
        forecast
      });
    };

    updateWeather();
    const interval = setInterval(updateWeather, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = (condition) => {
    const conditionData = weatherConditions.find(w => w.condition === condition);
    return conditionData ? conditionData.icon : 'Cloud';
  };

  const getTemperatureColor = (temp) => {
    if (temp >= 20) return 'text-warning';
    if (temp >= 10) return 'text-accent';
    return 'text-primary';
  };

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Weather</h3>
        <Icon name="MapPin" size={16} className="text-text-secondary" strokeWidth={2} />
      </div>

      {/* Current Weather */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Icon 
            name={getWeatherIcon(weatherData.condition)} 
            size={48} 
            className="text-primary" 
            strokeWidth={1.5} 
          />
        </div>
        <h4 className={`text-3xl font-bold mb-2 ${getTemperatureColor(weatherData.temperature)}`}>
          {weatherData.temperature}°C
        </h4>
        <p className="text-text-secondary text-sm mb-1">{weatherData.condition}</p>
        <p className="text-text-tertiary text-xs">{weatherData.location}</p>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-surface-light rounded-lg p-3 border border-white/5">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Droplets" size={14} className="text-primary" strokeWidth={2} />
            <span className="text-xs text-text-secondary">Humidity</span>
          </div>
          <p className="text-sm font-bold text-text-primary">{weatherData.humidity}%</p>
        </div>

        <div className="bg-surface-light rounded-lg p-3 border border-white/5">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Wind" size={14} className="text-secondary" strokeWidth={2} />
            <span className="text-xs text-text-secondary">Wind</span>
          </div>
          <p className="text-sm font-bold text-text-primary">{weatherData.windSpeed} mph</p>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div>
        <h5 className="text-sm font-medium text-text-secondary mb-3">5-Day Forecast</h5>
        <div className="space-y-2">
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-xs text-text-tertiary w-8">{day.day}</span>
              <div className="flex items-center space-x-2 flex-1 justify-center">
                <Icon name={day.icon} size={16} className="text-text-secondary" strokeWidth={2} />
                <span className="text-xs text-text-secondary">{day.condition}</span>
              </div>
              <span className={`text-xs font-medium ${getTemperatureColor(day.temp)}`}>
                {day.temp}°C
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;