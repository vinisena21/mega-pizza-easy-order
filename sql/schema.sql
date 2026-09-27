-- Mega Pizza — schema de pedidos (Neon / Postgres)
-- Rode uma vez no SQL Editor do Neon se preferir criar manualmente.

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
  payment       TEXT NOT NULL CHECK (payment IN ('pix', 'cartao', 'dinheiro')),
  change_for    TEXT,
  status        TEXT NOT NULL DEFAULT 'novo'
                CHECK (status IN ('novo', 'confirmado', 'preparando', 'saiu', 'entregue', 'cancelado')),
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
