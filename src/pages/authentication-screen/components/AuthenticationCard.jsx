import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AuthenticationCard = ({ mode, onModeChange, onAuthenticate, isLoading, mockCredentials }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (mode === 'register') {
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.username) newErrors.username = 'Username is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    } else {
      if (!formData.email && !formData.username) {
        newErrors.email = 'Email or username is required';
      }
      if (!formData.password) newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await onAuthenticate(formData);
    } catch (error) {
      setErrors({ general: error.message });
    }
  };

  const fillMockCredentials = () => {
    setFormData({
      email: mockCredentials.email,
      username: mockCredentials.username,
      password: mockCredentials.password,
      confirmPassword: mockCredentials.password
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-surface/80 backdrop-blur-glass rounded-2xl border border-white/10 shadow-elevation-3 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-text-secondary">
            {mode === 'login' ?'Access your IntelliCore AI assistant' :'Join the next generation of AI assistance'
            }
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex bg-surface-light rounded-lg p-1 mb-6">
          <button
            onClick={() => onModeChange('login')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              mode === 'login' ?'bg-primary text-white shadow-glow-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => onModeChange('register')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
              mode === 'register' ?'bg-primary text-white shadow-glow-primary' :'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-surface-light border rounded-lg text-text-primary placeholder-text-tertiary transition-all duration-300 ${
                  focusedField === 'email' ?'border-primary shadow-glow-primary' 
                    : errors.email 
                      ? 'border-error' :'border-white/10 hover:border-white/20'
                }`}
                placeholder="Enter your email"
              />
              <Icon 
                name="Mail" 
                size={18} 
                className="absolute right-3 top-3.5 text-text-tertiary" 
                strokeWidth={2} 
              />
            </div>
            {errors.email && (
              <p className="text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} strokeWidth={2} />
                <span>{errors.email}</span>
              </p>
            )}
          </div>

          {/* Username Field (Register only) */}
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  onFocus={() => setFocusedField('username')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-surface-light border rounded-lg text-text-primary placeholder-text-tertiary transition-all duration-300 ${
                    focusedField === 'username' ?'border-primary shadow-glow-primary' 
                      : errors.username 
                        ? 'border-error' :'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Choose a username"
                />
                <Icon 
                  name="User" 
                  size={18} 
                  className="absolute right-3 top-3.5 text-text-tertiary" 
                  strokeWidth={2} 
                />
              </div>
              {errors.username && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} strokeWidth={2} />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>
          )}

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-primary">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className={`w-full px-4 py-3 bg-surface-light border rounded-lg text-text-primary placeholder-text-tertiary transition-all duration-300 ${
                  focusedField === 'password' ?'border-primary shadow-glow-primary' 
                    : errors.password 
                      ? 'border-error' :'border-white/10 hover:border-white/20'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-text-tertiary hover:text-text-primary transition-colors duration-300"
              >
                <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} strokeWidth={2} />
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-error flex items-center space-x-1">
                <Icon name="AlertCircle" size={14} strokeWidth={2} />
                <span>{errors.password}</span>
              </p>
            )}
          </div>

          {/* Confirm Password Field (Register only) */}
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-text-primary">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 bg-surface-light border rounded-lg text-text-primary placeholder-text-tertiary transition-all duration-300 ${
                    focusedField === 'confirmPassword' ?'border-primary shadow-glow-primary' 
                      : errors.confirmPassword 
                        ? 'border-error' :'border-white/10 hover:border-white/20'
                  }`}
                  placeholder="Confirm your password"
                />
                <Icon 
                  name="Lock" 
                  size={18} 
                  className="absolute right-3 top-3.5 text-text-tertiary" 
                  strokeWidth={2} 
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-error flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} strokeWidth={2} />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="p-3 bg-error/10 border border-error/30 rounded-lg">
              <p className="text-sm text-error flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} strokeWidth={2} />
                <span>{errors.general}</span>
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-primary text-white rounded-lg font-semibold shadow-glow-primary hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300"
          >
            {isLoading ? (
              <>
                <Icon name="Loader2" size={18} strokeWidth={2} className="animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Icon name={mode === 'login' ? "LogIn" : "UserPlus"} size={18} strokeWidth={2} />
                <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
              </>
            )}
          </button>

          {/* Quick Fill Button */}
          <button
            type="button"
            onClick={fillMockCredentials}
            className="w-full text-sm text-text-tertiary hover:text-text-secondary transition-colors duration-300"
          >
            Use Demo Credentials
          </button>

          {/* Forgot Password */}
          {mode === 'login' && (
            <div className="text-center">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-400 transition-colors duration-300"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthenticationCard;