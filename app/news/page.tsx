"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { ArrowLeft, Globe, Calendar, ArrowRight, Zap } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsPage() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const { t, lang, setLang } = useLanguage();

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      if (data) setNewsList(data);
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <nav className="px-8 py-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-6">
          <Link href="/" className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white transition">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-2xl font-[1000] italic tracking-tighter uppercase">{t('news.title')}</h1>
        </div>
        <button 
          onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
          className="px-4 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black tracking-widest"
        >
          {lang === 'mn' ? 'ENGLISH' : 'МОНГОЛ'}
        </button>
      </nav>

      <div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pb-32">
        {newsList.map((news) => (
          <Link key={news.id} href={`/news/${news.id}`} className="group">
            <div className="bg-slate-50 rounded-[56px] p-4 h-full border border-transparent hover:border-slate-200 transition-all duration-500 hover:bg-white hover:shadow-2xl">
              <div className="aspect-[16/10] rounded-[42px] overflow-hidden bg-slate-200 mb-8">
                {news.image_url && (
                  <img src={news.image_url} alt="" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                )}
              </div>
              <div className="px-8 pb-8">
                <div className="flex items-center gap-3 text-slate-400 mb-6 font-black text-[10px] tracking-widest uppercase">
                  <Zap size={14} className="text-blue-600" />
                  {new Date(news.created_at).toLocaleDateString()}
                </div>
                <h2 className="text-4xl font-[900] italic tracking-tighter leading-[0.9] uppercase mb-8 group-hover:text-blue-600 transition">
                  {lang === 'mn' ? news.title : (news.title_en || news.title)}
                </h2>
                <div className="flex items-center gap-2 font-black text-[10px] tracking-widest uppercase text-slate-900 group-hover:gap-4 transition-all">
                  {t('news.read_more')} <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}