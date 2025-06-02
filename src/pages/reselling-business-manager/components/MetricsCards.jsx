import React from 'react';
import Icon from 'components/AppIcon';

const MetricsCards = ({ metrics }) => {
  const cards = [
    {
      title: 'Total Inventory Value',
      value: `£${metrics.totalInventoryValue.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Package',
      color: 'primary'
    },
    {
      title: 'Monthly Profit',
      value: `£${metrics.monthlyProfit.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`,
      change: '+8.3%',
      changeType: 'positive',
      icon: 'TrendingUp',
      color: 'accent'
    },
    {
      title: 'Active Listings',
      value: metrics.activeListings.toString(),
      change: '+15',
      changeType: 'positive',
      icon: 'ShoppingBag',
      color: 'secondary'
    },
    {
      title: 'Pending Shipments',
      value: metrics.pendingShipments.toString(),
      change: '-3',
      changeType: 'negative',
      icon: 'Truck',
      color: 'warning'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-primary/20 text-primary';
      case 'accent':
        return 'bg-accent/20 text-accent';
      case 'secondary':
        return 'bg-secondary/20 text-secondary';
      case 'warning':
        return 'bg-warning/20 text-warning';
      default:
        return 'bg-surface-light text-text-secondary';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-surface border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-all duration-150 surface-elevation-1"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getColorClasses(card.color)}`}>
              <Icon name={card.icon} size={24} strokeWidth={2} />
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              card.changeType === 'positive' ? 'text-accent' : 'text-error'
            }`}>
              <Icon 
                name={card.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
                strokeWidth={2} 
              />
              <span className="font-medium">{card.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-text-primary mb-1">{card.value}</h3>
            <p className="text-sm text-text-secondary">{card.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsCards;