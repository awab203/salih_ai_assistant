import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import AuthenticationScreen from "pages/authentication-screen";
import CommandHubDashboard from "pages/command-hub-dashboard";
import StudyAssistantHub from "pages/study-assistant-hub";
import ResellingBusinessManager from "pages/reselling-business-manager";
import AIMemoryPersonalizationCenter from "pages/ai-memory-personalization-center";
import AnalyticsPerformanceDashboard from "pages/analytics-performance-dashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/authentication-screen" element={<AuthenticationScreen />} />
          <Route path="/command-hub-dashboard" element={<CommandHubDashboard />} />
          <Route path="/study-assistant-hub" element={<StudyAssistantHub />} />
          <Route path="/reselling-business-manager" element={<ResellingBusinessManager />} />
          <Route path="/ai-memory-personalization-center" element={<AIMemoryPersonalizationCenter />} />
          <Route path="/analytics-performance-dashboard" element={<AnalyticsPerformanceDashboard />} />
          <Route path="/" element={<AuthenticationScreen />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;