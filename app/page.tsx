"use client";

import Link from "next/link";
import Image from "next/image"; // Зураг оруулахад хэрэгтэй
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, BookOpen, Trophy } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 relative overflow-hidden">
      
      {/* Background Subtle Gradient - Арын фонны зөөлөн өнгө */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full bg-blue-50 blur-[100px]" />
        <div className="absolute bottom-[0%] right-[-5%] w-[40%] h-[40%] rounded-full bg-slate-50 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center relative z-10 border-b border-slate-50/50 backdrop-blur-md">
        
        {/* Logo Section - Лого болон MPHO.MN */}
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
            <Image 
              src="/logo.png" 
              alt="MPHO Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-[1000] italic tracking-tighter leading-none select-none">
            MPHO<span className="text-blue-600">.</span>MN
          </h1>
        </Link>
        
        {/* Menu - Цэс */}
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
            className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg"
          >
            <Globe size={12} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      <div className="h-24" />

      {/* Bento Grid Layout */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* ОЛИМПИАДЫН АРХИВ Карт */}
        <Link href="/archive" className="md:col-span-2 group relative bg-slate-50/60 backdrop-blur-sm p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-white hover:bg-blue-600 transition-all duration-700 shadow-sm">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            <BookOpen size={36} className="text-blue-600" />
          </div>
          <h3 className="text-6xl font-[1000] italic tracking-tighter uppercase leading-none group-hover:text-white transition-colors">
            {t('nav.archive')}
          </h3>
        </Link>

        {/* ОЛОН УЛСЫН АМЖИЛТ Карт */}
        <Link href="/international" className="group relative bg-slate-900 p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] hover:bg-white border border-slate-800 hover:border-slate-100 transition-all duration-700 shadow-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
            <Trophy size={36} className="text-blue-400 group-hover:text-blue-600" />
          </div>
          <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none text-white group-hover:text-slate-900 transition-colors">
            {t('nav.intl_success')}
          </h3>
        </Link>
      </section>
    </main>
  );
}