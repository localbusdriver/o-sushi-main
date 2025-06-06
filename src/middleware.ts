import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    console.log("Middleware executed");

    const { pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;
    const validToken = token ? await isValidToken(token) : null;

    const publicPaths: string[] = [
        "/api/auth/",
        "/_next/static/",
        "/favicon.ico",
        "/login",
        "/home",
    ];

    const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

    if (pathname === "/" || isPublicPath) {
        return NextResponse.redirect(new URL("/protected", req.url));
    }

    if (pathname === "/login" && validToken) {
        return NextResponse.redirect(new URL("/protected/main", req.url));
    }

    if (isPublicPath) {
        return NextResponse.next();
    }

    if (pathname === "/protected") {
        return NextResponse.redirect(new URL("/protected/main", req.url));
    }

    if (pathname.startsWith("/protected")) {
        return NextResponse.next();
    }

    if (pathname.startsWith("/protected")) {
        console.log("/protected middleware executed");
        if (!validToken) {
            return NextResponse.redirect(new URL("/login", req.url));
        } else {
            if (pathname === "/protected") {
                return NextResponse.redirect(
                    new URL("/protected/main", req.url)
                );
            }
            return NextResponse.next();
        }
    }
    console.log("Token found, proceeding to next response");
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|api/auth/|/protected/:path*).*)",
    ],
};

interface Token {
    refreshToken: string;
    accessTokenExpires?: number;
}

const isValidToken = async (token: string): Promise<boolean> => {
    try {
        await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return true;
    } catch (error: any) {
        console.error("[ERROR] ", error.message);
        return false;
    }
};
