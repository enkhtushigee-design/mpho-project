"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, BookOpen, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen relative font-sans selection:bg-blue-100 overflow-x-hidden">
      
      {/* Background Image Container */}
      <div className="absolute top-0 left-0 w-full h-[600px] -z-20">
        <Image 
          src="/hero-bg.jpg" // Чиний зургийн нэр
          alt="Physics Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay - Зургийг текстээс ялгаж өгөх бүдэг давхарга */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/80 to-white" />
      </div>

      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center relative z-10 backdrop-blur-sm bg-white/30 border-b border-white/20">
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
          <h1 className="text-2xl font-[1000] italic tracking-tighter leading-none select-none text-slate-950">
            MPHO<span className="text-blue-600">.</span>MN
          </h1>
        </Link>
        
        <div className="flex items-center gap-10">
          <Link href="/news" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors">
            {t('nav.news')}
          </Link>
          <Link href="/archive" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors">
            {t('nav.archive')}
          </Link>
          <Link href="/international" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors">
            {t('nav.intl_success')}
          </Link>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} 
            className="px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-2xl"
          >
            <Globe size={12} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Content Space */}
      <section className="max-w-[1400px] mx-auto px-8 pt-32 pb-20">
        <h2 className="text-[10vw] md:text-[7vw] font-[1000] italic tracking-tighter leading-[0.85] uppercase text-slate-950 max-w-4xl">
          {t('home.hero_title')}
        </h2>
      </section>

      {/* Bento Grid Layout */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* ОЛИМПИАДЫН АРХИВ */}
        <Link href="/archive" className="md:col-span-2 group relative bg-white/80 backdrop-blur-md p-14 rounded-[64px] flex flex-col justify-between min-h-[480px] border border-slate-200 hover:bg-blue-600 hover:border-blue-500 transition-all duration-500 shadow-xl">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <BookOpen size={36} className="text-blue-600" />
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-6xl font-[1000] italic tracking-tighter uppercase leading-none text-slate-950 group-hover:text-white transition-colors">
              {t('nav.archive')}
            </h3>
            <ArrowRight size={48} className="text-slate-200 group-hover:text-white transition-colors" />
          </div>
        </Link>

        {/* ОЛОН УЛСЫН АМЖИЛТ */}
        <Link href="/international" className="group relative bg-slate-950 p-14 rounded-[64px] flex flex-col justify-between min-h-[480px] border border-slate-800 hover:bg-white transition-all duration-500 shadow-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-lg">
            <Trophy size={36} className="text-blue-400 group-hover:text-blue-600" />
          </div>
          <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none text-white group-hover:text-slate-950 transition-colors">
            {t('nav.intl_success')}
          </h3>
        </Link>
      </section>
    </main>
  );
}