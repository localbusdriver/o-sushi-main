import { NextRequest, NextResponse } from "next/server";

import { fetchKindoAPI } from "@/lib/utils";

const formatOrders = (unformattedOrders: {
    [key: string]: string;
}): { [key: string]: string } => {
    const res = {};
    return res;
};

export async function POST(req: NextRequest) {
    const { targetDate, cookie } = await req.json();
    const path = `?path=%2Fsupplier%2Fosushi%2Forders&start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`;
    const path2 = `?path=%2Fsupplier%2Fosushi%2Forders&start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`;
    const referer = `https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=${targetDate}&task=production_list`;

    const response = await fetchKindoAPI({
        path: path,
        method: "GET",
        contentType: "text/json",
        referer: referer,
        cookie: cookie,
    });
    if (!response.ok) {
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const response2 = await fetchKindoAPI({
        path: path2,
        method: "GET",
        contentType: "text/json",
        referer: referer,
        cookie: cookie,
    });
    if (!response2.ok) {
        return NextResponse.json(
            { error: response2.statusText },
            { status: response2.status }
        );
    }

    const responseText = await response.json();
    const response2Text = await response2.json();
    const orders = responseText.orders;
    const orders2 = response2Text.orders;
    console.log(orders.length, orders2.length, orders.length + orders2.length);
    const concattenatedResponse = orders.concat(orders2);
    console.log(concattenatedResponse.length);

    console.log(responseText);
    const formattedOrders = formatOrders(concattenatedResponse);
    console.log(formattedOrders);

    return NextResponse.json(formattedOrders, { status: response.status });
}
