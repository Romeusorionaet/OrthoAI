'use client'

import { upload } from '@/actions/upload'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { CPLoading } from '@/components/cp-loading'

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
        setLoading(false)

        alert('Tipo de arquivo não permitido.')

        return
      } else {
        setIsInvalidFileType(false)
      }

      formData.append('file', selectedFile)

      try {
        const response = await upload({ formData })

        if (response.success === true) {
          router.push('/submit-content')
        } else {
          setLoading(false)
          alert(`Erro: ${response.message}`)
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
    <div className="mx-auto mb-20 w-full text-center">
      <CPLoading loading={loading} />

      <form onSubmit={handleUpload} className="">
        <label className="flex flex-col items-center gap-2">
          <input
            type="file"
            name="file"
            onChange={() => handleSelectFile()}
            data-invalid={isInvalidFileType}
            className="text-cl_1 data-[invalid=true]:text-cl_5"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm">
              <span className="font-bold">Formatos:</span> .pdf / .docx / .jpg /
              .jpeg / .png
            </p>
            <p className="text-sm">
              <span className="font-bold">Tamanho:</span> 2 MB
            </p>
          </div>
        </label>

        <button
          type="submit"
          data-value={isFileSelected}
          disabled={loading}
          className="mt-8 w-28 rounded-lg border border-cl_1 p-1 duration-500 disabled:cursor-not-allowed disabled:opacity-50 data-[value=false]:pointer-events-none data-[value=false]:opacity-50 data-[value=true]:hover:scale-105"
        >
          Enviar
        </button>
      </form>
    </div>
  )
}
