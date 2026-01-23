"use client";
import Link from "next/link";
import { Medal, Star, ArrowLeft } from "lucide-react";

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
    { year: 2023, name: "Anirchuluu Otgochuluu", rank: "96", award: "Silver Medal" },
    { year: 2023, name: "Azjargal Ganbold", rank: "140", award: "Bronze Medal" },
    { year: 2023, name: "Batbayar Gurbazar", rank: "161", award: "Bronze Medal" },
    { year: 2023, name: "Dulguun Luvsan", rank: "232", award: "Honourable Mention" },
    { year: 2022, name: "Anirchuluu Otgochuluu", rank: "98", award: "Silver Medal" },
    { year: 2022, name: "Uguumur Tsagaanbayar", rank: "126", award: "Bronze Medal" },
    { year: 2022, name: "Bilguun Batbayar", rank: "130", award: "Bronze Medal" },
    { year: 2022, name: "Barsbold Enkhbold", rank: "191", award: "Bronze Medal" },
    { year: 2022, name: "Unurtuvshin Erdenebileg", rank: "258", award: "Honourable Mention" },
    { year: 2021, name: "Bilguun Batbayar", rank: "138", award: "Bronze Medal" },
    { year: 2021, name: "Anirchuluu Otgochuluu", rank: "186", award: "Bronze Medal" },
    { year: 2021, name: "Barsbold Enkhbold", rank: "221", award: "Honourable Mention" },
    { year: 2021, name: "Temuulen Baasannorov", rank: "232", award: "Honourable Mention" },
    { year: 2019, name: "Itgel Delgerdalai", rank: "177", award: "Bronze Medal" },
    { year: 2019, name: "Khongor Damdinbayar", rank: "184", award: "Bronze Medal" },
    { year: 2019, name: "Tsolmon Bazarragchaa", rank: "214", award: "Honourable Mention" },
    { year: 2018, name: "Sumiyajav Sarangerel", rank: "109", award: "Silver Medal" },
    { year: 2018, name: "Amarbold Byambajargal", rank: "176", award: "Bronze Medal" },
    { year: 2018, name: "Nyamtsogt Munkhbilguun", rank: "233", award: "Honourable Mention" },
    { year: 2018, name: "Ganbaatar Sumiyabazar", rank: "244", award: "Honourable Mention" },
    { year: 2018, name: "Khongor Damdinbayar", rank: "271", award: "Honourable Mention" },
    { year: 2017, name: "Dulguun Lkhagvadorj", rank: "≥65", award: "Silver Medal" },
    { year: 2017, name: "Oyuntugs Luubaatar", rank: "≥65", award: "Silver Medal" },
    { year: 2017, name: "Amarbold Byambajargal", rank: "≥137", award: "Bronze Medal" },
    { year: 2017, name: "Garid Erdenechuluun", rank: "≥137", award: "Bronze Medal" },
    { year: 2017, name: "Sumiyajav Sarangerel", rank: "≥137", award: "Bronze Medal" },
    { year: 2016, name: "Tserenchimeg Khasgerel", rank: "116", award: "Silver Medal" },
    { year: 2016, name: "Dulguun Lkhagvadorj", rank: "162", award: "Bronze Medal" },
    { year: 2016, name: "Oyuntugs Luubaatar", rank: "168", award: "Bronze Medal" },
    { year: 2016, name: "Garid Erdenechuluun", rank: "188", award: "Bronze Medal" },
    { year: 2015, name: "Tserenchimeg Khasgerel", rank: "198", award: "Honourable Mention" },
    { year: 2015, name: "Tugsbayasgalan Manlaibaatar", rank: "212", award: "Honourable Mention" },
    { year: 2015, name: "Bayar Bat-Orgil", rank: "260", award: "Honourable Mention" },
    { year: 2014, name: "Bat-Erdene Bat-Amgalan", rank: "87", award: "Silver Medal" },
    { year: 2014, name: "Duinkharjav Budmonde", rank: "123", award: "Silver Medal" },
    { year: 2014, name: "Tugsbayasgalan Manlaibaatar", rank: "156", award: "Bronze Medal" },
    { year: 2014, name: "Javkhlantugs Unurtuvshin", rank: "192", award: "Bronze Medal" },
    { year: 2014, name: "Bayar Bat-Orgil", rank: "214", award: "Honourable Mention" },
    { year: 2013, name: "Duinkharjav Budmonde", rank: "170", award: "Bronze Medal" },
    { year: 2013, name: "Zorigoo Garid", rank: "229", award: "Honourable Mention" },
    { year: 2013, name: "Bat-Erdene Bat-Amgalan", rank: "238", award: "Honourable Mention" },
    { year: 2012, name: "Battsooj Bayarsaikhan", rank: "199", award: "Bronze Medal" },
    { year: 2012, name: "Bilguun Batjargal", rank: "224", award: "Honourable Mention" },
    { year: 2012, name: "Tsogt Baigalmaa", rank: "233", award: "Honourable Mention" },
    { year: 2012, name: "Battushig Myanganbayar", rank: "233", award: "Honourable Mention" },
    { year: 2012, name: "Munkhtsetseg Battulga", rank: "238", award: "Honourable Mention" },
    { year: 2011, name: "Dashdorj Orgilbold", rank: "106", award: "Silver Medal" },
    { year: 2011, name: "Bold Dorjpurev", rank: "168", award: "Bronze Medal" },
    { year: 2011, name: "Ulam-Orgikh Tserendulam", rank: "227", award: "Honourable Mention" },
    { year: 2010, name: "Bold Dorjpurev", rank: "143", award: "Bronze Medal" },
    { year: 2010, name: "Batkhuyag Batsaikhan", rank: "196", award: "Bronze Medal" },
    { year: 2010, name: "Khuslent Boldbaatar", rank: "224", award: "Honourable Mention" },
    { year: 2010, name: "Undralbat Enkhbayar", rank: "238", award: "Honourable Mention" },
    { year: 2008, name: "Battumur Batkhishig", rank: "146", award: "Bronze Medal" },
    { year: 2008, name: "Byambadorj Tsenguun", rank: "233", award: "Honourable Mention" },
    { year: 2008, name: "Bold Dorjpurev", rank: "238", award: "Honourable Mention" },
    { year: 2008, name: "Naranbat Battuvshin", rank: "242", award: "Honourable Mention" },
    { year: 2008, name: "Bold Bilegsaikhan", rank: "250", award: "Honourable Mention" },
    { year: 2007, name: "Otgonbaatar Uuganbayar", rank: "151", award: "Honourable Mention" },
    { year: 2007, name: "Enkhee Temuulen", rank: "213", award: "Honourable Mention" },
    { year: 2006, name: "Otgonbaatar Myagmar", rank: "75", award: "Silver Medal" },
    { year: 2006, name: "Otgonbaatar Uuganbayar", rank: "136", award: "Bronze Medal" },
    { year: 2006, name: "Dashdavaa Khureltulga", rank: "158", award: "Bronze Medal" },
    { year: 2005, name: "Otgonbaatar Myagmar", rank: "119", award: "Bronze Medal" },
    { year: 2005, name: "Otgonbaatar Uuganbayar", rank: "178", award: "Honourable Mention" },
    { year: 2005, name: "Dashdavaa Khureltulga", rank: "195", award: "Honourable Mention" },
    { year: 2004, name: "Otgonbaatar Myagmar", rank: "149", award: "Honourable Mention" },
    { year: 2004, name: "Oidovdorj Gankhuyag", rank: "191", award: "Honourable Mention" },
    { year: 2004, name: "Buyandalai Altansargai", rank: "203", award: "Honourable Mention" },
    { year: 2002, name: "Norovjav Tegshbayar", rank: "184", award: "Honourable Mention" },
    { year: 1999, name: "Altankhuyag Bilguun", rank: "200", award: "Honourable Mention" },
    { year: 1999, name: "Adiyasuren Altanbileg", rank: "205", award: "Honourable Mention" },
  ];

  const getAwardStyle = (award: string) => {
    if (award.includes("Silver")) return "bg-slate-100 text-slate-700 border-slate-200";
    if (award.includes("Bronze")) return "bg-orange-50 text-orange-700 border-orange-200";
    if (award.includes("Honourable")) return "bg-blue-50 text-blue-700 border-blue-200";
    return "bg-gray-50 text-gray-500 border-gray-100";
  };

  return (
    <main className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-6">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl font-black tracking-tighter uppercase">Олон улсын амжилт (IPhO)</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Багийн амжилтын товчоон */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100">
            <Medal className="text-slate-400 mb-4" size={32} />
            <div className="text-5xl font-black text-slate-900 tracking-tighter">11</div>
            <p className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] mt-2">Мөнгөн медаль</p>
          </div>
          <div className="p-8 bg-orange-50 rounded-[32px] border border-orange-100">
            <Medal className="text-orange-500 mb-4" size={32} />
            <div className="text-5xl font-black text-slate-900 tracking-tighter">27</div>
            <p className="text-xs font-black text-orange-600 uppercase tracking-[0.2em] mt-2">Хүрэл медаль</p>
          </div>
          <div className="p-8 bg-blue-50 rounded-[32px] border border-blue-100">
            <Star className="text-blue-500 mb-4" size={32} />
            <div className="text-5xl font-black text-slate-900 tracking-tighter">42</div>
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mt-2">Тусгай байр</p>
          </div>
        </div>

        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-black text-slate-900 uppercase">Хувийн амжилтын жагсаалт</h2>
        </div>

        <div className="border border-slate-100 rounded-[32px] overflow-hidden shadow-xl shadow-slate-100/50">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Жил</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest">Оролцогч</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-center">Ранк</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right">Шагнал</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {results.map((res, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-6 text-sm font-black text-slate-400">{res.year}</td>
                  <td className="p-6 text-sm font-bold text-slate-800 tracking-tight">{res.name}</td>
                  <td className="p-6 text-sm font-medium text-slate-400 text-center">{res.rank}</td>
                  <td className="p-6 text-right">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getAwardStyle(res.award)}`}>
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