import { NextRequest, NextResponse } from "next/server";

async function POST(req: NextRequest) {
    const { targetDate, cookie } = await req.json();

    return NextResponse.json({});
}
