export default function LandingPage() {
  return (
    <div className="bg-[#080D1A] text-white min-h-screen relative font-sans overflow-hidden">
      <div className="absolute -top-32 -left-32 w-[480px] h-[480px] bg-orange-600/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[28%] -right-32 w-[520px] h-[520px] bg-sky-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Section */}
      <main className="w-full max-w-4xl mx-auto px-6 pt-30 pb-12 flex flex-col items-center text-center relative z-10">
        <h1 className="text-2xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] max-w-3xl">
          Where Code Meets <span className="italic font-normal font-serif">Reality</span>:
          <br />
          <span className="text-[#FF5722]">Bridging Software &amp; IoT</span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed font-normal">
          Kami adalah Tim IOT, menghadirkan ekosistem terpadu antara{" "}
          <strong className="text-white font-medium">
            Rekayasa Perangkat Lunak
          </strong>{" "}
          dan infrastruktur{" "}
          <strong className="text-[#FF5722] font-semibold">
            Antares IoT
          </strong>{" "}
          untuk solusi cerdas masa depan.
        </p>

        <div className="mt-8">
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 bg-[#FF5722] hover:bg-[#F4511E] text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            <svg className="w-4 h-4 fill-current rotate-45 -mt-0.5" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            Explore Projects
          </a>
        </div>

        <div className="mt-14 w-full bg-[#0D1526]/80 backdrop-blur-xl border border-slate-800/80 rounded-2xl md:rounded-3xl p-6 md:p-8 text-left shadow-2xl relative">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 bg-[#FF5F56] rounded-full inline-block" />
            <span className="w-2.5 h-2.5 bg-[#FFBD2E] rounded-full inline-block" />
            <span className="w-2.5 h-2.5 bg-[#27C93F] rounded-full inline-block" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div>
              <span className="text-[11px] font-mono tracking-wide text-[#F59E0B] block mb-1">
                // Proyek Kami
              </span>
              <h3 className="text-xl font-bold text-white mb-2">50+ Proyek</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Kami aktif mengirimkan telemetri secara real-time melalui
                protokol MQTT.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-wide text-[#38BDF8] block mb-1">
                // CLOUD_PROCESS
              </span>
              <h3 className="text-xl font-bold text-white mb-2">OneM2M</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Standar global infrastruktur IoT Antares untuk manajemen data
                terpusat.
              </p>
            </div>

            <div>
              <span className="text-[11px] font-mono tracking-wide text-[#34D399] block mb-1">
                // WEB_OUTPUT
              </span>
              <h3 className="text-xl font-bold text-white mb-2">RPL Dash</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Visualisasi data presisi tinggi dengan framework modern
                (React/Laravel).
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* AntaresSection */}
      <section className="py-16 md:py-20 px-6 w-full max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[1.12]">
                <span className="text-[#00D8F6] block">RPL</span>
                <span className="text-[#FF5722] block">Antares KiDi IOT</span>
                <span className="text-white block">Integritas</span>
              </h2>

              <p className="mt-6 text-xs md:text-sm text-slate-400 leading-relaxed max-w-lg">
                Rekayasa Perangkat Lunak (RPL) bukan hanya soal kode, tapi
                bagaimana kode tersebut berinteraksi dengan dunia fisik. Dengan{" "}
                <strong className="text-slate-200 font-semibold">
                  Antares IoT Platform
                </strong>
                , Tim OIT menjembatani backend sistem yang kompleks langsung ke
                sensor di lapangan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              <div className="bg-[#0D1526]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-orange-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-3.5 text-[#FF5722]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm0 10a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Hardware Integration
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    ESP32, Arduino, &amp; LoRaWAN connectivity.
                  </p>
                </div>
              </div>

              <div className="bg-[#0D1526]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3.5 text-[#00D8F6]">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">
                    Software Integration
                  </h4>
                  <p className="text-[11px] font-mono text-slate-400">
                    Website, Mobile, Desktop, Game Developer
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0D1526]/60 border border-slate-800/80 rounded-3xl p-6 md:p-8  justify-center shadow-xl">
            <h3 className="text-center font-bold text-xl tracking-widest uppercase text-slate-300 mb-8">
              RPL &amp; IOT
            </h3>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#1C1610] border border-orange-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-orange-950/20">
                  <svg className="w-7 h-7 text-[#FF5722]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6zm2 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H6zm0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3zm2 1a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2H6z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hardware</h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    ESP32 Sensor Node (MQTT)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0B2132] border border-cyan-500/40 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-950/20">
                  <svg className="w-7 h-7 text-[#00D8F6]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Software</h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5 leading-snug">
                    Website, Mobile,<br />Desktop
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#141C2B] border border-slate-700/60 flex items-center justify-center shrink-0 shadow-lg">
                  <svg className="w-7 h-7 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path strokeLinecap="round" strokeWidth="2" d="M8 20h8M12 16v4" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Game Developer</h4>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    Game Desktop &amp; Android Game
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
