"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe, ExternalLink, FileText } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const OLYMPIADS = ["Бүгд", "IPhO", "APhO", "EuPhO", "IZhO"];
const TYPES: Record<string, string> = {
  problem: "Бодлого",
  solution: "Бодолт",
  result: "Дүн",
};
const TYPE_COLORS: Record<string, string> = {
  problem: "bg-blue-50 text-blue-600",
  solution: "bg-purple-50 text-purple-600",
  result: "bg-green-50 text-green-600",
};

export default function MaterialsPage() {
  const { lang, setLang } = useLanguage();
  const [materials, setMaterials] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [olympiadFilter, setOlympiadFilter] = useState("Бүгд");

  useEffect(() => {
    async function fetchMaterials() {
      const { data } = await supabase
        .from("materials")
        .select("*")
        .order("year", { ascending: false });
      if (data) {
        setMaterials(data);
        setFiltered(data);
      }
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  useEffect(() => {
    if (olympiadFilter === "Бүгд") {
      setFiltered(materials);
    } else {
      setFiltered(materials.filter(m => m.olympiad === olympiadFilter));
    }
  }, [olympiadFilter, materials]);

  const grouped = filtered.reduce((acc: any, m: any) => {
    const key = `${m.olympiad}-${m.year}`;
    if (!acc[key]) acc[key] = { olympiad: m.olympiad, year: m.year, items: [] };
    acc[key].items.push(m);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7">
                <Image src="/logo.png" alt="MPHO" fill className="object-contain" />
              </div>
              <h1 className="text-xl font-black tracking-tighter uppercase text-slate-950 italic">
                {lang === "mn" ? "Олон улсын материал" : "International Materials"}
              </h1>
            </div>
          </div>
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
          >
            <Globe size={14} />
            {lang === "mn" ? "EN" : "MN"}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-10">

        <div className="flex gap-2 flex-wrap mb-8">
          {OLYMPIADS.map(o => (
            <button
              key={o}
              onClick={() => setOlympiadFilter(o)}
              className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${olympiadFilter === o ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"}`}
            >
              {o}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-24 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Ачааллаж байна...</p>
          </div>
        ) : Object.keys(grouped).length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Материал олдсонгүй</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.values(grouped).map((group: any) => (
              <div key={`${group.olympiad}-${group.year}`} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest">
                    {group.olympiad}
                  </span>
                  <span className="text-slate-400 font-black text-sm">{group.year} он</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {group.items.map((item: any) => (
                    <div key={item.id} className="px-8 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-9 h-9 bg-slate-100 rounded-xl flex items-center justify-center">
                          <FileText size={16} className="text-slate-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">
                            {lang === "mn" ? item.title : (item.title_en || item.title)}
                          </p>
                          <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-black uppercase ${TYPE_COLORS[item.type] || "bg-slate-50 text-slate-500"}`}>
                            {TYPES[item.type] || item.type}
                          </span>
                        </div>
                      </div>
                      
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black transition-all"
                      >
                        <ExternalLink size={13} />
                        {lang === "mn" ? "Үзэх" : "View"}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}