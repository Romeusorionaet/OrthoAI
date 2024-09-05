'use client'

import Evaluation from '@/components/evaluation'
import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { useContext, useState } from 'react'
import { DownloadDocument } from './download-document'
import { NoDataError } from './no-data-error'
import { GetDataError } from './get-data-error'
import { CPLoading } from '@/components/cp-loading'
import { useRouter } from 'next/navigation'
import { deleteCookies } from '@/utils/delete-cookies'

export function ContentCorrection() {
  const { contentCorrection, err, isLoading, clearCache } = useContext(
    ContentCorrectionContext,
  )

  const [selectedItems, setSelectedItems] = useState({
    quiz: false,
    rules: false,
    evaluation: false,
  })

  const router = useRouter()

  if (isLoading) {
    return <CPLoading loading={isLoading} />
  }

  const documentContent = contentCorrection?.documentContent.newDocumentContent

  if (!documentContent) {
    return <NoDataError />
  }

  if (err) {
    return <GetDataError />
  }

  const handleCheckboxChange = (section: string) => {
    setSelectedItems((prev: any) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const {
    comment,
    originalDocumentContent,
    evaluation,
    newDocumentContent,
    rules,
  } = contentCorrection.documentContent

  const handleStartNewProcess = () => {
    clearCache()
    deleteCookies()
    router.replace('/')
  }

  const quiz: string[] = JSON.parse(contentCorrection.quizQuestions.quiz)

  return (
    <section className="py-20">
      {originalDocumentContent && newDocumentContent && (
        <>
          <section className="flex flex-col items-center gap-4 overflow-hidden">
            <h1 className="mb-20 text-xl font-bold">Resultado da Correção</h1>

            <section className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/2">
                <h3 className="mb-4 text-center">Conteúdo Original:</h3>

                <div className="scrollbar h-[40rem] overflow-auto rounded-md border border-cl_7 bg-cl_2 p-2 pb-10">
                  <p className="whitespace-break-spaces text-justify">
                    {originalDocumentContent}
                  </p>
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="mb-4 text-center">Conteúdo Corrigido:</h3>

                <div className="scrollbar h-[40rem] overflow-auto rounded-md border border-cl_7 bg-cl_2 p-2 pb-10">
                  <p className="whitespace-break-spaces text-justify">
                    {newDocumentContent}
                  </p>
                </div>
              </div>
            </section>
          </section>

          <section className="mt-10 flex flex-col gap-10">
            {quiz && quiz.length !== 0 && (
              <div className="flex flex-col gap-10">
                <div>
                  <h2 className="mb-10 text-center text-xl font-bold">
                    Perguntas e Repostas
                  </h2>

                  <ul className="list-inside list-disc space-y-4">
                    {quiz.map((item: string, index: number) => {
                      return <li key={index}>{item}</li>
                    })}
                  </ul>
                </div>

                <label className="flex items-center justify-center gap-4">
                  <p>Adicioanr ao documento para download</p>
                  <input
                    type="checkbox"
                    checked={selectedItems.quiz}
                    onChange={() => handleCheckboxChange('quiz')}
                    className="h-4 w-4"
                  />
                </label>
              </div>
            )}

            <div className="flex flex-col gap-10">
              <div>
                <h2 className="mb-10 text-center text-xl font-bold">Regras</h2>

                <ul className="list-inside list-disc space-y-4">
                  {JSON.parse(rules).map((item: string, index: number) => {
                    return <li key={index}>{item}</li>
                  })}
                </ul>
              </div>

              <label className="flex items-center justify-center gap-4">
                <p>Adicioanr ao documento para download</p>
                <input
                  type="checkbox"
                  checked={selectedItems.rules}
                  onChange={() => handleCheckboxChange('rules')}
                  className="h-4 w-4"
                />
              </label>
            </div>

            <div className="flex flex-col items-center justify-center gap-10">
              {evaluation && (
                <Evaluation score={Number(evaluation)} comment={comment} />
              )}

              <label className="flex items-center justify-center gap-4">
                <p>Adicioanr ao documento para download</p>
                <input
                  type="checkbox"
                  checked={selectedItems.evaluation}
                  onChange={() => handleCheckboxChange('evaluation')}
                  className="h-4 w-4"
                />
              </label>
            </div>
          </section>

          <div className="mt-10 flex justify-center">
            <DownloadDocument selectedItems={selectedItems} />
          </div>
        </>
      )}

      <button
        onClick={() => handleStartNewProcess()}
        className="mt-10 underline"
      >
        Iniciar um novo processo
      </button>
    </section>
  )
}
