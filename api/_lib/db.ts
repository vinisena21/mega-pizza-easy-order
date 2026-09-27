import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

let sql: NeonQueryFunction<false, false> | null = null;
let schemaReady = false;

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL não configurada. Crie um projeto free em https://neon.tech e cole a connection string.");
  }
  if (!sql) {
    sql = neon(url);
  }
  return sql;
}

/** Cria a tabela orders na primeira chamada (idempotente). */
export async function ensureSchema() {
  if (schemaReady) return;
  const db = getSql();
  await db`
    CREATE TABLE IF NOT EXISTS orders (
      id            BIGSERIAL PRIMARY KEY,
      order_number  TEXT NOT NULL UNIQUE,
      customer_name TEXT NOT NULL,
      phone         TEXT NOT NULL,
      address       TEXT NOT NULL,
      items         JSONB NOT NULL DEFAULT '[]'::jsonb,
      subtotal      NUMERIC(10, 2) NOT NULL DEFAULT 0,
      delivery      NUMERIC(10, 2) NOT NULL DEFAULT 0,
      total         NUMERIC(10, 2) NOT NULL DEFAULT 0,
      payment       TEXT NOT NULL,
      change_for    TEXT,
      status        TEXT NOT NULL DEFAULT 'novo',
      created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await db`CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC)`;
  schemaReady = true;
}
