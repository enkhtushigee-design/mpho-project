"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, FileText, CheckCircle, Trophy, 
  ChevronRight, Calendar, Layers, Users, Search 
} from "lucide-react";

const YEARS = [
  "2025-2026 он", "2024-2025 он", "2023-2024 он", "2022-2023 он", 
  "2021-2022 он", "2020-2021 он", "2019-2020 он", "2018-2019 он",
  "2017-2018 он", "2016-2017 он", "2015-2016 он", "2014-2015 он"
];

const TYPES = [
  "Улс", "Нийслэл", "Аймаг, дүүрэг", "Баруун бүс", "Зүүн бүс", 
  "Хойд бүс", "Төвийн бүс", "Их сорил", "Шигшээ сорилго", "МУГБ Ц.Хандын нэрэмжит"
];

const CATEGORIES = ["7-р анги", "8-р анги", "9-р анги", "10-р анги", "11-р анги", "12-р анги", "Багш"];

export default function ArchivePage() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const mockData = {
    problem_url: "#",
    solution_url: "#",
    result_url: "#",
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-black tracking-tighter uppercase text-slate-900">Архив</h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Шүүлтүүрүүд - Гарчиггүй шууд эхэлнэ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-4 text-blue-600">
              <Calendar size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Хичээлийн жил</span>
            </div>
            <select 
              value={selectedYear}
              onChange={(e) => { setSelectedYear(e.target.value); setSelectedType(""); setSelectedCategory(""); }}
              className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Сонгох...</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>

          <div className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-opacity ${!selectedYear && 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center gap-3 mb-4 text-purple-600">
              <Layers size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Олимпиадын төрөл</span>
            </div>
            <select 
              value={selectedType}
              onChange={(e) => { setSelectedType(e.target.value); setSelectedCategory(""); }}
              className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-none font-bold text-slate-700 appearance-none cursor-pointer"
            >
              <option value="">Сонгох...</option>
              {TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className={`bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-opacity ${!selectedType && 'opacity-40 pointer-events-none'}`}>
            <div className="flex items-center gap-3 mb-4 text-orange-600">
              <Users size={18} />
              <span className="text-[10px] font-black uppercase tracking-widest">Ангилал</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`py-2 px-3 rounded-xl text-[11px] font-black transition-all ${
                    selectedCategory === c 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {selectedCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-2xl font-black text-slate-900 uppercase italic tracking-tighter">
                  {selectedYear} — {selectedType} — {selectedCategory}
                </h3>
                <div className="h-[2px] flex-1 bg-slate-100"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FileCard title="Бодлого" icon={<FileText size={24} />} url={mockData.problem_url} color="blue" />
                <FileCard title="Бодолт" icon={<CheckCircle size={24} />} url={mockData.solution_url} color="green" />
                <FileCard title="Нэгдсэн дүн" icon={<Trophy size={24} />} url={mockData.result_url} color="orange" />
              </div>
            </div>
          ) : (
            <div className="py-24 text-center bg-white rounded-[48px] border-2 border-dashed border-slate-100">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-200" size={32} />
              </div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Сонголт хийнэ үү</p>
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

  return (
    <a 
      href={url} 
      target="_blank" 
      className="group bg-white p-10 rounded-[40px] border border-slate-100 hover:border-slate-900 hover:shadow-2xl transition-all relative overflow-hidden"
    >
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 ${colors[color]} group-hover:text-white`}>
        {icon}
      </div>
      <h4 className="text-2xl font-black text-slate-900 mb-2">{title}</h4>
      <p className="text-slate-400 font-medium text-sm flex items-center gap-2">
        PDF үзэх <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </p>
      <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
        {icon}
      </div>
    </a>
  );
}