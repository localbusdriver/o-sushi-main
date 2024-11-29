import { NextRequest, NextResponse } from "next/server";

import { DoublesType } from "@/lib/types/school-summary-types";
import { fetchKindoAPI } from "@/lib/utils";

const formatOrders = (unformattedOrders: []): DoublesType[] => {
    const res: DoublesType[] = [];

    unformattedOrders.forEach((order) => {
        const { product, quantity, student_name, school, student_room } = order;
        if (quantity < 2) return;
        res.push({
            item: product,
            quantity: quantity,
            student: student_name,
            school: school,
            roomNumber: student_room,
        });
    });
    return res;
};

export async function POST(req: NextRequest) {
    const { targetDate, cookies } = await req.json();
    const path = `?path=%2Fsupplier%2Fosushi%2Forders&start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`;
    const path2 = `?path=%2Fsupplier%2Fosushi_2%2Forders&start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`;
    const referer = "https://shop.tgcl.co.nz/app/order-status";
    console.log(targetDate);

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
    const response2 = await fetchKindoAPI({
        path: path2,
        method: "GET",
        contentType: "application/json",
        referer: referer,
        cookie: cookies,
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

    const concattenatedResponse = orders.concat(orders2);
    const formattedOrders = formatOrders(concattenatedResponse);

    return NextResponse.json(formattedOrders, { status: response.status });
}
