import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

export async function GET(req: NextRequest) {
    const response = await fetchKindoAPI({
        path: "?path=/sessions",
        method: "POST",
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        referer: "https://shop.tgcl.co.nz/app/login",
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const cookie = response.headers.get("set-cookie");
    return NextResponse.json({ cookie: cookie }, { status: response.status });
}
