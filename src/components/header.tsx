import { FolderClock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="mx-auto w-full max-w-[1680px] p-6 md:p-8">
      <nav>
        <Link
          href="/historic-documents"
          className="text-cl_1/50 duration-300 hover:text-cl_1 focus:text-cl_1"
        >
          <FolderClock size={32} />
        </Link>
      </nav>

      <h1 className="text-center text-5xl font-extrabold shadow-2xl shadow-cl_2">
        <span>
          <Image
            height={100}
            width={100}
            src="/logo/eyes.png"
            alt="logo"
            className="inline h-10 w-10 shadow-cl_2"
          />
        </span>
        r<span className="relative top-3">t</span>h
        <span>
          <Image
            height={100}
            width={100}
            src="/logo/eyes.png"
            alt="logo"
            className="inline h-8 w-6 shadow-cl_2"
          />
        </span>
        <span className="text-2xl font-bold text-cl_3">AI</span>
      </h1>
    </header>
  )
}
