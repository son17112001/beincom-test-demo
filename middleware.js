import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

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

    // Handle authentication (optional)
    // You can add authentication logic here
    // const token = request.cookies.get('authToken');
    // if (!token && !pathname.startsWith('/login')) {
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }

    return response;
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/",
    ],
};
