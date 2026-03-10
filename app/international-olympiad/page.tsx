"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe, ExternalLink } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function InternationalOlympiadPage() {
  const { lang, setLang } = useLanguage();
  const [tab, setTab] = useState<"selection" | "materials">("selection");

  const [materials, setMaterials] = useState<any[]>([]);
  const [matLoading, setMatLoading] = useState(true);

  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [selLoading, setSelLoading] = useState(false);
  const [olympiad, setOlympiad] = useState("APhO");

  useEffect(() => {
    async function fetchMaterials() {
      const { data } = await supabase
        .from("materials")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setMaterials(data);
      setMatLoading(false);
    }
    fetchMaterials();
  }, []);

  useEffect(() => {
    async function fetchYears() {
      const { data } = await supabase
        .from("selection")
        .select("school_year, olympiad")
        .order("school_year", { ascending: false });
      if (data) {
        const unique = Array.from(new Set(data.map((d) => d.school_year)));
        setYears(unique);
        if (unique.length > 0) setSelectedYear(unique[0]);
      }
    }
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    async function fetchSelectionData() {
      setSelLoading(true);
      const { data } = await supabase
        .from("selection")
        .select("*")
        .eq("school_year", selectedYear)
        .single();
      if (data) {
        const tableData = data.data as any[];
        setOlympiad(data.olympiad || "APhO");
        setRows(tableData);
        if (tableData.length > 0) setColumns(Object.keys(tableData[0]));
      } else {
        setRows([]);
        setColumns([]);
      }
      setSelLoading(false);
    }
    fetchSelectionData();
  }, [selectedYear]);

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative w-7 h-7">
                <Image src="/logo.png" alt="MPHO" fill className="object-contain" />
              </div>
              <h1 className="text-xl font-black tracking-tighter uppercase text-slate-950 italic">
                {lang === "mn" ? "Олон улсын олимпиад" : "International Olympiad"}
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

      <div className="max-w-6xl mx-auto px-6 pt-10">

        <div className="flex gap-2 mb-10 bg-white p-2 rounded-[24px] border border-slate-200 shadow-sm w-fit">
          <button
            onClick={() => setTab("selection")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "selection" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            {lang === "mn" ? "Шалгаруулалт" : "Selection"}
          </button>
          <button
            onClick={() => setTab("materials")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "materials" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            {lang === "mn" ? "Холбоосууд" : "Links"}
          </button>
        </div>

        {tab === "selection" && (
          <>
            {years.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-8">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => setSelectedYear(y)}
                    className={`px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${selectedYear === y ? "bg-slate-950 text-white shadow-lg" : "bg-white text-slate-500 border border-slate-200 hover:border-slate-400"}`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}

            {selLoading ? (
              <div className="py-24 text-center">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs animate-pulse">Ачааллаж байна...</p>
              </div>
            ) : rows.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-[32px] border border-slate-200">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Мэдээлэл байхгүй байна</p>
              </div>
            ) : (
              <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 flex items-center gap-4">
                  <span className="px-4 py-1.5 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest">
                    {olympiad}
                  </span>
                  <span className="text-slate-400 font-black text-sm">{selectedYear} оны шалгаруулалт</span>
                  <span className="text-slate-400 font-bold text-xs">{rows.length} оролцогч</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">#</th>
                        {columns.map((col) => (
                          <th key={col} className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                          <td className="px-6 py-4">
                            <span className="font-black text-slate-300 text-sm">{i + 1}</span>
                          </td>
                          {columns.map((col) => (
                            <td key={col} className="px-6 py-4">
                              <span className="font-medium text-slate-700 text-sm">{row[col] ?? "—"}</span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {tab === "materials" && (
          <div className="max-w-3xl">
            <p className="text-slate-400 font-bold text-sm mb-8">
              {lang === "mn"
                ? "Олон улсын физикийн олимпиадуудын албан ёсны вэбсайтын холбоосууд"
                : "Official websites of international physics olympiads"}
            </p>

            {matLoading ? (
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
        )}
      </div>
    </main>
  );
}
