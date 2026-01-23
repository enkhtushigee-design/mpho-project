"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
    
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* 1. Header & Navigation */}
      <nav className="bg-white border-b py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-black text-blue-700">MPHO</Link>
          
          <div className="flex gap-4 items-center">
            {user ? (
              <Link href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg">
                Хянах самбар (Бүртгэл)
              </Link>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-5 py-2 rounded-xl font-bold text-sm shadow-lg">
                Нэвтрэх / Бүртгүүлэх
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 2. Hero Section (Олимпиадын зарлал) */}
      <section className="bg-blue-700 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-black mb-4 uppercase">Монголын Физикийн Олимпиад</h2>
          <p className="text-blue-100 text-lg mb-8">
            Олимпиадын бүртгэл эхэллээ. Та бүртгүүлж оролцох эрхээ аваарай.
          </p>
          {!user && (
            <Link href="/register" className="bg-white text-blue-700 px-8 py-3 rounded-2xl font-black text-lg hover:bg-gray-100 transition">
              ОРОЛЦОХ ЭРХ АВАХ
            </Link>
          )}
        </div>
      </section>

      {/* 3. Архивын хэсэг (Хүн бүрт нээлттэй) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-black text-gray-900 mb-8">Олимпиадын архив</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[2024, 2023, 2022].map((year) => (
            <div key={year} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition cursor-pointer">
              <div className="text-blue-600 font-black text-2xl mb-2">{year}</div>
              <p className="text-gray-600 text-sm">Улсын физикийн олимпиадын бүх бодлого, бодолтууд.</p>
              <button className="mt-4 text-blue-600 font-bold text-xs uppercase tracking-widest hover:underline">Үзэх →</button>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Мэдээ мэдээлэл (Хүн бүрт нээлттэй) */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-black text-gray-900 mb-8">Шинэ мэдээ</h3>
        <div className="bg-white border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3 bg-gray-100 aspect-video rounded-2xl flex items-center justify-center font-bold text-gray-400">Зураг</div>
          <div className="flex-1">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-black uppercase">Шинэ</span>
            <h4 className="text-2xl font-bold mt-4 mb-2 italic text-gray-800">2026 оны Улсын олимпиад зохион байгуулагдах хуваарь гарлаа</h4>
            <p className="text-gray-500">Улаанбаатар хотод болох олимпиадын ерөнхий хуваарь...</p>
          </div>
        </div>
      </section>
    </main>
  );
}