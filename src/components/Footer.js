"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import Typewriter from "@/components/Typewriter";

function GithubIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TiktokIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
  );
}

function WhatsappIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// Lightweight typewriter effect component — pure CSS animation, zero JS intervals
function TypewriterText({ phrases, isLight }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];

    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, displayText.length + 1));
        }, 60 + Math.random() * 40); // Natural typing speed variation
      } else {
        // Pause at end of phrase
        timeoutRef.current = setTimeout(() => setIsDeleting(true), 2200);
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayText, isDeleting, currentIndex, phrases]);

  return (
    <span className="inline-flex items-center">
      <span className={`font-mono text-sm sm:text-base ${isLight ? "text-orange-600" : "text-[#FF5722]"}`}>
        {displayText}
      </span>
      <span className={`inline-block w-[2px] h-5 ml-0.5 animate-pulse ${isLight ? "bg-orange-500" : "bg-[#FF5722]"}`} />
    </span>
  );
}

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const typingPhrases = [
    "Bridging Software & IoT",
    "Building the Future of IoT",
    "RPL × Antares Ecosystem",
    "Code Meets Reality",
    "Real-time Telemetry Dashboard",
  ];

  return (
    <footer
      className={`border-t pt-14 pb-8 transition-colors duration-500 ${
        isLight
          ? "bg-slate-100 border-slate-200 text-slate-700"
          : "bg-[#0A0F1D] border-slate-800/80 text-slate-300"
      }`}
    >
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Content */}
        <div className="flex flex-col items-center text-center space-y-6 pb-10">
          {/* Brand Logo */}
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center overflow-hidden p-1 transition-all duration-300 ${
                isLight
                  ? "bg-[#0D1526] border border-slate-700/60 shadow-lg group-hover:border-orange-500/50"
                  : "bg-[#0D1526] border border-slate-800 shadow-md group-hover:border-orange-500/50"
              }`}
            >
              <img
                src="/img/logo.png"
                alt="Logo R1OT"
                className="w-full h-full object-contain transform group-hover:scale-115 transition-transform duration-300"
              />
            </div>
            <span
              className={`font-extrabold text-2xl sm:text-3xl tracking-tight transition-colors ${
                isLight ? "text-slate-900 group-hover:text-orange-500" : "text-white group-hover:text-orange-400"
              }`}
            >
              R1OT
            </span>
          </Link>

          {/* Description */}
          <p className={`text-sm leading-relaxed max-w-lg ${isLight ? "text-slate-600" : "text-slate-400"}`}>
            Membangun masa depan IoT melalui keunggulan Rekayasa Perangkat Lunak. Terintegrasi sepenuhnya dengan Antares Platform.
          </p>

          {/* Typewriter Animation Text */}
          <div className={`h-8 flex items-center justify-center gap-2 font-mono text-xs sm:text-sm ${isLight ? "text-orange-600 font-semibold" : "text-[#FF5722] font-medium"}`}>
            <span className="text-emerald-500 font-bold select-none">&gt;_</span>
            <Typewriter phrases={typingPhrases} typingSpeed={65} deletingSpeed={30} pauseDuration={2200} />
          </div>

          {/* Social Icons Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {/* GitHub */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-600 hover:text-orange-500 hover:border-orange-500"
                  : "bg-[#131C31] border-slate-800 text-slate-400 hover:text-orange-400 hover:border-orange-500/40"
              }`}
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/ofctwelveone.35"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-600 hover:text-pink-500 hover:border-pink-500"
                  : "bg-[#131C31] border-slate-800 text-slate-400 hover:text-pink-400 hover:border-pink-500/40"
              }`}
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@ofcelvone_35"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-600 hover:text-cyan-500 hover:border-cyan-500"
                  : "bg-[#131C31] border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40"
              }`}
              aria-label="TikTok"
            >
              <TiktokIcon />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/623196278286"
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:scale-110 ${
                isLight
                  ? "bg-white border-slate-300 text-slate-600 hover:text-emerald-500 hover:border-emerald-500"
                  : "bg-[#131C31] border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40"
              }`}
              aria-label="WhatsApp"
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          className={`pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono transition-colors ${
            isLight ? "border-slate-300 text-slate-500" : "border-slate-800/80 text-slate-500"
          }`}
        >
          <p>© 2026 R1OT X ANTARES TELKOM. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-orange-500 transition-colors uppercase tracking-wider">
              PRIVACY POLICY
            </Link>
            <Link href="#" className={`transition-colors uppercase tracking-wider ${isLight ? "hover:text-orange-500" : "hover:text-slate-300"}`}>
              TERMS OF SERVICE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
