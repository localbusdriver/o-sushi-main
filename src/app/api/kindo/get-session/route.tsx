import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

export async function GET(req: NextRequest) {
    const response = await fetchKindoAPI({
        path: "?path=/sessions",
        method: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        referer: "https://shop.tgcl.co.nz/app/login",
        body: {
            email: process.env.KINDO_API_EMAIL,
            password: process.env.KINDO_API_PASSWORD,
        },
    });

    if (!response.ok) {
        console.log(response.statusText);
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }
    const cookies = response.headers.get("set-cookie");

    if (!cookies) {
        console.log("Response body:", await response.text());
        return NextResponse.json(
            { error: "Failed to get cookies" },
            { status: response.status }
        );
    }

    const jsonResponse = NextResponse.json(cookies, {
        status: response.status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Expose-Headers": "Set-Cookie",
        },
    });

    // Forward the cookies in the response
    if (cookies) {
        jsonResponse.headers.append("Set-Cookie", cookies);
    }

    return jsonResponse;
}
