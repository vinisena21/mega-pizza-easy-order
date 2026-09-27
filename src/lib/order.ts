import { CRUSTS, EXTRAS, SIZES, formatPrice } from "@/data/menu";
import { RESTAURANT_NAME } from "@/config";
import { calcUnitPrice, type CartItem } from "@/store/cart";

export type PaymentMethod = "pix" | "cartao" | "dinheiro";

export type SavedOrder = {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  payment: PaymentMethod;
  change?: string;
  createdAt: number;
};

export const PAYMENT_LABELS: Record<PaymentMethod, string> = {
  pix: "Pix",
  cartao: "Cartão",
  dinheiro: "Dinheiro",
};

const ORDER_STORAGE_KEY = "mega-pizza-last-order";

export function formatItemDetail(it: CartItem): string {
  if (!it.customizable) return "";
  const sizeLabel = SIZES.find((s) => s.id === it.size)?.label ?? it.size;
  const crustLabel = CRUSTS.find((c) => c.id === it.crust)?.label ?? it.crust;
  const extrasLabel =
    it.extras.length > 0
      ? `, +${it.extras.map((e) => EXTRAS.find((x) => x.id === e)?.label ?? e).join(", ")}`
      : "";
  return ` (${sizeLabel}, borda ${crustLabel}${extrasLabel})`;
}

export function formatCartLine(it: CartItem): string {
  const total = formatPrice(calcUnitPrice(it) * it.quantity);
  return `• ${it.quantity}× ${it.name}${formatItemDetail(it)} — ${total}`;
}

export function buildWhatsAppOrderMessage(order: {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  payment: PaymentMethod;
  change?: string;
}): string {
  const paymentLine =
    order.payment === "dinheiro" && order.change
      ? `${PAYMENT_LABELS[order.payment]} (troco para ${order.change})`
      : PAYMENT_LABELS[order.payment];

  return [
    `*${RESTAURANT_NAME} — Pedido #${order.orderNumber}*`,
    "",
    `*Cliente:* ${order.name}`,
    `*Telefone:* ${order.phone}`,
    `*Endereço:* ${order.address}`,
    "",
    "*🍕 Itens:*",
    ...order.items.map(formatCartLine),
    "",
    `Subtotal: ${formatPrice(order.subtotal)}`,
    "Entrega: 🚚 Grátis",
    `*💰 Total: ${formatPrice(order.total)}*`,
    "",
    `*Pagamento:* ${paymentLine}`,
    "",
    `⚠️ _Confira se o valor do Pix recebido corresponde ao total acima (${formatPrice(order.total)}) antes de confirmar o pedido._`,
  ].join("\n");
}

export function saveLastOrder(order: SavedOrder) {
  try {
    sessionStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // ignore quota / private mode
  }
}

export function loadLastOrder(): SavedOrder | null {
  try {
    const raw = sessionStorage.getItem(ORDER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedOrder;
  } catch {
    return null;
  }
}

export function generateOrderNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
