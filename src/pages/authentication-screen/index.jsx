import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ParticleField from './components/ParticleField';
import IntelliCoreSphere from './components/IntelliCoreSphere';
import AuthenticationCard from './components/AuthenticationCard';
import BiometricAuth from './components/BiometricAuth';

const AuthenticationScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [showBiometric, setShowBiometric] = useState(false);
  const [sphereState, setSphereState] = useState('idle'); // 'idle', 'active', 'processing', 'success'

  const mockCredentials = {
    email: "admin@intellicore.ai",
    password: "IntelliCore2024!",
    username: "admin"
  };

  useEffect(() => {
    // Simulate system initialization
    const timer = setTimeout(() => {
      setSphereState('active');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleAuthentication = async (credentials) => {
    setIsLoading(true);
    setSphereState('processing');

    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Validate credentials
    const isValid = (
      credentials.email === mockCredentials.email && 
      credentials.password === mockCredentials.password
    ) || (
      credentials.username === mockCredentials.username && 
      credentials.password === mockCredentials.password
    );

    if (isValid) {
      setSphereState('success');
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/command-hub-dashboard');
    } else {
      setSphereState('active');
      setIsLoading(false);
      throw new Error('Invalid credentials. Please use the provided mock credentials.');
    }
  };

  const handleBiometricAuth = async () => {
    setShowBiometric(true);
    setSphereState('processing');
    
    // Simulate biometric authentication
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setSphereState('success');
    await new Promise(resolve => setTimeout(resolve, 1000));
    navigate('/command-hub-dashboard');
  };

  const handleGuestMode = () => {
    navigate('/command-hub-dashboard');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Particle Field Background */}
      <ParticleField sphereState={sphereState} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - IntelliCore Sphere */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <IntelliCoreSphere state={sphereState} />
            
            {/* System Status */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-gradient-primary">
                S.A.L.I.H.
              </h1>
              <p className="text-xl text-text-secondary">
                Smart Adaptive Learning Intelligence Hub
              </p>
              <div className="flex items-center justify-center space-x-2 text-sm text-text-tertiary">
                <div className={`w-2 h-2 rounded-full ${
                  sphereState === 'success' ? 'bg-accent animate-pulse' :
                  sphereState === 'processing' ? 'bg-warning animate-pulse' :
                  sphereState === 'active'? 'bg-primary animate-pulse' : 'bg-text-quaternary'
                }`}></div>
                <span>
                  {sphereState === 'success' ? 'Authentication Successful' :
                   sphereState === 'processing' ? 'Processing...' :
                   sphereState === 'active'? 'System Ready' : 'Initializing...'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Authentication */}
          <div className="flex flex-col space-y-6">
            <AuthenticationCard
              mode={authMode}
              onModeChange={setAuthMode}
              onAuthenticate={handleAuthentication}
              isLoading={isLoading}
              mockCredentials={mockCredentials}
            />

            {/* Biometric Authentication */}
            <BiometricAuth
              onBiometricAuth={handleBiometricAuth}
              isVisible={showBiometric}
              onClose={() => setShowBiometric(false)}
            />

            {/* Alternative Options */}
            <div className="space-y-4">
              {/* OAuth Options */}
              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-surface border border-white/10 rounded-lg hover:bg-surface-light transition-all duration-300">
                  <Icon name="Github" size={18} strokeWidth={2} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">GitHub</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-surface border border-white/10 rounded-lg hover:bg-surface-light transition-all duration-300">
                  <Icon name="Mail" size={18} strokeWidth={2} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Google</span>
                </button>
              </div>

              {/* Biometric Toggle */}
              <button
                onClick={() => setShowBiometric(!showBiometric)}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-secondary/10 border border-secondary/30 rounded-lg hover:bg-secondary/20 transition-all duration-300"
              >
                <Icon name="Fingerprint" size={18} strokeWidth={2} className="text-secondary" />
                <span className="text-sm text-secondary">Biometric Authentication</span>
              </button>

              {/* Guest Mode */}
              <button
                onClick={handleGuestMode}
                className="w-full text-center text-sm text-text-tertiary hover:text-text-secondary transition-colors duration-300"
              >
                Continue as Guest
              </button>
            </div>

            {/* Mock Credentials Info */}
            <div className="p-4 bg-surface/50 backdrop-blur-sm rounded-lg border border-white/10">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Info" size={16} className="text-primary" strokeWidth={2} />
                <span className="text-sm font-medium text-text-primary">Demo Credentials</span>
              </div>
              <div className="text-xs text-text-secondary space-y-1">
                <p>Email: {mockCredentials.email}</p>
                <p>Username: {mockCredentials.username}</p>
                <p>Password: {mockCredentials.password}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-6 right-6 z-10">
        <div className="flex items-center justify-between text-xs text-text-quaternary">
          <div className="flex items-center space-x-4">
            <span>IntelliCore AI v2.1.0</span>
            <span>•</span>
            <span>Neural Network Status: Online</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>© {new Date().getFullYear()} S.A.L.I.H. Systems</span>
            <span>•</span>
            <span>Secure Connection</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationScreen;