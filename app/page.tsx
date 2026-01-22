import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Толгой хэсэг (Navigation) */}
      <nav className="p-6 border-b flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-black text-blue-900 tracking-tighter">MPHO</h1>
        <div className="space-x-8 font-bold text-slate-700">
          <Link href="/archive" className="hover:text-blue-600 transition">Олимпиадын архив</Link>
          <Link href="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">Бүртгүүлэх</Link>
        </div>
      </nav>

      {/* Гол хэсэг (Hero Section) */}
      <main className="max-w-4xl mx-auto text-center py-32 px-6">
        <h2 className="text-7xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tight">
          Монголын Физикийн <br />
          <span className="text-blue-600 italic">Олимпиад</span>
        </h2>
        <p className="text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto font-medium">
          2000 оноос өнөөдрийг хүртэлх бүх олимпиадын мэдээлэл, бодлого, бодолтын нэгдсэн сан.
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/archive" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl hover:scale-105">
            Олимпиадын архив үзэх
          </Link>
        </div>
      </main>
    </div>
  );
}