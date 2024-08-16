'use client'

import Evaluation from '@/components/evaluation'
import RoleConfig from '@/components/role-config'
import ShareQuestions from '@/components/share-questions'
import { api } from '@/lib/api'
import React, { useState } from 'react'

export default function Home() {
  const [originalText, setOriginalText] = useState<string | null>(null)
  const [correctedText, setCorrectedText] = useState<string | null>(null)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    try {
      const response = await api.post('/upload-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      console.log(response, '===response')

      if (response.status === 200) {
        const data = await response.data
        setOriginalText(data.originalText)
        setCorrectedText(data.correctedText)
      } else {
        console.error('Erro ao processar o arquivo:', response.statusText)
      }
    } catch (error) {
      console.error('Erro ao enviar o arquivo:', error)
    }
  }

  return (
    <main className="mx-auto w-full max-w-[1680px] space-y-20 px-4 pt-20">
      <div className="w-full max-w-[800px]">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, rerum!
          Optio perferendis impedit exercitationem dolorem tempora amet sint ab
          quasi mollitia vero, voluptatem id veritatis cupiditate? Perferendis
          fugiat repellat dolores.
        </p>
      </div>

      <section className="mx-auto flex w-full items-start gap-20 max-md:flex-col md:gap-4">
        <form onSubmit={handleUpload} className="mx-auto w-full text-center">
          <label className="flex flex-col items-center gap-2">
            <input type="file" name="file" className="text-cl_1" />
            <span className="opacity-80">pdf / docx / jpg / jpeg</span>
          </label>

          <button
            type="submit"
            className="mt-8 w-28 rounded-lg border border-cl_1 p-1 duration-500 hover:scale-105"
          >
            Enviar
          </button>
        </form>

        <RoleConfig />
      </section>

      {originalText && correctedText && (
        <section className="flex flex-col items-center gap-4">
          <h2>Resultado da Correção</h2>

          <div className="flex gap-4">
            <div className="w-1/2 border p-4">
              <h3>Texto Original</h3>
              <p>{originalText}</p>
            </div>

            <div className="w-1/2 border p-4">
              <h3>Texto Corrigido</h3>
              <p>{correctedText}</p>

              <button className="mt-4 border p-1">
                Download do resultado em PDF
              </button>
            </div>
          </div>
        </section>
      )}

      <Evaluation />
      <ShareQuestions />
    </main>
  )
}
