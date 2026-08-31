"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";
import Typewriter from "@/components/Typewriter";

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isLight = theme === "light";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Tentang Kami", href: "#tentang-kami" },
    { name: "RPL", href: "#rpl" },
    { name: "Antares IoT", href: "#antares" },
    { name: "Keunggulan", href: "#keunggulan" },
    { name: "Project Kami", href: "#project-kami" },
    { name: "AI AR1", href: "#ai-terminal" },
    { name: "Tim Penggarap", href: "#tim-penggarap" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isLight
          ? isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-md text-slate-900"
            : "bg-slate-50/80 backdrop-blur-md border-b border-slate-200/50 text-slate-900"
          : isScrolled
            ? "bg-[#080D1A]/95 backdrop-blur-xl border-b border-slate-800/90 shadow-2xl shadow-black/50 text-white"
            : "bg-[#080D1A]/80 backdrop-blur-md border-b border-slate-800/40 text-white"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0 w-44 sm:w-48">
          <div
            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center overflow-hidden p-1 shrink-0 transition-all duration-300 ${
              isLight
                ? "bg-[#0D1526] border border-slate-700/60 shadow-lg group-hover:border-orange-500/50 group-hover:shadow-orange-500/10"
                : "bg-[#0D1526] border border-slate-800 shadow-md group-hover:border-orange-500/50"
            }`}
          >
            <img
              src="/img/logo.png"
              alt="Logo R1OT"
              className="w-full h-full object-contain transform group-hover:scale-115 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span
              className={`font-extrabold text-xl sm:text-2xl tracking-tight leading-none transition-colors ${
                isLight ? "text-slate-900 group-hover:text-orange-500" : "text-white group-hover:text-orange-400"
              }`}
            >
              R1OT
            </span>
            <span className="text-[10px] font-mono text-orange-500 font-semibold tracking-wider flex items-center gap-1 mt-0.5 w-[110px] sm:w-[120px] overflow-hidden whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <Typewriter phrases={["SYSTEM: ONLINE", "ANTARES IOT", "RPL CLASS 12"]} typingSpeed={60} deletingSpeed={30} pauseDuration={2500} />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 text-sm font-semibold">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-[#FF5722] ${
                isLight ? "text-slate-700 hover:text-orange-600" : "text-slate-300 hover:text-[#FF5722]"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Action Controls: Theme Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 sm:p-2.5 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isLight
                ? "bg-white border-slate-300 text-amber-500 hover:bg-slate-100 shadow-sm"
                : "bg-[#0D1526] border-slate-800 text-amber-400 hover:bg-[#18233a] shadow-md"
            }`}
            aria-label="Toggle Theme Mode"
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {isLight ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-xl border transition-all ${
              isLight
                ? "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
                : "bg-[#0D1526] border-slate-800 text-slate-200 hover:bg-[#18233a]"
            }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden border-b shadow-2xl transition-all duration-300 px-6 py-6 ${
            isLight
              ? "bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900"
              : "bg-[#080D1A]/95 backdrop-blur-xl border-slate-800 text-white"
          }`}
        >
          <nav className="flex flex-col space-y-3 font-semibold text-base">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors hover:bg-orange-500/10 hover:text-orange-500 ${
                  isLight ? "text-slate-800" : "text-slate-200"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}