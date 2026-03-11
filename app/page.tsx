"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ArrowRight, BookOpen, Newspaper, Globe, Menu, X, UserPlus, User, LogOut, ShieldCheck } from "lucide-react";
import { useLanguage } from "../lib/LanguageContext";
import BackgroundSlider from "../components/BackgroundSlider";

export default function Home() {
  const { t, lang, setLang } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("mpho_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("mpho_user");
    setUser(null);
    setMenuOpen(false);
  };

  return (
    <main className="min-h-screen relative isolate overflow-hidden font-sans text-white selection:bg-blue-500 selection:text-white">

      <BackgroundSlider />

      <nav className="border-b border-white/10 sticky top-0 z-50 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="relative w-8 h-8">
              <Image src="/logo.png" alt="MPHO Logo" fill className="object-contain" />
            </div>
            <span className="text-base md:text-xl font-black tracking-tighter uppercase italic text-white">
              MPHO.MN
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/archive" className="px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all">
              {t('nav.archive')}
            </Link>
            <Link href="/news" className="px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all">
              {lang === 'mn' ? 'МЕДЭЭ' : 'NEWS'}
            </Link>
            <Link href="/international-olympiad" className="px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all">
              {lang === 'mn' ? 'ОЛОН УЛСЫН ОЛИМПИАД' : 'INTERNATIONAL'}
            </Link>
            <Link href="/about" className="px-4 py-2 rounded-full text-xs font-black tracking-widest uppercase text-white/80 hover:text-white hover:bg-white/10 transition-all">
              {lang === 'mn' ? 'БИДНИЙ ТУХАЙ' : 'ABOUT'}
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" className="hidden md:flex items-center gap-2 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/30 rounded-full text-xs font-black tracking-widest transition-all text-yellow-300">
                    <ShieldCheck size={11} />
                    АДМИН
                  </Link>
                )}
                <Link href="/profile" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black tracking-widest transition-all border border-white/10">
                  <User size={11} />
                  ПРОФАЙЛ
                </Link>
                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 rounded-full text-xs font-black tracking-widest transition-all border border-white/10 text-white/70 hover:text-red-300"
                >
                  <LogOut size={11} />
                  {lang === 'mn' ? 'ГАРАХ' : 'LOGOUT'}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black tracking-widest transition-all border border-white/10">
                  {lang === 'mn' ? 'НЭВТРЭХ' : 'LOGIN'}
                </Link>
                <Link href="/register" className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-black tracking-widest transition-all">
                  <UserPlus size={11} />
                  {lang === 'mn' ? 'БҮРТГҮҮЛЭХ' : 'REGISTER'}
                </Link>
              </>
            )}

            <button
              onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
              className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 rounded-full text-xs font-black tracking-widest transition-all border border-white/10 active:scale-95"
            >
              <Globe size={11} />
              {lang === 'mn' ? 'EN' : 'MN'}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-all"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black/40 backdrop-blur-md px-6 py-4 flex flex-col gap-2">
            <Link href="/archive" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
              {t('nav.archive')}
            </Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
              {lang === 'mn' ? 'МЕДЭЭ' : 'NEWS'}
            </Link>
            <Link href="/international-olympiad" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
              {lang === 'mn' ? 'ОЛОН УЛСЫН ОЛИМПИАД' : 'INTERNATIONAL'}
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
              {lang === 'mn' ? 'БИДНИЙ ТУХАЙ' : 'ABOUT'}
            </Link>
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link href="/admin" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-yellow-300 transition-all border-b border-white/10">
                    АДМИН ПАНЕЛ
                  </Link>
                )}
                <Link href="/profile" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
                  ПРОФАЙЛ
                </Link>
                <button onClick={handleLogout} className="py-3 text-left text-xs font-black tracking-widest uppercase text-red-400 hover:text-red-300 transition-all">
                  {lang === 'mn' ? 'ГАРАХ' : 'LOGOUT'}
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-white/80 hover:text-white transition-all border-b border-white/10">
                  {lang === 'mn' ? 'НЭВТРЭХ' : 'LOGIN'}
                </Link>
                <Link href="/register" onClick={() => setMenuOpen(false)} className="py-3 text-xs font-black tracking-widest uppercase text-blue-400 hover:text-blue-300 transition-all">
                  {lang === 'mn' ? 'БҮРТГҮҮЛЭХ' : 'REGISTER'}
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center relative z-20">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Link href="/archive" className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/50 border border-blue-500 text-sm">
            <BookOpen size={18} />
            <span>{t('nav.archive')}</span>
          </Link>
          <Link href="/news" className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-2xl font-bold transition-all backdrop-blur-md flex items-center justify-center gap-2 hover:border-white/40 text-sm">
            <Newspaper size={18} />
            <span>{t('home.browse_updates')}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <p className="text-slate-400 text-xs font-black uppercase tracking-widest opacity-80">
          © 2026 {t('home.physics_committee')}
        </p>
      </div>
    </main>
  );
}