import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { formatPrice } from "@/data/menu";
import { buildWhatsAppOrderLink, RESTAURANT_NAME } from "@/config";
import type { CartItem } from "@/store/cart";
import { calcUnitPrice } from "@/store/cart";
import { CRUSTS, EXTRAS, SIZES } from "@/data/menu";

export const Route = createFileRoute("/confirmacao")({
  head: () => ({
    meta: [
      { title: "Pedido confirmado — Mega Pizza" },
      { name: "description", content: "Seu pedido foi recebido. Estamos preparando!" },
    ],
  }),
  component: ConfirmationPage,
});

type Order = {
  orderNumber: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  delivery: number;
  total: number;
  payment: "pix" | "cartao" | "dinheiro";
  change?: string;
  createdAt: number;
};

const PAYMENT_LABELS: Record<Order["payment"], string> = {
  pix: "Pix",
  cartao: "Cartão",
  dinheiro: "Dinheiro",
};

function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("mega-pizza-last-order");
    if (raw) setOrder(JSON.parse(raw));
  }, []);

  if (!order) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-bold">Nenhum pedido recente</h1>
        <p className="mt-2 text-muted-foreground">Faça um pedido para ver a confirmação aqui.</p>
        <Link
          to="/cardapio"
          className="mt-6 inline-block rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  const whatsappMessage = buildWhatsAppMessage(order);

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:py-16">
      <div className="rounded-3xl border border-success/30 bg-card p-8 text-center shadow-elegant sm:p-10">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-success/15">
          <CheckCircle2 className="h-10 w-10 text-success" />
        </div>
        <h1 className="mt-5 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Pedido confirmado!
        </h1>
        <p className="mt-2 text-muted-foreground">
          Obrigado, <strong className="text-foreground">{order.name.split(" ")[0]}</strong>!
          Já estamos preparando.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <InfoBox label="Número do pedido" value={`#${order.orderNumber}`} highlight />
          <InfoBox
            label="Tempo estimado"
            value="35–45 min"
            icon={<Clock className="h-4 w-4" />}
          />
        </div>

        <a
          href={buildWhatsAppOrderLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-elegant transition-transform hover:scale-[1.02]"
        >
          <MessageCircle className="h-5 w-5" />
          Enviar pedido pelo WhatsApp
        </a>
      </div>

      {/* Resumo */}
      <div className="mt-6 rounded-3xl border border-border/60 bg-card p-6 shadow-elegant sm:p-8">
        <h2 className="font-display text-xl font-semibold">Detalhes</h2>

        <dl className="mt-4 space-y-1.5 text-sm">
          <DLRow label="Cliente" value={order.name} />
          <DLRow label="Telefone" value={order.phone} />
          <DLRow label="Endereço" value={order.address} />
          <DLRow
            label="Pagamento"
            value={
              order.payment === "dinheiro" && order.change
                ? `${PAYMENT_LABELS[order.payment]} (troco para ${order.change})`
                : PAYMENT_LABELS[order.payment]
            }
          />
        </dl>

        <div className="my-5 border-t border-border" />

        <ul className="space-y-3 text-sm">
          {order.items.map((it) => (
            <li key={it.uid} className="flex justify-between gap-3">
              <span>
                <strong>{it.quantity}×</strong> {it.name}
                {it.customizable && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({SIZES.find((s) => s.id === it.size)?.label} · borda{" "}
                    {CRUSTS.find((c) => c.id === it.crust)?.label}
                    {it.extras.length > 0 &&
                      ` + ${it.extras.map((e) => EXTRAS.find((x) => x.id === e)?.label).join(", ")}`}
                    )
                  </span>
                )}
              </span>
              <span className="shrink-0 font-medium">
                {formatPrice(calcUnitPrice(it) * it.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="my-5 border-t border-border" />

        <div className="space-y-1.5 text-sm">
          <DLRow label="Subtotal" value={formatPrice(order.subtotal)} />
          <DLRow label="Entrega" value={formatPrice(order.delivery)} />
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="font-semibold">Total</span>
          <span className="font-display text-3xl font-bold text-gold">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="text-sm font-semibold text-muted-foreground hover:text-gold"
        >
          ← Voltar para a página inicial
        </Link>
      </div>
    </div>
  );
}

function buildWhatsAppMessage(order: Order) {
  const lines = [
    `*${RESTAURANT_NAME} — Pedido #${order.orderNumber}*`,
    ``,
    `*Cliente:* ${order.name}`,
    `*Telefone:* ${order.phone}`,
    `*Endereço:* ${order.address}`,
    ``,
    `*Itens:*`,
    ...order.items.map((it) => {
      const extra =
        it.customizable
          ? ` (${SIZES.find((s) => s.id === it.size)?.label}, borda ${CRUSTS.find((c) => c.id === it.crust)?.label}${it.extras.length ? `, +${it.extras.map((e) => EXTRAS.find((x) => x.id === e)?.label).join(", ")}` : ""})`
          : "";
      return `• ${it.quantity}× ${it.name}${extra} — ${formatPrice(calcUnitPrice(it) * it.quantity)}`;
    }),
    ``,
    `Subtotal: ${formatPrice(order.subtotal)}`,
    `Entrega: ${formatPrice(order.delivery)}`,
    `*Total: ${formatPrice(order.total)}*`,
    ``,
    `*Pagamento:* ${PAYMENT_LABELS[order.payment]}${order.payment === "dinheiro" && order.change ? ` (troco para ${order.change})` : ""}`,
  ];
  return lines.join("\n");
}

function InfoBox({
  label,
  value,
  highlight,
  icon,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={
        "rounded-2xl border p-4 " +
        (highlight ? "border-gold/40 bg-gold/5" : "border-border bg-background/50")
      }
    >
      <div className="flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
        {icon}
        {label}
      </div>
      <div
        className={
          "mt-1 font-display text-2xl font-bold " + (highlight ? "text-gold" : "text-foreground")
        }
      >
        {value}
      </div>
    </div>
  );
}

function DLRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 text-sm">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
