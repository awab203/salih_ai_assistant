import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ProfitCalculator = ({ onClose }) => {
  const [formData, setFormData] = useState({
    purchasePrice: '',
    shippingCost: '',
    listingPrice: '',
    platform: 'ebay',
    paymentMethod: 'paypal',
    quantity: 1
  });

  const [results, setResults] = useState(null);

  // Platform fees (percentage)
  const platformFees = {
    ebay: 0.129, // 12.9%
    depop: 0.10, // 10%
    vinted: 0.05, // 5%
    facebook: 0.05, // 5%
    local: 0 // 0%
  };

  // Payment processing fees (percentage)
  const paymentFees = {
    paypal: 0.029, // 2.9%
    stripe: 0.029, // 2.9%
    bank: 0.01, // 1%
    cash: 0 // 0%
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateProfit = () => {
    const purchasePrice = parseFloat(formData.purchasePrice) || 0;
    const shippingCost = parseFloat(formData.shippingCost) || 0;
    const listingPrice = parseFloat(formData.listingPrice) || 0;
    const quantity = parseInt(formData.quantity) || 1;

    const totalCost = (purchasePrice + shippingCost) * quantity;
    const grossRevenue = listingPrice * quantity;
    
    const platformFee = grossRevenue * platformFees[formData.platform];
    const paymentFee = grossRevenue * paymentFees[formData.paymentMethod];
    
    const totalFees = platformFee + paymentFee;
    const netRevenue = grossRevenue - totalFees;
    const totalProfit = netRevenue - totalCost;
    const profitMargin = grossRevenue > 0 ? (totalProfit / grossRevenue) * 100 : 0;
    const roi = totalCost > 0 ? (totalProfit / totalCost) * 100 : 0;

    setResults({
      totalCost,
      grossRevenue,
      platformFee,
      paymentFee,
      totalFees,
      netRevenue,
      totalProfit,
      profitMargin,
      roi,
      profitPerItem: totalProfit / quantity
    });
  };

  const resetCalculator = () => {
    setFormData({
      purchasePrice: '',
      shippingCost: '',
      listingPrice: '',
      platform: 'ebay',
      paymentMethod: 'paypal',
      quantity: 1
    });
    setResults(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-white/10 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Icon name="Calculator" size={20} strokeWidth={2} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Profit Calculator</h2>
              <p className="text-sm text-text-secondary">Calculate your potential profit and margins</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-light transition-all duration-150"
          >
            <Icon name="X" size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary mb-4">Item Details</h3>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Purchase Price (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.purchasePrice}
                  onChange={(e) => handleInputChange('purchasePrice', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Shipping Cost (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.shippingCost}
                  onChange={(e) => handleInputChange('shippingCost', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Listing Price (£)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.listingPrice}
                  onChange={(e) => handleInputChange('listingPrice', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Platform
                </label>
                <select
                  value={formData.platform}
                  onChange={(e) => handleInputChange('platform', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
                >
                  <option value="ebay">eBay (12.9% fee)</option>
                  <option value="depop">Depop (10% fee)</option>
                  <option value="vinted">Vinted (5% fee)</option>
                  <option value="facebook">Facebook (5% fee)</option>
                  <option value="local">Local Sale (0% fee)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Payment Method
                </label>
                <select
                  value={formData.paymentMethod}
                  onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50"
                >
                  <option value="paypal">PayPal (2.9% fee)</option>
                  <option value="stripe">Stripe (2.9% fee)</option>
                  <option value="bank">Bank Transfer (1% fee)</option>
                  <option value="cash">Cash (0% fee)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full px-3 py-2 bg-surface-light border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={calculateProfit}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all duration-150"
                >
                  <Icon name="Calculator" size={18} strokeWidth={2} />
                  <span>Calculate</span>
                </button>
                <button
                  onClick={resetCalculator}
                  className="px-4 py-2 bg-surface-light text-text-secondary rounded-lg hover:bg-surface-lighter transition-all duration-150"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary mb-4">Profit Breakdown</h3>
              
              {results ? (
                <div className="space-y-4">
                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 bg-accent/10 border border-accent/20 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        £{results.totalProfit.toFixed(2)}
                      </div>
                      <div className="text-sm text-text-secondary">Total Profit</div>
                    </div>
                    <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {results.profitMargin.toFixed(1)}%
                      </div>
                      <div className="text-sm text-text-secondary">Profit Margin</div>
                    </div>
                  </div>

                  {/* Detailed Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between py-2">
                      <span className="text-text-secondary">Gross Revenue</span>
                      <span className="text-text-primary font-medium">£{results.grossRevenue.toFixed(2)}</span>
                    </div>
                    
                    <div className="space-y-2 pl-4 border-l-2 border-error/20">
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Platform Fee</span>
                        <span className="text-error">-£{results.platformFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Payment Fee</span>
                        <span className="text-error">-£{results.paymentFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-text-secondary">Total Cost</span>
                        <span className="text-error">-£{results.totalCost.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between py-2 border-t border-white/10">
                      <span className="text-text-secondary">Net Revenue</span>
                      <span className="text-text-primary font-medium">£{results.netRevenue.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-t border-white/10">
                      <span className="text-text-primary font-medium">Final Profit</span>
                      <span className={`font-bold ${results.totalProfit >= 0 ? 'text-accent' : 'text-error'}`}>
                        £{results.totalProfit.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Additional Metrics */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-text-primary">
                        {results.roi.toFixed(1)}%
                      </div>
                      <div className="text-xs text-text-secondary">ROI</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-text-primary">
                        £{results.profitPerItem.toFixed(2)}
                      </div>
                      <div className="text-xs text-text-secondary">Per Item</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Icon name="Calculator" size={48} className="text-text-quaternary mb-4" strokeWidth={1} />
                  <p className="text-text-secondary">Enter item details and click calculate to see profit breakdown</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalculator;