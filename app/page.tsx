"use client";

import Link from "next/link";
import { ArrowRight, Trophy, BookOpen, Newspaper, Globe } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import BackgroundSlider from "../components/BackgroundSlider";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen relative font-sans text-white selection:bg-blue-500 selection:text-white">
      
      <BackgroundSlider />

      <nav className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-black/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-2xl font-[1000] tracking-tighter uppercase italic text-white shadow-sm">
              Physics Olympiad
            </h1>
          </div>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-black tracking-widest transition-all backdrop-blur-md border border-white/10 active:scale-95"
          >
            <Globe size={12} />
            {lang === 'mn' ? 'ENGLISH' : 'МОНГОЛ'}
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center relative z-20">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-600/30 border border-blue-400/30 text-blue-200 text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 backdrop-blur-md">
          <Trophy size={14} className="text-yellow-400" />
          <span>{t('home.foundation_year')}</span>
        </div>
        
        <h1 className="animate-in fade-in slide-in-from-bottom-8 duration-1000 text-5xl md:text-7xl lg:text-8xl font-[1000] tracking-tighter uppercase italic mb-8 drop-shadow-2xl leading-[0.9]">
          {t('home.hero_title')}
        </h1>
        
        <p className="animate-in fade-in slide-in-from-bottom-12 duration-1000 text-lg md:text-xl text-slate-200 max-w-2xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md">
          {t('home.hero_subtitle')}
        </p>

        <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link 
            href="/archive" 
            className="group w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 border border-blue-500"
          >
            <BookOpen size={20} />
            <span>{t('nav.archive')}</span>
          </Link>
          
          <Link 
            href="/news" 
            className="group w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold transition-all backdrop-blur-md flex items-center justify-center gap-2 hover:border-white/40"
          >
            <Newspaper size={20} />
            <span>{t('home.browse_updates')}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] opacity-80 hover:opacity-100 transition-opacity">
          © 2026 {t('home.physics_committee')}
        </p>
      </div>
    </main>
  );
}