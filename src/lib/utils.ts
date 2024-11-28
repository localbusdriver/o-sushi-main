import { type ClassValue, clsx } from "clsx";
import { Decimal } from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDecimal(decimal: Decimal) {
    return decimal.toNumber();
}

export const fetchKindoAPI = async ({
    path,
    method,
    contentType,
    referer,
    cookie,
    body,
    Credentials,
}: {
    path: string;
    method: "GET" | "POST";
    contentType?: string;
    referer?: string;
    cookie?: string;
    body?: { [key: string]: string | undefined };
    Credentials?: string;
}) => {
    if (!process.env.KINDO_API_URL) {
        throw new Error("KINDO_API_URL is not defined. Check env.");
    }

    const headers: { [key: string]: string } = {
        "Content-Type": contentType || "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    };
    referer && (headers["Referer"] = referer);
    cookie && (headers["Cookie"] = cookie + process.env.KINDO_COOKIE_ENDING);

    const endpoint = `${process.env.KINDO_API_URL}${path}`;
    const fetchOptions: RequestInit = {
        method: method,
        headers: headers,
        credentials: "include",
    };
    if (body && method === "POST") {
        if (contentType?.includes("x-www-form-urlencoded")) {
            const cleanBody: Record<string, string> = {};
            Object.entries(body).forEach(([key, value]) => {
                if (value !== undefined) {
                    cleanBody[key] = value;
                }
            });
            fetchOptions.body = new URLSearchParams(cleanBody).toString();
        } else {
            fetchOptions.body = JSON.stringify(body);
        }
    }

    return await fetch(endpoint, fetchOptions);
};
