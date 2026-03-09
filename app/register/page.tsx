"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Eye, EyeOff, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

function generateStudentId(grade: string): string {
  const currentYear = new Date().getFullYear();
  const random = Math.floor(Math.random() * 9000) + 1000;
  const gradeNum = parseInt(grade);
  const graduationYear = currentYear + (12 - gradeNum);
  return `${graduationYear}${random}`;
}

function generateTeacherId(): string {
  return String(Math.floor(Math.random() * 90000) + 10000);
}

export default function RegisterPage() {
  const { lang, setLang } = useLanguage();
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    last_name: "",
    first_name: "",
    register: "",
    phone: "",
    school: "",
    grade: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.last_name || !form.first_name || !form.register || !form.phone || !form.school || !form.email || !form.password) {
      setError("Бүх талбарыг бөглөнө үү");
      return;
    }
    if (role === "student" && !form.grade) {
      setError("Ангиа сонгоно уу");
      return;
    }

    setLoading(true);

    const studentId = role === "student"
      ? generateStudentId(form.grade)
      : generateTeacherId();

    const { error: dbError } = await supabase.from("users").insert({
      student_id: studentId,
      last_name: form.last_name,
      first_name: form.first_name,
      register: form.register,
      phone: form.phone,
      school: form.school,
      grade: role === "student" ? form.grade : null,
      email: form.email,
      password_hash: form.password,
      role: role,
    });

    setLoading(false);

    if (dbError) {
      if (dbError.message.includes("email")) {
        setError("Энэ и-мэйл хаяг бүртгэлтэй байна");
      } else if (dbError.message.includes("register")) {
        setError("Энэ регистрийн дугаар бүртгэлтэй байна");
      } else {
        setError("Алдаа гарлаа. Дахин оролдоно уу");
      }
      return;
    }

    setGeneratedId(studentId);
    setSuccess(true);
  };

  if (success) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 font-sans">
        <div className="bg-white rounded-[48px] p-12 max-w-md w-full text-center shadow-xl border border-slate-200">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
            ✓
          </div>
          <h2 className="text-2xl font-[1000] italic uppercase tracking-tighter text-slate-950 mb-2">
            Бүртгэл амжилттай!
          </h2>
          <p className="text-slate-500 font-medium mb-8 text-sm">
            Таны MPHO ID дугаарыг хадгалаарай
          </p>
          <div className="bg-slate-950 text-white rounded-[24px] py-6 px-8 mb-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">ТАНЫ ID ДУГААР</p>
            <p className="text-5xl font-[1000] tracking-widest text-white">{generatedId}</p>
          </div>
          <Link href="/" className="block w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all">
            Нүүр хуудас руу буцах
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-950 italic">
              Бүртгэл үүсгэх
            </h1>
          </div>
          <button
            onClick={() => setLang(lang === "mn" ? "en" : "mn")}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
          >
            <Globe size={14} />
            {lang === "mn" ? "EN" : "MN"}
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 pt-10">

        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <Image src="/logo.png" alt="MPHO Logo" fill className="object-contain" />
          </div>
        </div>

        <div className="flex gap-2 mb-8 bg-white p-2 rounded-[24px] border border-slate-200 shadow-sm">
          <button
            onClick={() => setRole("student")}
            className={`flex-1 py-3 rounded-[18px] font-[1000] text-sm transition-all ${role === "student" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            Сурагч
          </button>
          <button
            onClick={() => setRole("teacher")}
            className={`flex-1 py-3 rounded-[18px] font-[1000] text-sm transition-all ${role === "teacher" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}
          >
            Багш
          </button>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 space-y-4">

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Овог</label>
              <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Овог"
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Нэр</label>
              <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="Нэр"
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Регистрийн дугаар</label>
            <input name="register" value={form.register} onChange={handleChange} placeholder="УУ00000000"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Утасны дугаар</label>
            <input name="phone" value={form.phone} onChange={handleChange} placeholder="99001234"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
              {role === "student" ? "Сургуулийн нэр" : "Ажилладаг сургуулийн нэр"}
            </label>
            <input name="school" value={form.school} onChange={handleChange} placeholder="Сургуулийн нэрийг кирилл үсгээр бичнэ үү"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          {role === "student" && (
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Анги</label>
              <select name="grade" value={form.grade} onChange={handleChange}
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-sm">
                <option value="">Ангиа сонгоно уу</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(g => (
                  <option key={g} value={String(g)}>{g}-р анги</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">И-мэйл хаяг</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@gmail.com"
              className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Нууц үг</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Нууц үг"
                className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-12" />
              <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-red-600 font-bold text-sm">{error}</p>
            </div>
          )}

          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-[1000] text-sm transition-all shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed mt-2">
            {loading ? "Бүртгэж байна..." : "Бүртгэл үүсгэх"}
          </button>
        </div>
      </div>
    </main>
  );
}