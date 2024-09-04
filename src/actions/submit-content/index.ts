import { api } from '@/lib/api'
import { getDecodedJwtFromCookie } from '@/utils/get-decoded-jwt-from-cookie'

interface Props {
  rules: string[]
  questions: string[]
}

interface ResponseProps {
  success: boolean
  message: string
}

export const submitContent = async ({
  rules,
  questions,
}: Props): Promise<ResponseProps> => {
  const { id } = await getDecodedJwtFromCookie()

  if (!id) {
    return {
      success: false,
      message: 'O endereço desse processo foi expirado.',
    }
  }

  try {
    const response = await api.post('/submit-content', {
      id,
      rules,
      questions,
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
