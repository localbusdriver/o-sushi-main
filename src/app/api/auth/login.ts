import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "nookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { user, password } = req.body;

    if (
      user === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      setCookie({ res }, "token", "token-value", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1,000ms * 60s * 60m * 24h * 7d
        path: "/",
      });
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ message: "Unauthorized user" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}