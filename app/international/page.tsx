"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Globe, Search } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface Achievement {
  year: number;
  name: string;
  rank: string;
  award: string;
  awardEn: string;
}

const OLYMPIAD_DATA: Record<string, Achievement[]> = {
  IPHO: [
    { year: 2025, name: "Batbayar Gurbazar", rank: "80", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2025, name: "Ichinbat Erkhembayar", rank: "93", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2025, name: "Munkh-Orgil Munkhtulga", rank: "157", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2025, name: "Azjargal Ganbold", rank: "162", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2025, name: "Enkhtugs Delgersaikhan", rank: "169", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2024, name: "Azjargal Ganbold", rank: "37", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2024, name: "Atarkhuu Soyolkhuu", rank: "70", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2024, name: "Batbayar Gurbazar", rank: "73", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2024, name: "Munkh-Orgil Munkhtulga", rank: "75", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2024, name: "Ichinbat Erkhembayar", rank: "99", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2023, name: "Anirchuluu Otgochuluu", rank: "96", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2023, name: "Azjargal Ganbold", rank: "140", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2023, name: "Batbayar Gurbazar", rank: "161", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2023, name: "Dulguun Luvsan", rank: "232", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2022, name: "Anirchuluu Otgochuluu", rank: "98", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2022, name: "Uguumur Tsagaanbayar", rank: "126", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2022, name: "Bilguun Batbayar", rank: "130", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2022, name: "Barsbold Enkhbold", rank: "191", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2022, name: "Unurtuvshin Erdenebileg", rank: "258", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2021, name: "Bilguun Batbayar", rank: "138", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2021, name: "Anirchuluu Otgochuluu", rank: "186", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2021, name: "Barsbold Enkhbold", rank: "221", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2021, name: "Temuulen Baasannorov", rank: "232", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2019, name: "Itgel Delgerdalai", rank: "177", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2019, name: "Khongor Damdinbayar", rank: "184", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2019, name: "Tsolmon Bazarragchaa", rank: "214", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2018, name: "Sumiyajav Sarangerel", rank: "109", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2018, name: "Amarbold Byambajargal", rank: "176", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2018, name: "Nyamtsogt Munkhbilguun", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2018, name: "Ganbaatar Sumiyabazar", rank: "244", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2018, name: "Khongor Damdinbayar", rank: "271", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2017, name: "Dulguun Lkhagvadorj", rank: "≥65", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2017, name: "Oyuntugs Luubaatar", rank: "≥65", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2017, name: "Amarbold Byambajargal", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2017, name: "Garid Erdenechuluun", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2017, name: "Sumiyajav Sarangerel", rank: "≥137", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2016, name: "Tserenchimeg Khasgerel", rank: "116", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2016, name: "Dulguun Lkhagvadorj", rank: "162", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2016, name: "Oyuntugs Luubaatar", rank: "168", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2016, name: "Garid Erdenechuluun", rank: "188", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2015, name: "Tserenchimeg Khasgerel", rank: "198", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2015, name: "Tugsbayasgalan Manlaibaatar", rank: "212", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2015, name: "Bayar Bat-Orgil", rank: "260", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2014, name: "Bat-Erdene Bat-Amgalan", rank: "87", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2014, name: "Duinkharjav Budmonde", rank: "123", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2014, name: "Tugsbayasgalan Manlaibaatar", rank: "156", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2014, name: "Javkhlantugs Unurtuvshin", rank: "192", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2014, name: "Bayar Bat-Orgil", rank: "214", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2013, name: "Duinkharjav Budmonde", rank: "170", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2013, name: "Zorigoo Garid", rank: "229", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2013, name: "Bat-Erdene Bat-Amgalan", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2012, name: "Battsooj Bayarsaikhan", rank: "199", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2012, name: "Bilguun Batjargal", rank: "224", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2012, name: "Tsogt Baigalmaa", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2012, name: "Battushig Myanganbayar", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2012, name: "Munkhtsetseg Battulga", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2011, name: "Dashdorj Orgilbold", rank: "106", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2011, name: "Bold Dorjpurev", rank: "168", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2011, name: "Ulam-Orgikh Tserendulam", rank: "227", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2010, name: "Bold Dorjpurev", rank: "143", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2010, name: "Batkhuyag Batsaikhan", rank: "196", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2010, name: "Khuslent Boldbaatar", rank: "224", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2010, name: "Undralbat Enkhbayar", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2008, name: "Battumur Batkhishig", rank: "146", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2008, name: "Byambadorj Tsenguun", rank: "233", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2008, name: "Bold Dorjpurev", rank: "238", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2008, name: "Naranbat Battuvshin", rank: "242", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2008, name: "Bold Bilegsaikhan", rank: "250", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2007, name: "Otgonbaatar Uuganbayar", rank: "151", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2007, name: "Enkhee Temuulen", rank: "213", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2006, name: "Otgonbaatar Myagmar", rank: "75", award: "Мөнгөн медаль", awardEn: "Silver Medal" },
    { year: 2006, name: "Otgonbaatar Uuganbayar", rank: "136", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2006, name: "Dashdavaa Khureltulga", rank: "158", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2005, name: "Otgonbaatar Myagmar", rank: "119", award: "Хүрэл медаль", awardEn: "Bronze Medal" },
    { year: 2005, name: "Otgonbaatar Uuganbayar", rank: "178", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2005, name: "Dashdavaa Khureltulga", rank: "195", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2004, name: "Otgonbaatar Myagmar", rank: "149", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2004, name: "Oidovdorj Gankhuyag", rank: "191", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2004, name: "Buyandalai Altansargai", rank: "203", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 2002, name: "Norovjav Tegshbayar", rank: "184", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 1999, name: "Altankhuyag Bilguun", rank: "200", award: "Тусгай байр", awardEn: "Honourable Mention" },
    { year: 1999, name: "Adiyasuren Altanbileg", rank: "205", award: "Тусгай байр", awardEn: "Honourable Mention" },
  ],
  APHO: [],
  EUPHO: [],
  IZHO: []
};

const TYPES = [
  { id: 'IPHO', name: 'IPhO', fullMn: 'Олон улсын физикийн олимпиад', fullEn: 'International Physics Olympiad' },
  { id: 'APHO', name: 'APhO', fullMn: 'Азийн физикийн олимпиад', fullEn: 'Asian Physics Olympiad' },
  { id: 'EUPHO', name: 'EuPhO', fullMn: 'Европын физикийн олимпиад', fullEn: 'European Physics Olympiad' },
  { id: 'IZHO', name: 'IZhO', fullMn: 'Олон улсын Жаутыковын олимпиад', fullEn: 'International Zhautykov Olympiad' },
];

export default function InternationalPage() {
  const [activeTab, setActiveTab] = useState('IPHO');
  const { t, lang, setLang } = useLanguage();

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
    if (award.includes("Silver") || award.includes("Мөнгө")) return "text-slate-600 font-[1000]";
    if (award.includes("Bronze") || award.includes("Хүрэл")) return "text-orange-700 font-[1000]";
    return "text-blue-700 font-[1000]";
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-900">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-[1000] italic tracking-tighter uppercase text-slate-950">
              {t('nav.intl_success')}
            </h1>
          </div>
          <button 
            onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
            className="px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black tracking-widest uppercase hover:bg-blue-700 transition shadow-lg"
          >
            {lang === 'mn' ? 'ENGLISH' : 'МОНГОЛ'}
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-12 bg-white p-3 rounded-[32px] border border-slate-200 shadow-md">
          {TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex-1 min-w-[100px] py-4 rounded-[24px] font-[1000] text-sm transition-all ${
                activeTab === type.id 
                ? 'bg-slate-950 text-white shadow-xl scale-[1.02]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        <div className="mb-10">
          <div className="inline-block bg-blue-100 text-blue-800 px-5 py-2 rounded-full text-[10px] font-[1000] uppercase tracking-widest mb-4 border border-blue-200">
            {lang === 'mn' ? TYPES.find(t => t.id === activeTab)?.fullMn : TYPES.find(t => t.id === activeTab)?.fullEn}
          </div>
          <h2 className="text-4xl font-[1000] italic text-slate-950 tracking-tighter uppercase leading-none">
            {lang === 'mn' ? 'Монгол улсын амжилт' : 'Mongolian Success'}
          </h2>
        </div>

        <div className="space-y-12">
          {sortedYears.length > 0 ? sortedYears.map((yearStr) => {
            const year = Number(yearStr);
            return (
              <div key={year}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-2xl font-[1000] italic text-slate-950">{year} {lang === 'mn' ? 'он' : 'year'}</div>
                  <div className="h-[2px] flex-1 bg-slate-200"></div>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {groupedResults[year].map((res, idx) => (
                    <div key={idx} className="bg-white p-7 rounded-[32px] border border-slate-200 flex items-center justify-between hover:border-blue-500 hover:shadow-xl transition-all group">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition shadow-inner border border-slate-50">
                          <Trophy className="text-slate-400 group-hover:text-blue-600" size={22} />
                        </div>
                        <span className="font-[1000] text-slate-900 text-xl tracking-tight leading-none italic uppercase">
                          {res.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-10">
                        <div className="flex flex-col items-end">
                          {/* Rank-ийг маш тод цэнхэр болгов */}
                          <span className="text-[11px] font-[1000] text-blue-700 uppercase tracking-[0.2em] mb-1">
                            RANK {res.rank}
                          </span>
                          <span className={`text-xs uppercase tracking-widest ${getAwardStyle(res.award)}`}>
                            {lang === 'mn' ? res.award : res.awardEn}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }) : (
            <div className="py-24 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-200 shadow-sm">
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <Search className="text-slate-300" size={40} />
              </div>
              <p className="text-slate-950 font-[1000] uppercase tracking-widest text-sm italic">
                {lang === 'mn' ? 'Мэдээлэл удахгүй нэмэгдэнэ.' : 'Data coming soon.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}