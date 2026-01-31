"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { 
  ArrowLeft, FileText, CheckCircle, Trophy, 
  ChevronRight, Calendar, Layers, Users, Search, Loader2 
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const YEARS = [
  "2025-2026 он", "2024-2025 он", "2023-2024 он", "2022-2023 он", 
  "2021-2022 он", "2020-2021 он", "2019-2020 он", "2018-2019 он",
  "2017-2018 он", "2016-2017 он", "2015-2016 он", "2014-2015 он"
];

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const [types, setTypes] = useState<any[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: tData } = await supabase.from('olympic_types').select('*').order('name');
      const { data: cData } = await supabase.from('participant_categories').select('*');
      if (tData) setTypes(tData);
      if (cData) setAllCategories(cData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const selectedTypeName = types.find(t => t.id === selectedType)?.name;
    if (selectedTypeName === "Улс") {
      const filtered = allCategories.filter(c => 
        c.name === "9-р анги" || c.name === "12-р анги" || c.name === "Багш"
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(allCategories);
    }
    // Төрөл солигдоход ангиллыг автоматаар цэвэрлэхгүй, харин баазаас хайлт хийх боломжийг хадгална
  }, [selectedType, allCategories, types]);

  useEffect(() => {
    async function getArchive() {
      if (selectedYear && selectedType && selectedCategory) {
        setLoading(true);
        
        // Маш чухал: Шүүлтүүрийг EQ (Equal) ашиглан шалгах
        const { data, error } = await supabase
          .from('archive')
          .select('*')
          .eq('year', selectedYear)
          .eq('type_id', selectedType)
          .eq('category_id', selectedCategory);
        
        if (error) {
          console.error("QUERY ERROR:", error.message);
        }

        if (data && data.length > 0) {
          setResultData(data[0]);
        } else {
          setResultData(null);
          console.log("No data found for these IDs in Supabase");
        }
        setLoading(false);
      }
    }
    getArchive();
  }, [selectedYear, selectedType, selectedCategory]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-black tracking-tighter uppercase text-slate-900 italic">Архив</h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <label className="text-[10px] font-black uppercase tracking-widest text-blue-600 block mb-4">Хичээлийн жил</label>
            <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none">
              <option value="">Сонгох...</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm ${!selectedYear && 'opacity-40 pointer-events-none'}`}>
            <label className="text-[10px] font-black uppercase tracking-widest text-purple-600 block mb-4">Олимпиадын төрөл</label>
            <select value={selectedType} onChange={(e) => { setSelectedType(e.target.value); setSelectedCategory(""); }} className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-700 outline-none">
              <option value="">Сонгох...</option>
              {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm ${!selectedType && 'opacity-40 pointer-events-none'}`}>
            <label className="text-[10px] font-black uppercase tracking-widest text-orange-600 block mb-4">Ангилал</label>
            <div className="grid grid-cols-2 gap-2">
              {filteredCategories.map(c => (
                <button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`py-2 px-3 rounded-xl text-[11px] font-black transition-all ${selectedCategory === c.id ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {loading ? (
            <div className="py-24 flex justify-center"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
          ) : selectedCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                  {selectedYear} — {types.find(t => t.id === selectedType)?.name}
                </h3>
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </div>

              {resultData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileCard title="Бодлого" icon={<FileText size={24} />} url={resultData.problem_url} color="blue" />
                  <FileCard title="Бодолт" icon={<CheckCircle size={24} />} url={resultData.solution_url} color="green" />
                  <FileCard title="Нэгдсэн дүн" icon={<Trophy size={24} />} url={resultData.result_url} color="orange" />
                </div>
              ) : (
                <div className="py-20 text-center bg-white rounded-[40px] border border-slate-100">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-sm italic">Уучлаарай, энэ ангилалд мэдээлэл байхгүй байна.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100">
              <Search className="text-slate-200 mx-auto mb-6" size={32} />
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Дээрх шүүлтүүрийг ашиглан материалаа сонгоно уу</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function FileCard({ title, icon, url, color }: any) {
  const colors: any = {
    blue: "bg-blue-50 text-blue-500 hover:bg-blue-500",
    green: "bg-green-50 text-green-500 hover:bg-green-500",
    orange: "bg-orange-50 text-orange-500 hover:bg-orange-500"
  };

  if (!url) return (
    <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 opacity-40 grayscale flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-slate-200 text-slate-400">{icon}</div>
      <h4 className="text-2xl font-black text-slate-300 mb-2">{title}</h4>
      <p className="text-slate-300 font-medium text-xs">Мэдээлэл байхгүй</p>
    </div>
  );

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="group bg-white p-10 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:shadow-2xl transition-all relative overflow-hidden">
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${colors[color]} group-hover:text-white`}>{icon}</div>
      <h4 className="text-2xl font-black text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-400 font-medium text-sm flex items-center gap-2">PDF ҮЗЭХ <ChevronRight size={14} /></p>
    </a>
  );
}