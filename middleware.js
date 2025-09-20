import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/register', '/'];

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/posts', '/profile'];

export default async function middleware(request) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    // Skip middleware for public files
    if (PUBLIC_FILE.test(pathname)) {
        return response;
    }

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'microphone=*, camera=*');

    // Check if route is protected
    const isProtectedRoute = PROTECTED_ROUTES.some(route =>
        pathname.startsWith(route)
    );

    // Check if route is public
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // Handle authentication for protected routes
    if (isProtectedRoute) {
        const token = request.cookies.get('authToken')?.value;

        if (!token) {
            // Redirect to login if no token
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Redirect authenticated users away from auth pages
    if (isPublicRoute && pathname !== '/') {
        const token = request.cookies.get('authToken')?.value;

        if (token && (pathname === '/login' || pathname === '/register')) {
            // Redirect to home if already authenticated
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/",
    ],
};
