'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert('Нэвтрэхэд алдаа гарлаа: ' + error.message);
    } else {
      router.push('/admin'); // Амжилттай болвол Админ руу үсэрнэ
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[32px] p-10 shadow-2xl">
        <h1 className="text-3xl font-black text-slate-900 mb-8 text-center">Системд нэвтрэх</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-2">Имэйл хаяг</label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="email" required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-2">Нууц үг</label>
            <div className="relative">
              <Lock className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="password" required
                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 font-bold outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black hover:bg-blue-700 transition-all flex justify-center shadow-xl shadow-blue-200"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'НЭВТРЭХ'}
          </button>
        </form>
      </div>
    </div>
  );
}