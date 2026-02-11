import { NextRequest, NextResponse } from "next/server";

interface OrderSummaryRequest {
    data: string;
}

interface SummaryType {
    [key: string]: number;
    Total: number;
}

interface ParsedOrderItem {
    [key: string]: { pieces: number; product: string; quantity: number };
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
        const parsedOrders: ParsedOrderItem = {};

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

                            parsedOrders[product] = {
                                product: product,
                                pieces: pieces,
                                quantity:
                                    ((parsedOrders[product] &&
                                        parsedOrders[product].quantity) ??
                                        0) + quantity,
                            };
                        }

                        // Move the outer loop index past this product line
                        i = j;
                        break;
                    }
                }
            }
        }

        console.log(parsedOrders);

        // Calculate summary by aggregating product-pieces combinations
        const results: SummaryType = { Total: 0 };

        for (const product in parsedOrders) {
            const order = parsedOrders[product];
            const totalPieces = order.quantity * order.pieces;

            results[product] = (results[product] ?? 0) + totalPieces;
            results.Total += totalPieces;
        }

        console.log(results);

        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
