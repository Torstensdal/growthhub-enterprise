export type Language = 'da' | 'en';

export interface Translations {
  [key: string]: {
    da: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.dashboard': { da: 'Dashboard', en: 'Dashboard' },
  'nav.projects': { da: 'Projekter', en: 'Projects' },
  'nav.team': { da: 'Team', en: 'Team' },
  'nav.analytics': { da: 'Analyser', en: 'Analytics' },
  'nav.settings': { da: 'Indstillinger', en: 'Settings' },
  
  // Common
  'common.save': { da: 'Gem', en: 'Save' },
  'common.cancel': { da: 'Annuller', en: 'Cancel' },
  'common.delete': { da: 'Slet', en: 'Delete' },
  'common.edit': { da: 'Rediger', en: 'Edit' },
  'common.add': { da: 'Tilføj', en: 'Add' },
  'common.search': { da: 'Søg', en: 'Search' },
  'common.loading': { da: 'Indlæser...', en: 'Loading...' },
  
  // Greetings
  'greeting.welcome': { da: 'Velkommen', en: 'Welcome' },
  'greeting.hello': { da: 'Hej', en: 'Hello' },
};

export const translate = (key: string, language: Language): string => {
  return translations[key]?.[language] || key;
};
