// src\app\api\kindo\get-orders\route.tsx
import { NextRequest, NextResponse } from "next/server";

import { parse } from "node-html-parser";

import { fetchKindoAPI } from "@/lib/utils";

type Category =
    | "Avocado"
    | "Chicken teriyaki"
    | "Salmon & Avocado"
    | "Tuna Mayo"
    | "Vegetarian";

interface SushiOrder {
    Avocado: number;
    "Chicken teriyaki": number;
    "Salmon & Avocado": number;
    "Tuna Mayo": number;
    Vegetarian: number;
    Total: number;
}

function parseSushiTable(htmlString: string): SushiOrder {
    const root = parse(htmlString);
    const orders: SushiOrder = {
        Avocado: 0,
        "Chicken teriyaki": 0,
        "Salmon & Avocado": 0,
        "Tuna Mayo": 0,
        Vegetarian: 0,
        Total: 0,
    };

    const rows = root.querySelectorAll(".plist_table tr");
    rows.forEach((row) => {
        const productCell = row.querySelector(".product");
        const quantityCell = row.querySelector(".quantity");
        if (!quantityCell || !productCell) return;

        const product = productCell.text.trim().split(" - ");
        const productName = product[0] as Category | "Mixed";
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

    console.log(orders);
    return orders;
}

export async function POST(req: NextRequest) {
    const { targetDate, cookies } = await req.json();

    const path = `?path=/supplier/osushi/production_list&target_date=${targetDate}&production_list_name=production_list&format=html`;

    const response = await fetchKindoAPI({
        path: path,
        method: "GET",
        contentType: "text/html",
        cookie: cookies,
        // cookie: "66f105b80abae780dac6feb59832b1ae",  // for testing
    });

    if (!response.ok) {
        console.log(response.statusText);
        return NextResponse.json(
            { error: response.statusText },
            { status: response.status }
        );
    }

    const responseText = await response.text();
    const parsedOrders = parseSushiTable(responseText);
    return NextResponse.json(parsedOrders, { status: response.status });
}
