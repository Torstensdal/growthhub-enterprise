import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface HeaderNavProps {
  activeWorkspace?: string;
  onWorkspaceChange?: (workspace: string) => void;
}

const HeaderNav: React.FC<HeaderNavProps> = ({ activeWorkspace, onWorkspaceChange }) => {
  const { language, setLanguage, t } = useLanguage();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [showNotifications, setShowNotifications] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'da', label: 'Dansk', flag: '🇩🇰' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  const workspaces = [
    { id: 'main', name: 'GrowthHub Enterprise', type: 'company' },
    { id: 'personal', name: 'Mit Workspace', type: 'personal' },
  ];

  const notifications = [
    { id: '1', title: 'Ny prospect tilføjet', message: 'Acme Corp er blevet tilføjet', time: '5m siden' },
    { id: '2', title: 'Partner godkendt', message: 'TechSolutions ApS er nu aktiv', time: '1t siden' },
    { id: '3', title: 'Opslag publiceret', message: 'LinkedIn opslag er live', time: '2t siden' },
  ];

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Workspace Selector */}
        <div className="flex items-center gap-4">
          <select
            value={activeWorkspace || 'main'}
            onChange={(e) => onWorkspaceChange?.(e.target.value)}
            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {workspaces.map((workspace) => (
              <option key={workspace.id} value={workspace.id}>
                {workspace.type === 'company' ? '🏢' : '👤'} {workspace.name}
              </option>
            ))}
          </select>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-xl">🔍</span>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <span className="text-xl">🔔</span>
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Notifikationer</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm">{notif.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-100">
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium w-full text-center">
                    Se alle notifikationer
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  language === lang.code
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title={lang.label}
              >
                <span className="mr-1">{lang.flag}</span>
                {lang.code.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="Toggle theme"
          >
            <span className="text-xl">{theme === 'light' ? '🌙' : '☀️'}</span>
          </button>

          {/* Quick Actions */}
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg font-medium text-sm">
            + Ny Handling
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
