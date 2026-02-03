"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, ArrowRight, BookOpen, Newspaper, Trophy } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-center">
        <h1 className="text-2xl font-[900] italic tracking-tighter leading-none select-none">
          PHYSICS<span className="text-blue-600">.</span>MN
        </h1>
        
        <div className="flex items-center gap-8">
          <Link href="/news" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.news')}</Link>
          <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.archive')}</Link>
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-full text-[10px] font-black tracking-widest transition-all duration-300 flex items-center gap-2"
          >
            <Globe size={12} />
            {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Section - Old Brutalist Layout */}
      <section className="max-w-[1400px] mx-auto px-8 pt-20 pb-32">
        <div className="max-w-4xl">
          <h2 className="text-[12vw] md:text-[8vw] font-[1000] italic tracking-tighter leading-[0.8] uppercase mb-12">
            {t('home.hero_title')}
          </h2>
          <p className="text-xl md:text-2xl font-medium text-slate-500 max-w-2xl leading-relaxed mb-16">
            {t('home.hero_subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/archive" className="group px-8 py-5 bg-blue-600 text-white rounded-2xl font-black flex items-center gap-4 hover:bg-blue-700 transition-all">
              {t('nav.archive')} <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
          </div>
        </div>
      </section>

      {/* Bento Grid Features (Хуучин Layout) */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 bg-slate-50 p-12 rounded-[48px] flex flex-col justify-between min-h-[400px]">
          <Trophy size={48} className="text-blue-600 mb-8" />
          <div>
            <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Results & Archive</h3>
            <p className="text-slate-500 font-medium max-w-sm">Access every physics olympiad material from the last decade.</p>
          </div>
        </div>
        <div className="bg-slate-900 p-12 rounded-[48px] text-white flex flex-col justify-between">
          <Newspaper size={48} className="text-blue-400 mb-8" />
          <div>
            <h3 className="text-4xl font-black italic tracking-tighter uppercase mb-4">Latest News</h3>
            <Link href="/news" className="inline-flex items-center gap-2 text-blue-400 font-black text-xs tracking-widest uppercase">
              Browse All <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}