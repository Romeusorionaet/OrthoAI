'use server'

import { KeyCookies } from '@/constants/key-cookies'
import { cookies } from 'next/headers'

export const deleteCookies = () => {
  cookies().delete(KeyCookies.AT_DC)
}
