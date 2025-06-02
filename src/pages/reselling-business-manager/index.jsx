import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import TopNavigation from 'components/ui/TopNavigation';
import ContextualSidebar from 'components/ui/ContextualSidebar';
import AIAssistantWidget from 'components/ui/AIAssistantWidget';

import InventoryTable from './components/InventoryTable';
import MetricsCards from './components/MetricsCards';
import SupplierLinks from './components/SupplierLinks';
import PackageTracker from './components/PackageTracker';
import RecentActivity from './components/RecentActivity';
import ProfitCalculator from './components/ProfitCalculator';
import AnalyticsCharts from './components/AnalyticsCharts';

const ResellingBusinessManager = () => {
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const [showProfitCalculator, setShowProfitCalculator] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // table, grid, analytics
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Mock business data
  const businessMetrics = {
    totalInventoryValue: 15420.50,
    monthlyProfit: 3250.75,
    activeListings: 156,
    pendingShipments: 23,
    totalSales: 89,
    averageProfit: 36.52,
    topPerformingPlatform: 'eBay',
    lowStockItems: 8
  };

  const inventoryData = [
    {
      id: 1,
      name: "iPhone 14 Pro Max Case",
      sku: "IPH14PM-001",
      purchasePrice: 8.50,
      listingPrice: 24.99,
      platform: "eBay",
      status: "active",
      stock: 15,
      sold: 23,
      profit: 16.49,
      category: "Phone Accessories",
      supplier: "CNFans",
      dateAdded: "2024-01-15",
      image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-002",
      purchasePrice: 12.30,
      listingPrice: 45.99,
      platform: "Depop",
      status: "active",
      stock: 8,
      sold: 15,
      profit: 33.69,
      category: "Audio",
      supplier: "ItaoBuy",
      dateAdded: "2024-01-12",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      name: "Vintage Band T-Shirt",
      sku: "VTS-003",
      purchasePrice: 5.75,
      listingPrice: 28.00,
      platform: "Vinted",
      status: "sold",
      stock: 0,
      sold: 12,
      profit: 22.25,
      category: "Clothing",
      supplier: "CNFans",
      dateAdded: "2024-01-10",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      name: "Gaming Mouse Pad",
      sku: "GMP-004",
      purchasePrice: 3.20,
      listingPrice: 15.99,
      platform: "eBay",
      status: "pending",
      stock: 25,
      sold: 8,
      profit: 12.79,
      category: "Gaming",
      supplier: "ItaoBuy",
      dateAdded: "2024-01-08",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=100&h=100&fit=crop"
    },
    {
      id: 5,
      name: "LED Strip Lights",
      sku: "LED-005",
      purchasePrice: 6.80,
      listingPrice: 32.99,
      platform: "eBay",
      status: "active",
      stock: 3,
      sold: 19,
      profit: 26.19,
      category: "Home & Garden",
      supplier: "CNFans",
      dateAdded: "2024-01-05",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop"
    }
  ];

  const recentSales = [
    {
      id: 1,
      item: "iPhone 14 Pro Max Case",
      platform: "eBay",
      salePrice: 24.99,
      profit: 16.49,
      buyer: "tech_lover_uk",
      date: "2024-01-20",
      status: "shipped"
    },
    {
      id: 2,
      item: "Wireless Bluetooth Headphones",
      platform: "Depop",
      salePrice: 45.99,
      profit: 33.69,
      buyer: "music_enthusiast",
      date: "2024-01-19",
      status: "delivered"
    },
    {
      id: 3,
      item: "Vintage Band T-Shirt",
      platform: "Vinted",
      salePrice: 28.00,
      profit: 22.25,
      buyer: "vintage_collector",
      date: "2024-01-18",
      status: "delivered"
    }
  ];

  const handleBulkAction = (action) => {
    if (selectedItems.length === 0) return;
    
    switch (action) {
      case 'list': console.log('Listing items:', selectedItems);
        break;
      case 'delist': console.log('Delisting items:', selectedItems);
        break;
      case 'update-price': console.log('Updating prices for:', selectedItems);
        break;
      case 'delete':
        console.log('Deleting items:', selectedItems);
        break;
      default:
        break;
    }
    setSelectedItems([]);
  };

  const filteredInventory = inventoryData.filter(item => {
    const matchesPlatform = filterPlatform === 'all' || item.platform.toLowerCase() === filterPlatform.toLowerCase();
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <ContextualSidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16">
        <div className="p-6">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gradient-primary mb-2">
                  Reselling Business Manager
                </h1>
                <p className="text-text-secondary">
                  Manage your inventory, track sales, and optimize profits across multiple platforms
                </p>
              </div>
              
              {/* Quick Actions Toolbar */}
              <div className="flex flex-wrap items-center gap-3 mt-4 lg:mt-0">
                <button
                  onClick={() => setShowProfitCalculator(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all duration-150"
                >
                  <Icon name="Calculator" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Profit Calculator</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-all duration-150">
                  <Icon name="Plus" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Add Item</span>
                </button>
                
                <button className="flex items-center space-x-2 px-4 py-2 bg-accent/20 text-accent rounded-lg hover:bg-accent/30 transition-all duration-150">
                  <Icon name="Upload" size={18} strokeWidth={2} />
                  <span className="text-sm font-medium">Bulk Import</span>
                </button>
              </div>
            </div>

            {/* Metrics Cards */}
            <MetricsCards metrics={businessMetrics} />
          </div>

          {/* Controls Section */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" strokeWidth={2} />
                  <input
                    type="text"
                    placeholder="Search items or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-surface border border-white/10 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                
                <select
                  value={filterPlatform}
                  onChange={(e) => setFilterPlatform(e.target.value)}
                  className="px-3 py-2 bg-surface border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Platforms</option>
                  <option value="ebay">eBay</option>
                  <option value="depop">Depop</option>
                  <option value="vinted">Vinted</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-surface border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <div className="flex bg-surface border border-white/10 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all duration-150 ${
                      viewMode === 'table' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Table" size={16} strokeWidth={2} />
                    <span className="text-sm">Table</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all duration-150 ${
                      viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="Grid3X3" size={16} strokeWidth={2} />
                    <span className="text-sm">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('analytics')}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-md transition-all duration-150 ${
                      viewMode === 'analytics' ? 'bg-primary/20 text-primary' : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <Icon name="BarChart3" size={16} strokeWidth={2} />
                    <span className="text-sm">Analytics</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="mt-4 p-4 bg-surface/50 border border-white/10 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleBulkAction('list')}
                      className="px-3 py-1 text-xs bg-accent/20 text-accent rounded-md hover:bg-accent/30 transition-colors duration-150"
                    >
                      List All
                    </button>
                    <button
                      onClick={() => handleBulkAction('delist')}
                      className="px-3 py-1 text-xs bg-warning/20 text-warning rounded-md hover:bg-warning/30 transition-colors duration-150"
                    >
                      Delist
                    </button>
                    <button
                      onClick={() => handleBulkAction('update-price')}
                      className="px-3 py-1 text-xs bg-secondary/20 text-secondary rounded-md hover:bg-secondary/30 transition-colors duration-150"
                    >
                      Update Price
                    </button>
                    <button
                      onClick={() => handleBulkAction('delete')}
                      className="px-3 py-1 text-xs bg-error/20 text-error rounded-md hover:bg-error/30 transition-colors duration-150"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Primary Content */}
            <div className="xl:col-span-3">
              {viewMode === 'table' && (
                <InventoryTable
                  data={filteredInventory}
                  selectedItems={selectedItems}
                  onSelectionChange={setSelectedItems}
                />
              )}
              
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInventory.map((item) => (
                    <div key={item.id} className="bg-surface border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-150">
                      <div className="flex items-start justify-between mb-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.src = "/assets/images/no_image.png";
                          }}
                        />
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          item.status === 'active' ? 'bg-accent/20 text-accent' :
                          item.status === 'pending' ? 'bg-warning/20 text-warning' :
                          item.status === 'sold'? 'bg-success/20 text-success' : 'bg-surface-light text-text-secondary'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-text-primary mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-sm text-text-secondary mb-2">{item.sku}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Purchase:</span>
                          <span className="text-text-primary">£{item.purchasePrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Listing:</span>
                          <span className="text-text-primary">£{item.listingPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Profit:</span>
                          <span className="text-accent font-medium">£{item.profit.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Stock:</span>
                          <span className={`font-medium ${item.stock < 5 ? 'text-warning' : 'text-text-primary'}`}>
                            {item.stock}
                          </span>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="text-xs text-text-secondary">{item.platform}</span>
                        <div className="flex items-center space-x-1">
                          <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-150">
                            <Icon name="Edit" size={14} strokeWidth={2} />
                          </button>
                          <button className="p-1 text-text-secondary hover:text-accent transition-colors duration-150">
                            <Icon name="ExternalLink" size={14} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {viewMode === 'analytics' && (
                <AnalyticsCharts data={inventoryData} sales={recentSales} />
              )}
            </div>

            {/* Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              <SupplierLinks />
              <PackageTracker />
              <RecentActivity sales={recentSales} />
            </div>
          </div>
        </div>
      </main>

      {/* Profit Calculator Modal */}
      {showProfitCalculator && (
        <ProfitCalculator onClose={() => setShowProfitCalculator(false)} />
      )}

      {/* AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
};

export default ResellingBusinessManager;