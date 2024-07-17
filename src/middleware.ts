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

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  if(pathname === "/login" && validToken){
    return NextResponse.redirect(new URL("/protected/main", req.url));
  }

  if (pathname.startsWith("/protected")) {

    console.log("/protected middleware executed");

    if (!validToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    else{
      return NextResponse.next();
    }

    
  }
  //   if (!token && isPublicPath) {
  //     return NextResponse.next();
  //   }

  //   if (!token) {
  //     console.log("No token found, redirecting to sign in page");
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   const expired = token.accessTokenExpires && Date.now() >= token.accessTokenExpires * 1000;

  //   if (!isPublicPath && (expired || !token.accessTokenExpires)) {
  //     console.log("Token expired, redirecting to login page");
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }

  //   if (token && (isPublicPath || pathname === "/")) {
  //     console.log("Public Path found, redirecting to dashboard");
  //     return NextResponse.redirect(new URL("/dashboard", req.url));
  //   }

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

const isValidToken = async (token:string):Promise<boolean> =>{
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return true;
  } catch (error: any) {
    console.error("[ERROR] ", error.message);
    return false;
  }
}
async function refreshAccessToken(token: Token) {
  const response = await fetch("http://localhost:3000/api/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: token.refreshToken,
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    console.log("Failed to refresh token");
    return null;
  }

  const data = await response.json();
  return data;
}
