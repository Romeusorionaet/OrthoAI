import { KeyCookies } from '@/constants/key-cookies'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const getToken = () => {
  const token = cookies().get(KeyCookies.AT_DC)
  return token
}

function handleAuthenticatedRequest(request: NextRequest) {
  const token = getToken()

  if (!token) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/correction' || url.pathname === '/submit-content') {
      url.pathname = '/'

      return NextResponse.redirect(url)
    }
  }

  return null
}

export async function middleware(request: NextRequest) {
  const response = handleAuthenticatedRequest(request)

  return response || NextResponse.next()
}

export const config = {
  matcher: ['/submit-content', '/correction', '/'],
}
