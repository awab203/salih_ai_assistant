import React from 'react';
import Icon from 'components/AppIcon';

const SupplierLinks = () => {
  const suppliers = [
    {
      name: 'CNFans',
      url: 'https://cnfans.com',
      description: 'Designer replicas & streetwear',
      status: 'online',
      orders: 23,
      avgShipping: '7-14 days',
      rating: 4.8,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop'
    },
    {
      name: 'ItaoBuy',
      url: 'https://itaobuy.com',
      description: 'Electronics & accessories',
      status: 'online',
      orders: 15,
      avgShipping: '10-21 days',
      rating: 4.6,
      logo: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=40&h=40&fit=crop'
    },
    {
      name: 'AliExpress',
      url: 'https://aliexpress.com',
      description: 'General merchandise',
      status: 'maintenance',
      orders: 8,
      avgShipping: '15-30 days',
      rating: 4.2,
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=40&fit=crop'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-accent/20 text-accent';
      case 'maintenance':
        return 'bg-warning/20 text-warning';
      case 'offline':
        return 'bg-error/20 text-error';
      default:
        return 'bg-surface-light text-text-secondary';
    }
  };

  const handleSupplierClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-surface border border-white/10 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Supplier Links</h3>
        <button className="p-2 text-text-secondary hover:text-primary transition-colors duration-150">
          <Icon name="Plus" size={18} strokeWidth={2} />
        </button>
      </div>

      <div className="space-y-4">
        {suppliers.map((supplier, index) => (
          <div
            key={index}
            className="p-4 bg-surface-light border border-white/5 rounded-lg hover:border-primary/30 transition-all duration-150 cursor-pointer"
            onClick={() => handleSupplierClick(supplier.url)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={supplier.logo}
                  alt={supplier.name}
                  className="w-10 h-10 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/no_image.png";
                  }}
                />
                <div>
                  <h4 className="font-medium text-text-primary">{supplier.name}</h4>
                  <p className="text-sm text-text-secondary">{supplier.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(supplier.status)}`}>
                  {supplier.status}
                </span>
                <Icon name="ExternalLink" size={14} strokeWidth={2} className="text-text-secondary" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-sm font-medium text-text-primary">{supplier.orders}</div>
                <div className="text-xs text-text-secondary">Orders</div>
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">{supplier.avgShipping}</div>
                <div className="text-xs text-text-secondary">Shipping</div>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1">
                  <Icon name="Star" size={12} strokeWidth={2} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">{supplier.rating}</span>
                </div>
                <div className="text-xs text-text-secondary">Rating</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10">
        <button className="w-full flex items-center justify-center space-x-2 p-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all duration-150">
          <Icon name="Search" size={18} strokeWidth={2} />
          <span className="text-sm font-medium">Find New Suppliers</span>
        </button>
      </div>
    </div>
  );
};

export default SupplierLinks;