'use client';

import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import ProfileCard from '@/components/Card/Profile';
import ProjectGrid from '@/components/ProjectGrid';
import HeroAnime from '@/components/HeroAnime';
import SectionTitle from '@/components/SectionTitle';
import Counter from '@/components/Counter';
import teamData from '../../data/team.json';
import workflowData from '../../data/workflow.json';
import rawProjectsData from '@/data/projects.json';
import Typewriter from '@/components/Typewriter';
import { animate, stagger } from 'animejs';

import {
  Code,
  Terminal,
  Database,
  ShieldCheck,
  Sparkles,
  Cpu,
  Server,
  Wifi,
  Zap,
  Layers,
  Layout,
  Rocket,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const projectsData = rawProjectsData.map((p) => ({
  id: p.id,
  badge: p.tags && p.tags[0] ? p.tags[0] : 'Website',
  title: p.title,
  description: p.description,
  image: `https://api.microlink.io/?url=${encodeURIComponent(p.url)}&screenshot=true&meta=false&embed=screenshot.url`,
  fallbackImage: `https://placehold.co/600x400/1e293b/ffffff?text=${encodeURIComponent(p.title)}`,
  link: p.url,
  stats: Array.isArray(p.member) ? p.member[0] : p.member,
  tags: p.tags || []
}));

const categories = [
  'Semua Proyek',
  ...new Set(
    rawProjectsData
      .flatMap((p) => p.tags || [])
      .map((tag) => (tag.toLowerCase() === 'html' ? 'HTML' : tag))
  )
];

const iconMap = {
  Layout: Layout,
  Code: Code,
  Cpu: Cpu,
  Server: Server,
  Rocket: Rocket,
};

export default function LandingPage() {
  const { theme } = useTheme();

  const [selectedCategory, setSelectedCategory] = useState('Semua Proyek');
  const [inputMessage, setInputMessage] = useState('');
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(null);
  const [hoveredWorkflowStep, setHoveredWorkflowStep] = useState(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([
    { type: 'cmd', text: 'oit@system:~$ AI AR1 Terminal Online' },
  ]);

  const scrollContainerRef = useRef(null);
  const terminalContainerRef = useRef(null);

  // Animated typing into AI input textarea for interactive UX
  const handleQuickPrompt = useCallback((text) => {
    if (isAiLoading) return;
    setInputMessage('');
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setInputMessage(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 25);
  }, [isAiLoading]);

  // Auto-scroll terminal console container directly to bottom when new logs appear or loading state changes
  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [terminalLogs, isAiLoading]);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleRunRequest = useCallback(async () => {
    if (!inputMessage.trim() || isAiLoading) return;

    const userMsg = inputMessage.trim();
    setInputMessage('');
    setIsAiLoading(true);

    // Log user command
    setTerminalLogs((prev) => [
      ...prev,
      { type: 'user', text: userMsg },
    ]);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();

      if (!res.ok) {
        setTerminalLogs((prev) => [
          ...prev,
          { type: 'error', text: data.error || 'Request gagal' },
        ]);
        return;
      }

      const aiResponse = data.response || 'Tidak ada response';

      setTerminalLogs((prev) => [
        ...prev,
        { type: 'ai', text: aiResponse },
      ]);
    } catch (err) {
      setTerminalLogs((prev) => [
        ...prev,
        { type: 'error', text: `Koneksi gagal: ${err.message}` },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  }, [inputMessage, isAiLoading]);

  const filteredProjects = selectedCategory === 'Semua Proyek'
    ? projectsData
    : projectsData.filter((p) =>
      p.badge.toLowerCase() === selectedCategory.toLowerCase() ||
      (p.tags && p.tags.some((tag) => tag.toLowerCase() === selectedCategory.toLowerCase()))
    );

  // Seamless infinite loop array generation for marquee carousel
  const marqueeProjects = useMemo(() => {
    if (filteredProjects.length === 0) return [];
    let list = [...filteredProjects];
    while (list.length < 10) {
      list = [...list, ...filteredProjects];
    }
    return [...list, ...list];
  }, [filteredProjects]);

  const isLight = theme === 'light';

  return (
    <div
      className={`min-h-screen relative font-sans transition-colors duration-500 ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#080D1A] text-white'
        }`}
    >
      {/* Background Ambient Glows */}
      {isLight ? (
        <>
          <div className="absolute -top-32 -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-orange-400/20 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
          <div className="absolute top-[25%] -right-32 w-[380px] sm:w-[540px] h-[380px] sm:h-[540px] bg-sky-400/25 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />
          <div className="absolute top-[60%] -left-32 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] bg-blue-500/15 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute -top-32 -left-32 w-[350px] sm:w-[480px] h-[350px] sm:h-[480px] bg-orange-600/12 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
          <div className="absolute top-[25%] -right-32 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] bg-sky-600/10 rounded-full blur-[120px] sm:blur-[160px] pointer-events-none" />
          <div className="absolute top-[60%] -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-[110px] sm:blur-[150px] pointer-events-none" />
        </>
      )}

      {/* ================= 1. HERO SECTION ================= */}
      <HeroAnime>
      <section id="hero" className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center relative z-10 scroll-mt-24">
        {/* Interactive Typewriter Badge */}
        <div data-anime="badge" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-6 backdrop-blur-md shadow-sm font-mono text-xs font-semibold text-orange-500 bg-orange-500/10 border-orange-500/20">
          <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
          <span className="text-slate-400 font-sans"></span>
          <Typewriter
            phrases={[
              "Rekayasa Perangkat Lunak Presisi",
              "Fahri Nasrulloh ❤ Lord Tunat",
              "Febri x Vicineko 😍",
              "Solusi Cerdas Masa Depan",
              "Ridwan 50/50 bahik jahat 😈",
              "Nao Tomori ❤️",
              "Aditya Anugerahh ❤ Nanakusa Nazuna",
              "Where Code Meets Reality 🚀",
              "Antares OneM2M Terintegrasi",
              "Telemetri Real-time via MQTT",
              "Ramdhani Full Stack Wizard 💻",
              "Cahya Ngoding React Sampe Pagi 🌙",
              "Latensi <30ms, Gak Pake Lag ⚡",
              "AI AR1 Online 🤖"
            ]}
            typingSpeed={60}
            deletingSpeed={30}
            pauseDuration={2200}
          />
        </div>

        <h1 data-anime="title" className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-4xl">
          Where Code Meets <span className="italic font-normal font-serif">Reality</span>:
          <br className="hidden sm:block" />
          <span className="text-[#FF5722]">Bridging Software &amp; IoT</span>
        </h1>

        <p
          data-anime="sub"
          className={`mt-4 sm:mt-6 text-sm sm:text-base max-w-2xl leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
        >
          Kami adalah Tim IOT, menghadirkan ekosistem terpadu antara{' '}
          <strong className={isLight ? 'text-slate-900 font-semibold' : 'text-white font-medium'}>
            Rekayasa Perangkat Lunak
          </strong>{' '}
          dan infrastruktur{' '}
          <strong className="text-[#FF5722] font-semibold">
            Antares IoT
          </strong>{' '}
          untuk solusi cerdas masa depan.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <a
            data-anime="cta"
            href="#project-kami"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('project-kami')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 fill-current rotate-45 -mt-0.5" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Explore Projects
          </a>
          <a
            data-anime="cta"
            href="#tentang-kami"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('tentang-kami')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 border text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 ${isLight
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                : 'bg-[#0D1526]/80 border-slate-800 text-slate-300 hover:bg-[#18233a]'
              }`}
          >
            Tentang Kami &amp; Alur Kerja
          </a>
        </div>

        {/* Feature Cards Banner */}
        <div
          data-anime="card"
          className={`mt-10 sm:mt-14 w-full backdrop-blur-xl border rounded-2xl md:rounded-3xl p-5 sm:p-8 text-left transition-all shadow-2xl relative ${isLight
              ? 'bg-white/90 border-slate-200/90 shadow-sky-500/10'
              : 'bg-[#0D1526]/80 border-slate-800/80 shadow-black/40'
            }`}
        >
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <span className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full inline-block" />
            <span className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full inline-block" />
            <span className="w-2.5 h-2.5 bg-[#27C93F] rounded-full inline-block" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <span className="text-[11px] font-mono tracking-wide text-[#EA580C] block mb-1 font-semibold">
                // Proyek Kami
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                <Counter end={50} suffix="+" /> Proyek
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Kami aktif mengirimkan telemetri secara real-time melalui protokol MQTT.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-wide text-[#0284C7] block mb-1 font-semibold">
                // CLOUD_PROCESS
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                OneM2M
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Standar global infrastruktur IoT Antares untuk manajemen data terpusat.
              </p>
            </div>

            <div className="sm:col-span-2 md:col-span-1">
              <span className="text-[11px] font-mono tracking-wide text-[#059669] block mb-1 font-semibold">
                // WEB_OUTPUT
              </span>
              <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                RPL Dash
              </h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Visualisasi data presisi tinggi dengan framework modern (React/Next.js).
              </p>
            </div>
          </div>
        </div>
      </section>
      </HeroAnime>

      {/* ================= 2. TENTANG KAMI + ALUR KERJA ================= */}
      <section id="tentang-kami" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 scroll-mt-24 space-y-12 sm:space-y-16">
        {/* Header & Vision/Mission */}
        <SectionTitle className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Tentang <span className="text-[#FF5722]">Kami</span>
          </h2>

          <p className={`max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'
            }`}>
            Di balik layar inovasi <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white font-semibold'}>Tim OIT</strong> — menjembatani
            <span className="text-[#FF5722] font-medium"> Rekayasa Perangkat Lunak (RPL)</span> dan
            <span className="text-[#FF5722] font-medium"> Infrastruktur Antares IoT</span> untuk menghadirkan platform modern yang responsif.
          </p>
        </SectionTitle>

          {/* Terminal Style Visi & Misi Card */}
          <div
            data-aos="flip-up"
            data-aos-delay="150"
            className={`mt-6 sm:mt-8 border rounded-2xl p-4 sm:p-6 text-left max-w-3xl mx-auto shadow-2xl backdrop-blur-md transition-all ${isLight ? 'bg-white border-slate-200 shadow-slate-200' : 'bg-[#131C31]/90 border-slate-800 shadow-black/40'
              }`}
          >
            <div className="flex items-center gap-2 pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-300 dark:border-slate-800/80">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className={`text-[11px] sm:text-xs font-mono ml-2 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                system_vision_manifest.log
              </span>
            </div>

            <div className="space-y-4 font-mono text-xs sm:text-sm">
              <div>
                <span className="text-emerald-500 font-bold">// VISI_UTAMA</span>
                <p className={`mt-1 pl-3 sm:pl-4 border-l-2 border-orange-500/40 leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Menjadi pusat inovasi teknologi terpadu yang menghubungkan aplikasi web presisi tinggi dengan ekosistem sensor fisik IoT secara real-time.
                </p>
              </div>

              <div>
                <span className="text-emerald-500 font-bold">// MISI_PENGEMBANGAN</span>
                <p className={`mt-1 pl-3 sm:pl-4 border-l-2 border-orange-500/40 leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Membangun arsitektur perangkat lunak yang bersih, antarmuka pengguna yang ramah, dan transmisi data telemetri berkecepatan tinggi via protokol MQTT &amp; HTTP REST API.
                </p>
              </div>
            </div>
          </div>

        {/* Alur Kerja Pembuatan Website — Vertical Timeline with Expandable Cards */}
        <div className="space-y-8 sm:space-y-10">
          <SectionTitle className="text-center space-y-2 sm:space-y-3">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Alur Kerja Pembuatan Website
            </h3>
            <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Tahapan sistematis dari ideasi awal hingga pembuatan komponen dan integrasi data real-time. (Arahkan kursor atau klik kartu untuk melihat detail)
            </p>
          </SectionTitle>

          <div className="relative max-w-3xl mx-auto py-2">
            {/* Center Connecting Vertical Line */}
            <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-orange-500 via-amber-500 to-emerald-500 opacity-40 z-0" />

            <div className="space-y-4 sm:space-y-5 relative z-10">
              {workflowData.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Code;
                const isExpanded = activeWorkflowStep === item.step || hoveredWorkflowStep === item.step;

                return (
                  <div
                    key={item.step}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    onMouseEnter={() => setHoveredWorkflowStep(item.step)}
                    onMouseLeave={() => setHoveredWorkflowStep(null)}
                    onClick={() => setActiveWorkflowStep(activeWorkflowStep === item.step ? null : item.step)}
                    className={`group relative max-w-2xl mx-auto border rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer shadow-md ${isExpanded
                        ? isLight
                          ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.01]'
                          : 'bg-[#131C31] border-orange-500/80 shadow-lg shadow-orange-500/20 scale-[1.01]'
                        : isLight
                          ? 'bg-white/95 border-slate-200 hover:border-orange-400/60 shadow-sm'
                          : 'bg-[#0D1526]/95 border-slate-800 hover:border-orange-500/40 shadow-sm'
                      }`}
                  >
                    {/* Header Row (Step Number + Icon + Category + Title + Chevron) */}
                    <div className="flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                        {/* Step Icon Badge */}
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded
                            ? 'bg-[#FF5722] text-white border-orange-500 scale-105 shadow-md shadow-orange-500/30'
                            : 'bg-orange-500/10 border-orange-500/30 text-[#FF5722] group-hover:scale-105'
                          }`}>
                          <IconComponent size={22} />
                        </div>

                        {/* Title & Category */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-mono font-bold text-orange-500">
                              STEP {item.step}
                            </span>
                            <span className="text-[10px] font-mono text-emerald-500 font-semibold truncate">
                              {item.category}
                            </span>
                          </div>
                          <h4 className={`text-sm sm:text-base font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'
                            }`}>
                            {item.title}
                          </h4>
                        </div>
                      </div>

                      {/* Expand Chevron Icon */}
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-orange-500 bg-orange-500/10' : isLight ? 'text-slate-400' : 'text-slate-500'
                        }`}>
                        <ChevronDown size={18} />
                      </div>
                    </div>

                    {/* Expandable Detail Section */}
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-3 pt-3 border-t border-slate-200 dark:border-slate-800/80' : 'grid-rows-[0fr] opacity-0'
                        }`}
                    >
                      <div className="overflow-hidden">
                        <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'
                          }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. REKAYASA PERANGKAT LUNAK (RPL) SECTION ================= */}
      <section id="rpl" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 scroll-mt-24">
        <div className="space-y-10 sm:space-y-12">
          {/* Header */}
          <SectionTitle className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Rekayasa Perangkat Lunak <span className="text-[#FF5722]">(RPL)</span>
            </h2>
            <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Mengembangkan standar arsitektur perangkat lunak yang bersih, cepat, teruji, dan scalable untuk kebutuhan sistem informasi modern serta jaringan Internet of Things.
            </p>
          </SectionTitle>

          {/* Core Competencies Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div data-aos="fade-up" data-aos-delay="100" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
                <Code size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Web &amp; Mobile Stack</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Penguasaan Next.js, React, Tailwind CSS, REST APIs, dan framework modern untuk frontend &amp; backend.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
                <Database size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Manajemen Data</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Pengolahan data terstruktur dan log telemetri real-time yang efisien dan andal.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] sm:col-span-2 lg:col-span-1 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
              }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Kualitas &amp; Security</h3>
              <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Penerapan prinsip clean code, pengujian otomatis, dan praktik pengamanan data.
              </p>
            </div>
          </div>

          {/* Pendekatan Dalam Inovasi Card */}
          <div data-aos="fade-up" data-aos-delay="200" className={`p-5 sm:p-8 rounded-2xl border transition-all ${isLight ? 'bg-white border-slate-200 text-slate-600 shadow-sm' : 'bg-[#0D1526]/50 border-slate-800/80 text-gray-400'
            }`}>
            <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Pendekatan Kami dalam Inovasi
            </h3>
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed">
              <p>
                Setiap proyek yang kami bangun berfokus pada integrasi mulus antara perangkat keras IoT dan antarmuka perangkat lunak yang modern. Kami meyakini bahwa data tidak hanya sekadar angka, tetapi wawasan (<em>insight</em>) berharga yang dapat digunakan untuk mengambil keputusan kritis secara <em>real-time</em>.
              </p>
              <p>
                Dari perancangan arsitektur sensor di sisi <em>edge</em> hingga pengolahan data di <em>cloud</em> menggunakan platform <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>Antares</strong>, tim kami memastikan latensi yang rendah dan keandalan tinggi. Sementara itu, antarmuka dibangun menggunakan ekosistem modern seperti <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>Next.js</strong> dan <strong className={isLight ? 'text-slate-900 font-bold' : 'text-white'}>React</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 4. ANTARES IOT ECOSYSTEM SECTION ================= */}
      <section id="antares" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 scroll-mt-24 space-y-12 sm:space-y-16">
        {/* Header */}
        <SectionTitle className="text-center space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Antares <span className="text-[#FF5722]">IoT Ecosystem</span> &amp; <span className={isLight ? 'text-[#0284C7]' : 'text-[#00D8F6]'}>RPL</span>
          </h2>
          <p className={`text-xs sm:text-sm md:text-base leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Platform IoT standar internasional OneM2M buatan Telkom Indonesia yang terintegrasi penuh dengan Rekayasa Perangkat Lunak untuk mengelola sensor, telemetri real-time, dan kontrol jarak jauh.
          </p>
        </SectionTitle>

        {/* Integrated Modules Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Heading, Description & 2 Feature Cards */}
          <div data-aos="fade-right" data-aos-delay="150" className="lg:col-span-7 flex flex-col justify-start space-y-4 sm:space-y-6">
            <div className={`p-5 sm:p-6 border rounded-2xl ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
              }`}>
              <h3 className="text-xl sm:text-2xl font-black mb-2 sm:mb-3">
                <span className={isLight ? 'text-[#0284C7]' : 'text-[#00D8F6]'}>RPL </span>
                <span className="text-[#FF5722]">Antares KiDi IOT </span>
                <span>Integritas</span>
              </h3>
              <p className={`text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Rekayasa Perangkat Lunak (RPL) bukan hanya soal kode, tapi bagaimana kode tersebut berinteraksi dengan dunia fisik. Dengan Antares IoT Platform, Tim OIT menjembatani backend sistem yang kompleks langsung ke sensor di lapangan.
              </p>
            </div>

            {/* Hardware & Software Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 sm:pt-2">
              <div
                className={`border rounded-2xl p-5 flex flex-col justify-between min-h-[120px] sm:min-h-[130px] transition-all hover:border-orange-500/50 hover:shadow-md ${isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    : 'bg-[#0D1526]/80 border-slate-800/80 text-white shadow-lg'
                  }`}
              >
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3 text-[#FF5722]">
                  <Cpu size={20} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Hardware Integration
                  </h4>
                  <p className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    ESP32, Arduino, Microcontroller &amp; LoRaWAN Connectivity
                  </p>
                </div>
              </div>

              <div
                className={`border rounded-2xl p-5 flex flex-col justify-between min-h-[120px] sm:min-h-[130px] transition-all hover:border-sky-500/50 hover:shadow-md ${isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    : 'bg-[#0D1526]/80 border-slate-800/80 text-white shadow-lg'
                  }`}
              >
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-3 text-[#0284C7]">
                  <Server size={20} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold mb-1 ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Software Integration
                  </h4>
                  <p className={`text-[11px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Website Dashboard, Mobile Apps, REST API, &amp; Games
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Side Panel (RPL & IOT Card) */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className={`lg:col-span-5 border rounded-3xl p-5 sm:p-8 flex flex-col justify-center shadow-xl transition-all self-stretch ${isLight
                ? 'bg-white border-slate-200 shadow-slate-200/60'
                : 'bg-[#0D1526]/60 border-slate-800/80'
              }`}
          >
            <h3 className={`text-center font-bold text-lg sm:text-xl tracking-widest uppercase mb-5 sm:mb-6 ${isLight ? 'text-slate-800' : 'text-slate-300'
              }`}>
              RPL &amp; IOT
            </h3>

            <div className="flex flex-col gap-4 sm:gap-5">
              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-orange-500/5 border border-orange-500/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0 shadow-md">
                  <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF5722]" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Hardware Node</h4>
                  <p className={`text-[11px] font-mono mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    ESP32 Sensor Node (MQTT)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 p-3 rounded-xl bg-sky-500/5 border border-sky-500/20">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center shrink-0 shadow-md">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-[#0284C7]" />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Cloud Middleware</h4>
                  <p className={`text-[11px] font-mono mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Antares OneM2M Server API
                  </p>
                </div>
              </div>

              <div className={`flex items-center gap-3 sm:gap-4 p-3 rounded-xl border ${isLight ? 'bg-slate-100/80 border-slate-200' : 'bg-[#141C2B] border-slate-700/60'
                }`}>
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 shadow-md ${isLight ? 'bg-white border-slate-300' : 'bg-[#0B132B] border-slate-700'
                  }`}>
                  <Layers className={`w-5 h-5 sm:w-6 sm:h-6 ${isLight ? 'text-slate-700' : 'text-slate-300'}`} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Frontend UI</h4>
                  <p className={`text-[11px] font-mono mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    React / Next.js Telemetry Dash
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 5. KEUNGGULAN SECTION ================= */}
      <section id="keunggulan" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 scroll-mt-24 space-y-8">
        <SectionTitle className="text-center space-y-2 sm:space-y-3">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Keunggulan Antares IoT Platform
          </h2>
          <p className={`text-xs sm:text-sm max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Fasilitas infrastruktur kelas industri untuk skalabilitas perangkat IoT tinggi.
          </p>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div data-aos="zoom-in" data-aos-delay="100" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
            }`}>
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-4">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Keamanan oneM2M</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Enkripsi standar internasional dan autentikasi token API unik untuk setiap perangkat sensor.
            </p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="200" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
            }`}>
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <Zap size={22} />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Latensi Rendah</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Pengiriman payload telemetri secara real-time via MQTT broker dengan latensi kurang dari 30ms.
            </p>
          </div>

          <div data-aos="zoom-in" data-aos-delay="300" className={`p-5 sm:p-6 border rounded-2xl transition-all hover:scale-[1.02] sm:col-span-2 lg:col-span-1 ${isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#0D1526]/80 border-slate-800/80 shadow-lg'
            }`}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <Layers size={22} />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Integrasi RPL Dash</h3>
            <p className={`text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Kemudahan integrasi data dengan dashboard Next.js dan sistem database RPL.
            </p>
          </div>
        </div>
      </section>

      {/* ================= 6. PROJECT KAMI (INFINITE MARQUEE + MANUAL SCROLL) ================= */}
      <section id="project-kami" className="py-12 sm:py-16 md:py-20 w-full relative z-10 flex flex-col items-center scroll-mt-24">
        {/* Header Section */}
        <div data-aos="fade-up" className="w-full px-4 sm:px-6 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-10 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-orange-500/10 text-orange-600 border border-orange-500/20">
                Live Deployed Apps
              </span>
              <span className={`text-xs font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {filteredProjects.length} Proyek Live
              </span>
            </div>
            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-extrabold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Project Kami
            </h2>
            <p className={`text-xs sm:text-sm mt-1 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Aplikasi web live hasil karya Tim OIT yang telah di-deploy (Looping otomatis &amp; dapat di-scroll)
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = cat === 'Semua Proyek'
                ? projectsData.length
                : projectsData.filter((p) =>
                  p.badge.toLowerCase() === cat.toLowerCase() ||
                  (p.tags && p.tags.some((tag) => tag.toLowerCase() === cat.toLowerCase()))
                ).length;

              return (
                <button
                  key={cat}
                  onClick={(e) => {
                    setSelectedCategory(cat);
                    // Anime.js button press animation
                    animate(e.currentTarget, {
                      scale: [1, 0.88, 1.06, 1],
                      duration: 380,
                      ease: 'outBack',
                    });
                  }}
                  className={`anime-ripple px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${isActive
                      ? 'bg-[#FF5722] text-white shadow-lg shadow-orange-500/40 font-bold scale-105'
                      : isLight
                        ? 'bg-white text-slate-700 hover:bg-slate-100 hover:text-orange-600 border border-slate-200 shadow-sm'
                        : 'bg-[#0D1526]/80 text-slate-300 hover:bg-[#18233a] hover:text-white border border-slate-800/80'
                    }`}
                >
                  <span>{cat}</span>
                  <span className={`px-1.5 text-[9px] sm:text-[10px] rounded-full font-mono ${isActive ? 'bg-white/20 text-white' : isLight ? 'bg-slate-100 text-slate-500' : 'bg-slate-800 text-slate-400'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Marquee Carousel Visual Display + Infinite Looping */}
        {filteredProjects.length > 0 ? (
          <div data-aos="fade-up" data-aos-delay="150" className="w-full max-w-6xl mx-auto px-2 sm:px-6 relative group/scroll">
            {/* Scroll Left Button */}
            <button
              onClick={handleScrollLeft}
              className={`hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 ${isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:border-orange-500 hover:text-orange-500 shadow-slate-200'
                  : 'bg-[#0D1526] border-slate-700 text-white hover:border-orange-500 hover:text-orange-500 shadow-black'
                }`}
              aria-label="Scroll Left"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Scroll Right Button */}
            <button
              onClick={handleScrollRight}
              className={`hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border items-center justify-center shadow-lg transition-all transform hover:scale-110 active:scale-95 ${isLight
                  ? 'bg-white border-slate-300 text-slate-800 hover:border-orange-500 hover:text-orange-500 shadow-slate-200'
                  : 'bg-[#0D1526] border-slate-700 text-white hover:border-orange-500 hover:text-orange-500 shadow-black'
                }`}
              aria-label="Scroll Right"
            >
              <ChevronRight size={20} />
            </button>

            {/* Infinite Marquee Loop Wrapper */}
            <div
              ref={scrollContainerRef}
              className="marquee-wrapper py-4 rounded-2xl overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-orange-500/40 hover:scrollbar-thumb-orange-500"
              style={{ scrollbarWidth: 'thin', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="marquee-track gap-4 sm:gap-5">
                {marqueeProjects.map((project, index) => (
                  <div
                    key={`${project.id}-${index}`}
                    className={`group border rounded-2xl overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1.5 hover:scale-[1.02] shadow-xl shrink-0 ${isLight
                        ? 'bg-white border-slate-200 hover:border-orange-400 hover:shadow-2xl hover:shadow-blue-500/15'
                        : 'bg-[#0D1526]/90 border-slate-800/80 hover:border-orange-500/60 hover:shadow-2xl hover:shadow-orange-500/20'
                      }`}
                    style={{ width: '290px', minWidth: '260px', maxWidth: '330px' }}
                  >
                    {/* Image with fallback onError */}
                    <div className="w-full h-40 sm:h-48 relative overflow-hidden bg-slate-900">
                      <img
                        src={project.image}
                        alt={project.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = project.fallbackImage;
                        }}
                        className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity" />

                      {/* Badge */}
                      <span className={`absolute top-3 left-3 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[11px] sm:text-xs font-bold rounded-lg backdrop-blur-md shadow-md ${isLight ? 'bg-orange-500 text-white' : 'bg-[#FF5722] text-white'
                        }`}>
                        {project.badge}
                      </span>

                      {/* Stats / Team */}
                      <span className="absolute bottom-3 right-3 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-mono font-medium rounded-full bg-black/60 backdrop-blur-md text-sky-300 border border-sky-400/30">
                        {project.stats}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between">
                      <div>
                        <h3 className={`text-base sm:text-lg font-bold mb-1.5 transition-colors group-hover:text-[#FF5722] ${isLight ? 'text-slate-900' : 'text-white'
                          }`}>
                          {project.title}
                        </h3>
                        <p className={`text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                          {project.description}
                        </p>
                      </div>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 sm:py-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold text-xs sm:text-sm rounded-xl text-center flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 active:scale-95"
                      >
                        <span>Kunjungi Web Live</span>
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full py-12 text-center">
            <p className={`text-base font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Tidak ada proyek ditemukan dalam kategori ini.
            </p>
            <button
              onClick={() => setSelectedCategory('Semua Proyek')}
              className="mt-3 px-4 py-2 bg-[#FF5722] text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#F4511E] transition"
            >
              Tampilkan Semua Proyek
            </button>
          </div>
        )}
      </section>

      {/* ================= 7. AI SECTION ================= */}
      <section id="ai-terminal" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 flex flex-col items-center scroll-mt-24">
        {/* Header Section */}
        <SectionTitle className="text-center mb-8 sm:mb-10">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide mb-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            A.I - <span className="text-[#FF5722]">AR1</span>
          </h2>
          <p className={`text-xs sm:text-sm md:text-base ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Tanyakan apa saja pada AI - AR1, AI yang dibuat oleh Kelas 12 RPL 1
          </p>
        </SectionTitle>

        {/* Main Grid Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column (Input Form + Process Info) */}
          <div data-aos="fade-right" data-aos-delay="150" className="flex flex-col gap-6">
            {/* Card 1: Input Box */}
            <div
              className={`border rounded-2xl p-5 sm:p-6 shadow-xl transition-all ${isLight
                  ? 'bg-white border-slate-200 shadow-slate-200'
                  : 'bg-[#0D1526]/80 border-slate-800/80 shadow-black/40'
                }`}
            >
              <h3 className={`text-xs font-semibold tracking-wider uppercase mb-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Kirimkan Pesan
              </h3>

              {/* Quick Prompt Chips */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {[
                  "⚡ Apa itu Antares IoT?",
                  "🛠️ Jelaskan tentang RPL",
                  "👥 Siapa tim penggarap?"
                ].map((promptText, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleQuickPrompt(promptText.replace(/^[^\s]+\s/, ''))}
                    disabled={isAiLoading}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all duration-200 border transform hover:scale-105 active:scale-95 ${isLight
                        ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-orange-50 hover:border-orange-400 hover:text-orange-600'
                        : 'bg-[#080D1A] border-slate-800 text-slate-300 hover:bg-orange-500/10 hover:border-orange-500/40 hover:text-orange-400'
                      } ${isAiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {promptText}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className={`block text-xs font-medium mb-2 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                  Pesan
                </label>
                <textarea
                  rows="4"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleRunRequest(); } }}
                  placeholder="Masukkan pesan ke AI..."
                  disabled={isAiLoading}
                  className={`w-full border rounded-xl p-3 text-xs sm:text-sm focus:outline-none transition resize-none ${isLight
                      ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-orange-500 focus:bg-white'
                      : 'bg-[#080D1A] border-slate-800 text-white placeholder-slate-500 focus:border-orange-500'
                    } ${isAiLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                ></textarea>
              </div>

              <button
                onClick={handleRunRequest}
                disabled={isAiLoading}
                className={`w-full py-3 bg-[#FF5722] text-white font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition duration-200 shadow-lg shadow-orange-500/20 ${isAiLoading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#F4511E] active:scale-95'
                  }`}
              >
                {isAiLoading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <span>▶</span> RUN GET REQUEST
                  </>
                )}
              </button>
            </div>

            {/* Card 2: Process Flow Info */}
            <div
              className={`border rounded-2xl p-5 sm:p-6 shadow-xl transition-all ${isLight
                  ? 'bg-white border-slate-200 shadow-slate-200'
                  : 'bg-[#0D1526]/80 border-slate-800/80 shadow-black/40'
                }`}
            >
              <h3 className={`text-xs font-semibold tracking-wider uppercase mb-3 sm:mb-4 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Bagaimana Prosesnya AI
              </h3>

              <ul className={`space-y-3 text-xs sm:text-sm ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>Middleware RPL melakukan HTTP GET ke server Antares.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>OneM2M standard body diterima dalam format XML/JSON.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold shrink-0">✓</span>
                  <span>Data diurai (parse) dan ditampilkan di UI dashboard.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Terminal Output */}
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className={`border rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col font-mono text-xs sm:text-sm min-h-[300px] sm:min-h-[350px] transition-all overflow-hidden ${isLight
                ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-slate-300'
                : 'bg-[#050811] border-slate-800/80 text-white shadow-black/60'
              }`}
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              </div>
              <span className="text-slate-400 text-[11px] sm:text-xs tracking-wider uppercase font-sans">
                Output AI Terminal
              </span>
            </div>

            {/* Terminal Console Logs */}
            <div
              ref={terminalContainerRef}
              className="flex-grow space-y-2 overflow-y-auto overflow-x-auto break-words pr-2 max-h-[380px] h-[340px] sm:h-[380px] scroll-smooth"
            >
              {terminalLogs.map((log, index) => {
                if (log.type === 'user') {
                  return (
                    <p key={index} className="text-emerald-400 font-semibold break-words">
                      <span className="text-slate-500 mr-1.5">oit@system:~$</span>
                      {log.text}
                    </p>
                  );
                }
                if (log.type === 'ai') {
                  return (
                    <div key={index} className="mt-1.5 mb-2 pl-3 border-l-2 border-orange-500/70">
                      <span className="text-orange-400 text-[10px] font-bold uppercase tracking-wider font-sans block mb-0.5">AR1 Response:</span>
                      <p className="text-white/95 break-words whitespace-pre-wrap leading-relaxed">
                        {log.text}
                      </p>
                    </div>
                  );
                }
                if (log.type === 'error') {
                  return (
                    <p key={index} className="text-red-400 break-words font-semibold">
                      {log.text}
                    </p>
                  );
                }
                return (
                  <p key={index} className="text-emerald-400 break-words">
                    {log.text}
                  </p>
                );
              })}

              {isAiLoading && (
                <div className="flex items-center gap-2 text-amber-400 pt-1">
                  <span className="w-3 h-3 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin" />
                  <span className="animate-pulse">Menunggu response dari AI AR1...</span>
                </div>
              )}

              <div className="flex items-center gap-1 text-emerald-400 pt-2 pb-1">
                <span>oit@system:~$</span>
                <span className="w-2 h-4 bg-emerald-400 animate-pulse inline-block" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 8. TIM PENGGARAP SECTION ================= */}
      <section id="tim-penggarap" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 w-full max-w-6xl mx-auto relative z-10 scroll-mt-24 space-y-10 sm:space-y-12">
        <SectionTitle className="text-center space-y-2 sm:space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Tim Penggarap Website
          </h2>
          <p className={`text-xs sm:text-sm md:text-base max-w-xl mx-auto ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Para pengembang &amp; desainer di balik perancangan dan pembangunan platform website R1OT ini.
          </p>
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {teamData.map((member, index) => (
            <ProfileCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}