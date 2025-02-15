// src\lib\utils.ts
import { type ClassValue, clsx } from "clsx";
import { Decimal } from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDecimal(decimal: Decimal) {
    return decimal.toNumber();
}

function getCookieHeader(cookies: Record<string, string>) {
    return Object.entries(cookies)
        .map(([Key, value]) => `${Key}=${value}`)
        .join("; ");
}

export const fetchKindoAPI = async ({
    path,
    method,
    cookie,
    contentType,
    body,
}: {
    path: string;
    method: "GET" | "POST";
    contentType: string;
    cookie?: string;
    body?:
        | string
        | Record<string, string>
        | string[][]
        | URLSearchParams
        | undefined;
}) => {
    if (!process.env.KINDO_API_URL) {
        throw new Error("KINDO_API_URL is not defined. Check env.");
    }

    if (method === "GET" && !cookie) {
        throw new Error("cookie is required for GET requests");
    }

    const cookies: Record<string, string> = {
        "ezsyssession.shop.kindo.co.nz": "66f105b80abae780dac6feb59832b1ae",
        // "ezsyssession.shop.kindo.co.nz": cookie || "",
        _ga: "GA1.1.1730142000.1739169044",
        "thegrowthcollectivelimited-_zldp":
            "enAQevcBCesHhPR8nz2O4IOYx3Kxli%2FrursEQxfEkj6jcxSyQPI2mL%2BV8cZ5cjGwb3qDSNrSNME%3D",
        "thegrowthcollectivelimited-_zldt":
            "8a29f51b-5df5-4d9a-870d-7ff77cb906ef-0",
        _ga_3Z8BTZRZE4: "GS1.1.1739169043.1.1.1739169490.0.0.0",
    };

    const cookieHeader = cookie && getCookieHeader(cookies);

    const headers: HeadersInit = {
        "Content-Type": contentType,
        "Referer-Policy": "strict-origin-when-cross-origin",
        Referer: "https://shop.kindo.co.nz/",
        Origin: "https://shop.kindo.co.nz/",
        "Cache-Control": "no-cache",
    };
    headers.Cookie = cookieHeader || "";

    let reqBody = null;
    if (
        method === "POST" &&
        body &&
        headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
        reqBody = new URLSearchParams(body).toString();
    }
    const endpoint = new URL(`${process.env.KINDO_API_URL}/api${path}`);

    const fetchOptions: RequestInit = {
        method: method,
        headers: headers,
        credentials: "include",
        next: {
            revalidate: 0,
        },
    };
    if (reqBody) {
        fetchOptions.body = reqBody;
    }

    console.log("\n", endpoint.toString());
    console.log("\n", headers);
    console.log("\n", fetchOptions);
    return await fetch(endpoint.toString(), fetchOptions);
};
