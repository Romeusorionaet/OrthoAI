import { KeyCookies } from '@/constants/key-cookies'
import { api } from '@/lib/api'
import { createJwtAndSetCookie } from '@/utils/create-jwt-and-set-cookie'

interface Props {
  formData: FormData
}

interface ResponseProps {
  success: boolean
  message: string
}

export const upload = async ({ formData }: Props): Promise<ResponseProps> => {
  try {
    const response = await api.post('/upload-file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    createJwtAndSetCookie({
      id: response.data.documentContentId,
      key: KeyCookies.AT_DC,
    })

    return {
      success: true,
      message: response.data.message,
    }
  } catch (err: any) {
    const errorMessage =
      err.response?.data?.error ||
      'Aconteceu um erro inesperado, tente novamente mais tarde.'

    return { success: false, message: errorMessage }
  }
}
