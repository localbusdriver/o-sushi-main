import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define the allowed paths
const ALLOWED_PATHS = [
    "/protected/school-summary/double-orders",
    "/protected/school-summary/order-summary",
];

// Default redirect path
const DEFAULT_PATH = "/protected/school-summary/order-summary";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if the current path is in the allowed paths list
    const isAllowedPath = ALLOWED_PATHS.includes(pathname);

    // If the path is not allowed, redirect to the default path
    if (!isAllowedPath) {
        const url = request.nextUrl.clone();
        url.pathname = DEFAULT_PATH;
        return NextResponse.redirect(url);
    }

    // Allow the request to proceed
    return NextResponse.next();
}

// Configure which routes should trigger the middleware
// This applies to all routes to catch any navigation attempts
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
    ],
};
