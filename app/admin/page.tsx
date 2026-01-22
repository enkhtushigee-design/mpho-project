'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { PlusCircle, Upload, Database, CheckCircle, LogOut, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState<any[]>([]);
  
  const [year, setYear] = useState('2024-2025');
  const [typeId, setTypeId] = useState('');
  const [grade, setGrade] = useState('6-р анги');
  const [file, setFile] = useState<File | null>(null);

  // 1. Эрх шалгах
  useEffect(() => {
    async function checkUser() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setIsAuth(true);
        // Төрлүүдийг татах
        const { data } = await supabase.from('olympic_types').select('*');
        if (data) {
          setTypes(data);
          setTypeId(data[0].id);
        }
      }
    }
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !typeId) return alert('Мэдээллээ бүрэн бөглөнө үү!');
    setLoading(true);
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { error: fileError } = await supabase.storage.from('olympiad-files').upload(fileName, file);
      if (fileError) throw fileError;

      const { data: { publicUrl } } = supabase.storage.from('olympiad-files').getPublicUrl(fileName);

      const { data: olyData, error: olyError } = await supabase
        .from('olympiads').insert([{ year, type_id: typeId }]).select().single();
      if (olyError) throw olyError;

      const { error: arcError } = await supabase
        .from('archive').insert([{ olympiad_id: olyData.id, grade, problem_url: publicUrl }]);
      if (arcError) throw arcError;

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      alert('Алдаа: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-slate-900 p-3 rounded-2xl text-white"><Database size={24} /></div>
            <h1 className="text-3xl font-black text-slate-900">Админ хэсэг</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-xl transition-all">
            <LogOut size={20} /> Гарах
          </button>
        </div>

        <form onSubmit={handleUpload} className="bg-white rounded-[32px] shadow-xl p-10 space-y-6 border border-slate-100">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Хичээлийн жил</label>
              <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Анги</label>
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                {Array.from({ length: 7 }, (_, i) => `${i + 6}-р анги`).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Олимпиадын төрөл</label>
            <select value={typeId} onChange={(e) => setTypeId(e.target.value)} className="w-full bg-slate-50 border-none rounded-2xl py-4 px-6 font-bold text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
              {types.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">PDF Бодлого</label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-[24px] p-8 text-center hover:border-blue-500 transition-all cursor-pointer">
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="absolute inset-0 opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-slate-300 mb-2" size={32} />
              <p className="font-bold text-slate-500">{file ? file.name : 'Файлаа сонгох'}</p>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-blue-100">
            {loading ? 'Хуулж байна...' : <><PlusCircle size={24}/> ХАДГАЛАХ</>}
          </button>
          {success && <div className="text-center text-green-500 font-bold animate-pulse italic">Амжилттай хадгалагдлаа!</div>}
        </form>
      </div>
    </div>
  );
}