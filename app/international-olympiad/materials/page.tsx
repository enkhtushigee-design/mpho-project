"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function MaterialsPage() {
  const { lang, setLang } = useLanguage();
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      const { data } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setMaterials(data);
      setLoading(false);
    }
    fetchMaterials();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
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
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all"
          >
            <Globe size={14} />
            {lang === "mn" ? "EN" : "MN"}
          </button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        <p className="text-slate-400 font-bold text-sm mb-10">
          {lang === "mn"
            ? "Олон улсын физикийн олимпиадуудын албан ёсны вэбсайтын холбоосууд"
            : "Official websites of international physics olympiads"}
        </p>

        {loading ? (
          <div className="py-24 text-center">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Ачааллаж байна...</p>
          </div>
        ) : materials.length === 0 ? (
          <div className="py-24 text-center bg-white rounded-3xl border border-slate-200">
            <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Мэдээлэл байхгүй байна</p>
          </div>
        ) : (
          <div className="space-y-4">
            {materials.map((m) => (
              <a
                key={m.id}
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between bg-white rounded-3xl border border-slate-200 shadow-sm px-8 py-6 hover:shadow-md hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center font-black text-xs text-white shrink-0">
                    {m.name}
                  </div>
                  <div>
                    <p className="font-black text-slate-950 text-base tracking-tight">
                      {lang === "mn" ? m.full_name : (m.full_name_en || m.full_name)}
                    </p>
                    {(m.description || m.description_en) && (
                      <p className="text-slate-500 font-medium text-sm mt-1 max-w-md">
                        {lang === "mn" ? m.description : (m.description_en || m.description)}
                      </p>
                    )}
                    <p className="text-slate-400 font-bold text-xs mt-1">{m.url}</p>
                  </div>
                </div>
                <div className="text-slate-300 group-hover:text-blue-600 transition-colors shrink-0 ml-4">
                  <ExternalLink size={20} />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
