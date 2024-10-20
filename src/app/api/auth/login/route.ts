import { NextRequest, NextResponse } from "next/server";

import { SignJWT } from "jose";

export async function POST(req: NextRequest) {
  const { user, password } = await req.json();

  if (
    user === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const response = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } else {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }
}
