import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const signedinPages = ['/', '/playlist', '/library']

export function middleware(req: NextRequest) {
  if (signedinPages.includes(req.nextUrl.pathname)) {
    const token = req.cookies.get('TRAX_ACCESS_TOKEN')?.value

    if (!token) {
      return NextResponse.redirect(new URL('/signin', req.url))
    }
  }

  // Let request continue if token exists or page not protected
  return NextResponse.next()
}

// Specify paths where middleware applies
export const config = {
  matcher: ['/', '/playlist', '/library'],
}
