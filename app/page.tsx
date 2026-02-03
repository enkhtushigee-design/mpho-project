"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, ArrowRight, BookOpen, Newspaper, Trophy, Star } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-center">
        <h1 className="text-2xl font-[1000] italic tracking-tighter leading-none select-none">
          PHYSICS<span className="text-blue-600">.</span>MN
        </h1>
        
        <div className="flex items-center gap-8">
          <Link href="/news" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.news')}</Link>
          <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.archive')}</Link>
          {/* Navbar дээрх Олон Улсын Амжилт */}
          <Link href="/international" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.intl_success')}</Link>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-900 hover:text-white rounded-full text-[10px] font-black tracking-widest transition-all duration-300 flex items-center gap-2"
          >
            <Globe size={12} />
            {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-8 pt-20 pb-32">
        <div className="max-w-5xl">
          <h2 className="text-[12vw] md:text-[8vw] font-[1000] italic tracking-tighter leading-[0.8] uppercase mb-12">
            {t('home.hero_title')}
          </h2>
          <p className="text-xl md:text-2xl font-medium text-slate-500 max-w-2xl leading-relaxed mb-16">
            {t('home.hero_subtitle')}
          </p>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/archive" className="md:col-span-2 group bg-slate-50 p-12 rounded-[56px] flex flex-col justify-between min-h-[450px] hover:bg-blue-600 hover:text-white transition-all duration-500">
          <BookOpen size={48} className="group-hover:scale-110 transition duration-500" />
          <div>
            <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none italic">
              {t('nav.archive')}
            </h3>
            <p className="font-medium opacity-60 max-w-sm uppercase text-xs tracking-widest">
              Access problems, solutions and results from all years.
            </p>
          </div>
        </Link>

        {/* Bento Карт - Олон Улсын Амжилт */}
        <Link href="/international" className="group bg-blue-50 p-12 rounded-[56px] flex flex-col justify-between hover:bg-slate-900 hover:text-white transition-all duration-500">
          <Trophy size={48} className="text-blue-600 group-hover:text-yellow-400 transition" />
          <div>
            <h3 className="text-4xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none italic">
              {t('nav.intl_success')}
            </h3>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition" />
          </div>
        </Link>

        <Link href="/news" className="group bg-slate-900 p-12 rounded-[56px] text-white flex flex-col justify-between min-h-[400px] hover:scale-[0.98] transition-all">
          <Newspaper size={48} className="text-blue-400" />
          <div>
            <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase mb-4 leading-none italic">
              {t('nav.news')}
            </h3>
            <div className="flex items-center gap-2 text-blue-400 font-black text-[10px] tracking-widest uppercase">
              Browse updates <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        <div className="md:col-span-2 bg-slate-50 p-12 rounded-[56px] flex items-center justify-between border border-slate-100">
          <div className="max-w-md">
            <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-2 italic">Physics Olympiad Committee</h3>
            <p className="text-slate-400 text-sm font-medium">Supporting the next generation of Mongolian physicists since 1990.</p>
          </div>
          <Star size={32} className="text-slate-200" />
        </div>
      </section>
    </main>
  );
}