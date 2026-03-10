"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function SelectionPage() {
  const { lang, setLang } = useLanguage();
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [olympiad, setOlympiad] = useState("APhO");

  useEffect(() => {
    async function fetchYears() {
      const { data } = await supabase
        .from("selection")
        .select("school_year, olympiad")
        .order("school_year", { ascending: false });
      if (data) {
        const unique = Array.from(new Set(data.map(d => d.school_year)));
        setYears(unique);
        if (unique.length > 0) setSelectedYear(unique[0]);
      }
    }
    fetchYears();
  }, []);

  useEffect(() => {
    if (!selectedYear) return;
    async function fetchData() {
      setLoading(true);
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
      setLoading(false);
    }
    fetchData();
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
                {lang === "mn" ? "Азийн олимпиадын шалгаруулалт" : "Asian Olympiad Selection"}
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

        {years.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-8">
            {years.map(y => (
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

        {loading ? (
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
                    {columns.map(col => (
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
                      {columns.map(col => (
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
      </div>
    </main>
  );
}