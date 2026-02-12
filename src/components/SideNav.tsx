import { AppState } from '../types';

export const items = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'calendar', label: 'Calendar' },
  { key: 'company', label: 'Company' },
  { key: 'strategy', label: 'Strategy' },
  { key: 'social', label: 'Social' },
  { key: 'content', label: 'Content' },
  { key: 'prospecting', label: 'Prospecting' },
  { key: 'partners', label: 'Partners' },
  { key: 'reports', label: 'Reports' },
  { key: 'roadmap', label: 'Roadmap' },
  { key: 'analytics', label: 'Analytics' }
] as const;

export type SideNavItem = {
    key: AppState;
    label: string;
};

export default items.map(i => ({ key: i.key as AppState, label: i.label }));
