import type { AppState } from './types';
import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { SideNav } from './components/SideNav';
import { HeaderNav } from './components/HeaderNav';
import { DashboardScreen } from './components/DashboardScreen';
import { CalendarScreen } from './components/CalendarScreen';
import type { Language, Theme } from './types';

function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('da');
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'light';
  });

  const handleThemeToggle = () => {
    const newTheme: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Set initial theme
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'calendar':
        return <CalendarScreen onNavigate={setCurrentScreen} />;
      case 'dashboard':
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-[var(--bg-app)] overflow-hidden">
        <SideNav activeScreen={currentScreen} onNavigate={setCurrentScreen} />
        <div className="flex-1 flex flex-col">
          <HeaderNav
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
            theme={theme}
            onThemeToggle={handleThemeToggle}
          />
          <main className="flex-1 overflow-y-auto">
            {renderScreen()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;
