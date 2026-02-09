import { useState } from 'react';
import type { ViewType } from './types';
import CalendarScreen from './components/CalendarScreen';
import ProspectingScreen from './components/ProspectingScreen';

// Components will be imported as we create them
// import CalendarScreen from './components/CalendarScreen';
// import ProspectingScreen from './components/ProspectingScreen';
// import PartnerPortalScreen from './components/PartnerPortalScreen';
// import ReportScreen from './components/ReportScreen';
// import SaaSRoadmap from './components/SaaSRoadmap';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('calendar');
  
  // App state will be managed here later
  // const [appState, setAppState] = useState<AppState>({...});

  const navigationItems = [
    { id: 'calendar', label: 'Kalender', icon: '📅' },
    { id: 'prospecting', label: 'Prospektering', icon: '🎯' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'partners', label: 'Partner Portal', icon: '🤝' },
    { id: 'reports', label: 'Rapporter', icon: '📊' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
  ] as const;

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarScreen />;
      case 'prospecting':
        return <ProspectingScreen />;
      case 'social':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Social Media</h2>
            <p className="text-gray-600">Social media view kommer her...</p>
          </div>
        );
      case 'partners':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Partner Portal</h2>
            <p className="text-gray-600">Partner portal kommer her...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Rapporter</h2>
            <p className="text-gray-600">Rapport view kommer her...</p>
          </div>
        );
      case 'roadmap':
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Produkt Roadmap</h2>
            <p className="text-gray-600">Roadmap kommer her...</p>
          </div>
        );
      default:
        return (
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-4">Velkommen</h2>
            <p className="text-gray-600">Vælg en menu option...</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-blue-900 text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">GrowthHub</h1>
          <p className="text-sm text-purple-200">Enterprise Portal</p>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentView(item.id as ViewType)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                    currentView === item.id
                      ? 'bg-white bg-opacity-20 font-semibold'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-6 border-t border-white border-opacity-20">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-lg">
              👤
            </div>
            <div>
              <p className="text-sm font-semibold">Admin User</p>
              <p className="text-xs text-purple-200">admin@growthhub.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {navigationItems.find(item => item.id === currentView)?.label || 'Dashboard'}
            </h2>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                🔔 Notifikationer
              </button>
              <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900">
                ⚙️ Indstillinger
              </button>
            </div>
          </div>
        </header>

        <div className="p-0">
          {renderView()}
        </div>
      </main>
    </div>
  );
}

export default App;
