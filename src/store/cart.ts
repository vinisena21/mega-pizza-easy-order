import { useState, useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CRUSTS,
  EXTRAS,
  type CrustId,
  type ExtraId,
  type MenuItem,
  type SizeId,
} from "@/data/menu";

export type CartItem = {
  uid: string; // unique line id
  itemId: string;
  name: string;
  image: string;
  basePrice: number;
  prices?: Record<SizeId, number>;
  customizable: boolean;
  size: SizeId;
  crust: CrustId;
  extras: ExtraId[];
  observations?: string;
  quantity: number;
};

export function calcUnitPrice(
  item: Pick<CartItem, "basePrice" | "prices" | "size" | "crust" | "extras" | "customizable">,
) {
  if (!item.customizable) return item.basePrice;
  const sizePrice = item.prices?.[item.size] ?? item.basePrice;
  const crust = CRUSTS.find((c) => c.id === item.crust);
  const crustPrice = crust ? crust.prices[item.size] : 0;
  const extrasTotal = item.extras.reduce(
    (sum, eId) => sum + (EXTRAS.find((e) => e.id === eId)?.price ?? 0),
    0,
  );
  return sizePrice + crustPrice + extrasTotal;
}

type CartState = {
  items: CartItem[];
  addItem: (
    item: MenuItem,
    config: { size: SizeId; crust: CrustId; extras: ExtraId[]; quantity: number; observations?: string },
  ) => void;
  removeItem: (uid: string) => void;
  setQuantity: (uid: string, qty: number) => void;
  clear: () => void;
  subtotal: () => number;
  totalItems: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, config) => {
        const cartItem: CartItem = {
          uid: `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          itemId: item.id,
          name: item.name,
          image: item.image,
          basePrice: item.basePrice,
          prices: item.prices,
          customizable: item.customizable,
          size: config.size,
          crust: config.crust,
          extras: config.extras,
          observations: config.observations,
          quantity: config.quantity,
        };
        set({ items: [...get().items, cartItem] });
      },
      removeItem: (uid) => set({ items: get().items.filter((i) => i.uid !== uid) }),
      setQuantity: (uid, qty) =>
        set({
          items: get()
            .items.map((i) => (i.uid === uid ? { ...i, quantity: Math.max(1, qty) } : i)),
        }),
      clear: () => set({ items: [] }),
      subtotal: () => get().items.reduce((s, i) => s + calcUnitPrice(i) * i.quantity, 0),
      totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
    }),
    { name: "mega-pizza-cart", version: 2 },
  ),
);
