import { useState } from 'react';
import CalendarScreen from './components/CalendarScreen';
import ProspectingScreen from './components/ProspectingScreen';
import SocialMediaScreen from './components/SocialMediaScreen';
import PartnerPortalScreen from './components/PartnerPortalScreen';

type View = 'calendar' | 'prospecting' | 'social' | 'partners' | 'reports' | 'roadmap';

function App() {
  const [currentView, setCurrentView] = useState<View>('calendar');

  const renderView = () => {
    switch (currentView) {
      case 'calendar':
        return <CalendarScreen />;
      case 'prospecting':
        return <ProspectingScreen />;
      case 'partners':
        return <PartnerPortalScreen />;
      case 'social':
        return <SocialMediaScreen />;
      case 'reports':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Rapporter</h1>
            <p>Kommer snart...</p>
          </div>
        );
      case 'roadmap':
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold">Roadmap</h1>
            <p>Kommer snart...</p>
          </div>
        );
      default:
        return <CalendarScreen />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-600 to-blue-600 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold">GrowthHub Enterprise Portal</h1>
        </div>
        
        <nav className="flex-1 px-4">
          {[
            { id: 'calendar', label: 'Kalender', icon: '📅' },
            { id: 'prospecting', label: 'Prospektering', icon: '🎯' },
            { id: 'social', label: 'Social Media', icon: '📱' },
            { id: 'partners', label: 'Partner Portal', icon: '🤝' },
            { id: 'reports', label: 'Rapporter', icon: '📊' },
            { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as View)}
              className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors ${
                currentView === item.id
                  ? 'bg-white/20 font-semibold'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/20">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              👤
            </div>
            <div>
              <p className="font-semibold">Admin User</p>
              <p className="text-sm text-white/70">admin@growthhub.dk</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </h2>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              🔔 Notifikationer
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
              ⚙️ Indstillinger
            </button>
          </div>
        </div>

        {/* View Content */}
        <div className="flex-1 overflow-auto">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;
