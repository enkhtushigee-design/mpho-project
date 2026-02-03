"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, BookOpen, Newspaper } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen bg-white font-sans">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center border-b border-slate-50">
        <h1 className="text-xl font-black italic tracking-tighter">PHYSICS.MN</h1>
        <div className="flex items-center gap-6">
          <Link href="/news" className="text-xs font-bold hover:text-blue-600 transition uppercase">{t('nav.news')}</Link>
          <Link href="/archive" className="text-xs font-bold hover:text-blue-600 transition uppercase">{t('nav.archive')}</Link>
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-600 transition-all active:scale-95"
          >
            <Globe size={14} />
            {lang === 'mn' ? 'ENGLISH' : 'МОНГОЛ'}
          </button>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 uppercase italic leading-[0.9]">
          {t('home.hero_title')}
        </h2>
        <p className="text-slate-500 text-xl max-w-2xl mx-auto mb-16 font-medium leading-relaxed">
          {t('home.hero_subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/archive" className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-blue-700 transition shadow-xl shadow-blue-100">
            <BookOpen size={20} /> {t('nav.archive')}
          </Link>
          <Link href="/news" className="px-12 py-6 bg-slate-100 text-slate-900 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-200 transition">
            <Newspaper size={20} /> {t('nav.news')}
          </Link>
        </div>
      </section>
    </main>
  );
}