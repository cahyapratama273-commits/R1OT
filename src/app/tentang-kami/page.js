import ProfileCard from "@/components/Card/Profile";
import teamData from "../../../data/team.json";
import workflowData from "../../../data/workflow.json";
import { Layout, Code, Cpu, Server, Rocket, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

// Icon mapping helper for workflow items
const iconMap = {
  Layout: Layout,
  Code: Code,
  Cpu: Cpu,
  Server: Server,
  Rocket: Rocket,
};

export default function TentangKami() {
  return (
    <div className="min-h-screen bg-[#0B132B] text-slate-100 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 space-y-24">
        
        {/* ================= HERO SECTION ================= */}
        <section className="text-center space-y-6 pt-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono tracking-wide">
            <Sparkles size={14} /> // ABOUT_US_MODULE
          </div>
          
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            Tentang <span className="text-orange-500">Kita</span>
          </h1>
          
          <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Di balik layar inovasi <strong className="text-white font-semibold">Tim OIT</strong> — menjembatani 
            <span className="text-orange-400 font-medium"> Rekayasa Perangkat Lunak (RPL)</span> dan 
            <span className="text-orange-400 font-medium"> Infrastruktur Antares IoT</span> untuk menghadirkan platform modern yang responsif.
          </p>

          {/* Terminal Style Visi & Misi Card */}
          <div className="mt-10 bg-[#131C31]/90 border border-slate-800 rounded-2xl p-6 text-left max-w-3xl mx-auto shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/80">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="text-xs font-mono text-slate-400 ml-2">system_vision_manifest.log</span>
            </div>

            <div className="space-y-4 font-mono text-xs md:text-sm">
              <div>
                <span className="text-emerald-400 font-semibold">// VISI_UTAMA</span>
                <p className="text-slate-300 mt-1 pl-4 border-l-2 border-orange-500/40">
                  Menjadi pusat inovasi teknologi terpadu yang menghubungkan aplikasi web presisi tinggi dengan ekosistem sensor fisik IoT secara real-time.
                </p>
              </div>

              <div>
                <span className="text-emerald-400 font-semibold">// MISI_PENGEMBANGAN</span>
                <p className="text-slate-300 mt-1 pl-4 border-l-2 border-orange-500/40">
                  Membangun arsitektur perangkat lunak yang bersih, antarmuka pengguna yang ramah, dan transmisi data telemetri berkecepatan tinggi via protokol MQTT & HTTP REST API.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ================= SECTION 4: TIM PENGGARAP WEBSITE ================= */}
        <section className="space-y-10">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              // TEAM_CONTRIBUTORS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Tim Penggarap Website
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Para pengembang & desainer di balik perancangan dan pembangunan platform website R1OT ini.
            </p>
          </div>

          {/* Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamData.map((member) => (
              <ProfileCard key={member.id} member={member} />
            ))}
          </div>
        </section>


        {/* ================= SECTION 5: ALUR KERJA PEMBUATAN WEBSITE ================= */}
        <section className="space-y-12">
          <div className="text-center space-y-3">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest">
              // DEVELOPMENT_WORKFLOW
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Alur Kerja Pembuatan Website
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
              Tahapan sistematis dari ideasi awal hingga pembuatan komponen dan integrasi data real-time.
            </p>
          </div>

          {/* Workflow Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowData.map((item) => {
              const IconComponent = iconMap[item.icon] || Code;

              return (
                <div
                  key={item.step}
                  className="bg-[#131C31] border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between hover:border-orange-500/40 transition-all duration-300 relative group"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon & Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                        <IconComponent size={24} />
                      </div>
                      <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-orange-500/40 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    {/* Stage Category */}
                    <span className="inline-block text-[11px] font-mono text-emerald-400">
                      {item.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ================= CALL TO ACTION FOOTER ================= */}
        <section className="bg-gradient-to-r from-[#131C31] via-[#1A253D] to-[#131C31] border border-slate-800 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-orange-500/5 pointer-events-none" />
          <div className="relative z-10 space-y-4 max-w-xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Siap Jelajahi Proyek Hasil Karya Tim OIT?
            </h3>
            <p className="text-slate-300 text-sm">
              Lihat implementasi nyata penggabungan Rekayasa Perangkat Lunak dan Antares IoT dalam berbagai showcase proyek kami.
            </p>
            <div className="pt-2">
              <a
                href="/projects"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:scale-105"
              >
                Jelajahi Projects <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
