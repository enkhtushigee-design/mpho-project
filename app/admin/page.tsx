"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Search, Users, GraduationCap, BookOpen, Download, X, Upload, Plus } from "lucide-react";
import * as XLSX from "xlsx";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);
  const [tab, setTab] = useState<"users" | "materials" | "selection">("users");

  const [materials, setMaterials] = useState<any[]>([]);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [matLoading, setMatLoading] = useState(false);
  const [matForm, setMatForm] = useState({
    name: "",
    full_name: "",
    full_name_en: "",
    description: "",
    description_en: "",
    url: "",
  });

  const [selectionYear, setSelectionYear] = useState("");
  const [selectionOlympiad, setSelectionOlympiad] = useState("APhO");
  const [selectionUploading, setSelectionUploading] = useState(false);
  const [selectionSuccess, setSelectionSuccess] = useState(false);
  const [selectionError, setSelectionError] = useState("");
  const [selectionList, setSelectionList] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("mpho_user");
    if (stored) {
      const u = JSON.parse(stored);
      if (u.role === "admin") {
        setAuthorized(true);
        fetchUsers();
        fetchMaterials();
        fetchSelectionList();
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
    if (data) { setUsers(data); setFiltered(data); }
    setLoading(false);
  }

  async function fetchMaterials() {
    const { data } = await supabase
      .from("materials")
      .select("*")
      .order("created_at", { ascending: true });
    if (data) setMaterials(data);
  }

  async function fetchSelectionList() {
    const { data } = await supabase
      .from("selection")
      .select("id, school_year, olympiad, created_at")
      .order("school_year", { ascending: false });
    if (data) setSelectionList(data);
  }

  async function addMaterial() {
    if (!matForm.name || !matForm.full_name || !matForm.url) return;
    setMatLoading(true);
    await supabase.from("materials").insert(matForm);
    await fetchMaterials();
    setMatForm({ name: "", full_name: "", full_name_en: "", description: "", description_en: "", url: "" });
    setShowAddMaterial(false);
    setMatLoading(false);
  }

  async function deleteMaterial(id: string) {
    await supabase.from("materials").delete().eq("id", id);
    await fetchMaterials();
  }

  async function deleteSelection(id: string) {
    await supabase.from("selection").delete().eq("id", id);
    await fetchSelectionList();
  }

  const handleSelectionUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectionYear) {
      setSelectionError("Он болон файлаа сонгоно уу");
      return;
    }
    setSelectionUploading(true);
    setSelectionError("");

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];

      // Баганын дарааллыг xlsx-ээс шууд авна
      const headers = (XLSX.utils.sheet_to_json(ws, { header: 1 })[0] as string[]).map(
        (h) => String(h).replace(/\r\n|\r|\n/g, " ").trim()
      );
      const jsonData = XLSX.utils.sheet_to_json(ws);

      const { error } = await supabase
        .from("selection")
        .upsert({
          school_year: selectionYear,
          olympiad: selectionOlympiad,
          data: jsonData,
          columns: headers,
        }, { onConflict: "school_year" });

      setSelectionUploading(false);
      if (error) {
        setSelectionError("Алдаа гарлаа: " + error.message);
      } else {
        setSelectionSuccess(true);
        setSelectionYear("");
        await fetchSelectionList();
        setTimeout(() => setSelectionSuccess(false), 3000);
      }
    };
    reader.readAsBinaryString(file);
  };

  useEffect(() => {
    let result = users;
    if (roleFilter !== "all") result = result.filter(u => u.role === roleFilter);
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
            <h1 className="text-2xl font-black tracking-tighter uppercase text-slate-950 italic">Админ панел</h1>
          </div>
          <div className="flex items-center gap-2">
            {tab === "users" && (
              <button onClick={exportCSV} className="flex items-center gap-2 px-5 py-2.5 bg-slate-950 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg">
                <Download size={14} /> CSV татах
              </button>
            )}
            {tab === "materials" && (
              <button onClick={() => setShowAddMaterial(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-full text-xs font-black tracking-widest hover:bg-blue-500 transition-all shadow-lg">
                <Plus size={14} /> Нэмэх
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-10">

        <div className="flex gap-2 mb-8 bg-white p-2 rounded-[24px] border border-slate-200 shadow-sm w-fit">
          <button onClick={() => setTab("users")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "users" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}>
            Хэрэглэгчид
          </button>
          <button onClick={() => setTab("materials")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "materials" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}>
            Материал
          </button>
          <button onClick={() => setTab("selection")}
            className={`px-6 py-2.5 rounded-[18px] font-black text-sm transition-all ${tab === "selection" ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:text-slate-900"}`}>
            Шалгаруулалт
          </button>
        </div>

        {/* USERS TAB */}
        {tab === "users" && (
          <>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Users className="text-blue-600" size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Нийт</p>
                  <p className="text-3xl font-black text-slate-950">{users.length}</p>
                </div>
              </div>
              <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="text-purple-600" size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Сурагч</p>
                  <p className="text-3xl font-black text-slate-950">{users.filter(u => u.role === "student").length}</p>
                </div>
              </div>
              <div className="bg-white rounded-[32px] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center">
                  <BookOpen className="text-orange-600" size={22} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Багш</p>
                  <p className="text-3xl font-black text-slate-950">{users.filter(u => u.role === "teacher").length}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input value={search} onChange={(e) => setSearch(e.target.value)}
                  placeholder="Нэр, ID, сургууль, и-мэйлээр хайх..."
                  className="w-full pl-11 pr-4 py-4 bg-white rounded-2xl border border-slate-200 font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm" />
              </div>
              <div className="flex gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                {[{ value: "all", label: "Бүгд" }, { value: "student", label: "Сурагч" }, { value: "teacher", label: "Багш" }].map(opt => (
                  <button key={opt.value} onClick={() => setRoleFilter(opt.value)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${roleFilter === opt.value ? "bg-slate-950 text-white shadow-lg" : "text-slate-500 hover:bg-slate-100"}`}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
              {loading ? (
                <div className="py-24 flex items-center justify-center">
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400 animate-pulse">Ачааллаж байна...</span>
                </div>
              ) : filtered.length === 0 ? (
                <div className="py-24 text-center">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Мэдээлэл олдсонгүй</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-100">
                        {["ID", "Овог нэр", "Сургууль", "Анги", "Утас", "И-мэйл", "Төрөл", "Огноо"].map(h => (
                          <th key={h} className="text-left px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-400">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((u, i) => (
                        <tr key={u.id} className={`border-b border-slate-50 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/50"}`}>
                          <td className="px-6 py-4"><span className="font-black text-blue-600 text-sm tracking-widest">{u.student_id}</span></td>
                          <td className="px-6 py-4"><span className="font-bold text-slate-900 text-sm">{u.last_name} {u.first_name}</span></td>
                          <td className="px-6 py-4"><span className="font-medium text-slate-600 text-sm">{u.school}</span></td>
                          <td className="px-6 py-4"><span className="font-medium text-slate-600 text-sm">{u.grade ? `${u.grade}-р анги` : "—"}</span></td>
                          <td className="px-6 py-4"><span className="font-medium text-slate-600 text-sm">{u.phone}</span></td>
                          <td className="px-6 py-4"><span className="font-medium text-slate-600 text-sm">{u.email}</span></td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${u.role === "student" ? "bg-purple-50 text-purple-600" : "bg-orange-50 text-orange-600"}`}>
                              {u.role === "student" ? "Сурагч" : "Багш"}
                            </span>
                          </td>
                          <td className="px-6 py-4"><span className="font-medium text-slate-400 text-xs">{new Date(u.created_at).toLocaleDateString("mn-MN")}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {/* MATERIALS TAB */}
        {tab === "materials" && (
          <div className="space-y-4">
            {materials.length === 0 ? (
              <div className="py-24 text-center bg-white rounded-[32px] border border-slate-200">
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Материал байхгүй байна</p>
              </div>
            ) : (
              materials.map(m => (
                <div key={m.id} className="bg-white rounded-[24px] border border-slate-200 shadow-sm px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 flex items-center justify-center font-black text-xs text-white shrink-0">
                      {m.name}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-sm">{m.full_name}</p>
                      {m.description && <p className="text-slate-400 font-medium text-xs mt-0.5">{m.description}</p>}
                      <p className="text-blue-500 font-bold text-xs mt-0.5">{m.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a href={m.url} target="_blank" rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black hover:bg-blue-100 transition-all">
                      Үзэх
                    </a>
                    <button onClick={() => deleteMaterial(m.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* SELECTION TAB */}
        {tab === "selection" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm p-8 space-y-4 h-fit">
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-950 italic">
                XLSX файл оруулах
              </h2>
              <p className="text-slate-400 font-medium text-sm">
                Excel файлын эхний мөр нь багануудын гарчиг байх ёстой
              </p>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Хичээлийн жил</label>
                <input
                  value={selectionYear}
                  onChange={e => setSelectionYear(e.target.value)}
                  placeholder="2024-2025"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Олимпиад</label>
                <select
                  value={selectionOlympiad}
                  onChange={e => setSelectionOlympiad(e.target.value)}
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                >
                  {["APhO", "IPhO", "EuPhO", "IZhO"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">XLSX файл</label>
                <label className="flex items-center justify-center gap-3 w-full p-6 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all">
                  <Upload size={20} className="text-slate-400" />
                  <span className="font-bold text-slate-500 text-sm">
                    {selectionUploading ? "Оруулж байна..." : "Файл сонгох (.xlsx)"}
                  </span>
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleSelectionUpload}
                    className="hidden"
                    disabled={selectionUploading}
                  />
                </label>
              </div>
              {selectionError && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                  <p className="text-red-600 font-bold text-sm">{selectionError}</p>
                </div>
              )}
              {selectionSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                  <p className="text-green-600 font-bold text-sm">Амжилттай оруулагдлаа!</p>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-lg font-black uppercase tracking-tighter text-slate-950 italic px-2">
                Оруулсан файлууд
              </h2>
              {selectionList.length === 0 ? (
                <div className="py-12 text-center bg-white rounded-[32px] border border-slate-200">
                  <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Файл байхгүй байна</p>
                </div>
              ) : (
                selectionList.map(s => (
                  <div key={s.id} className="bg-white rounded-[24px] border border-slate-200 shadow-sm px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="px-3 py-1 bg-slate-950 text-white rounded-full text-xs font-black uppercase">{s.olympiad}</span>
                      <span className="font-bold text-slate-900 text-sm">{s.school_year}</span>
                    </div>
                    <button onClick={() => deleteSelection(s.id)}
                      className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all">
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add Material Modal */}
      {showAddMaterial && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-6">
          <div className="bg-white rounded-[40px] p-8 w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black uppercase tracking-tighter text-slate-950 italic">Материал нэмэх</h2>
              <button onClick={() => setShowAddMaterial(false)} className="p-2 hover:bg-slate-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Товч нэр (жишээ: IPhO)</label>
                <input value={matForm.name} onChange={e => setMatForm({...matForm, name: e.target.value})}
                  placeholder="IPhO"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Бүтэн нэр (МН)</label>
                <input value={matForm.full_name} onChange={e => setMatForm({...matForm, full_name: e.target.value})}
                  placeholder="Олон улсын физикийн олимпиад"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Бүтэн нэр (EN)</label>
                <input value={matForm.full_name_en} onChange={e => setMatForm({...matForm, full_name_en: e.target.value})}
                  placeholder="International Physics Olympiad"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Тайлбар (МН)</label>
                <input value={matForm.description} onChange={e => setMatForm({...matForm, description: e.target.value})}
                  placeholder="Олимпиадын тухай товч тайлбар"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Тайлбар (EN)</label>
                <input value={matForm.description_en} onChange={e => setMatForm({...matForm, description_en: e.target.value})}
                  placeholder="Brief description in English"
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2 block">Вэбсайтын линк</label>
                <input value={matForm.url} onChange={e => setMatForm({...matForm, url: e.target.value})}
                  placeholder="https://..."
                  className="w-full p-4 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
              </div>
              <button onClick={addMaterial} disabled={matLoading}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm transition-all shadow-lg disabled:opacity-50">
                {matLoading ? "Нэмж байна..." : "Нэмэх"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}