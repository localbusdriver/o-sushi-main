// src\app\api\kindo\get-doubles\route.tsx
import { NextRequest, NextResponse } from "next/server";

import { DoublesType } from "@/lib/types/school-summary-types";
import { fetchKindoAPI } from "@/lib/utils";

const formatOrders = (unformattedOrders: any[]): DoublesType[] => {
    const res: DoublesType[] = [];

    unformattedOrders.forEach((order) => {
        const { product, quantity, student_name, school, student_room } = order;
        if (quantity < 2) return;
        res.push({
            item: product,
            quantity: quantity,
            member: student_name,
            organization: school,
            roomNumber: student_room,
        });
    });
    return res;
};

export async function POST(req: NextRequest) {
    const { targetDate, cookies } = await req.json();
    const path = `/supplier/osushi/orders?start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`;

    const response = await fetchKindoAPI({
        path: path,
        method: "GET",
        contentType: "application/json",
        cookie: cookies,
    });

    if (!response.ok) {
        const responseText = await response.text();
        console.log(responseText);
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const response2 = await fetchKindoAPI({
        path: `/supplier/osushi_2/orders?start_date=${targetDate}&end_date=${targetDate}&status_list=pending%2Cprocessing%2Ccompleted&non_orders=false`,
        method: "GET",
        contentType: "application/json",
        cookie: cookies,
    });

    const responseJSON = await response.json();
    const response2JSON = await response2.json();

    const orders = responseJSON.orders;
    const orders2 = response2JSON.orders;

    if (!orders && !orders2)
        return NextResponse.json([], { status: response.status });
    const conncattenatedOrders = [...orders, ...orders2];
    const formattedOrders = formatOrders(conncattenatedOrders);

    return NextResponse.json(formattedOrders, { status: response.status });
}
