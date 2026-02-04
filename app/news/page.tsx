"use client";

import Link from "next/link";
import { ArrowLeft, Newspaper, Calendar } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function NewsPage() {
  const { t } = useLanguage();

  // Жишээ мэдээний дата
  const newsItems = [
    {
      id: 1,
      title: "Улсын физикийн 34-р олимпиад эхэллээ",
      date: "2024.03.15",
      excerpt: "Энэ жилийн олимпиад нь ерөнхий боловсролын сургуулийн сурагчдын дунд..."
    }
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900">
              <ArrowLeft size={24} />
            </Link>
            {/* Текстийг маш тод хар болгов */}
            <h1 className="text-3xl font-[1000] italic tracking-tighter uppercase text-slate-950">
              {t('news.title')}
            </h1>
          </div>
          <Newspaper className="text-blue-600" size={24} />
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid gap-8">
          {newsItems.map((item) => (
            <div key={item.id} className="group p-8 rounded-[40px] bg-slate-50 border border-slate-200 hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">{item.date}</span>
              </div>
              <h2 className="text-2xl font-[1000] italic text-slate-950 mb-4 group-hover:text-blue-700 transition-colors">
                {item.title}
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6 font-medium">
                {item.excerpt}
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] py-3 px-6 bg-slate-950 text-white rounded-full hover:bg-blue-600 transition-colors">
                {t('news.read_more')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}