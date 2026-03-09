"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Eye, EyeOff, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function LoginPage() {
  const { lang, setLang } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("mpho_user");
    if (stored) window.location.href = "/profile";
  }, []);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("И-мэйл болон нууц үгээ оруулна уу");
      return;
    }
    setLoading(true);

    const { data, error: dbError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password_hash", password)
      .single();

    setLoading(false);

    if (dbError || !data) {
      setError("И-мэйл эсвэл нууц үг буруу байна");
      return;
    }

    localStorage.setItem("mpho_user", JSON.stringify(data));
    if (data.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/profile";
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 font-sans">
      <div className="w-full max-w-md">
        <nav className="flex items-center justify-between mb-10">
          <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-200">
            <ArrowLeft size={24} />
          </Link>
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-950 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all"
          >
            <Globe size={12} />
            {lang === "mn" ? "EN" : "MN"}
          </button>
        </nav>

        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <Image src="/logo.png" alt="MPHO Logo" fill className="object-contain" />
          </div>
        </div>

        <h1 className="text-3xl font-black italic uppercase tracking-tighter text-slate-950 text-center mb-2">
          Нэвтрэх
        </h1>
        <p className="text-slate-400 font-bold text-sm text-center mb-8">
          MPHO бүртгэлээрээ нэвтэрнэ үү
        </p>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 space-y-4">
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
              И-мэйл хаяг
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
              Нууц үг
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Нууц үг"
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-red-600 font-bold text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-lg disabled:opacity-50"
          >
            {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
          </button>

          <p className="text-center text-slate-400 font-bold text-sm">
            Бүртгэл байхгүй юу?{" "}
            <Link href="/register" className="text-blue-600 hover:underline">
              Бүртгүүлэх
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}