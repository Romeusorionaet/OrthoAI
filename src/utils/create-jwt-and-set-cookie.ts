'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

interface Props {
  id: string
  key: string
}

export const createJwtAndSetCookie = ({ id, key }: Props) => {
  const payload = { id }

  const secretKey = process.env.JWT_SECRET_KEY as string
  const value = jwt.sign(payload, secretKey, { expiresIn: '1h' })

  cookies().set(key, value, {
    path: '/',
    sameSite: 'lax',
    httpOnly: false,
  })
}
