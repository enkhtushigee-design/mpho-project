"use client";
import Link from "next/link";
import { Trophy, Medal, Star, ArrowLeft } from "lucide-react";

export default function InternationalPage() {
  const results = [
    { year: 2025, name: "Batbayar Gurbazar", rank: "80", award: "Silver Medal" },
    { year: 2025, name: "Ichinbat Erkhembayar", rank: "93", award: "Silver Medal" },
    { year: 2025, name: "Munkh-Orgil Munkhtulga", rank: "157", award: "Bronze Medal" },
    { year: 2025, name: "Azjargal Ganbold", rank: "162", award: "Bronze Medal" },
    { year: 2025, name: "Enkhtugs Delgersaikhan", rank: "169", award: "Bronze Medal" },
    { year: 2024, name: "Azjargal Ganbold", rank: "37", award: "Silver Medal" },
    { year: 2024, name: "Atarkhuu Soyolkhuu", rank: "70", award: "Bronze Medal" },
    { year: 2024, name: "Batbayar Gurbazar", rank: "73", award: "Bronze Medal" },
    { year: 2024, name: "Munkh-Orgil Munkhtulga", rank: "75", award: "Bronze Medal" },
    { year: 2024, name: "Ichinbat Erkhembayar", rank: "99", award: "Bronze Medal" },
    // ... бусад өгөгдлүүд энд жагсаалтаар орно
  ];

  // Медалын өнгө тодорхойлох функц
  const getAwardStyle = (award: string) => {
    if (award.includes("Silver")) return "text-slate-400 bg-slate-50 border-slate-200";
    if (award.includes("Bronze")) return "text-orange-600 bg-orange-50 border-orange-200";
    if (award.includes("Honourable")) return "text-blue-600 bg-blue-50 border-blue-200";
    return "text-slate-500 bg-gray-50 border-gray-100";
  };

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Header */}
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-6">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-black tracking-tighter uppercase">Олон улсын амжилт</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Товч статистик */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <Medal className="text-slate-400 mb-4" size={32} />
            <div className="text-4xl font-black text-slate-900">12</div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Мөнгөн медаль</p>
          </div>
          <div className="p-8 bg-orange-50 rounded-[32px] border border-orange-100">
            <Medal className="text-orange-500 mb-4" size={32} />
            <div className="text-4xl font-black text-slate-900">30+</div>
            <p className="text-sm font-bold text-orange-600 uppercase tracking-widest mt-1">Хүрэл медаль</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
            <Star className="text-blue-500 mb-4" size={32} />
            <div className="text-4xl font-black text-slate-900">40+</div>
            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mt-1">Тусгай байр</p>
          </div>
        </div>

        {/* Үндсэн жагсаалт */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-black text-slate-900">IPhO - Individual Results</h2>
            <p className="text-slate-500 font-medium italic mt-1">Монгол улсын багийн амжилтын түүх</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-slate-900">
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">Жил</th>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400">Оролцогч</th>
                <th className="py-4 text-left text-xs font-black uppercase tracking-widest text-slate-400 text-center">Эрэмбэ</th>
                <th className="py-4 text-right text-xs font-black uppercase tracking-widest text-slate-400">Шагнал</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {results.map((res, idx) => (
                <tr key={idx} className="group hover:bg-slate-50 transition">
                  <td className="py-6 font-black text-slate-900">{res.year}</td>
                  <td className="py-6 font-bold text-slate-700">{res.name}</td>
                  <td className="py-6 text-center font-medium text-slate-400">{res.rank}</td>
                  <td className="py-6 text-right">
                    <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter border ${getAwardStyle(res.award)}`}>
                      {res.award}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}