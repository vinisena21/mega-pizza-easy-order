import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  CRUSTS,
  EXTRAS,
  SIZES,
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
  customizable: boolean;
  size: SizeId;
  crust: CrustId;
  extras: ExtraId[];
  observations?: string;
  quantity: number;
};

export function calcUnitPrice(item: Pick<CartItem, "basePrice" | "size" | "crust" | "extras" | "customizable">) {
  if (!item.customizable) return item.basePrice;
  const size = SIZES.find((s) => s.id === item.size)!;
  const crust = CRUSTS.find((c) => c.id === item.crust)!;
  const extrasTotal = item.extras.reduce(
    (sum, eId) => sum + (EXTRAS.find((e) => e.id === eId)?.price ?? 0),
    0,
  );
  return item.basePrice * size.multiplier + crust.price + extrasTotal;
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
    { name: "mega-pizza-cart" },
  ),
);
