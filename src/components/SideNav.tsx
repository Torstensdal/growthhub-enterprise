import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SideNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeScreen, onNavigate }) => {
  const { language } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('foundation');

  const navCategories = [
    {
      id: 'foundation',
      label: 'Værkstfundament',
      icon: '🏗️',
      items: [
        { id: 'onboarding', label: 'Onboarding', icon: '🎯' },
        { id: 'workspace', label: 'Workspace Hub', icon: '💼' },
      ],
    },
    {
      id: 'marketing',
      label: 'Marketing Center',
      icon: '📢',
      items: [
        { id: 'media-library', label: 'Media Library', icon: '📁' },
        { id: 'calendar', label: 'Kalender', icon: '📅' },
        { id: 'social', label: 'Social Media', icon: '📱' },
      ],
    },
    {
      id: 'sales',
      label: 'Salg & Relationer',
      icon: '💼',
      items: [
        { id: 'partners', label: 'Partnere', icon: '🤝' },
        { id: 'prospecting', label: 'Prospektering', icon: '🎯' },
        { id: 'drip-campaigns', label: 'Drip Campaigns', icon: '📧' },
        { id: 'leads', label: 'Leads', icon: '👥' },
      ],
    },
    {
      id: 'insights',
      label: 'Indsigt & Vækst',
      icon: '📊',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '📊' },
        { id: 'reports', label: 'Rapporter', icon: '📈' },
        { id: 'analytics', label: 'Analytics', icon: '🔍' },
      ],
    },
    {
      id: 'development',
      label: 'Udvikling',
      icon: '🚀',
      items: [
        { id: 'roadmap', label: 'Roadmap', icon: '🗺️' },
        { id: 'features', label: 'Features', icon: '⭐' },
      ],
    },
  ];

  const bottomNavItems = [
    { id: 'settings', label: 'Indstillinger', icon: '⚙️' },
    { id: 'help', label: 'Hjælp', icon: '❓' },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 h-screen flex flex-col shadow-2xl">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-xl font-bold text-white">GH</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">GrowthHub</h1>
            <p className="text-slate-400 text-xs">Enterprise</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        {navCategories.map((category) => (
          <div key={category.id} className="mb-2">
            {/* Category Header */}
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all group"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm font-semibold">{category.label}</span>
              </div>
              <span className={`text-xs transition-transform ${
                expandedCategory === category.id ? 'rotate-180' : ''
              }`}>
                ▼
              </span>
            </button>

            {/* Category Items */}
            {expandedCategory === category.id && (
              <div className="mt-1 ml-6 space-y-1">
                {category.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all ${
                      activeScreen === item.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-slate-700 p-3">
        {bottomNavItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all mb-1 ${
              activeScreen === item.id
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Info */}
      <div className="border-t border-slate-700 p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
            KS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Kaj Sørensen</p>
            <p className="text-slate-400 text-xs truncate">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
