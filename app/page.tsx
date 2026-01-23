"use client";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. Header - Зөвхөн Лого болон цэс */}
      <nav className="border-b sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/" className="text-2xl font-black tracking-tighter text-blue-700">
            MPHO <span className="text-gray-400 font-light">| ARCHIVE</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
            <a href="#news" className="hover:text-blue-600 transition">Мэдээ</a>
            <a href="#archive" className="hover:text-blue-600 transition">Архив</a>
            <a href="#about" className="hover:text-blue-600 transition">Тухай</a>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section - Зарлал */}
      <section className="bg-gray-50 py-20 px-6 border-b">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            Монголын Физикийн Олимпиад
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Физикийн шинжлэх ухааныг сурталчлах, сурагчдын мэдлэгийг сорих улсын хэмжээний хамгийн том олимпиадын мэдээллийн нэгдсэн сан.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#archive" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition shadow-xl shadow-blue-100">
              АРХИВ ҮЗЭХ
            </a>
          </div>
        </div>
      </section>

      {/* 3. Олимпиадын архив - Хүн бүрт нээлттэй */}
      <section id="archive" className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-black mb-2 uppercase italic text-blue-900">Бодлогын сан</h2>
            <p className="text-gray-500">Оны дарааллаар ангилсан олимпиадын материалууд.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((year) => (
            <div key={year} className="group p-8 border-2 border-gray-100 rounded-3xl hover:border-blue-500 hover:shadow-2xl transition-all cursor-pointer bg-white">
              <div className="text-4xl font-black text-gray-200 group-hover:text-blue-100 transition mb-4">{year}</div>
              <h3 className="text-lg font-bold mb-4">{year} оны Улсын Олимпиад</h3>
              <div className="space-y-2">
                <button className="w-full py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition">БОДЛОГО</button>
                <button className="w-full py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-500 hover:bg-green-50 hover:text-green-600 transition">БОДОЛТ</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="text-2xl font-black mb-2">MPHO</div>
            <p className="text-gray-500 text-sm">© 2026 Монголын Физикийн Олимпиад. Бүх эрх хуулиар хамгаалагдсан.</p>
          </div>
          <div className="flex gap-6 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-white transition">Фэйсбүүк</a>
            <a href="#" className="hover:text-white transition">Холбоо барих</a>
          </div>
        </div>
      </footer>
    </main>
  );
}