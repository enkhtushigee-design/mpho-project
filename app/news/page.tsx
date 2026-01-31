"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Calendar, ChevronRight, Loader2, Newspaper } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { data } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 py-16 mb-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter italic uppercase mb-4">Мэдээ мэдээлэл</h1>
          <p className="text-slate-500 font-medium text-lg">Физикийн олимпиадын эргэн тойрон дахь цаг үеийн мэдээллүүд.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.length > 0 ? news.map((item) => (
            <Link href={`/news/${item.id}`} key={item.id} className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:border-blue-500 transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="aspect-video relative overflow-hidden bg-slate-100">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300"><Newspaper size={40} /></div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600 shadow-sm">
                    {item.category}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                  <Calendar size={14} />
                  {new Date(item.created_at).toLocaleDateString('mn-MN')}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-slate-500 text-sm line-clamp-2 font-medium mb-6">
                  {item.summary}
                </p>
                <div className="flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest">
                  Дэлгэрэнгүй <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          )) : (
            <div className="col-span-full py-20 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100">
              <p className="text-slate-400 font-bold uppercase tracking-widest">Одоогоор мэдээ оруулаагүй байна.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}