'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { User, School, Phone, GraduationCap, CheckCircle2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    school_name: '',
    grade: '6-р анги',
    phone_number: '',
    email: ''
  });

  const grades = Array.from({ length: 7 }, (_, i) => `${i + 6}-р анги`);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('registrations')
      .insert([formData]);

    if (!error) {
      setSubmitted(true);
    } else {
      alert('Алдаа гарлаа: ' + error.message);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="text-center animate-in fade-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h1 className="text-4xl font-black text-slate-900 mb-4">Бүртгэл амжилттай!</h1>
          <p className="text-slate-500 text-lg mb-8 font-medium">Таны мэдээллийг хүлээн авлаа. Олимпиадад нь амжилт хүсэе!</p>
          <Link 
            href="/"
            className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all inline-block"
          >
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-white rounded-[40px] shadow-2xl shadow-slate-200 p-10 border border-slate-100 relative">
        <Link href="/" className="absolute left-10 top-10 text-slate-400 hover:text-blue-600 transition-colors">
          <ArrowLeft size={24} />
        </Link>
        
        <div className="mb-10 text-center pt-4">
          <h1 className="text-3xl font-black text-slate-900 mb-2">Олимпиадын бүртгэл</h1>
          <p className="text-slate-500 font-medium">6-12-р ангийн сурагчдын бүртгэл</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase ml-2 tracking-widest">Овог нэр</label>
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                required
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:ring-0 focus:border-blue-500 outline-none transition-all"
                placeholder="Бат-Эрдэнэ"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase ml-2 tracking-widest">Сургууль</label>
              <div className="relative">
                <School className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  required
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:ring-0 focus:border-blue-500 outline-none transition-all"
                  placeholder="1-р сургууль"
                  onChange={(e) => setFormData({...formData, school_name: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase ml-2 tracking-widest">Анги</label>
              <div className="relative">
                <GraduationCap className="absolute left-4 top-4 text-slate-400" size={20} />
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:ring-0 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                >
                  {grades.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase ml-2 tracking-widest">Утасны дугаар</label>
            <div className="relative">
              <Phone className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                required
                type="tel"
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-4 font-bold text-slate-700 focus:ring-0 focus:border-blue-500 outline-none transition-all"
                placeholder="9911...."
                onChange={(e) => setFormData({...formData, phone_number: e.target.value})}
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-[22px] font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 disabled:opacity-50 active:scale-95"
          >
            {loading ? 'Бүртгэж байна...' : 'ОДОО БҮРТГҮҮЛЭХ'}
          </button>
        </form>
      </div>
    </div>
  );
}