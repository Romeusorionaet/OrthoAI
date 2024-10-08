'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { KeyCookies } from '@/constants/key-cookies'

export const getDecodedJwtFromCookie = async () => {
  const token = cookies().get(KeyCookies.AT_DC)?.value

  if (!token) {
    return { id: null }
  }

  const secretKey = process.env.JWT_SECRET_KEY as string

  try {
    const decoded = jwt.verify(token, secretKey) as { id: string }
    return { id: decoded.id }
  } catch (err) {
    return { id: null }
  }
}
