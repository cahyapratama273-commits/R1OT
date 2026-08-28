import Link from "next/link";

export default function Nav() {
  return (
    <nav className="bg-[#0F172A] p-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 mx-12">
        <span className="bg-orange-500 text-white font-bold text-lg px-2 py-1 rounded">
          R1
        </span>
        <span className="text-white font-bold text-2xl">R1OT</span>
      </Link>
      <div className="flex space-x-8 text-sm text-gray-300 px-14">
        <Link href="/rpl" className="hover:text-white"> RPL </Link>
        <Link href="/antares" className="hover:text-white"> Antares IoT </Link>
        <Link href="/projects" className="hover:text-white"> Projects </Link>
        <Link href="/tentang-kami" className="hover:text-white"> Tentang Kami </Link>
      </div>
    </nav>
  );
}
