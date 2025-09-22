import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;

const PUBLIC_ROUTES = [ "/login", "/register", "/" ];

const PROTECTED_ROUTES = [ "/posts" ];

export default async function middleware(request) {
    const response = NextResponse.next();
    const pathname = request.nextUrl.pathname;

    if (PUBLIC_FILE.test(pathname)) {
        return response;
    }

    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "origin-when-cross-origin");
    response.headers.set("Permissions-Policy", "microphone=*, camera=*");

    const isProtectedRoute = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    if (isProtectedRoute) {
        const token = request.cookies.get("authToken")?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/login", request.url));
        }
    }

    if (isPublicRoute && pathname !== "/") {
        const token = request.cookies.get("authToken")?.value;

        if (token && (pathname === "/login" || pathname === "/register")) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    }

    return response;
}

export const config = {
    matcher: [ "/((?!api|_next/static|_next/image|favicon.ico).*)", "/" ],
};
