"use client";
import Link from "next/link";
import { Medal, Star, ArrowLeft, Trophy } from "lucide-react";

export default function InternationalPage() {
  const rawResults = [
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

  // Оноор бүлэглэх логик
  const groupedResults = rawResults.reduce((acc: any, curr) => {
    if (!acc[curr.year]) acc[curr.year] = [];
    acc[curr.year].push(curr);
    return acc;
  }, {});

  const years = Object.keys(groupedResults).sort((a, b) => Number(b) - Number(a));

  const getAwardStyle = (award: string) => {
    if (award.includes("Silver")) return "text-slate-500 font-bold";
    if (award.includes("Bronze")) return "text-orange-600 font-bold";
    if (award.includes("Honourable")) return "text-blue-500 font-bold";
    return "text-slate-400";
  };

  return (
    <main className="min-h-screen bg-slate-50 pb-20 font-sans">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-4">
          <Link href="/" className="p-2 hover:bg-slate-50 rounded-full transition text-slate-400 hover:text-slate-900">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-lg font-black tracking-tight uppercase text-slate-900">IPhO Амжилтын түүх</h1>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-black text-slate-900 mb-2 tracking-tight">Individual Results</h2>
          <p className="text-slate-500 font-medium">Монгол улсын баг тамирчдын олон улсын физикийн олимпиадад үзүүлсэн амжилтууд.</p>
        </div>

        {/* Timeline List */}
        <div className="space-y-10">
          {years.map((year) => (
            <div key={year} className="relative">
              {/* Year Heading */}
              <div className="flex items-center gap-4 mb-4">
                <div className="text-2xl font-black text-blue-600 w-16">{year}</div>
                <div className="h-[2px] flex-1 bg-slate-200 rounded-full"></div>
              </div>

              {/* Contestants in that Year */}
              <div className="bg-white rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="divide-y divide-slate-50">
                  {groupedResults[year].map((res: any, idx: number) => (
                    <div key={idx} className="p-5 flex items-center justify-between hover:bg-slate-50/50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                        <span className="font-bold text-slate-800 tracking-tight text-md">{res.name}</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">Rank {res.rank}</span>
                        <span className={`text-sm uppercase tracking-tighter font-black ${getAwardStyle(res.award)}`}>
                          {res.award}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}