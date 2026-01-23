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
    // Хэрэглэгчийн мэдээллийг шалгах
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();

    // Нэвтрэх төлөв өөрчлөгдөхийг сонсох
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh(); // Хуудсыг шинэчлэх
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Уншиж байна...</p>
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
        {user ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Сайн байна уу?
            </h1>
            <p className="text-xl text-blue-600 font-semibold mb-6">
              {user.user_metadata?.full_name || user.email}
            </p>
            <p className="text-gray-500 mb-8">
              Та системд амжилттай нэвтэрсэн байна.
            </p>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition duration-300"
            >
              Гарах
            </button>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
              Тавтай морилно уу
            </h1>
            <p className="text-gray-600 mb-8">
              Системийг ашиглахын тулд нэвтрэх эсвэл бүртгүүлэх шаардлагатай.
            </p>
            <div className="flex flex-col space-y-4">
              <Link
                href="/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
              >
                Нэвтрэх
              </Link>
              <Link
                href="/signup"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition"
              >
                Бүртгүүлэх
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}