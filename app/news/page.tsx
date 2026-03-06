"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Newspaper, Calendar, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { supabase } from "@/lib/supabase";

export default function NewsPage() {
  const { t, lang, setLang } = useLanguage();
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setNewsItems(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100">
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-3xl font-[1000] italic tracking-tighter uppercase text-slate-950">
              {t('news.title')}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
            >
              <Globe size={14} />
              {lang === 'mn' ? 'EN' : 'MN'}
            </button>
            <Newspaper className="text-blue-600" size={24} />
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {loading ? (
          <div className="py-24 flex items-center justify-center">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Loading...</span>
          </div>
        ) : newsItems.length === 0 ? (
          <div className="py-32 text-center bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-[1000] uppercase tracking-widest text-xs">
              {lang === 'mn' ? 'Мэдээ байхгүй байна' : 'No news available'}
            </p>
          </div>
        ) : (
          <div className="grid gap-8">
            {newsItems.map((item) => (
              <Link key={item.id} href={`/news/${item.id}`} className="group p-8 rounded-[40px] bg-slate-50 border border-slate-200 hover:border-blue-500 transition-all block">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={16} className="text-blue-600" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">
                    {new Date(item.created_at).toLocaleDateString('mn-MN')}
                  </span>
                </div>
                <h2 className="text-2xl font-[1000] italic text-slate-950 mb-4 group-hover:text-blue-700 transition-colors">
                  {lang === 'mn' ? item.title : (item.title_en || item.title)}
                </h2>
                <p className="text-slate-700 leading-relaxed mb-6 font-medium line-clamp-3">
                  {lang === 'mn' ? item.content : (item.content_en || item.content)}
                </p>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] py-3 px-6 bg-slate-950 text-white rounded-full hover:bg-blue-600 transition-colors inline-block">
                  {t('news.read_more')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}