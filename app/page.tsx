"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/LanguageContext";
import { Globe, BookOpen, Trophy, ArrowRight } from "lucide-react";

export default function Home() {
  const { t, lang, setLang } = useLanguage();

  return (
    <main className="min-h-screen relative font-sans selection:bg-blue-100 overflow-x-hidden bg-white">
      
      {/* Background Image Container - Зургийг дээд хэсгээс эхлэн бүрэн харагдуулахаар тохируулав */}
      <div className="absolute top-0 left-0 w-full h-[700px] -z-20 overflow-hidden">
        <Image 
          src="/hero-bg.jpg" 
          alt="Background"
          fill
          className="object-cover object-top" // Зургийн дээд талыг голлож харуулна
          priority
        />
        {/* Overlay-г илүү зөөлөн болгож, текстийг тодруулав */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-white/40 to-white" />
      </div>

      {/* Navbar - Зургийн дээр тод харагдахуйц */}
      <nav className="max-w-[1400px] mx-auto px-8 py-8 flex justify-between items-center relative z-50">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="relative w-14 h-14 transition-transform duration-300 group-hover:scale-110 drop-shadow-md">
            <Image 
              src="/logo.png" 
              alt="MPHO Logo" 
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-3xl font-[1000] italic tracking-tighter leading-none select-none text-slate-950 drop-shadow-sm">
            MPHO<span className="text-blue-600">.</span>MN
          </h1>
        </Link>
        
        <div className="flex items-center gap-10">
          <Link href="/news" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors drop-shadow-sm">
            {t('nav.news')}
          </Link>
          <Link href="/archive" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors drop-shadow-sm">
            {t('nav.archive')}
          </Link>
          <Link href="/international" className="text-[11px] font-[1000] uppercase tracking-[0.2em] text-slate-950 hover:text-blue-700 transition-colors drop-shadow-sm">
            {t('nav.intl_success')}
          </Link>
          
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} 
            className="px-6 py-3 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-2xl"
          >
            <Globe size={14} /> {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      {/* Hero Content - Зөвхөн чиний хүссэн MPHO нэршил */}
      <section className="max-w-[1400px] mx-auto px-8 pt-40 pb-24 relative z-10">
        <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg">
          Official Website
        </div>
        <h2 className="text-[10vw] md:text-[8vw] font-[1000] italic tracking-tighter leading-[0.8] uppercase text-slate-950 drop-shadow-xl">
          MPHO<span className="text-blue-600">.</span>MN
        </h2>
      </section>

      {/* Bento Grid */}
      <section className="max-w-[1400px] mx-auto px-8 pb-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        
        <Link href="/archive" className="md:col-span-2 group relative bg-white/90 backdrop-blur-md p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-200 hover:bg-blue-600 transition-all duration-500 shadow-xl">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <BookOpen size={40} className="text-blue-600" />
          </div>
          <div className="flex justify-between items-end">
            <h3 className="text-7xl font-[1000] italic tracking-tighter uppercase leading-none text-slate-950 group-hover:text-white transition-colors">
              {t('nav.archive')}
            </h3>
            <ArrowRight size={56} className="text-slate-300 group-hover:text-white transition-all group-hover:translate-x-4" />
          </div>
        </Link>

        <Link href="/international" className="group relative bg-slate-950 p-14 rounded-[64px] flex flex-col justify-between min-h-[500px] border border-slate-800 hover:bg-white transition-all duration-500 shadow-2xl overflow-hidden">
          {/* Карт доторх чимэглэл */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-[50px] group-hover:bg-blue-600/10" />
          
          <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-lg relative z-10">
            <Trophy size={40} className="text-blue-400 group-hover:text-blue-600" />
          </div>
          <h3 className="text-5xl font-[1000] italic tracking-tighter uppercase leading-none text-white group-hover:text-slate-950 transition-colors relative z-10">
            {t('nav.intl_success')}
          </h3>
        </Link>
      </section>
    </main>
  );
}