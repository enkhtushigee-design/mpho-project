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

  if (loading) return <div className="flex items-center justify-center min-h-screen text-gray-500">Уншиж байна...</div>;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-sm w-full bg-white p-10 rounded-3xl shadow-2xl text-center">
        {user ? (
          <>
            <div className="mb-4">
              {user.user_metadata?.user_role === 'teacher' ? (
                <span className="bg-green-100 text-green-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-green-200">
                  Багш 👨‍🏫
                </span>
              ) : (
                <span className="bg-blue-100 text-blue-700 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-blue-200">
                  Сурагч 📖
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Сайн байна уу?</h1>
            <p className="text-lg text-gray-700 font-medium mb-8">
              {user.user_metadata?.full_name || user.email}
            </p>
            <button 
              onClick={handleSignOut}
              className="w-full bg-gray-900 hover:bg-black text-white py-3 rounded-xl transition duration-300 font-bold"
            >
              Гарах
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-black text-gray-900 mb-4">Тавтай морил</h1>
            <p className="text-gray-500 mb-10 text-sm">Системд нэвтэрч хичээлээ эхлүүлнэ үү.</p>
            <div className="space-y-3">
              <Link href="/login" className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition">
                Нэвтрэх
              </Link>
              <Link href="/register" className="block w-full border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 text-gray-700 py-4 rounded-xl font-bold transition">
                Бүртгүүлэх
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}