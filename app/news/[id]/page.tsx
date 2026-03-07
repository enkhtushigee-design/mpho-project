"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowLeft, Calendar, Globe } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState<any>(null);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    async function fetchDetail() {
      const { data } = await supabase.from('news').select('*').eq('id', id).single();
      if (data) setNews(data);
    }
    fetchDetail();
  }, [id]);

  if (!news) return (
    <div className="min-h-screen flex items-center justify-center text-slate-400 font-black italic text-2xl uppercase">Loading...</div>
  );

  return (
    <main className="min-h-screen bg-white pb-20 font-sans">
      <nav className="border-b border-slate-100 sticky top-0 bg-white z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/news" className="flex items-center gap-2 text-slate-500 font-bold text-xs hover:text-slate-900 transition">
            <ArrowLeft size={16} /> {t('news.back')}
          </Link>
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-700 transition-all"
          >
            <Globe size={14} />
            {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      <article className="max-w-4xl mx-auto px-6 pt-16 animate-in fade-in duration-700">
        <div className="flex items-center gap-3 text-slate-400 mb-8 font-bold text-[10px] uppercase tracking-widest">
          <Calendar size={14} />
          {new Date(news.created_at).toLocaleDateString()}
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black mb-12 tracking-tighter italic uppercase leading-tight text-slate-900">
          {lang === 'mn' ? news.title : (news.title_en || news.title)}
        </h1>

        {news.image_url && (
          <div className="rounded-[48px] overflow-hidden mb-16 shadow-2xl">
            <img src={news.image_url} alt="" className="w-full h-auto object-cover" />
          </div>
        )}

        <div className="prose prose-slate max-w-none">
          <p className="text-xl text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
            {lang === 'mn' ? news.content : (news.content_en || news.content)}
          </p>
        </div>
      </article>
    </main>
  );
}