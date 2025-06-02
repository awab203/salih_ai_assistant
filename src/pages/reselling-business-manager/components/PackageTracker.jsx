import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const PackageTracker = () => {
  const [activeTab, setActiveTab] = useState('incoming');

  const incomingPackages = [
    {
      id: 'PKG001',
      supplier: 'CNFans',
      items: 'iPhone Cases (x15)',
      status: 'in_transit',
      trackingNumber: 'CN123456789GB',
      estimatedDelivery: '2024-01-25',
      currentLocation: 'UK Customs',
      value: 127.50
    },
    {
      id: 'PKG002',
      supplier: 'ItaoBuy',
      items: 'Wireless Headphones (x8)',
      status: 'shipped',
      trackingNumber: 'IT987654321GB',
      estimatedDelivery: '2024-01-28',
      currentLocation: 'Guangzhou, China',
      value: 98.40
    },
    {
      id: 'PKG003',
      supplier: 'CNFans',
      items: 'LED Strip Lights (x12)',
      status: 'processing',
      trackingNumber: 'Pending',
      estimatedDelivery: '2024-02-02',
      currentLocation: 'Warehouse',
      value: 81.60
    }
  ];

  const outgoingPackages = [
    {
      id: 'OUT001',
      buyer: 'tech_lover_uk',
      item: 'iPhone 14 Pro Max Case',
      platform: 'eBay',
      status: 'delivered',
      trackingNumber: 'RM123456789GB',
      deliveryDate: '2024-01-20',
      saleValue: 24.99
    },
    {
      id: 'OUT002',
      buyer: 'music_enthusiast',
      item: 'Wireless Bluetooth Headphones',
      platform: 'Depop',
      status: 'in_transit',
      trackingNumber: 'RM987654321GB',
      estimatedDelivery: '2024-01-22',
      saleValue: 45.99
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-success/20 text-success';
      case 'in_transit':
        return 'bg-primary/20 text-primary';
      case 'shipped':
        return 'bg-accent/20 text-accent';
      case 'processing':
        return 'bg-warning/20 text-warning';
      case 'pending':
        return 'bg-surface-light text-text-secondary';
      default:
        return 'bg-surface-light text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return 'CheckCircle';
      case 'in_transit':
        return 'Truck';
      case 'shipped':
        return 'Package';
      case 'processing':
        return 'Clock';
      default:
        return 'Package';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  };

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Package Tracker</h3>
        <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-150">
          <Icon name="RefreshCw" size={18} strokeWidth={2} />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-surface-light border border-white/5 rounded-lg p-1 mb-4">
        <button
          onClick={() => setActiveTab('incoming')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-all duration-150 ${
            activeTab === 'incoming' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="ArrowDown" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">Incoming</span>
        </button>
        <button
          onClick={() => setActiveTab('outgoing')}
          className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md transition-all duration-150 ${
            activeTab === 'outgoing' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Icon name="ArrowUp" size={16} strokeWidth={2} />
          <span className="text-sm font-medium">Outgoing</span>
        </button>
      </div>

      {/* Package List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {activeTab === 'incoming' && incomingPackages.map((pkg) => (
          <div key={pkg.id} className="p-3 bg-surface-light border border-white/5 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getStatusIcon(pkg.status)} size={16} strokeWidth={2} className="text-primary" />
                <span className="text-sm font-medium text-text-primary">{pkg.id}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(pkg.status)}`}>
                {pkg.status.replace('_', ' ')}
              </span>
            </div>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm text-text-primary">{pkg.items}</p>
              <p className="text-xs text-text-secondary">from {pkg.supplier}</p>
              <p className="text-xs text-text-secondary">{pkg.currentLocation}</p>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">
                ETA: {formatDate(pkg.estimatedDelivery)}
              </span>
              <span className="font-medium text-text-primary">
                £{pkg.value.toFixed(2)}
              </span>
            </div>
            
            {pkg.trackingNumber !== 'Pending' && (
              <div className="mt-2 pt-2 border-t border-white/5">
                <button className="w-full text-xs text-primary hover:text-primary-400 transition-colors duration-150">
                  Track: {pkg.trackingNumber}
                </button>
              </div>
            )}
          </div>
        ))}

        {activeTab === 'outgoing' && outgoingPackages.map((pkg) => (
          <div key={pkg.id} className="p-3 bg-surface-light border border-white/5 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Icon name={getStatusIcon(pkg.status)} size={16} strokeWidth={2} className="text-accent" />
                <span className="text-sm font-medium text-text-primary">{pkg.id}</span>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(pkg.status)}`}>
                {pkg.status.replace('_', ' ')}
              </span>
            </div>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm text-text-primary">{pkg.item}</p>
              <p className="text-xs text-text-secondary">to {pkg.buyer} via {pkg.platform}</p>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">
                {pkg.status === 'delivered' ? `Delivered: ${formatDate(pkg.deliveryDate)}` : `ETA: ${formatDate(pkg.estimatedDelivery)}`}
              </span>
              <span className="font-medium text-accent">
                £{pkg.saleValue.toFixed(2)}
              </span>
            </div>
            
            <div className="mt-2 pt-2 border-t border-white/5">
              <button className="w-full text-xs text-primary hover:text-primary-400 transition-colors duration-150">
                Track: {pkg.trackingNumber}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="grid grid-cols-2 gap-3 text-center">
          <div>
            <div className="text-sm font-medium text-text-primary">
              {activeTab === 'incoming' ? incomingPackages.length : outgoingPackages.length}
            </div>
            <div className="text-xs text-text-secondary">
              {activeTab === 'incoming' ? 'Incoming' : 'Outgoing'}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-text-primary">
              £{activeTab === 'incoming' 
                ? incomingPackages.reduce((sum, pkg) => sum + pkg.value, 0).toFixed(2)
                : outgoingPackages.reduce((sum, pkg) => sum + pkg.saleValue, 0).toFixed(2)
              }
            </div>
            <div className="text-xs text-text-secondary">Total Value</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageTracker;