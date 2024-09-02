import Image from 'next/image'

export function Header() {
  return (
    <header className="py-8 text-center">
      <h1 className="text-5xl font-extrabold shadow-2xl shadow-cl_2">
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
