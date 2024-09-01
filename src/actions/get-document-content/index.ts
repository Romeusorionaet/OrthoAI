import { api } from '@/lib/api'
import { DocumentContentProps } from '@/providers/content-correction-provider'
import { getDecodedJwtFromCookie } from '@/utils/get-decoded-jwt-from-cookie'

interface ResponseProps {
  documentContent: DocumentContentProps | null
}

export const getDocumentContent = async (): Promise<ResponseProps> => {
  const { id } = await getDecodedJwtFromCookie()

  try {
    const response = await api.get(`/correction/${id}`)

    return {
      documentContent: response.data,
    }
  } catch (err: any) {
    return { documentContent: null }
  }
}
