import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

export async function POST(req: NextRequest) {
    const { targetDate, cookies } = await req.json();

    const path = `?path=/supplier/osushi/label_pdf&target_date=${targetDate}&detail=label_pdf_sop_3x11`;
    const referer = `https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=${targetDate}&task=label_pdf_sop_3x11`;

    const response = await fetchKindoAPI({
        path: path,
        method: "GET",
        contentType: "application/json",
        referer: referer,
        cookie: cookies,
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const pdfData = await response.arrayBuffer();
    console.log(pdfData);
    return new NextResponse(pdfData, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="osushi-labels-${targetDate}.pdf"`,
            "Content-Length": pdfData.byteLength.toString(),
        },
    });
}
