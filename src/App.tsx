import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import SideNav from './components/SideNav';
import HeaderNav from './components/HeaderNav';
import DashboardScreen from './components/DashboardScreen';
import CalendarScreen from './components/CalendarScreen';
import ProspectingScreen from './components/ProspectingScreen';
import SocialMediaScreen from './components/SocialMediaScreen';
import PartnerPortalScreen from './components/PartnerPortalScreen';
import ReportsScreen from './components/ReportsScreen';
import RoadmapScreen from './components/RoadmapScreen';

function App() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [activeWorkspace, setActiveWorkspace] = useState('main');

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'prospecting':
        return <ProspectingScreen />;
      case 'social':
        return <SocialMediaScreen />;
      case 'partners':
        return <PartnerPortalScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'roadmap':
        return <RoadmapScreen />;
      
      // Placeholder screens for other nav items
      case 'onboarding':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Onboarding</h1>
            <p className="text-gray-600">5-trins onboarding flow kommer snart...</p>
          </div>
        );
      case 'workspace':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Workspace Hub</h1>
            <p className="text-gray-600">Workspace management kommer snart...</p>
          </div>
        );
      case 'media-library':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Media Library</h1>
            <p className="text-gray-600">AI-powered media library med tagging kommer snart...</p>
          </div>
        );
      case 'drip-campaigns':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Drip Campaigns</h1>
            <p className="text-gray-600">Email drip campaigns kommer snart...</p>
          </div>
        );
      case 'leads':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Leads</h1>
            <p className="text-gray-600">Lead management kommer snart...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
            <p className="text-gray-600">Advanced analytics kommer snart...</p>
          </div>
        );
      case 'features':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Features</h1>
            <p className="text-gray-600">Feature requests og voting kommer snart...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Indstillinger</h1>
            <p className="text-gray-600">App indstillinger kommer snart...</p>
          </div>
        );
      case 'help':
        return (
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Hjælp & Support</h1>
            <p className="text-gray-600">Hjælpecenter og dokumentation kommer snart...</p>
          </div>
        );
      default:
        return <DashboardScreen />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <SideNav 
          activeScreen={activeScreen} 
          onNavigate={setActiveScreen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <HeaderNav 
            activeWorkspace={activeWorkspace}
            onWorkspaceChange={setActiveWorkspace}
          />

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {renderScreen()}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
