"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations'; 

type Language = 'mn' | 'en';

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('mn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', lang);
    }
  }, [lang, mounted]);

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[lang];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; 
      }
    }
    return value;
  };

  // ✅ ЗАСВАР: үргэлж Provider-оор бүрнэ — mounted үед ч, үгүй үед ч
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}