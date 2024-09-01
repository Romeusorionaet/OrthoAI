'use client'

import Evaluation from '@/components/evaluation'
import { ContentCorrectionContext } from '@/providers/content-correction-provider'
import { useContext } from 'react'

export function ContentCorrection() {
  const { contentCorrection, err, isLoading } = useContext(
    ContentCorrectionContext,
  )

  if (!contentCorrection) {
    return <p className="pt-44">Dados não encontado</p>
  }

  if (err) {
    return <p className="pt-44">Deu erro!</p>
  }

  if (isLoading) {
    return <p className="pt-44">Carregando...</p>
  }

  const originalDocumentContent =
    contentCorrection.documentContent.originalDocumentContent

  const newDocumentContent =
    contentCorrection.documentContent.newDocumentContent

  const quiz = contentCorrection.quizQuestions.quiz
  const rules = contentCorrection.documentContent.rules
  const evaluation = Number(contentCorrection.documentContent.evaluation)
  const comment = contentCorrection.documentContent.comment

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

                <button className="mt-4 border p-1">
                  Download do resultado em PDF
                </button>
              </div>
            </section>
          </section>

          <section className="mt-20 flex flex-col gap-20">
            <article>
              <h2>Questões:</h2>
              {quiz &&
                JSON.parse(quiz).map((item: string, index: number) => {
                  return <div key={index}>{item}</div>
                })}
            </article>

            <article>
              <h2>Regras:</h2>
              {JSON.parse(rules).map((item: string, index: number) => {
                return <div key={index}>{item}</div>
              })}
            </article>

            {evaluation && <Evaluation score={evaluation} comment={comment} />}
          </section>
        </>
      )}
    </section>
  )
}
