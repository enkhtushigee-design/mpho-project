"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, ArrowRight, BookOpen, Newspaper, Trophy, Star } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      <nav className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-center">
        {/* Logo MPHO болгож засав */}
        <h1 className="text-2xl font-[1000] italic tracking-tighter leading-none select-none">
          MPHӨ<span className="text-blue-600">.</span>MN
        </h1>
        
        <div className="flex items-center gap-8">
          <Link href="/news" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.news')}</Link>
          <Link href="/archive" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.archive')}</Link>
          <Link href="/international" className="text-[10px] font-black uppercase tracking-widest hover:text-blue-600 transition">{t('nav.intl_success')}</Link>
          
          <button onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} className="px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2">
            <Globe size={12} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-[1400px] mx-auto px-8 pt-20 pb-32">
        <h2 className="text-[12vw] md:text-[8vw] font-[1000] italic tracking-tighter leading-[0.8] uppercase mb-12">
          {t('home.hero_title')}
        </h2>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/archive" className="md:col-span-2 group bg-slate-50 p-12 rounded-[56px] flex flex-col justify-between min-h-[450px] hover:bg-blue-600 hover:text-white transition-all">
          <BookOpen size={48} />
          <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none">{t('nav.archive')}</h3>
        </Link>

        <Link href="/international" className="group bg-blue-50 p-12 rounded-[56px] flex flex-col justify-between hover:bg-slate-900 hover:text-white transition-all">
          <Trophy size={48} className="text-blue-600" />
          <h3 className="text-4xl font-[1000] italic tracking-tighter uppercase leading-none">{t('nav.intl_success')}</h3>
        </Link>
      </section>
    </main>
  );
}