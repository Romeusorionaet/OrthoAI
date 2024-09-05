import { KeyCookies } from '@/constants/key-cookies'
import { createJwtAndSetCookie } from '@/utils/create-jwt-and-set-cookie'

interface ResponseProps {
  success: boolean
}

export const getDocumentContent = async ({
  id,
}: {
  id: string
}): Promise<ResponseProps> => {
  if (!id) {
    return { success: false }
  }

  createJwtAndSetCookie({
    id,
    key: KeyCookies.AT_DC,
  })

  return { success: true }
}
