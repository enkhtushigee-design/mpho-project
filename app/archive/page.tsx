'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileDown, Loader2, Search } from 'lucide-react';

export default function ArchivePage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Анхны утгыг хичээлийн жилээр тохирууллаа
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedType, setSelectedType] = useState('Улс');

  const olympicTypes = [
    'Улс', 'Нийслэл', 'Аймаг, дүүрэг', 'Баруун бүс', 
    'Зүүн бүс', 'Хойд бүс', 'Төвийн бүс', 
    'Их сорил', 'Шигшээ сорилго', 'МУГБ Ц.Хандын нэрэмжит'
  ];

  useEffect(() => {
    async function fetchArchive() {
      setLoading(true);
      const { data: results, error } = await supabase
        .from('archive')
        .select(`
          grade, problem_url, solution_url,
          olympiads!inner(year, olympic_types!inner(name))
        `)
        .eq('olympiads.year', selectedYear)
        .eq('olympiads.olympiad_types.name', selectedType);

      if (!error) setData(results || []);
      setLoading(false);
    }
    fetchArchive();
  }, [selectedYear, selectedType]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 mb-2 tracking-tight uppercase">Олимпиадын архив</h1>
          <p className="text-slate-500 font-medium text-lg italic tracking-wide">MPHO - Mongolian Physics Olympiad</p>
        </div>

        {/* Шүүлтүүр хэсэг */}
        <div className="flex flex-col gap-8 mb-10">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Хичээлийн жил:</span>
              <select 
                className="p-4 bg-white rounded-2xl border-2 border-slate-100 shadow-sm font-bold text-slate-800 outline-none focus:border-blue-500 transition-all min-w-[200px] text-lg"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {[...Array(26)].map((_, i) => {
                  const startYear = 2025 - i;
                  const endYear = startYear + 1;
                  const academicYear = `${startYear}-${endYear}`;
                  return <option key={academicYear} value={academicYear}>{academicYear} он</option>;
                })}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-bold text-slate-400 uppercase text-xs tracking-[0.2em]">Олимпиадын төрөл:</span>
            <div className="flex flex-wrap gap-3 bg-slate-200/40 p-3 rounded-[28px] border border-slate-200/50">
              {olympicTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                    selectedType === t 
                    ? 'bg-white text-blue-600 shadow-xl scale-105 ring-1 ring-slate-100' 
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Дата харуулах хэсэг */}
        <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          {loading ? (
            <div className="p-32 flex flex-col items-center gap-6 text-blue-600">
              <Loader2 className="animate-spin" size={56} />
              <p className="font-black text-slate-400 tracking-widest">ӨГӨГДӨЛТЭЙ ХОЛБОГДОЖ БАЙНА...</p>
            </div>
          ) : data.length > 0 ? (
            <div className="divide-y divide-slate-50">
              {data.map((item, idx) => (
                <div key={idx} className="p-10 hover:bg-blue-50/20 transition-all flex items-center justify-between group">
                  <div>
                    <span className="text-xs font-black text-blue-500 uppercase tracking-[0.3em] mb-2 block">{selectedType}</span>
                    <h3 className="text-3xl font-black text-slate-800 italic">{item.grade} анги</h3>
                  </div>
                  <div className="flex gap-4">
                    <a 
                      href={item.problem_url} 
                      target="_blank"
                      className="flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-[22px] font-bold hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 hover:-translate-y-1"
                    >
                      <FileDown size={22} /> БОДЛОГО ҮЗЭХ
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-32 text-center">
              <div className="bg-slate-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search size={44} className="text-slate-200" />
              </div>
              <p className="text-2xl font-bold text-slate-300 italic mb-2">{selectedYear} он</p>
              <p className="text-xl font-bold text-slate-400 italic">"{selectedType}" ангилалд одоогоор материал ороогүй байна.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}