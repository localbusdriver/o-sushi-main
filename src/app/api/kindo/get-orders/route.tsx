import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

const handleOrders = (html: string): { [key: string]: string } => {
    const res = {};
    return res;
};

const formatOrders = (unformattedOrders: {
    [key: string]: string;
}): { [key: string]: string } => {
    const res = {};
    return res;
};

export async function POST(req: NextRequest) {
    const { targetDate, cookie } = await req.json();
    const path = `?path=/supplier/osushi/production_list&target_date=${targetDate}&production_list_name=&format=html&all_suppliers=true`;
    const referer = `https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=${targetDate}&task=production_list`;

    const response = await fetchKindoAPI({
        path: path,
        method: "GET",
        contentType: "text/html",
        referer: referer,
        cookie: cookie,
    });

    if (!response.ok) {
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const responseText = await response.text();
    console.log(responseText);
    const unformattedOrders = handleOrders(responseText);
    const formattedOrders = formatOrders(unformattedOrders);
    console.log(formattedOrders);

    return NextResponse.json(formattedOrders, { status: response.status });
}
