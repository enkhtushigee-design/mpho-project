"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, ArrowRight, BookOpen, Newspaper, Trophy } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      {/* Background Image/Gradient Effect */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-slate-100 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-8 py-10 flex justify-between items-center relative z-10">
        {/* MPHO Logo - Styled */}
        <Link href="/" className="group">
          <h1 className="text-3xl font-[1000] italic tracking-tighter leading-none select-none">
            MPHO<span className="text-blue-600 group-hover:animate-pulse">.</span>MN
          </h1>
        </Link>
        
        <div className="flex items-center gap-10">
          <Link href="/news" className="text-[11px] font-[900] uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
            {t('nav.news')}
          </Link>
          <Link href="/archive" className="text-[11px] font-[900] uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
            {t('nav.archive')}
          </Link>
          <Link href="/international" className="text-[11px] font-[900] uppercase tracking-[0.2em] hover:text-blue-600 transition-colors">
            {t('nav.intl_success')}
          </Link>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} 
            className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-200"
          >
            <Globe size={12} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero / Space */}
      <div className="h-20" />

      {/* Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* ОЛИМПИАДЫН АРХИВ */}
        <Link href="/archive" className="md:col-span-2 group relative bg-slate-50/50 backdrop-blur-sm p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-100 hover:bg-blue-600 hover:border-blue-500 transition-all duration-700">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
            <BookOpen size={36} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-6xl font-[1000] italic tracking-tighter uppercase leading-none group-hover:text-white transition-colors">
              {t('nav.archive')}
            </h3>
            <div className="mt-6 flex items-center gap-2 text-slate-400 group-hover:text-blue-100 font-bold text-xs tracking-widest uppercase">
              Browse problems <ArrowRight size={16} />
            </div>
          </div>
        </Link>

        {/* ОЛОН УЛСЫН АМЖИЛТ */}
        <Link href="/international" className="group relative bg-slate-900 p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-800 hover:bg-white hover:border-slate-200 transition-all duration-700 shadow-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <Trophy size={36} className="text-blue-400 group-hover:text-blue-600" />
          </div>
          <div>
            <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none text-white group-hover:text-slate-900 transition-colors">
              {t('nav.intl_success')}
            </h3>
            <ArrowRight size={28} className="mt-6 text-blue-400 group-hover:translate-x-3 transition-transform" />
          </div>
        </Link>
      </section>
    </main>
  );
}