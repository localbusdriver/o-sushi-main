// src\app\api\kindo\get-session\route.tsx
import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

export async function GET(req: NextRequest) {
    if (!process.env.KINDO_API_EMAIL || !process.env.KINDO_API_PASSWORD) {
        return NextResponse.json(
            { error: "KINDO_API_EMAIL or KINDO_API_PASSWORD is not defined" },
            { status: 400 }
        );
    }

    const response = await fetchKindoAPI({
        path: "/sessions",
        method: "POST",
        contentType: "application/x-www-form-urlencoded",
        body: {
            email: process.env.KINDO_API_EMAIL!,
            password: process.env.KINDO_API_PASSWORD!,
        } as Record<string, string>,
    });

    if (!response.ok) {
        const responseText = await response.text();
        console.log("response text", responseText);
        console.log(response.statusText);
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const cookies = response.headers.get("Set-Cookie");

    if (!cookies) {
        console.log("Response body:", await response.text());
        return NextResponse.json(
            { error: "Failed to get session" },
            { status: response.status }
        );
    }

    const jsonResponse = NextResponse.json(cookies, {
        status: response.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Expose-Headers": "Set-Cookie",
            // Add strict cache control headers
            "Cache-Control":
                "no-store, no-cache, must-revalidate, proxy-revalidate",
            Pragma: "no-cache",
            Expires: "0",
            "Surrogate-Control": "no-store",
        },
    });

    // Forward the cookies in the response
    if (cookies) {
        jsonResponse.headers.append("Set-Cookie", cookies);
    }

    return jsonResponse;
}
