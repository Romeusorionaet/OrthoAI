'use client'

import Evaluation from '@/components/evaluation'
import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { useContext, useState } from 'react'
import { DownloadDocument } from './download-document'

export function ContentCorrection() {
  const { contentCorrection, err, isLoading } = useContext(
    ContentCorrectionContext,
  )

  const [selectedItems, setSelectedItems] = useState({
    quiz: false,
    rules: false,
    evaluation: false,
  })

  if (!contentCorrection) {
    return <p className="pt-44">Dados não encontado</p>
  }

  if (err) {
    return <p className="pt-44">Deu erro!</p>
  }

  if (isLoading) {
    return <p className="pt-44">Carregando...</p>
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

  const quiz = contentCorrection.quizQuestions.quiz

  return (
    <section>
      {originalDocumentContent && newDocumentContent && (
        <>
          <section className="flex flex-col items-center gap-4 overflow-hidden">
            <h1 className="mb-20 text-xl font-bold">Resultado da Correção</h1>

            <section className="flex flex-col gap-4 md:flex-row">
              <div className="md:w-1/2">
                <h3 className="mb-4 text-center">Texto Original</h3>

                <div className="scrollbar h-screen overflow-auto rounded-md border border-cl_7 p-4">
                  <p className="whitespace-break-spaces">
                    {originalDocumentContent}
                  </p>
                </div>
              </div>

              <div className="md:w-1/2">
                <h3 className="mb-4 text-center">Texto Corrigido</h3>

                <div className="scrollbar h-screen overflow-auto rounded-md border border-cl_7 p-4">
                  <p className="whitespace-break-spaces">
                    {newDocumentContent}
                  </p>
                </div>
              </div>
            </section>
          </section>

          <section className="mt-20 flex flex-col gap-20">
            <div className="flex flex-col gap-10">
              <article>
                <h2 className="text-xl font-bold">Questões:</h2>
                {quiz &&
                  JSON.parse(quiz).map((item: string, index: number) => {
                    return <div key={index}>{item}</div>
                  })}
              </article>

              <label>
                Adicioanr ao documento para download
                <input
                  type="checkbox"
                  checked={selectedItems.quiz}
                  onChange={() => handleCheckboxChange('quiz')}
                />
              </label>
            </div>

            <div className="flex flex-col gap-10">
              <article>
                <h2 className="text-xl font-bold">Regras:</h2>
                {JSON.parse(rules).map((item: string, index: number) => {
                  return <div key={index}>{item}</div>
                })}
              </article>

              <label>
                Adicioanr ao documento para download
                <input
                  type="checkbox"
                  checked={selectedItems.rules}
                  onChange={() => handleCheckboxChange('rules')}
                />
              </label>
            </div>

            <div className="flex flex-col gap-10"></div>
            {evaluation && (
              <Evaluation score={Number(evaluation)} comment={comment} />
            )}

            <label>
              Adicioanr ao documento para download
              <input
                type="checkbox"
                checked={selectedItems.evaluation}
                onChange={() => handleCheckboxChange('evaluation')}
              />
            </label>
          </section>
        </>
      )}

      <div className="flex justify-center">
        <DownloadDocument selectedItems={selectedItems} />
      </div>
    </section>
  )
}
