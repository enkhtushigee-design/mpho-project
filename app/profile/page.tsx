"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Globe, Eye, EyeOff, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function ProfilePage() {
  const { lang, setLang } = useLanguage();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    phone: "",
    school: "",
    grade: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("mpho_user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setForm({
        last_name: u.last_name || "",
        first_name: u.first_name || "",
        phone: u.phone || "",
        school: u.school || "",
        grade: u.grade || "",
      });
      setEmail(u.email || "");
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    const updates: any = { ...form };
    if (password) updates.password_hash = password;
    if (email !== user.email) updates.email = email;

    const { data, error: dbError } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    setLoading(false);

    if (dbError) {
      setError("Алдаа гарлаа. Дахин оролдоно уу");
      return;
    }

    localStorage.setItem("mpho_user", JSON.stringify(data));
    setUser(data);
    setSuccess(true);
    setPassword("");
    setTimeout(() => setSuccess(false), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("mpho_user");
    window.location.href = "/";
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-black tracking-tighter uppercase text-slate-950 italic">
              Профайл
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "mn" ? "en" : "mn")}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
            >
              <Globe size={14} />
              {lang === "mn" ? "EN" : "MN"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-10">

        {/* ID Card */}
        <div className="bg-slate-950 rounded-[40px] p-8 text-white mb-8 shadow-2xl">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">ТАНЫ MPHO ID</p>
          <p className="text-5xl font-black tracking-widest mb-4">{user.student_id}</p>
          <p className="text-slate-300 font-bold text-sm">{user.last_name} {user.first_name}</p>
          <p className="text-slate-400 text-xs font-black uppercase tracking-widest mt-1">
            {user.role === "teacher" ? "Багш" : `${user.grade}-р анги`}
          </p>
          <p className="text-slate-500 text-xs font-bold mt-1">{user.school}</p>
        </div>

        {/* Edit form */}
        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 space-y-4">
          <h2 className="text-lg font-black uppercase tracking-tighter text-slate-950 italic mb-2">
            Мэдээлэл засах
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Овог</label>
              <input name="last_name" value={form.last_name} onChange={handleChange}
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Нэр</label>
              <input name="first_name" value={form.first_name} onChange={handleChange}
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Утасны дугаар</label>
            <input name="phone" value={form.phone} onChange={handleChange}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Сургууль</label>
            <input name="school" value={form.school} onChange={handleChange}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          {user.role === "student" && (
            <div>
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Анги</label>
              <select name="grade" value={form.grade} onChange={handleChange}
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer">
                {[7,8,9,10,11,12].map(g => (
                  <option key={g} value={String(g)}>{g}-р анги</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">И-мэйл</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          <div>
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">
              Шинэ нууц үг (заавал биш)
            </label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Өөрчлөхгүй бол хоосон орхино уу"
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-red-600 font-bold text-sm">{error}</p>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-green-600 font-bold text-sm">Амжилттай хадгалагдлаа!</p>
            </div>
          )}

          <button onClick={handleSave} disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-lg disabled:opacity-50">
            {loading ? "Хадгалж байна..." : "Хадгалах"}
          </button>

          <button onClick={handleLogout}
            className="w-full py-4 bg-red-50 hover:bg-red-100 text-red-500 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2">
            <LogOut size={16} />
            Гарах
          </button>
        </div>
      </div>
    </main>
  );
}