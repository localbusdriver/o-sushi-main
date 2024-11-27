import { type ClassValue, clsx } from "clsx";
import { Decimal } from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDecimal(decimal: Decimal) {
    return decimal.toNumber();
}

const kindoAPI = "https://shop.tgcl.co.nz/shop/tgweb.aspx";
const cookieEnding =
    "_ga=GA1.1.1186274636.1732047157; thegrowthcollectivelimited-_zldp=enAQevcBCesINGz8lqNBlOjx8MjRoiW%2FcCoQlPqKqAy0VVpix3EO%2FbwEDN5%2BhEPbIRgzEMc8DME%3D; thegrowthcollectivelimited-_zldt=2fef66af-044b-4863-9b92-d658f0441615-1; isiframeenabled=true; _ga_3Z8BTZRZE4=GS1.1.1732050158.2.1.1732050160.0.0.0";

export const fetchKindoAPI = async ({
    path,
    method,
    contentType,
    referer,
    cookie,
}: {
    path: string;
    method: string;
    contentType?: string;
    referer?: string;
    cookie?: string;
}) => {
    const response = await fetch(`${kindoAPI}/${path}`, {
        headers: {
            Method: method,
            Cookie: cookie + cookieEnding,
            "Content-Type": contentType || "application/json",
            Referer: referer || "",
        },
    });

    return response;
};
