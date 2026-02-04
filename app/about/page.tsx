"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Target, Users, Award, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="max-w-5xl mx-auto px-6 py-10 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-200">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-[1000] italic tracking-tighter uppercase text-slate-950">
            {lang === 'mn' ? 'Бидний тухай' : 'About Us'}
          </h1>
        </div>
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
              <h2 className="text-4xl md:text-5xl font-[1000] italic tracking-tighter uppercase leading-none mb-6">
                {lang === 'mn' ? 'Улсын Физикийн Олимпиадын Хороо' : 'National Physics Olympiad Committee'}
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed font-medium max-w-2xl">
                {lang === 'mn' 
                  ? 'Монгол улсын физикийн боловсролын чанарыг сайжруулах, авьяаслаг сурагчдыг тодруулах, олон улсын түвшинд өрсөлдөх чадварыг нэмэгдүүлэх зорилготой ажиллаж байна.' 
                  : 'We aim to improve the quality of physics education in Mongolia, identify talented students, and increase their competitiveness at the international level.'}
              </p>
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        </div>

        {/* Info Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Зорилго */}
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-[40px] hover:border-blue-500 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <Target className="text-blue-600 group-hover:text-white" size={32} />
            </div>
            <h3 className="text-2xl font-[1000] italic uppercase text-slate-950 mb-4 tracking-tight">
              {lang === 'mn' ? 'Бидний Зорилго' : 'Our Mission'}
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed">
              {lang === 'mn' 
                ? 'Физикийн шинжлэх ухааныг сурталчлан таниулах, сурагчдын сэтгэн бодох чадварыг хөгжүүлэх замаар ирээдүйн шилдэг инженер, эрдэмтдийг бэлтгэхэд оршино.'
                : 'To prepare future top engineers and scientists by promoting physics and developing students\' thinking skills.'}
            </p>
          </div>

          {/* Үйл ажиллагаа */}
          <div className="bg-slate-50 border border-slate-200 p-10 rounded-[40px] hover:border-blue-500 transition-all group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:bg-blue-600 transition-colors">
              <ShieldCheck className="text-blue-600 group-hover:text-white" size={32} />
            </div>
            <h3 className="text-2xl font-[1000] italic uppercase text-slate-950 mb-4 tracking-tight">
              {lang === 'mn' ? 'Үйл ажиллагаа' : 'Activities'}
            </h3>
            <p className="text-slate-700 font-medium leading-relaxed">
              {lang === 'mn' 
                ? 'Улсын физикийн олимпиадыг зохион байгуулах, олон улсын олимпиадад оролцох баг тамирчдыг сонгон шалгаруулж, бэлтгэл хангах үндсэн үүргийг гүйцэтгэдэг.'
                : 'Organizing the National Physics Olympiad, selecting and preparing the national team for international olympiads.'}
            </p>
          </div>
        </div>

        {/* Simple Footer Text */}
        <div className="mt-20 text-center border-t border-slate-100 pt-12">
          <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">
            © 2026 Улсын Физикийн Олимпиадын Хороо. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}