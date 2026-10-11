import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/login')
  const isApiAuth = request.nextUrl.pathname.startsWith('/api/auth')
  const token = request.cookies.get('next-auth.session-token')

  // If trying to access protected route without token, redirect to login
  if (!isAuthPage && !isApiAuth && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If already logged in and trying to access login page, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|login|_next/static|_next/image|favicon.ico).*)"],
}
