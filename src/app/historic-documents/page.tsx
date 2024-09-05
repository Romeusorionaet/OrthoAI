'use client'

import { getDocumentContent } from '@/actions/get-document-content'
import Evaluation from '@/components/evaluation'
import { useRouter } from 'next/navigation'

export default function HistoricDocument() {
  const router = useRouter()

  const handleNavigateToCorrectionPage = async (id: string) => {
    const result = await getDocumentContent({ id })

    if (result.success === true) {
      router.push('/correction')
    } else {
      return null
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1680px] px-4 pt-10">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae odio
        ipsa animi tenetur assumenda. Consequatur itaque distinctio quas ut
        voluptatem. Optio culpa alias praesentium iure sint quam perferendis.
        Iste, neque?
      </p>

      <section className="mt-16 flex flex-wrap items-center justify-center gap-4">
        {Array.from({ length: 10 }).map((item: any, index) => {
          return (
            <button
              key={index}
              onClick={() => handleNavigateToCorrectionPage(item.id)}
            >
              <article className="flex h-56 w-56 flex-col gap-2 rounded-md bg-cl_7/50 p-2 duration-300 hover:bg-cl_7 focus:bg-cl_7 md:h-60">
                <header>
                  <h2 className="text-center font-bold">Regras:</h2>
                </header>

                <p className="line-clamp-1">
                  Coeção, gramática leorleor cjajd dede dedee
                </p>

                <Evaluation score={4} />

                <span className="opacity-90">há 1 dia</span>
              </article>
            </button>
          )
        })}
      </section>
    </main>
  )
}
