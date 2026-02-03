"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowLeft, Globe, Calendar, ArrowRight } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setNewsList(data);
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-900">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">{t('news.title')}</h1>
          </div>
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black"
          >
            <Globe size={14} />
            {lang === 'mn' ? 'ENGLISH' : 'МОНГОЛ'}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {newsList.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`} className="group">
              <div className="bg-white rounded-[40px] overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
                <div className="aspect-video relative overflow-hidden bg-slate-200">
                  {news.image_url && (
                    <img src={news.image_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  )}
                </div>
                <div className="p-10">
                  <div className="flex items-center gap-3 text-slate-400 mb-6 font-bold text-[10px] uppercase tracking-widest">
                    <Calendar size={14} />
                    {new Date(news.created_at).toLocaleDateString()}
                  </div>
                  <h2 className="text-3xl font-black mb-6 leading-tight group-hover:text-blue-600 transition">
                    {lang === 'mn' ? news.title : (news.title_en || news.title)}
                  </h2>
                  <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                    {t('news.read_more')} <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}