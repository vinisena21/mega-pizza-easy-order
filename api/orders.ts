import type { VercelRequest, VercelResponse } from "@vercel/node";
import { ensureSchema, getSql } from "./_lib/db";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function json(res: VercelResponse, status: number, body: unknown) {
  res.status(status).setHeader("Content-Type", "application/json");
  for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
  res.end(JSON.stringify(body));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "OPTIONS") {
    for (const [k, v] of Object.entries(CORS)) res.setHeader(k, v);
    return res.status(204).end();
  }

  try {
    await ensureSchema();
    const db = getSql();

    if (req.method === "POST") {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      const {
        orderNumber,
        name,
        phone,
        address,
        items,
        subtotal,
        delivery = 0,
        total,
        payment,
        change,
      } = body ?? {};

      if (!orderNumber || !name || !phone || !address || !Array.isArray(items) || total == null || !payment) {
        return json(res, 400, { error: "Campos obrigatórios em falta." });
      }

      if (!["pix", "cartao", "dinheiro"].includes(payment)) {
        return json(res, 400, { error: "Forma de pagamento inválida." });
      }

      const rows = await db`
        INSERT INTO orders (
          order_number, customer_name, phone, address, items,
          subtotal, delivery, total, payment, change_for, status
        ) VALUES (
          ${String(orderNumber)},
          ${String(name).trim()},
          ${String(phone).trim()},
          ${String(address).trim()},
          ${JSON.stringify(items)},
          ${Number(subtotal) || 0},
          ${Number(delivery) || 0},
          ${Number(total) || 0},
          ${payment},
          ${change ? String(change) : null},
          'novo'
        )
        ON CONFLICT (order_number) DO UPDATE SET
          customer_name = EXCLUDED.customer_name,
          phone = EXCLUDED.phone,
          address = EXCLUDED.address,
          items = EXCLUDED.items,
          subtotal = EXCLUDED.subtotal,
          total = EXCLUDED.total,
          payment = EXCLUDED.payment,
          change_for = EXCLUDED.change_for
        RETURNING id, order_number, status, created_at
      `;

      return json(res, 201, { ok: true, order: rows[0] });
    }

    if (req.method === "GET") {
      const secret = process.env.ORDERS_ADMIN_SECRET;
      if (secret) {
        const auth = req.headers.authorization || "";
        if (auth !== `Bearer ${secret}`) {
          return json(res, 401, { error: "Não autorizado." });
        }
      }

      const limit = Math.min(Number(req.query.limit) || 50, 200);
      const rows = await db`
        SELECT id, order_number, customer_name, phone, address, items,
               subtotal, delivery, total, payment, change_for, status, created_at
        FROM orders
        ORDER BY created_at DESC
        LIMIT ${limit}
      `;
      return json(res, 200, { orders: rows });
    }

    return json(res, 405, { error: "Método não permitido." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro interno";
    console.error("[api/orders]", err);
    return json(res, 500, { error: message });
  }
}
