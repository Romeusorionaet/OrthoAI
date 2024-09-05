'use client'

import { fetchHistoricDocuments } from '@/actions/fetch-historic-documents'
import { setCookieIdDocument } from '@/actions/set-cookie-id-document'
import { CPLoading } from '@/components/cp-loading'
import Evaluation from '@/components/evaluation'
import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

export function Documents() {
  const { refetch } = useContext(ContentCorrectionContext)

  const { data, isLoading } = useQuery({
    queryKey: ['historicDocument'],
    queryFn: () => fetchHistoricDocuments(),
  })

  const router = useRouter()

  if (isLoading) {
    return <CPLoading loading={isLoading} />
  }

  if (!data) {
    return <p className="pt-44 text-center">Histórico limpo.</p>
  }

  const handleNavigateToCorrectionPage = async (id: string) => {
    const result = await setCookieIdDocument({ id })

    if (result.success === true) {
      await refetch()
      router.push('/correction')
    } else {
      return null
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {data &&
        data.documentsContent.map((item) => {
          const rules: string[] = JSON.parse(item.rules)
          return (
            <div
              key={item.id}
              className="flex h-56 w-56 flex-col gap-2 rounded-md bg-cl_7/50 p-2 duration-300 hover:bg-cl_7 focus:bg-cl_7 md:h-60"
            >
              <h3 className="text-center font-bold">Regras:</h3>

              <p className="line-clamp-1">{rules[0]}...</p>

              <Evaluation score={4} />

              <div className="flex justify-between">
                <span className="opacity-90">há 1 dia</span>

                <button
                  onClick={() => handleNavigateToCorrectionPage(item.id)}
                  className="rounded-md border px-1"
                >
                  Ver
                </button>
              </div>
            </div>
          )
        })}
    </div>
  )
}
