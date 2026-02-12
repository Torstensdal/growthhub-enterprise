import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import PhotoIcon from './icons/PhotoIcon';
import CalendarIcon from './icons/CalendarIcon';
import UsersIcon from './icons/UsersIcon';
import CubeTransparentIcon from './icons/CubeTransparentIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import InboxIcon from './icons/InboxIcon';
import RocketLaunchIcon from './icons/RocketLaunchIcon';
import BuildingStorefrontIcon from './icons/BuildingStorefrontIcon';
import PaperAirplaneIcon from './icons/PaperAirplaneIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CogIcon from './icons/CogIcon';
import { AppState } from '../types';
import HomeIcon from './icons/HomeIcon';
import DocumentChartBarIcon from './icons/DocumentChartBarIcon';
import ListBulletIcon from './icons/ListBulletIcon';
import FlagIcon from './icons/FlagIcon';
import DocumentMagnifyingGlassIcon from './icons/DocumentMagnifyingGlassIcon';
import { BrandPortalLogo } from './BrandPortalLogo';

interface NavItem {
  state: AppState;
  labelKey: string;
  icon: React.FC<any>;
}

interface NavGroup {
  labelKey: string;
  icon: React.FC<any>;
  items: NavItem[];
}

const navStructure: (NavGroup | NavItem)[] = [
  { state: 'dashboard' as AppState, labelKey: 'nav_dashboard', icon: HomeIcon },
  {
    labelKey: 'nav_onboarding',
    icon: RocketLaunchIcon,
    items: [
      { state: 'onboarding_company_info', labelKey: 'nav_onboarding_info', icon: BuildingStorefrontIcon },
      { state: 'onboarding_analysis', labelKey: 'nav_onboarding_analysis', icon: DocumentMagnifyingGlassIcon },
      { state: 'onboarding_goals', labelKey: 'nav_onboarding_goals', icon: FlagIcon },
      { state: 'onboarding_strategy', labelKey: 'nav_onboarding_strategy', icon: ListBulletIcon },
      { state: 'onboarding_plan', labelKey: 'nav_onboarding_plan', icon: DocumentChartBarIcon },
    ]
  },
  {
    labelKey: 'nav_marketing',
    icon: PhotoIcon,
    items: [
      { state: 'media_library', labelKey: 'nav_marketing_library', icon: PhotoIcon },
      { state: 'calendar', labelKey: 'nav_marketing_calendar', icon: CalendarIcon },
    ]
  },
  {
    labelKey: 'nav_sales',
    icon: BriefcaseIcon,
    items: [
      { state: 'partners', labelKey: 'nav_sales_partners', icon: UsersIcon },
      { state: 'prospecting', labelKey: 'nav_sales_prospecting', icon: DocumentMagnifyingGlassIcon },
      { state: 'drip_campaigns', labelKey: 'nav_sales_drip', icon: PaperAirplaneIcon },
      { state: 'leads' as AppState, labelKey: 'nav_sales_leads', icon: InboxIcon },
    ]
  },
  { state: 'analytics' as AppState, labelKey: 'nav_analytics', icon: ChartBarIcon },
  { state: 'growth', labelKey: 'nav_growth', icon: RocketLaunchIcon },
  {
    labelKey: 'nav_settings',
    icon: CogIcon,
    items: [
      { state: 'users', labelKey: 'nav_settings_users', icon: UsersIcon },
      { state: 'integrations', labelKey: 'nav_settings_integrations', icon: CubeTransparentIcon },
    ]
  }
];

interface SideNavProps {
  activeState: AppState;
  onNavigate: (state: AppState) => void;
  currentUserRole?: TeamMemberRole;
  company: Company;
}

export const SideNav: React.FC<SideNavProps> = ({ activeState, onNavigate, currentUserRole, company }) => {
  const { t } = useLanguage();
  const [openMenus, setOpenMenus] = useState<Set<string>>(new Set(['nav_onboarding', 'nav_marketing', 'nav_sales']));

  const toggleMenu = (labelKey: string) => {
    setOpenMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(labelKey)) newSet.delete(labelKey);
      else newSet.add(labelKey);
      return newSet;
    });
  };

  if (!company) return null;

  return (
    <nav className="no-print flex flex-col w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border-primary)] p-6 space-y-2 shrink-0 overflow-y-auto no-scrollbar shadow-lg theme-transition">
      <div className="flex items-center gap-3 px-2 pt-2 mb-8 cursor-pointer" onClick={() => onNavigate('dashboard')}>
        <div className="h-10 w-10 bg-[#0B1D39] rounded-xl flex items-center justify-center shadow-lg shadow-brand-primary/20 overflow-hidden text-white">
          <BrandPortalLogo className="h-7 w-7" />
        </div>
        <span className="font-black text-lg text-[var(--text-primary)] tracking-tighter uppercase">BrandPortal-AI</span>
      </div>

      <div className="flex-grow space-y-1 mt-6">
        {navStructure.map(item => {
          const isGroup = 'items' in item;

          if (isGroup) {
            const group = item as NavGroup;
            const isOpen = openMenus.has(group.labelKey);
            const isGroupActive = group.items.some(sub => sub.state === activeState || (sub.state === 'onboarding_company_info' && activeState === 'company_details'));

            return (
              <div key={group.labelKey} className="mb-4">
                <button
                  onClick={() => toggleMenu(group.labelKey)}
                  className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all text-left
                    ${isGroupActive ? 'text-brand-primary' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    {t(group.labelKey)}
                  </div>
                  <ChevronDownIcon className={`h-3 w-3 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`mt-2 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  {group.items.map(subItem => {
                    const isSubItemActive = activeState === subItem.state || (subItem.state === 'onboarding_company_info' && activeState === 'company_details');
                    return (
                      <button
                        key={subItem.state}
                        onClick={() => onNavigate(subItem.state)}
                        style={isSubItemActive ? { backgroundColor: 'var(--brand-primary)' } : {}}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold rounded-xl transition-all text-left
                          ${isSubItemActive ? 'text-white shadow-lg shadow-indigo-600/30 translate-x-1' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'}
                        `}
                      >
                        <subItem.icon className={`h-4 w-4 ${isSubItemActive ? 'text-white' : 'text-[var(--text-muted)]'}`} />
                        {t(subItem.labelKey)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          }

          const navItem = item as NavItem;
          const isActive = activeState === navItem.state;
          return (
            <button
              key={navItem.state}
              onClick={() => onNavigate(navItem.state)}
              style={isActive ? { backgroundColor: 'var(--brand-primary)' } : {}}
              className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-bold rounded-xl transition-all text-left
                ${isActive ? 'text-white shadow-lg shadow-indigo-600/30 translate-x-1' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--text-primary)]'}
              `}
            >
              <navItem.icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-[var(--text-muted)]'}`} />
              {t(navItem.labelKey)}
            </button>
          );
        })}
      </div>
    </nav>
  );
};


