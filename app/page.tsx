"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500 font-bold">Уншиж байна...</div>;

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Дээд хэсэг (Navigation) */}
      <nav className="border-b bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-700 tracking-tighter">MPHO ARCHIVE</h1>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-400 uppercase">Статус</p>
                  <p className="text-sm font-bold text-gray-800">
                    {user.user_metadata?.user_role === 'admin' ? "🛠️ Админ" : 
                     user.user_metadata?.user_role === 'teacher' ? "👨‍🏫 Багш" : "📖 Сурагч"}
                  </p>
                </div>
                <button onClick={handleSignOut} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-red-100 transition">
                  Гарах
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-blue-600">Нэвтрэх</Link>
                <Link href="/register" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition">Бүртгүүлэх</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Олимпиадын Архивын хэсэг (Нэвтрээгүй байсан ч харагдана) */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-4xl font-black text-gray-900 mb-2">Олимпиадын архив</h2>
          <p className="text-gray-500">Нийт олимпиадын бодлого, хариу болон материалууд.</p>
        </div>

        {/* Архивын жагсаалт */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Энэ хэсэгт дараа нь Supabase-ээс өгөгдөл татаж харуулна. Одоохондоо жишээ: */}
          {[2024, 2023, 2022, 2021, 2020, 2019].map((year) => (
            <div key={year} className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer bg-white">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-black mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                {year}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{year} оны Улсын олимпиад</h3>
              <p className="text-sm text-gray-500 mb-4">Физикийн олимпиадын 1-р давааны бодлогууд болон бодолтууд.</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase text-gray-500">Бодлого</span>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded font-bold uppercase text-gray-500">Бодолт</span>
              </div>
            </div>
          ))}
        </div>

        {/* Хэрэв админ эсвэл багш бол архив нэмэх товч харагдана */}
        {(user?.user_metadata?.user_role === 'admin' || user?.user_metadata?.user_role === 'teacher') && (
          <div className="mt-12 flex justify-center">
            <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition shadow-2xl">
              <span>+ ШИНЭ ХИЧЭЭЛ, АРХИВ НЭМЭХ</span>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}