"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Target, ShieldCheck, Globe } from "lucide-react"; // Globe нэмсэн
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { t, lang, setLang } = useLanguage(); // setLang нэмсэн

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      
      {/* Navbar */}
      <nav className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between relative z-50">
        
        {/* Left Side: Back Button & Page Title */}
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-[1000] italic tracking-tighter uppercase text-slate-950">
            {lang === 'mn' ? 'Бидний тухай' : 'About Us'}
          </h1>
        </div>

        {/* Right Side: Language Switcher (Шинээр нэмсэн) */}
        <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')} 
            className="px-5 py-2 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-blue-700 transition-all shadow-xl"
          >
            <Globe size={12} /> {lang === 'mn' ? 'EN' : 'MN'}
        </button>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        {/* Main Banner Card */}
        <div className="bg-slate-950 rounded-[48px] p-8 md:p-16 text-white mb-8 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="relative w-48 h-48 shrink-0 bg-white rounded-[32px] p-4 shadow-2xl">
              <Image 
                src="/logo.png" 
                alt="MPHO Logo" 
                fill
                className="object-contain p-2"
              />
            </div>
            <div>
              {/* Тайлбар текстийг устгасан тул зөвхөн гарчиг үлдлээ */}
              <h2 className="text-4xl md:text-5xl font-[1000] italic tracking-tighter uppercase leading-none">
                {lang === 'mn' ? 'Улсын Физикийн Олимпиадын Хороо' : 'National Physics Olympiad Committee'}
              </h2>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        {/* Info Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Зорилго */}
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-[40px] hover:border-blue-500 transition-all group flex flex-col items-center text-center justify-center min-h-[300px]">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <Target className="text-blue-600 group-hover:text-white" size={40} />
            </div>
            <h3 className="text-3xl font-[1000] italic uppercase text-slate-950 tracking-tight">
              {lang === 'mn' ? 'Бидний Зорилго' : 'Our Mission'}
            </h3>
            {/* Тайлбар текстийг устгасан */}
          </div>

          {/* Үйл ажиллагаа */}
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-[40px] hover:border-blue-500 transition-all group flex flex-col items-center text-center justify-center min-h-[300px]">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <ShieldCheck className="text-blue-600 group-hover:text-white" size={40} />
            </div>
            <h3 className="text-3xl font-[1000] italic uppercase text-slate-950 tracking-tight">
              {lang === 'mn' ? 'Үйл ажиллагаа' : 'Activities'}
            </h3>
            {/* Тайлбар текстийг устгасан */}
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-20 text-center border-t border-slate-100 pt-12">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            © 2026 Улсын Физикийн Олимпиадын Хороо. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}