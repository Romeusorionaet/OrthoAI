import { KeyCookies } from '@/constants/key-cookies'
import { createJwtAndSetCookie } from '@/utils/create-jwt-and-set-cookie'
import { getDecodedJwtFromCookie } from '@/utils/get-decoded-jwt-from-cookie'

interface ResponseProps {
  success: boolean
}

export const setCookieIdDocument = async ({
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

  const { id: hasId } = await getDecodedJwtFromCookie()

  if (hasId) {
    return { success: true }
  } else {
    return { success: false }
  }
}
