// app/middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  const supabase = createMiddlewareSupabaseClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = req.nextUrl.pathname

  // 🔐 Protect all /admin/* routes
  if (pathname.startsWith('/admin') && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // 🚫 Prevent authenticated users from accessing /login or /
  if ((pathname === '/' || pathname === '/login') && session) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return res
}

export const config = {
  matcher: [
    '/',              // guest landing
    '/login',         // login route
    '/admin/:path*',  // admin-only routes
  ],
}
