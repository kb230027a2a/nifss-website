import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatCurrency(amount: number, currency = "PKR") {
  if (currency === "PKR") {
    return `PKR ${amount.toLocaleString("en-PK")}`;
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
}

export function truncate(str: string, length: number) {
  return str.length > length ? str.slice(0, length) + "..." : str;
}
