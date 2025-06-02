import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const InventoryTable = ({ data, selectedItems, onSelectionChange }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  const handleSelectAll = () => {
    if (selectedItems.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map(item => item.id));
    }
  };

  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter(id => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-accent/20 text-accent';
      case 'pending':
        return 'bg-warning/20 text-warning';
      case 'sold':
        return 'bg-success/20 text-success';
      case 'draft':
        return 'bg-surface-light text-text-secondary';
      default:
        return 'bg-surface-light text-text-secondary';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'ebay':
        return 'ShoppingBag';
      case 'depop':
        return 'Store';
      case 'vinted':
        return 'Shirt';
      default:
        return 'Globe';
    }
  };

  const SortHeader = ({ field, children }) => (
    <th
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <div className="flex flex-col">
          <Icon 
            name="ChevronUp" 
            size={12} 
            strokeWidth={2}
            className={`${sortField === field && sortDirection === 'asc' ? 'text-primary' : 'text-text-quaternary'}`}
          />
          <Icon 
            name="ChevronDown" 
            size={12} 
            strokeWidth={2}
            className={`${sortField === field && sortDirection === 'desc' ? 'text-primary' : 'text-text-quaternary'} -mt-1`}
          />
        </div>
      </div>
    </th>
  );

  return (
    <div className="bg-surface border border-white/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-white/10">
          <thead className="bg-surface-light">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems.length === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary/20 focus:ring-2"
                />
              </th>
              <SortHeader field="name">Item</SortHeader>
              <SortHeader field="sku">SKU</SortHeader>
              <SortHeader field="purchasePrice">Purchase Price</SortHeader>
              <SortHeader field="listingPrice">Listing Price</SortHeader>
              <SortHeader field="profit">Profit</SortHeader>
              <SortHeader field="platform">Platform</SortHeader>
              <SortHeader field="status">Status</SortHeader>
              <SortHeader field="stock">Stock</SortHeader>
              <SortHeader field="sold">Sold</SortHeader>
              <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {sortedData.map((item) => (
              <tr
                key={item.id}
                className={`hover:bg-surface-light transition-colors duration-150 ${
                  selectedItems.includes(item.id) ? 'bg-primary/5' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => handleSelectItem(item.id)}
                    className="w-4 h-4 text-primary bg-surface border-white/20 rounded focus:ring-primary/20 focus:ring-2"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/no_image.png";
                      }}
                    />
                    <div>
                      <div className="text-sm font-medium text-text-primary">{item.name}</div>
                      <div className="text-sm text-text-secondary">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary font-mono">{item.sku}</td>
                <td className="px-6 py-4 text-sm text-text-primary">£{item.purchasePrice.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm text-text-primary">£{item.listingPrice.toFixed(2)}</td>
                <td className="px-6 py-4 text-sm font-medium text-accent">£{item.profit.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Icon name={getPlatformIcon(item.platform)} size={16} strokeWidth={2} className="text-text-secondary" />
                    <span className="text-sm text-text-primary">{item.platform}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${item.stock < 5 ? 'text-warning' : 'text-text-primary'}`}>
                    {item.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-text-primary">{item.sold}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-150">
                      <Icon name="Edit" size={16} strokeWidth={2} />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-accent transition-colors duration-150">
                      <Icon name="ExternalLink" size={16} strokeWidth={2} />
                    </button>
                    <button className="p-1 text-text-secondary hover:text-error transition-colors duration-150">
                      <Icon name="Trash2" size={16} strokeWidth={2} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {sortedData.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Package" size={48} className="text-text-quaternary mx-auto mb-4" strokeWidth={1} />
          <h3 className="text-lg font-medium text-text-primary mb-2">No items found</h3>
          <p className="text-text-secondary">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;