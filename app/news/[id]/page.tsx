"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Share2, Loader2 } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function NewsDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        router.push('/news');
      } else {
        setItem(data);
      }
      setLoading(false);
    }
    fetchDetail();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (!item) return null;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Дээд хэсэг: Буцах товч болон Зураг */}
      <div className="max-w-4xl mx-auto px-6 pt-10">
        <Link href="/news" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-sm mb-10 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          МЭДЭЭНИЙ ЖАГСААЛТ РУУ БУЦАХ
        </Link>

        <div className="mb-10">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
            {item.category}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8 italic uppercase">
            {item.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-slate-400 font-bold text-sm border-y border-slate-100 py-6">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(item.created_at).toLocaleDateString('mn-MN')}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              5 мин унших
            </div>
            <button className="ml-auto flex items-center gap-2 hover:text-blue-600 transition-colors">
              <Share2 size={16} />
              ХУВААЛЦАХ
            </button>
          </div>
        </div>
      </div>

      {/* Гол зураг */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="aspect-[21/9] rounded-[48px] overflow-hidden bg-slate-100 shadow-2xl shadow-slate-200">
          {item.image_url ? (
            <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-200 bg-slate-50 font-black text-4xl italic">ЗУРАГГҮЙ</div>
          )}
        </div>
      </div>

      {/* Текст агуулга */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="prose prose-slate prose-lg max-w-none">
          <p className="text-2xl font-bold text-slate-900 leading-relaxed mb-10 border-l-4 border-blue-600 pl-8 italic">
            {item.summary}
          </p>
          <div className="text-slate-600 leading-loose whitespace-pre-wrap font-medium text-lg">
            {item.content}
          </div>
        </div>
      </div>
    </main>
  );
}