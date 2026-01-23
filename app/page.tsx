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

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const isAdmin = user?.user_metadata?.user_role === 'admin';

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Уншиж байна...</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      
      {/* 1. Header Хэсэг (Нэвтрэх эсвэл Хэрэглэгчийн мэдээлэл харуулах) */}
      <div className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-md mb-6 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Minii Archive</h1>
        
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                {user.user_metadata?.user_role === 'admin' ? "🛠️ Админ" : 
                 user.user_metadata?.user_role === 'teacher' ? "👨‍🏫 Багш" : "📖 Сурагч"}
              </span>
              <button onClick={handleSignOut} className="text-red-500 text-sm font-bold border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50">
                Гарах
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">Нэвтрэх</Link>
              <Link href="/register" className="text-sm border border-gray-200 px-4 py-2 rounded-lg font-bold text-gray-600">Бүртгүүлэх</Link>
            </div>
          )}
        </div>
      </div>

      {/* 2. Төв хэсэг (Архив - БҮХ ХҮНД ХАРАГДАНА) */}
      <div className="max-w-4xl w-full">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-black text-gray-900 mb-6">Нийтийн Архив</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Жишээ архив картууд */}
            <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-md transition cursor-pointer">
              <h3 className="font-bold text-gray-800">Математикийн хичээл #1</h3>
              <p className="text-sm text-gray-500">Оруулсан: Багш Бат</p>
            </div>
            <div className="p-4 border border-gray-100 rounded-xl bg-gray-50 hover:shadow-md transition cursor-pointer">
              <h3 className="font-bold text-gray-800">Монгол хэл - Эссэ бичих</h3>
              <p className="text-sm text-gray-500">Оруулсан: Багш Болд</p>
            </div>
          </div>

          {/* Хэрэв админ бол нэмэлт товч харагдана */}
          {isAdmin && (
            <button className="mt-8 w-full bg-yellow-500 text-white py-3 rounded-xl font-bold shadow-lg shadow-yellow-100">
              + Шинэ архив нэмэх (Админ)
            </button>
          )}
        </div>
      </div>

    </main>
  );
}