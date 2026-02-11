import { NextRequest, NextResponse } from "next/server";

interface DoublesType {
    [key: string]: {
        member?: string;
        roomNumber?: string;
        item?: string;
        quantity?: string;
        organization?: string;
        noDoubles?: string;
    };
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const results: DoublesType[] = [];

        if (!file) {
            return NextResponse.json(
                {
                    results: results,
                    message:
                        "Upload failed, no file was detected in the request.",
                },
                { status: 400 }
            );
        }

        const text = await file.text();

        if (!text || text.trim().length === 0) {
            return NextResponse.json(
                {
                    results: results,
                    message: "File received, but it appears to be empty.",
                },
                { status: 200 }
            );
        }

        const lines = text.split("\n").map((line) => line.split(","));

        // Remove header row
        lines.shift();

        // Member:0, Location:1, Item:6, Quantity:10, Organization:22
        lines.forEach((line) => {
            // Check if quantity (index 10) is greater than 1
            const quantity = line[10]?.trim();
            if (quantity && parseInt(quantity, 10) > 1) {
                const member = line[0]?.trim() || "";
                const location = line[1]?.trim() || "";
                const item = line[6]?.trim() || "";
                const organization = line[22]?.trim() || "";

                results.push({
                    member: member,
                    roomNumber: location,
                    item: item,
                    quantity: quantity,
                    organization: organization,
                } as DoublesType);
            }
        });

        console.log(results);

        if (results.length === 0) {
            return NextResponse.json(
                {
                    results: results,
                    message: "No double orders found in the uploaded file.",
                },
                { status: 200 }
            );
        }

        return NextResponse.json({ results: results }, { status: 200 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { results: [], message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
