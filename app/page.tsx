"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, BookOpen, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen relative font-sans selection:bg-blue-100 overflow-x-hidden bg-white">
      
      {/* Background Section - Зургийг CSS background-image ашиглаж илүү найдвартай орууллаа */}
      <div 
        className="absolute top-0 left-0 w-full h-[700px] -z-20 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      >
        {/* Overlay - Доошоо цагаан өнгөтэй уусгах давхарга */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-white/30 to-white" />
      </div>

      {/* Navbar - Ганц MPHO.MN лого энд үлдсэн */}
      <nav className="max-w-[1400px] mx-auto px-8 py-10 flex justify-between items-center relative z-50">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110 shadow-sm rounded-xl overflow-hidden">
            <Image 
              src="/logo.png" 
              alt="MPHO Logo" 
              fill
              className="object-contain"
              priority
              unoptimized // Зураг харагдахгүй байвал энэ тусална
            />
          </div>
          <h1 className="text-3xl font-[1000] italic tracking-tighter leading-none select-none text-slate-950 uppercase">
            MPHO<span className="text-blue-600">.</span>MN
          </h1>
        </Link>
        
        <div className="flex items-center gap-10">
          <Link href="/news" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-900 hover:text-blue-700 transition-colors">
            {t('nav.news')}
          </Link>
          <Link href="/archive" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-900 hover:text-blue-700 transition-colors">
            {t('nav.archive')}
          </Link>
          <Link href="/international" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-900 hover:text-blue-700 transition-colors">
            {t('nav.intl_success')}
          </Link>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} 
            className="px-6 py-3 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl"
          >
            <Globe size={14} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Space - Текстийг устгаж зөвхөн зай үлдээв */}
      <div className="h-[25vh]" />

      {/* Bento Grid - Үндсэн картууд */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        {/* ОЛИМПИАДЫН АРХИВ */}
        <Link href="/archive" className="md:col-span-2 group relative bg-white/90 backdrop-blur-md p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-200 hover:bg-blue-600 transition-all duration-700 shadow-xl">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <BookOpen size={40} className="text-blue-600" />
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-7xl font-[1000] italic tracking-tighter uppercase leading-none text-slate-950 group-hover:text-white transition-colors">
              {t('nav.archive')}
            </h3>
            <div className="bg-slate-950 text-white p-4 rounded-full group-hover:bg-white group-hover:text-blue-600 transition-all">
              <ArrowRight size={32} />
            </div>
          </div>
        </Link>

        {/* ОЛОН УЛСЫН АМЖИЛТ */}
        <Link href="/international" className="group relative bg-slate-950 p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-800 hover:bg-white transition-all duration-700 shadow-2xl">
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-lg">
            <Trophy size={40} className="text-blue-400 group-hover:text-blue-600" />
          </div>
          <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none text-white group-hover:text-slate-950 transition-colors">
            {t('nav.intl_success')}
          </h3>
        </Link>
      </section>
    </main>
  );
}