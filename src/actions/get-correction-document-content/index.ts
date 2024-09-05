import { api } from '@/lib/api'
import { DocumentContentProps } from '@/providers/content-correction-provider'
import { getDecodedJwtFromCookie } from '@/utils/get-decoded-jwt-from-cookie'

interface ResponseProps {
  documentContent: DocumentContentProps | null
}

export const getCorrectionDocumentContent =
  async (): Promise<ResponseProps> => {
    const { id } = await getDecodedJwtFromCookie()

    if (!id) {
      return { documentContent: null }
    }

    try {
      const response = await api.get(`/correction/${id}`)

      return {
        documentContent: response.data,
      }
    } catch (err: any) {
      return { documentContent: null }
    }
  }
