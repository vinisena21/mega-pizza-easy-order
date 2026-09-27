import type { SavedOrder } from "./order";

/**
 * Grava o pedido no Postgres (Neon) via API serverless.
 * Falha silenciosa se a API não estiver configurada (dev local sem DATABASE_URL),
 * para não bloquear o fluxo WhatsApp.
 */
export async function persistOrder(order: SavedOrder): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderNumber: order.orderNumber,
        name: order.name,
        phone: order.phone,
        address: order.address,
        items: order.items,
        subtotal: order.subtotal,
        delivery: order.delivery,
        total: order.total,
        payment: order.payment,
        change: order.change,
      }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      return { ok: false, error: data.error || `HTTP ${res.status}` };
    }

    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Falha de rede",
    };
  }
}
