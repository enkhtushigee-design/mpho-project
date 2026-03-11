"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe, ExternalLink, Trophy } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const IPHO_ACHIEVEMENTS = [
  { year: 2025, name: "Batbayar Gurbazar", rank: "80", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2025, name: "Ichinbat Erkhembayar", rank: "93", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2025, name: "Munkh-Orgil Munkhtulga", rank: "157", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2025, name: "Azjargal Ganbold", rank: "162", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2025, name: "Enkhtugs Delgersaikhan", rank: "169", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2024, name: "Azjargal Ganbold", rank: "37", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2024, name: "Atarkhuu Soyolkhuu", rank: "70", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2024, name: "Batbayar Gurbazar", rank: "73", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2024, name: "Munkh-Orgil Munkhtulga", rank: "75", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2024, name: "Ichinbat Erkhembayar", rank: "99", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2023, name: "Anirchuluu Otgochuluu", rank: "96", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2023, name: "Azjargal Ganbold", rank: "140", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2023, name: "Batbayar Gurbazar", rank: "161", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2023, name: "Dulguun Luvsan", rank: "232", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2022, name: "Anirchuluu Otgochuluu", rank: "98", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2022, name: "Uguumur Tsagaanbayar", rank: "126", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2022, name: "Bilguun Batbayar", rank: "130", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2022, name: "Barsbold Enkhbold", rank: "191", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2022, name: "Unurtuvshin Erdenebileg", rank: "258", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2021, name: "Bilguun Batbayar", rank: "138", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2021, name: "Anirchuluu Otgochuluu", rank: "186", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2021, name: "Barsbold Enkhbold", rank: "221", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2021, name: "Temuulen Baasannorov", rank: "232", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2019, name: "Itgel Delgerdalai", rank: "177", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2019, name: "Khongor Damdinbayar", rank: "184", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2019, name: "Tsolmon Bazarragchaa", rank: "214", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2018, name: "Sumiyajav Sarangerel", rank: "109", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2018, name: "Amarbold Byambajargal", rank: "176", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2018, name: "Nyamtsogt Munkhbilguun", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2018, name: "Ganbaatar Sumiyabazar", rank: "244", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2018, name: "Khongor Damdinbayar", rank: "271", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2017, name: "Dulguun Lkhagvadorj", rank: "≥65", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2017, name: "Oyuntugs Luubaatar", rank: "≥65", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2017, name: "Amarbold Byambajargal", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2017, name: "Garid Erdenechuluun", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2017, name: "Sumiyajav Sarangerel", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2016, name: "Tserenchimeg Khasgerel", rank: "116", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2016, name: "Dulguun Lkhagvadorj", rank: "162", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2016, name: "Oyuntugs Luubaatar", rank: "168", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2016, name: "Garid Erdenechuluun", rank: "188", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2015, name: "Tserenchimeg Khasgerel", rank: "198", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2015, name: "Tugsbayasgalan Manlaibaatar", rank: "212", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2015, name: "Bayar Bat-Orgil", rank: "260", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2014, name: "Bat-Erdene Bat-Amgalan", rank: "87", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2014, name: "Duinkharjav Budmonde", rank: "123", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2014, name: "Tugsbayasgalan Manlaibaatar", rank: "156", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2014, name: "Javkhlantugs Unurtuvshin", rank: "192", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2014, name: "Bayar Bat-Orgil", rank: "214", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2013, name: "Duinkharjav Budmonde", rank: "170", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2013, name: "Zorigoo Garid", rank: "229", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2013, name: "Bat-Erdene Bat-Amgalan", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2012, name: "Battsooj Bayarsaikhan", rank: "199", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2012, name: "Bilguun Batjargal", rank: "224", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2012, name: "Tsogt Baigalmaa", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2012, name: "Battushig Myanganbayar", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2012, name: "Munkhtsetseg Battulga", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2011, name: "Dashdorj Orgilbold", rank: "106", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2011, name: "Bold Dorjpurev", rank: "168", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2011, name: "Ulam-Orgikh Tserendulam", rank: "227", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2010, name: "Bold Dorjpurev", rank: "143", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2010, name: "Batkhuyag Batsaikhan", rank: "196", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2010, name: "Khuslent Boldbaatar", rank: "224", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2010, name: "Undralbat Enkhbayar", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2008, name: "Battumur Batkhishig", rank: "146", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2008, name: "Byambadorj Tsenguun", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2008, name: "Bold Dorjpurev", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2008, name: "Naranbat Battuvshin", rank: "242", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2008, name: "Bold Bilegsaikhan", rank: "250", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2007, name: "Otgonbaatar Uuganbayar", rank: "151", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2007, name: "Enkhee Temuulen", rank: "213", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2006, name: "Otgonbaatar Myagmar", rank: "75", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
  { year: 2006, name: "Otgonbaatar Uuganbayar", rank: "136", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2006, name: "Dashdavaa Khureltulga", rank: "158", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2005, name: "Otgonbaatar Myagmar", rank: "119", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
  { year: 2005, name: "Otgonbaatar Uuganbayar", rank: "178", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2005, name: "Dashdavaa Khureltulga", rank: "195", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2004, name: "Otgonbaatar Myagmar", rank: "149", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2004, name: "Oidovdorj Gankhuyag", rank: "191", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2004, name: "Buyandalai Altansargai", rank: "203", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 2002, name: "Norovjav Tegshbayar", rank: "184", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 1999, name: "Altankhuyag Bilguun", rank: "200", award: "Тусгай байр", awardEn: "Honourable Mention" },
  { year: 1999, name: "Adiyasuren Altanbileg", rank: "205", award: "Тусгай байр", awardEn: "Honourable Mention" },
];

const getAwardStyle = (award: string) => {
  if (award.includes("Алтан") || award.includes("Gold")) return { badge: "bg-yellow-50 text-yellow-700 border border-yellow-200", icon: "🥇" };
  if (award.includes("Мөнгөн") || award.includes("Silver")) return { badge: "bg-slate-100 text-slate-700 border border-slate-200", icon: "🥈" };
  if (award.includes("Хүрэл") || award.includes("Bronze")) return { badge: "bg-orange-50 text-orange-700 border border-orange-200", icon: "🥉" };
  return { badge: "bg-blue-50 text-blue-700 border border-blue-200", icon: "⭐" };
};

export default function InternationalOlympiadPage() {
  const { lang, setLang } = useLanguage();
  const [tab, setTab] = useState<"results" | "selection" | "links">("results");
  const [resultsTab, setResultsTab] = useState<"ipho" | "apho">("ipho");

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

  const iphoGrouped = IPHO_ACHIEVEMENTS.reduce((acc: Record<number, typeof IPHO_ACHIEVEMENTS>, curr) => {
    if (!acc[curr.year]) acc[curr.year] = [];
    acc[curr.year].push(curr);
    return acc;
  }, {});
  const iphoYears = Object.keys(iphoGrouped).sort((a, b) => Number(b) - Number(a));

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
            onClick={() => setTab("results")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "results" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            {lang === "mn" ? "Амжилтууд" : "Results"}
          </button>
          <button
            onClick={() => setTab("selection")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "selection" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            {lang === "mn" ? "Шалгаруулалт" : "Selection"}
          </button>
          <button
            onClick={() => setTab("links")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "links" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            {lang === "mn" ? "Холбоосууд" : "Links"}
          </button>
        </div>

        {tab === "results" && (
          <>
            <div className="flex gap-2 mb-8 bg-white p-2 rounded-[20px] border border-slate-200 shadow-sm w-fit">
              <button
                onClick={() => setResultsTab("ipho")}
                className={`px-5 py-2 rounded-[14px] font-black text-xs uppercase tracking-widest transition-all ${resultsTab === "ipho" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
              >
                IPhO
              </button>
              <button
                onClick={() => setResultsTab("apho")}
                className={`px-5 py-2 rounded-[14px] font-black text-xs uppercase tracking-widest transition-all ${resultsTab === "apho" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
              >
                APhO
              </button>
            </div>

            {resultsTab === "ipho" && (
              <div className="space-y-10">
                {iphoYears.map((yearStr) => {
                  const year = Number(yearStr);
                  const entries = iphoGrouped[year];
                  return (
                    <div key={year}>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-2xl font-black italic text-slate-950">{year}</span>
                        <div className="h-px flex-1 bg-slate-200" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{entries.length} оролцогч</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        {entries.map((res, idx) => {
                          const style = getAwardStyle(res.award);
                          return (
                            <div key={idx} className="bg-white rounded-[24px] border border-slate-200 px-6 py-4 flex items-center justify-between hover:shadow-md hover:border-slate-300 transition-all group">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 text-base">
                                  {style.icon}
                                </div>
                                <span className="font-black text-slate-900 text-base tracking-tight italic uppercase">
                                  {res.name}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                                  RANK {res.rank}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide ${style.badge}`}>
                                  {lang === "mn" ? res.award : res.awardEn}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {resultsTab === "apho" && (
              <div className="py-24 text-center bg-white rounded-[32px] border border-slate-200">
                <Trophy className="mx-auto text-slate-300 mb-4" size={48} />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">
                  {lang === "mn" ? "Мэдээлэл удахгүй нэмэгдэнэ" : "Data coming soon"}
                </p>
              </div>
            )}
          </>
        )}

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
                  <span className="px-4 py-1.5 bg-slate-950 text-white rounded-full text-xs font-black uppercase tracking-widest">{olympiad}</span>
                  <span className="text-slate-400 font-black text-sm">{selectedYear} оны шалгаруулалт</span>
                  <span className="text-slate-400 font-bold text-xs">{rows.length} оролцогч</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        <th className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">#</th>
                        {columns.map((col) => (
                          <th key={col} className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={i} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                          <td className="px-6 py-4"><span className="font-black text-slate-300 text-sm">{i + 1}</span></td>
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

        {tab === "links" && (
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