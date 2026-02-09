import React, { useState } from 'react';

interface SideNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activeScreen, onNavigate }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['foundation']);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const categories = [
    {
      id: 'foundation',
      name: 'Værkstfundament',
      icon: '🏗️',
      items: [
        { id: 'dashboard', name: 'Dashboard', icon: '📊' },
        { id: 'company', name: 'Virksomhed', icon: '🏢' },
        { id: 'strategy', name: 'Strategi', icon: '🎯' },
      ]
    },
    {
      id: 'marketing',
      name: 'Marketing Center',
      icon: '📢',
      items: [
        { id: 'calendar', name: 'Kalender', icon: '📅' },
        { id: 'social', name: 'Social Media', icon: '💬' },
        { id: 'content', name: 'Indhold', icon: '✍️' },
      ]
    },
    {
      id: 'sales',
      name: 'Salg & Relationer',
      icon: '🤝',
      items: [
        { id: 'prospecting', name: 'Prospecting', icon: '🎯' },
        { id: 'partners', name: 'Partnere', icon: '👥' },
        { id: 'reports', name: 'Rapporter', icon: '📈' },
      ]
    },
    {
      id: 'growth',
      name: 'Vækst',
      icon: '🚀',
      items: [
        { id: 'roadmap', name: 'Roadmap', icon: '🗺️' },
        { id: 'analytics', name: 'Analytics', icon: '📊' },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border-primary)] flex flex-col h-screen overflow-y-auto theme-transition">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border-primary)]">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-primary flex items-center justify-center text-white font-black text-xl">
            G
          </div>
          <div>
            <div className="font-black text-[var(--text-primary)] text-lg tracking-tight">
              GrowthHub
            </div>
            <div className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              Enterprise
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {categories.map(category => {
          const isExpanded = expandedCategories.includes(category.id);
          
          return (
            <div key={category.id} className="space-y-1">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-[var(--bg-card-hover)] transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-xs font-black text-[var(--text-secondary)] uppercase tracking-widest group-hover:text-[var(--text-primary)]">
                    {category.name}
                  </span>
                </div>
                <svg
                  className={`h-4 w-4 text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Category Items */}
              {isExpanded && (
                <div className="ml-4 space-y-1">
                  {category.items.map(item => (
                    <button
                      key={item.id}
                      onClick={() => onNavigate(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeScreen === item.id
                          ? 'bg-brand-primary text-white shadow-lg'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'
                      }`}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[var(--border-primary)]">
        <div className="text-[9px] text-[var(--text-muted)] text-center font-medium">
          v1.0.0 • © 2026 GrowthHub
        </div>
      </div>
    </aside>
  );
};
