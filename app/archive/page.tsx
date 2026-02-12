"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase"; 
import { useLanguage } from "@/lib/LanguageContext"; 
import { 
  ArrowLeft, FileText, CheckCircle, Trophy, 
  ChevronRight, Search, Loader2, Globe, Filter
} from "lucide-react";

const YEARS = [
  "2025-2026", "2024-2025", "2023-2024", "2022-2023", 
  "2021-2022", "2020-2021", "2019-2020", "2018-2019",
  "2017-2018", "2016-2017", "2015-2016", "2014-2015"
];

export default function ArchivePage() {
  const { t, lang, setLang } = useLanguage(); 
  
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
  }, [selectedType, allCategories, types]);

  useEffect(() => {
    async function getArchive() {
      if (selectedYear && selectedType && selectedCategory) {
        setLoading(true);
        const yearQuery = selectedYear.replace(" он", "").replace(" year", ""); 

        const { data } = await supabase
          .from('archive')
          .select('*')
          .eq('year', yearQuery) 
          .eq('type_id', selectedType)
          .eq('category_id', selectedCategory);
        
        setResultData(data && data.length > 0 ? data[0] : null);
        setLoading(false);
      }
    }
    getArchive();
  }, [selectedYear, selectedType, selectedCategory]);

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans selection:bg-blue-100">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-950 italic">
              {t('nav.archive')}
            </h1>
          </div>

          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
          >
            <Globe size={14} />
            {lang === 'mn' ? 'EN' : 'MN'}
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-12">
        {/* Filter Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          
          {/* Year Filter */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-blue-400 transition-colors group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Filter size={14} />
              </div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-600 transition-colors">
                {t('filter.year')}
              </label>
            </div>
            <select 
              value={selectedYear} 
              onChange={(e) => setSelectedYear(e.target.value)} 
              className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-lg"
            >
              <option value="">{t('filter.select')}</option>
              {YEARS.map(y => <option key={y} value={y}>{y} {lang === 'mn' ? 'он' : ''}</option>)}
            </select>
          </div>

          {/* Type Filter */}
          <div className={`bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-purple-400 transition-colors group ${!selectedYear && 'opacity-50 pointer-events-none grayscale'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Filter size={14} />
              </div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-purple-600 transition-colors">
                {t('filter.type')}
              </label>
            </div>
            <select 
              value={selectedType} 
              onChange={(e) => { setSelectedType(e.target.value); setSelectedCategory(""); }} 
              className="w-full p-4 bg-slate-50 rounded-2xl border-none font-bold text-slate-900 outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer text-lg"
            >
              <option value="">{t('filter.select')}</option>
              {types.map(tData => <option key={tData.id} value={tData.id}>{tData.name}</option>)}
            </select>
          </div>

          {/* Category Filter */}
          <div className={`bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm hover:border-orange-400 transition-colors group ${!selectedType && 'opacity-50 pointer-events-none grayscale'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                <Filter size={14} />
              </div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-orange-600 transition-colors">
                {t('filter.category')}
              </label>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredCategories.map(c => (
                <button 
                  key={c.id} 
                  onClick={() => setSelectedCategory(c.id)} 
                  className={`py-2 px-4 rounded-xl text-[11px] font-[1000] uppercase transition-all transform active:scale-95 ${selectedCategory === c.id ? 'bg-slate-950 text-white shadow-lg' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Loading...</span>
            </div>
          ) : selectedCategory ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-6 mb-10">
                <h3 className="text-3xl font-[1000] text-slate-950 uppercase italic tracking-tighter">
                  {selectedYear} — {types.find(t => t.id === selectedType)?.name}
                </h3>
                <div className="h-[2px] flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
              </div>

              {resultData ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FileCard title={t('archive_page.problem')} icon={<FileText size={32} />} url={resultData.problem_url} color="blue" t={t} />
                  <FileCard title={t('archive_page.solution')} icon={<CheckCircle size={32} />} url={resultData.solution_url} color="green" t={t} />
                  <FileCard title={t('archive_page.result')} icon={<Trophy size={32} />} url={resultData.result_url} color="orange" t={t} />
                </div>
              ) : (
                <div className="py-24 text-center bg-white rounded-[48px] border border-slate-200 shadow-sm">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    <Search size={32} />
                  </div>
                  <p className="text-slate-400 font-[1000] uppercase tracking-widest text-sm italic">
                    {t('archive_page.no_data')}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="py-32 text-center bg-white rounded-[64px] border-2 border-dashed border-slate-200">
              <Search className="text-slate-200 mx-auto mb-6" size={48} />
              <p className="text-slate-400 font-[1000] uppercase tracking-widest text-xs">
                {t('archive_page.initial_state')}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

// Card Component
function FileCard({ title, icon, url, color, t }: any) {
  const styles: any = {
    blue: "bg-blue-50 text-blue-600 hover:bg-blue-600 hover:shadow-blue-200",
    green: "bg-green-50 text-green-600 hover:bg-green-600 hover:shadow-green-200",
    orange: "bg-orange-50 text-orange-600 hover:bg-orange-600 hover:shadow-orange-200"
  };

  return (
    <a 
      href={url || "#"} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`group bg-white p-10 rounded-[40px] border border-slate-200 hover:border-transparent transition-all duration-500 hover:shadow-2xl relative overflow-hidden ${!url && 'opacity-40 grayscale pointer-events-none'}`}
    >
      <div className={`w-20 h-20 rounded-[24px] flex items-center justify-center mb-8 transition-all duration-500 ${styles[color]} group-hover:text-white shadow-sm`}>
        {icon}
      </div>
      <h4 className="text-3xl font-[1000] italic uppercase text-slate-950 mb-3 tracking-tighter">{title}</h4>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 group-hover:text-blue-600 transition-colors">
        {t('archive_page.view_pdf')} <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </p>
    </a>
  );
}