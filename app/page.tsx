"use client";
import Link from "next/link";
import { ChevronRight, Archive, Newspaper, Globe, Info } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* 1. Дээд цэс (Menu) */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-slate-900 tracking-tighter">
            MPHO
          </Link>
          
          <div className="flex items-center gap-8">
            <Link href="/archive" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">ОЛИМПИАДЫН АРХИВ</Link>
            <Link href="/news" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">МЭДЭЭ МЭДЭЭЛЭЛ</Link>
            <Link href="/international" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">ОЛОН УЛСЫН АМЖИЛТ</Link>
            <Link href="/about" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition">ТУХАЙ</Link>
          </div>
        </div>
      </nav>

      {/* 2. Үндсэн хэсэг (Quick Access) */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Олимпиадын архив карт */}
          <Link href="/archive" className="group p-10 bg-slate-50 rounded-[32px] hover:bg-blue-600 transition-all duration-300">
            <Archive className="text-blue-600 mb-6 group-hover:text-white transition" size={40} />
            <h2 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">Олимпиадын архив</h2>
            <p className="text-slate-500 group-hover:text-blue-100 text-sm font-medium">
              Бүх шатны олимпиадын бодлого, бодолтууд.
            </p>
          </Link>

          {/* Мэдээ мэдээлэл карт */}
          <Link href="/news" className="group p-10 bg-slate-50 rounded-[32px] hover:bg-slate-900 transition-all duration-300">
            <Newspaper className="text-slate-900 mb-6 group-hover:text-white transition" size={40} />
            <h2 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">Мэдээ мэдээлэл</h2>
            <p className="text-slate-500 group-hover:text-slate-400 text-sm font-medium">
              Олимпиадын тов, зарлал болон шинэ мэдээ.
            </p>
          </Link>

          {/* Олон улсын амжилт карт */}
          <Link href="/international" className="group p-10 bg-slate-50 rounded-[32px] hover:bg-orange-500 transition-all duration-300">
            <Globe className="text-orange-500 mb-6 group-hover:text-white transition" size={40} />
            <h2 className="text-2xl font-black text-slate-900 group-hover:text-white mb-2">Олон улсын амжилт</h2>
            <p className="text-slate-500 group-hover:text-orange-100 text-sm font-medium">
              IPhO, APhO болон бусад олон улсын тэмцээнүүд.
            </p>
          </Link>

        </div>

        {/* Сүүлд нэмэгдсэн материалууд (Жишээ жагсаалт) */}
        <div className="mt-20">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Сүүлд нэмэгдсэн</h3>
            <Link href="/archive" className="text-sm font-bold text-blue-600 flex items-center gap-1">БҮГДИЙГ ҮЗЭХ <ChevronRight size={16}/></Link>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl hover:border-slate-200 transition">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs">PDF</div>
                  <div>
                    <h4 className="font-bold text-slate-800">2024-2025 оны Улсын олимпиад - 9-р анги</h4>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-tighter">Нэмэгдсэн огноо: 2025.01.20</p>
                  </div>
                </div>
                <Link href="/archive" className="text-xs font-black text-slate-900 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition">ҮЗЭХ</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span>© 2026 Mongolian Physics Olympiad</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition">Facebook</a>
            <a href="#" className="hover:text-slate-900 transition">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}