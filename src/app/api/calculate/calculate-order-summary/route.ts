import { NextRequest, NextResponse } from "next/server";

interface OrderSummaryRequest {
    data: string;
}

interface ParsedOrderItem {
    [key: string]: number;
    Total: number;
}

export async function POST(request: NextRequest) {
    try {
        const body: OrderSummaryRequest = await request.json();

        if (!body.data || typeof body.data !== "string") {
            return NextResponse.json(
                { error: "Invalid input: data string is required" },
                { status: 400 }
            );
        }

        const lines = body.data.trim().split("\n");
        const parsedOrders: ParsedOrderItem = { Total: 0 };

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines and ALERT lines
            if (!line || line === "ALERT") {
                continue;
            }

            // Check if this line is a number (quantity)
            const quantityMatch = line.match(/^\d+$/);
            if (quantityMatch) {
                const quantity = parseInt(line, 10);

                // Look for the next non-empty line which should contain the product info
                for (let j = i + 1; j < lines.length; j++) {
                    const nextLine = lines[j].trim();

                    if (nextLine && nextLine !== "ALERT") {
                        // Parse product name and pieces
                        // Format: "Product Name - X pieces"
                        const productMatch = nextLine.match(
                            /^(.+?)\s*-\s*(\d+)\s*pieces?$/i
                        );

                        if (productMatch) {
                            const product = productMatch[1].trim();
                            const pieces = parseInt(productMatch[2], 10);

                            if (parsedOrders[product]) {
                                parsedOrders[product] += pieces * quantity;
                            } else {
                                parsedOrders[product] = pieces * quantity;
                            }

                            parsedOrders.Total += pieces * quantity;
                        }

                        // Move the outer loop index past this product line
                        i = j;
                        break;
                    }
                }
            }
        }
        if (parsedOrders["Mixed"]) {
            if (parsedOrders["Chicken teriyaki"]) {
                parsedOrders["Chicken teriyaki"] += parsedOrders["Mixed"] / 2;
            } else {
                parsedOrders["Chicken teriyaki"] = parsedOrders["Mixed"] / 2;
            }

            if (parsedOrders["Salmon & Avocado"]) {
                parsedOrders["Salmon & Avocado"] += parsedOrders["Mixed"] / 2;
            } else {
                parsedOrders["Salmon & Avocado"] = parsedOrders["Mixed"] / 2;
            }
            delete parsedOrders["Mixed"];
        }
        console.log(parsedOrders);

        return NextResponse.json({ parsedOrders }, { status: 200 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
