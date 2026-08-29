"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      } ${
        isScrolled
          ? "bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800/80 shadow-xl shadow-black/30"
          : "bg-[#0B132B]/85 backdrop-blur-sm border-b border-slate-800/40"
      }`}
    >
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo - Left Aligned */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-lg px-2.5 py-1 rounded-md shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            R1  
          </span>
          <span className="text-white font-extrabold text-2xl tracking-tight group-hover:text-orange-400 transition-colors">
            R1OT
          </span>
        </Link>

        {/* Navigation Links - Right Aligned */}
        <nav className="flex items-center space-x-6 md:space-x-8 text-sm font-semibold">
          <Link
            href="/rpl"
            className={`transition-colors hover:text-orange-400 ${
              pathname === "/rpl" ? "text-orange-500 font-bold" : "text-slate-300"
            }`}
          >
            RPL
          </Link>
          <Link
            href="/antares"
            className={`transition-colors hover:text-orange-400 ${
              pathname === "/antares" ? "text-orange-500 font-bold" : "text-slate-300"
            }`}
          >
            Antares IoT
          </Link>
          <Link
            href="/projects"
            className={`transition-colors hover:text-orange-400 ${
              pathname === "/projects" ? "text-orange-500 font-bold" : "text-slate-300"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/tentang-kami"
            className={`transition-colors hover:text-orange-400 ${
              pathname === "/tentang-kami" ? "text-orange-500 font-bold" : "text-slate-300"
            }`}
          >
            Tentang Kami
          </Link>
        </nav>
      </div>
    </header>
  );
}