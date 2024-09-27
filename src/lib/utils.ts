import { type ClassValue, clsx } from "clsx";
import { Decimal } from "decimal.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDecimal(decimal: Decimal) {
  return decimal.toNumber();
}
