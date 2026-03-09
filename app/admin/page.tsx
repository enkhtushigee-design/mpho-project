"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Search, Users, GraduationCap, BookOpen, Download } from "lucide-react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mpho_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.role === "admin") {
        setAuthorized(true);
        fetchUsers();
      }
    }
    setChecking(false);
  }, []);

  async function fetchUsers() {
    setLoading(true);
    const { data } = await supabase
      .from("users")
      .select("*")
      .neq("role", "admin")
      .order("created_at", { ascending: false });
    if (data) {
      setUsers(data);
      setFiltered(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    let result = users;
    if (roleFilter !== "all") {
      result = result.filter(u => u.role === roleFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      result = result.filter(u =>
        u.last_name?.toLowerCase().includes(s) ||
        u.first_name?.toLowerCase().includes(s) ||
        u.student_id?.includes(s) ||
        u.school?.toLowerCase().includes(s) ||
        u.email?.toLowerCase().includes(s)
      );
    }
    setFiltered(result);
  }, [search, roleFilter, users]);

  const studentCount = users.filter(u => u.role === "student").length;
  const teacherCount = users.filter(u => u.role === "teacher").length;

  const exportCSV = () => {
    const headers = ["ID", "Овог", "Нэр", "Регистр", "Утас", "Сургууль", "Анги", "И-мэйл", "Төрөл", "Огноо"];
    const rows = filtered.map(u => [
      u.student_id, u.last_name, u.first_name, u.register,
      u.phone, u.school, u.grade || "-", u.email,
      u.role === "student" ? "Сурагч" : "Багш",
      new Date(u.created_at).toLocaleDateString("mn-MN")
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mpho_users.csv";
    a.click();
  };

  if (checking) return null;

  if (!authorized) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <div className="text-center">
          <p className="text-slate-400 font-black uppercase tracking-widest text-sm mb-6">Хандах эрх байхгүй</p>
          <Link href="/" className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all">
            Нүүр хуудас
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-900 border border-slate-100">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-2xl font-[1000] tracking-tighter uppercase text-slate-950 italic">
              Админ панел
            </h1>
          </div>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg"
          >
            <Download size={14} />
            CSV татах
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
              <Users className="text-blue-600" size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Нийт</p>
              <p className="text-3xl font-[1000] text-slate-950">{users.length}</p>
            </div>
          </div>
          <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
              <GraduationCap className="text-purple-600" size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Сурагч</p>
              <p className="text-3xl font-[1000] text-slate-950">{studentCount}</p>
            </div>
          </div>
          <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
              <BookOpen className="text-orange-600" size={22} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Багш</p>
              <p className="text-3xl font-[1000] text-slate-950">{teacherCount}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Нэр, ID, сургууль, и-мэйлээр хайх..."
              className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl border border-slate-200 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm"
            />
          </div>
          <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
            {[
              { value: "all", label: "Бүгд" },
              { value: "student", label: "Сурагч" },
              { value: "teacher", label: "Багш" },
            ].map(opt => (
              <button
                key={opt.value}
                onClick={() => setRoleFilter(opt.value)}
                className={`px-4 py-2 rounded-xl text-[11px] font-[1000] uppercase transition-all ${roleFilter === opt.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Ачааллаж байна...</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-slate-400 font-[1000] uppercase tracking-widest text-xs">Мэдээлэл олдсонгүй</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Овог нэр</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Сургууль</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Анги</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Утас</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">И-мэйл</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Төрөл</th>
                    <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Огноо</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                      <td className="px-6 py-4">
                        <span className="font-[1000] text-blue-600 text-sm tracking-widest">{u.student_id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900 text-sm">{u.last_name} {u.first_name}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-600 text-sm">{u.school}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-600 text-sm">{u.grade ? `${u.grade}-р анги` : "—"}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-600 text-sm">{u.phone}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-600 text-sm">{u.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-[1000] uppercase ${u.role === "student" ? "bg-purple-50 text-purple-600" : "bg-orange-50 text-orange-600"}`}>
                          {u.role === "student" ? "Сурагч" : "Багш"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-slate-400 text-xs">{new Date(u.created_at).toLocaleDateString("mn-MN")}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}