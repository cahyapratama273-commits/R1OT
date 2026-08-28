import Link from "next/link";

export default function Nav() {
  return (

    <nav className="bg-gray-800 p-4 flex items-center justify-between">
      <Link href="/" className="text-4xl text-fuchsia-500 mx-12">
        R1OT
      </Link>
      <div className="flex space-x-8 text-2xl text-fuchsia-500 px-14">
          <Link href="/rpl" className="hover:text-gray-600"> RPL </Link>
          <Link href="/antares" className="hover:text-gray-600"> Antares </Link>
          <Link href="/projects" className="hover:text-gray-600"> Projek </Link>
          <Link href="/tentang-kami" className="hover:text-gray-600"> Tentang Kami </Link>
      </div>
    </nav>
  );
}
