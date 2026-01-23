"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* 1. Навигаци (Лого) */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-black text-blue-700 tracking-tighter">MPHO ARCHIVE</h1>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">Олимпиадын архив</h2>
          <p className="text-gray-500 text-xl max-w-2xl">
            Улсын болон бүсийн физикийн олимпиадын бүх бодлого, бодолтууд нэг дор.
          </p>
        </div>

        {/* 3. Архивын жагсаалт (Яг анхны том картууд) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016].map((year) => (
            <div 
              key={year} 
              className="group p-8 border-2 border-gray-100 rounded-3xl hover:border-blue-500 hover:shadow-2xl transition-all duration-300 cursor-pointer bg-white"
            >
              {/* Жилийн тэмдэгт */}
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                {year}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {year} оны Улсын олимпиад
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Физикийн олимпиадын 1 болон 2-р давааны бүх бодлого, хариу болон оноожуулах зааврууд.
              </p>
              
              <div className="flex gap-3">
                <button className="flex-1 bg-gray-50 py-3 rounded-xl text-[11px] font-black text-gray-500 uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 transition">
                  Бодлого
                </button>
                <button className="flex-1 bg-gray-50 py-3 rounded-xl text-[11px] font-black text-gray-500 uppercase tracking-widest hover:bg-green-50 hover:text-green-600 transition">
                  Бодолт
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="border-t py-12 px-6 bg-gray-50 mt-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
            © 2026 Монголын Физикийн Олимпиад
          </p>
          <div className="flex gap-8 text-sm font-black text-gray-400">
            <a href="#" className="hover:text-blue-600 transition uppercase tracking-tighter">Фэйсбүүк</a>
            <a href="#" className="hover:text-blue-600 transition uppercase tracking-tighter">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </main>
  );
}