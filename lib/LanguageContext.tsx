"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

type Language = 'mn' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>('mn');

  // Хөтөч дээр хадгалагдсан хэл байгаа эсэхийг шалгах
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang) setLangState(savedLang);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Текстийг замаар нь (жишээ нь: "nav.archive") олж авах функц
  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[lang];
    for (const key of keys) {
      if (result[key]) result = result[key];
      else return path; // Хэрэв олдохгүй бол замыг нь буцаана
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};