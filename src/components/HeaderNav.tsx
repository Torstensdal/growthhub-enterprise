import React from 'react';
import type { Language, Theme } from '../types';

interface HeaderNavProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
  theme: Theme;
  onThemeToggle: () => void;
  userName?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentLanguage,
  onLanguageChange,
  theme,
  onThemeToggle,
  userName = 'Admin'
}) => {
  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'da', label: 'Dansk', flag: '🇩🇰' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <header className="h-16 bg-[var(--bg-header)] border-b border-[var(--border-primary)] flex items-center justify-between px-6 theme-transition">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <input
            type="text"
            placeholder="Søg..."
            className="w-full px-4 py-2 pl-10 bg-[var(--bg-input)] border border-[var(--border-dark)] rounded-xl text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-brand-primary transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Language Selector */}
        <div className="flex items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-1">
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => onLanguageChange(lang.code)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentLanguage === lang.code
                  ? 'bg-brand-primary text-white shadow-lg'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
              }`}
              title={lang.label}
            >
              {lang.flag}
            </button>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onThemeToggle}
          className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--bg-card-hover)] transition-colors"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] hover:bg-[var(--bg-card-hover)] transition-colors">
          <svg className="h-5 w-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 h-2 w-2 bg-brand-accent-red rounded-full"></span>
        </button>

        {/* User Menu */}
        <div className="flex items-center gap-3 px-3 py-2 bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl">
          <div className="h-8 w-8 rounded-full bg-brand-primary flex items-center justify-center text-white text-sm font-black">
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm font-bold text-[var(--text-primary)]">
            {userName}
          </span>
          <svg className="h-4 w-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </header>
  );
};
