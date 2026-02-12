import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { translations } from '../utils/translations';
import { Language } from '../types';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
      const saved = localStorage.getItem('app_language');
      return (saved as Language) || 'da';
  });

  const updateLanguage = (newLang: Language) => {
      setLanguage(newLang);
      localStorage.setItem('app_language', newLang);
  };

  const t = useCallback((key: string, replacements?: Record<string, string | number>): string => {
    if (!key) return '';

    const cleanKey = key.trim();
    const langCode = (language.split('-')[0] as Language) || 'da';
    
    // 1. Forsøg at finde nøglen i det valgte sprog
    const langDict = translations[langCode] || translations['da'];
    let translation = langDict[cleanKey];

    // 2. Fallback til dansk hvis den mangler i f.eks. engelsk (Sikring mod kodesprog)
    if (!translation && langCode !== 'da') {
        translation = translations['da'][cleanKey];
    }

    // 3. Hvis nøglen slet ikke findes i nogen ordbøger
    if (!translation) {
        // Log advarsel så vi kan se hvad der mangler i koden
        console.warn(`Translation key missing: "${cleanKey}"`);
        
        // Returner en pæn version af nøglen (f.eks. "companyDetails_title" -> "Company Details title")
        return cleanKey
            .replace(/_/g, ' ')
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    // 4. Erstat placeholders {count}, {name} osv.
    if (replacements) {
        Object.keys(replacements).forEach(placeholder => {
            const value = String(replacements[placeholder]);
            translation = translation!.split(`{${placeholder}}`).join(value);
        });
    }

    return translation!;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
