"use client";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Trophy } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* 1. Навигаци */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-slate-900 tracking-tighter uppercase">MPHO</span>
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.3em] leading-none">Archive</span>
          </div>
          <Link 
            href="/archive" 
            className="group flex items-center gap-2 text-sm font-black text-slate-500 hover:text-blue-600 transition-all"
          >
            АРХИВ РУУ ОРОХ <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Trophy size={14} /> Монголын Физикийн Олимпиад
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.9] tracking-tighter">
              Мэдлэгийг <br /> 
              <span className="text-blue-600">Хязгааргүй</span> <br /> 
              Түгээе.
            </h1>
            <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
              Улсын хэмжээний физикийн олимпиадын бүх материалууд, бодолт болон заавруудыг нэг дороос.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/archive" 
                className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-blue-600 transition-all shadow-2xl shadow-slate-200 flex items-center gap-3"
              >
                АРХИВ ҮЗЭХ <BookOpen size={20} />
              </Link>
            </div>
          </div>

          {/* Баруун талын гоё үзүүлэн картууд */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-blue-600 h-64 rounded-[40px] p-8 text-white flex flex-col justify-end shadow-xl shadow-blue-100">
                <GraduationCap size={40} className="mb-4" />
                <h3 className="text-2xl font-black leading-tight italic">Улсын олимпиад</h3>
              </div>
              <div className="bg-white border border-slate-100 h-48 rounded-[40px] p-8 shadow-sm">
                <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2">Нийт материал</p>
                <p className="text-4xl font-black text-slate-900">500+</p>
              </div>
            </div>
            <div className="space-y-4 pt-12">
              <div className="bg-slate-900 h-48 rounded-[40px] p-8 text-white">
                <p className="text-slate-500 font-black text-xs uppercase tracking-widest mb-2">Идэвхтэй жил</p>
                <p className="text-4xl font-black text-white">25+</p>
              </div>
              <div className="bg-blue-50 h-64 rounded-[40px] p-8 border border-blue-100 flex flex-col justify-between">
                <p className="text-blue-600 font-black text-sm uppercase tracking-widest leading-tight">Бодолттой материалууд</p>
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                  <ArrowRight className="text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="max-w-7xl mx-auto px-8 py-12 border-t border-slate-100">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.4em]">© 2026 Mongolian Physics Olympiad Committee</span>
          <div className="flex gap-8">
             <a href="#" className="text-slate-400 hover:text-blue-600 font-black text-xs uppercase tracking-widest transition">Facebook</a>
             <a href="#" className="text-slate-400 hover:text-blue-600 font-black text-xs uppercase tracking-widest transition">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}