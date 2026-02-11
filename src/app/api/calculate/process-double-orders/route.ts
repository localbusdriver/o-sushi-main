import { NextRequest, NextResponse } from "next/server";

interface DoublesType {
    [key: string]: {
        item: string;
        quantity: number;
        student: string;
        school: string;
        roomNumber: string;
    };
}

interface OrderRecord {
    student: string;
    item: string;
    quantity: number;
    school: string;
    roomNumber: string;
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json(
                { error: "Invalid input: CSV file is required" },
                { status: 400 }
            );
        }

        // Read the CSV file
        const text = await file.text();
        const lines = text.trim().split("\n");

        if (lines.length < 2) {
            return NextResponse.json(
                { error: "CSV file appears to be empty or invalid" },
                { status: 400 }
            );
        }

        // Parse CSV (assuming format: student,item,quantity,school,roomNumber)
        const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
        const orders: OrderRecord[] = [];

        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(",");
            if (values.length >= 5) {
                orders.push({
                    student: values[0]?.trim() || "",
                    item: values[1]?.trim() || "",
                    quantity: parseInt(values[2]?.trim() || "0", 10),
                    school: values[3]?.trim() || "",
                    roomNumber: values[4]?.trim() || "",
                });
            }
        }

        // Find duplicates - students who ordered the same item multiple times
        const studentItemMap = new Map<string, OrderRecord[]>();

        for (const order of orders) {
            const key = `${order.student}-${order.item}`;
            if (!studentItemMap.has(key)) {
                studentItemMap.set(key, []);
            }
            studentItemMap.get(key)!.push(order);
        }

        // Identify double orders (same student, same item, multiple entries)
        const results: DoublesType = {};
        let doubleIndex = 0;

        for (const [key, orderList] of studentItemMap.entries()) {
            if (orderList.length > 1) {
                // This is a double order
                for (const order of orderList) {
                    results[`double-${doubleIndex++}`] = {
                        item: order.item,
                        quantity: order.quantity,
                        student: order.student,
                        school: order.school,
                        roomNumber: order.roomNumber,
                    };
                }
            }
        }

        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
