import type { ExtraId, PackageId } from "@/lib/content";

const KEY = "lewiscreates.orders";

export type Order = {
  ref: string;
  createdAt: string;
  packageId: PackageId | string;
  name: string;
  email: string;
  business: string;
  about: string;
  timeline: string;
  build: number;
  deposit: number;
  care: number | null;
  retainerMonths?: number | null;
  meeting?: string;
  extraIds?: ExtraId[];
};

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isOrder);
  } catch {
    return [];
  }
}

export function saveOrder(order: Order) {
  const next = [order, ...loadOrders().filter((item) => item.ref !== order.ref)].slice(0, 8);
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function makeRef() {
  const stamp = Date.now().toString().slice(-4);
  const salt = Math.floor(Math.random() * 90 + 10).toString();
  return `LC-${stamp}${salt}`;
}

function isOrder(value: unknown): value is Order {
  if (!value || typeof value !== "object") return false;
  const order = value as Partial<Order>;
  return typeof order.ref === "string" && typeof order.email === "string" && typeof order.packageId === "string";
}
