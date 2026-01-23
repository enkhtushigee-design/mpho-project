"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Globe, Search } from "lucide-react";

// Датаны бүтцийг тодорхойлж өгснөөр Build алдаанаас сэргийлнэ
interface Achievement {
  year: number;
  name: string;
  rank: string;
  award: string;
}

const OLYMPIAD_DATA: Record<string, Achievement[]> = {
  IPHO: [
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
  ],
  APHO: [],
  EUPHO: [],
  IZHO: []
};

const TYPES = [
  { id: 'IPHO', name: 'IPhO', full: 'International Physics Olympiad' },
  { id: 'APHO', name: 'APhO', full: 'Asian Physics Olympiad' },
  { id: 'EUPHO', name: 'EuPhO', full: 'European Physics Olympiad' },
  { id: 'IZHO', name: 'IZhO', full: 'International Zhautykov Olympiad' },
];

export default function InternationalPage() {
  const [activeTab, setActiveTab] = useState('IPHO');

  const getGroupedData = (type: string) => {
    const data = OLYMPIAD_DATA[type] || [];
    return data.reduce((acc: Record<number, Achievement[]>, curr: Achievement) => {
      if (!acc[curr.year]) acc[curr.year] = [];
      acc[curr.year].push(curr);
      return acc;
    }, {});
  };

  const groupedResults = getGroupedData(activeTab);
  const sortedYears = Object.keys(groupedResults).sort((a, b) => Number(b) - Number(a));

  const getAwardStyle = (award: string) => {
    if (award.includes("Silver")) return "text-slate-500 font-black";
    if (award.includes("Bronze")) return "text-orange-600 font-black";
    return "text-blue-500 font-black";
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-900">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-xl font-black tracking-tighter uppercase text-slate-900">Олон улсын амжилт</h1>
          </div>
          <Globe className="text-slate-200" size={24} />
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-12 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
          {TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex-1 min-w-[100px] py-4 rounded-[18px] font-black text-sm transition-all ${
                activeTab === type.id 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="mb-10">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
            {TYPES.find(t => t.id === activeTab)?.full}
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Монгол улсын амжилт</h2>
        </div>

        <div className="space-y-12">
          {sortedYears.length > 0 ? sortedYears.map((yearStr) => {
            const year = Number(yearStr);
            return (
              <div key={year}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-2xl font-black text-slate-900">{year} он</div>
                  <div className="h-[1px] flex-1 bg-slate-200"></div>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {groupedResults[year].map((res, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 flex items-center justify-between hover:border-blue-500 transition-all group">
                      <div className="flex items-center gap-5">
                        <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition">
                          <Trophy className="text-slate-300 group-hover:text-blue-500" size={18} />
                        </div>
                        <span className="font-bold text-slate-800 text-lg tracking-tight">{res.name}</span>
                      </div>
                      <div className="flex items-center gap-8">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Rank {res.rank}</span>
                        <span className={`text-xs uppercase tracking-widest ${getAwardStyle(res.award)}`}>
                          {res.award}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }) : (
            <div className="py-24 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
              <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-slate-200" size={32} />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-sm italic">Мэдээлэл удахгүй нэмэгдэнэ.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}