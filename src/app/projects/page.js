import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export default function Home() {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} bg-bg text-white overflow-x-hidden font-sans`}>
      <div className="relative min-h-screen">
        {/* Ambient glows */}
        <div className="pointer-events-none absolute -top-20 -left-32 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255,106,26,0.25)_0%,rgba(255,106,26,0)_70%)] rounded-full blur-3xl"></div>
        <div className="pointer-events-none absolute bottom-0 -right-32 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(37,99,235,0.25)_0%,rgba(37,99,235,0)_70%)] rounded-full blur-3xl"></div>


        {/* Hero */}
        <main className="relative z-10 max-w-5xl mx-auto px-6 pt-16 md:pt-20 pb-16 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
            Where Code Meets <span className="italic font-serif font-bold">Reality</span>:
            <br className="hidden sm:block" />
            <span className="text-accent">Bridging Software &amp; IoT</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-gray-400 leading-relaxed">
            Kami adalah Tim IOT, menghadirkan ekosistem terpadu antara{" "}
            <span className="text-gray-100 font-semibold">Rekayasa Perangkat Lunak</span> dan infrastruktur{" "}
            <span className="text-accent font-semibold">Antares IoT</span> untuk solusi cerdas masa depan.
          </p>

          <div className="mt-9">
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 bg-accent hover:bg-orange-600 transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-lg shadow-accent/20"
            >
              <span>🚀</span> Explore Projects
            </Link>
          </div>

          {/* Terminal-style stats card */}
          <div className="mt-16 text-left bg-panel/80 backdrop-blur border border-border rounded-2xl px-7 md:px-10 py-8 md:py-9 shadow-2xl">
            {/* traffic lights */}
            <div className="flex items-center gap-2 mb-8">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Item 1 */}
              <div>
                <p className="font-mono text-xs text-accent mb-2">// Proyek Kami</p>
                <h3 className="text-xl font-bold mb-2">50+ Proyek</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Kami aktif mengirimkan telemetri secara real-time melalui protokol MQTT.
                </p>
              </div>
              {/* Item 2 */}
              <div>
                <p className="font-mono text-xs text-sky-400 mb-2">// CLOUD_PROCESS</p>
                <h3 className="text-xl font-bold mb-2">OneM2M</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Standar global infrastruktur IoT Antares untuk manajemen data terpusat.
                </p>
              </div>
              {/* Item 3 */}
              <div>
                <p className="font-mono text-xs text-green-400 mb-2">// WEB_OUTPUT</p>
                <h3 className="text-xl font-bold mb-2">RPL Dash</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Visualisasi data presisi tinggi dengan framework modern (React/Laravel).
                </p>
              </div>
            </div>
          </div>

          {/* Methodology / About Projects Section */}
          <section className="mt-24 text-left max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-white text-center md:text-left">Pendekatan Kami dalam Inovasi</h2>
            <div className="space-y-6 text-gray-400 text-base md:text-lg leading-relaxed bg-panel/30 p-8 rounded-2xl border border-border/50">
              <p>
                Setiap proyek yang kami bangun berfokus pada integrasi mulus antara perangkat keras IoT dan antarmuka perangkat lunak yang modern. Kami meyakini bahwa data tidak hanya sekadar angka, tetapi wawasan (<em>insight</em>) berharga yang dapat digunakan untuk mengambil keputusan kritis secara <em>real-time</em>.
              </p>
              <p>
                Dari perancangan arsitektur sensor di sisi <em>edge</em> hingga pengolahan data di <em>cloud</em> menggunakan platform <strong className="text-white">Antares</strong>, tim kami memastikan latensi yang rendah dan keandalan tinggi. Sementara itu, di sisi presentasi, antarmuka dibangun menggunakan ekosistem modern seperti <strong className="text-white">Next.js</strong> dan <strong className="text-white">React</strong>. Kombinasi ini menjamin pengalaman visualisasi data dan interaksi pengguna yang responsif, intuitif, serta mudah diakses dari berbagai perangkat.
              </p>
              <p>
                Proses iteratif kami melibatkan pengujian ekstensif baik di lapangan maupun di dalam simulasi <em>software</em>, guna memastikan setiap metrik terekam akurat. Di bawah ini, Anda dapat menjelajahi beberapa hasil karya kami yang mencerminkan kolaborasi erat antara tim Rekayasa Perangkat Lunak dan para insinyur Internet of Things:
              </p>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="mt-24 text-left scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-1 bg-accent rounded"></div>
              <h2 className="text-3xl font-bold text-white">
                Projek Us
              </h2>
            </div>
            <ProjectGrid />
          </section>
        </main>
      </div>
    </div>
  );
}