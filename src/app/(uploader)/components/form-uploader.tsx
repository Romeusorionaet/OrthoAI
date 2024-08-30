'use client'

import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export function FormUploader() {
  const [isInvalidFileType, setIsInvalidFileType] = useState<boolean>(false)
  const [isFileSelected, setIsFileSelected] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const formData = new FormData()
    const fileInput = e.currentTarget.querySelector(
      'input[name="file"]',
    ) as HTMLInputElement

    const allowedMimeTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const selectedFile = fileInput.files[0]

      if (!allowedMimeTypes.includes(selectedFile.type)) {
        setIsInvalidFileType(true)
        alert('Tipo de arquivo não permitido.')

        return
      } else {
        setIsInvalidFileType(false)
      }

      formData.append('file', selectedFile)

      try {
        const response = await api.post('/upload-file', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        if (response.status === 201) {
          const data = await response.data
          localStorage.setItem(
            '@ortho-ai/documentContentId/1.0',
            data.documentContentId,
          )

          setLoading(false)

          router.push('/submit-content')
        } else {
          setLoading(false)
          alert(`Erro: ${response.data.message}`)
        }
      } catch (err: any) {
        setLoading(false)

        const errMessage =
          err.response?.data?.message || err.message || 'Erro desconhecido'

        alert(
          `Erro: ${errMessage}. Este erro não deveria ter acontencido. Tente com outro arquivo.`,
        )
      }
    }
  }

  const handleSelectFile = () => {
    setIsFileSelected(true)
    setIsInvalidFileType(false)
  }

  return (
    <form onSubmit={handleUpload} className="mx-auto w-full text-center">
      <label className="flex flex-col items-center gap-2">
        <input
          type="file"
          name="file"
          onChange={() => handleSelectFile()}
          data-invalid={isInvalidFileType}
          className="text-cl_1 data-[invalid=true]:text-cl_5"
        />
        <span className="text-cl_3 opacity-70">
          .pdf / .docx / .jpg / .jpeg / .png
        </span>
      </label>

      {loading ? (
        <p>processando...</p>
      ) : (
        <button
          type="submit"
          data-value={isFileSelected}
          className="mt-8 w-28 rounded-lg border border-cl_1 p-1 duration-500 data-[value=false]:cursor-not-allowed data-[value=false]:opacity-50 data-[value=true]:hover:scale-105"
        >
          Enviar
        </button>
      )}
    </form>
  )
}
