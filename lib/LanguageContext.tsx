"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
// ЗАССАН: Файлын нэр "translation" (ганц тоогоор) байгаа тул s-гүй бичнэ
import { translations } from './translation'; 

type Language = 'mn' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (path: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('mn');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Хөтөч дээр хадгалагдсан хэл байгаа эсэхийг шалгах
    const savedLang = localStorage.getItem('lang') as Language;
    if (savedLang && (savedLang === 'mn' || savedLang === 'en')) {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[lang];
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path; // Хэрэв текст олдохгүй бол замыг нь буцаана
      }
    }
    return result;
  };

  // Hydration error болон Build error-оос сэргийлэх хэсэг
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  // Vercel Build хийх үед Provider-оос гадна хандах тохиолдолд 
  // вэб сайтыг алдаа зааж зогсоохоос сэргийлсэн "Safety Net"
  if (context === undefined) {
    return {
      lang: 'mn' as Language,
      setLang: () => {},
      t: (path: string) => path
    };
  }
  
  return context;
}