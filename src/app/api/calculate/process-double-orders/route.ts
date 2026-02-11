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

        if (!file) {
            return NextResponse.json(
                { error: "Invalid input: CSV file is required" },
                { status: 400 }
            );
        }

        // Read the CSV file
        const text = await file.text();

        if (!text || text.trim().length === 0) {
            return NextResponse.json(
                { results: { 1: { noDoubles: "Please Upload File" } } },
                { status: 200 }
            );
        }

        // Split by lines and then by commas
        if (text.trim().length === 0) {
            return NextResponse.json(
                { results: { 1: { noDoubles: "File is empty" } } },
                { status: 200 }
            );
        }

        const lines = text.split("\n").map((line) => line.split(","));

        // Remove header row
        lines.shift();

        const results: DoublesType[] = [];

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

        return NextResponse.json({ results }, { status: 200 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
