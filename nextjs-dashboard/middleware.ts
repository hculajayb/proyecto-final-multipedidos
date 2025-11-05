import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Auth middleware using Auth.js v5-compatible `getToken` helper.
// Protects routes under `/dashboard` and redirects unauthenticated users to `/login`.
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip Next.js internals and public assets
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next();
  }

  // Only protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    try {
      const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
      if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = '/login';
        url.search = `callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
        return NextResponse.redirect(url);
      }
    } catch (error) {
      // If token extraction fails, redirect to login as a safe fallback
      const url = req.nextUrl.clone();
      url.pathname = '/login';
      url.search = `callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`;
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
  // Next.js (v15) requires the experimental runtime name during production build
  // when using edge functions in middleware
  runtime: 'experimental-edge',
};