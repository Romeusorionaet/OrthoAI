import { api } from '@/lib/api'

interface ResponseHistoricDocumentProps {
  documentsContent: {
    id: string
    evaluation: string
    rules: string
    created_at: string
  }[]
}

export const fetchHistoricDocuments =
  async (): Promise<ResponseHistoricDocumentProps> => {
    try {
      const response = await api.get('/documents-content')

      return {
        documentsContent: response.data,
      }
    } catch (err: any) {
      return { documentsContent: [] }
    }
  }
