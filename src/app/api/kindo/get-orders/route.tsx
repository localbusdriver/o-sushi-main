import { NextRequest, NextResponse } from "next/server";

import { parse } from "node-html-parser";

import { fetchKindoAPI } from "@/lib/utils";

interface SushiOrder {
    [key: string]: number;
}

function parseSushiTable(htmlString: string): SushiOrder {
    const root = parse(htmlString);
    const orders: SushiOrder = {};

    const rows = root.querySelectorAll(".plist_table tr");
    rows.forEach((row) => {
        const productCell = row.querySelector(".product");
        const quantityCell = row.querySelector(".quantity");
        if (!quantityCell || !productCell) return;

        const product = productCell.text.trim().split(" - ");
        const productName = product[0];
        const productAmount = product[1].match(/\d+/)?.[0];
        const quantity =
            parseInt(quantityCell.text.trim() || "0", 10) *
            parseInt(productAmount || "0", 10);

        if (productName === "Mixed") {
            orders["Chicken teriyaki"] =
                (orders["Chicken teriyaki"] || 0) + Math.round(quantity / 2);
            orders["Salmon & Avocado"] =
                (orders["Salmon & Avocado"] || 0) + Math.round(quantity / 2);
        } else {
            orders[productName] = (orders[productName] || 0) + quantity;
        }
        orders["Total"] = (orders["Total"] || 0) + quantity;
    });

    return orders;
}

export async function POST(req: NextRequest) {
    const { targetDate, cookies } = await req.json();
    const path = `?path=/supplier/osushi/production_list&target_date=${targetDate}&production_list_name=&format=html&all_suppliers=true`;
    const referer = `https://shop.tgcl.co.nz/shop/supplier.shtml?supplier=osushi&date=${targetDate}&task=production_list`;

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

    const responseText = await response.text();
    const parsedOrders = parseSushiTable(responseText);
    return NextResponse.json(parsedOrders, { status: response.status });
}
