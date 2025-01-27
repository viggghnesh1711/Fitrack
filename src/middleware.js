import { NextResponse } from 'next/server';

export function middleware(request) {
    const { pathname } = request.nextUrl; // Get the current path
    const userEmail = request.cookies.get('userEmail')?.value; // Retrieve the userEmail cookie value

    // Define public paths that don't require authentication
    const publicPaths = ['/Sign-In', '/Sign-Up'];

    // Check if the current path is a public path
    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    // Redirect if the user is not authenticated and trying to access a non-public path
    if (!userEmail && !isPublicPath) {
        return NextResponse.redirect(new URL('/Sign-In', request.url));
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Apply the middleware to all routes except static files and API routes
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)', // Middleware applies to all routes except excluded ones
};
