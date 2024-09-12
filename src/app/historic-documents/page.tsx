import Link from 'next/link'
import { Documents } from './components/documents'

export default function HistoricDocument() {
  return (
    <main className="mx-auto w-full max-w-[1680px] px-4 py-10">
      <div className="flex justify-between">
        <Link href="/" className="underline">
          Voltar
        </Link>
        <h1 className="text-xl">Histórico</h1>
      </div>

      <section className="mt-16 flex flex-wrap items-center justify-center gap-4">
        <Documents />
      </section>
    </main>
  )
}
