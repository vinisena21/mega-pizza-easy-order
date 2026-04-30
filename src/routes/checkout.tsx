import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, MapPin, CreditCard, Banknote, QrCode } from "lucide-react";
import { toast } from "sonner";
import { CRUSTS, EXTRAS, SIZES, formatPrice } from "@/data/menu";
import { calcUnitPrice, useCart, useCartHydrated } from "@/store/cart";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Finalizar pedido — Mega Pizza" },
      { name: "description", content: "Confirme seu pedido e escolha a forma de pagamento." },
    ],
  }),
  component: CheckoutPage,
});

type PaymentMethod = "pix" | "cartao" | "dinheiro";

function CheckoutPage() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQuantity);
  const remove = useCart((s) => s.removeItem);
  const subtotal = useCart((s) => s.subtotal());
  const clear = useCart((s) => s.clear);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [change, setChange] = useState("");

  const hasPizza = useMemo(
    () => items.some((it) => it.customizable),
    [items],
  );
  const total = useMemo(() => subtotal, [subtotal]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (items.length === 0) {
      toast.error("Seu carrinho está vazio.");
      return;
    }
    if (!hasPizza) {
      toast.error("Adicione pelo menos 1 pizza ao carrinho para finalizar.");
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim() || !number.trim() || !neighborhood.trim()) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }
    const orderNumber = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem(
      "mega-pizza-last-order",
      JSON.stringify({
        orderNumber,
        name,
        phone,
        address: `${address}, ${number}${complement ? ` — ${complement}` : ""} — ${neighborhood}`,
        items,
        subtotal,
        delivery: 0,
        total,
        payment,
        change,
        createdAt: Date.now(),
      }),
    );
    clear();
    navigate({ to: "/confirmacao" });
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card border border-border">
          <ShoppingBag className="h-9 w-9 text-muted-foreground" />
        </div>
        <h1 className="font-display text-3xl font-bold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-muted-foreground">Que tal escolher uma pizza deliciosa?</p>
        <Link
          to="/cardapio"
          className="mt-6 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow"
        >
          Ver cardápio
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display text-4xl font-bold tracking-tight">Finalizar pedido</h1>
      <p className="mt-2 text-muted-foreground">
        Revise os itens, preencha seus dados e escolha a forma de pagamento.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* LEFT: items + form */}
        <div className="space-y-6">
          {/* Itens */}
          <Card title="Seu pedido">
            <ul className="divide-y divide-border">
              {items.map((it) => {
                const unit = calcUnitPrice(it);
                return (
                  <li key={it.uid} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                    <img
                      src={it.image}
                      alt={it.name}
                      className="h-20 w-20 shrink-0 rounded-xl object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold">{it.name}</h3>
                        <button
                          type="button"
                          onClick={() => remove(it.uid)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label="Remover"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      {it.customizable && (
                        <p className="text-xs text-muted-foreground">
                          {SIZES.find((s) => s.id === it.size)?.label} ·{" "}
                          Borda {CRUSTS.find((c) => c.id === it.crust)?.label}
                          {it.extras.length > 0 &&
                            ` · ${it.extras
                              .map((e) => EXTRAS.find((x) => x.id === e)?.label)
                              .join(", ")}`}
                        </p>
                      )}
                      {it.observations && (
                        <p className="text-xs italic text-muted-foreground">
                          “{it.observations}”
                        </p>
                      )}
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-full border border-border bg-background px-1.5 py-1">
                          <button
                            type="button"
                            onClick={() => setQty(it.uid, it.quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                            aria-label="Diminuir"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">
                            {it.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(it.uid, it.quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                            aria-label="Aumentar"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="font-display font-semibold text-gold">
                          {formatPrice(unit * it.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>

          {/* Endereço */}
          <Card title="Entrega" icon={<MapPin className="h-4 w-4 text-gold" />}>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Nome completo *" full>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                  placeholder="João da Silva"
                  required
                />
              </Field>
              <Field label="Telefone (WhatsApp) *">
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input"
                  placeholder="(11) 99999-9999"
                  required
                />
              </Field>
              <Field label="Bairro *">
                <input
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="input"
                  placeholder="Centro"
                  required
                />
              </Field>
              <Field label="Endereço (rua) *" full>
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input"
                  placeholder="Rua das Pizzas"
                  required
                />
              </Field>
              <Field label="Número *">
                <input
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="input"
                  placeholder="123"
                  required
                />
              </Field>
              <Field label="Complemento">
                <input
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="input"
                  placeholder="Apto 42, bloco B"
                />
              </Field>
            </div>
          </Card>

          {/* Pagamento */}
          <Card title="Pagamento">
            <div className="grid gap-3 sm:grid-cols-3">
              <PaymentChoice
                active={payment === "pix"}
                onClick={() => setPayment("pix")}
                icon={<QrCode className="h-5 w-5" />}
                title="Pix"
                subtitle="QR Code instantâneo"
              />
              <PaymentChoice
                active={payment === "cartao"}
                onClick={() => setPayment("cartao")}
                icon={<CreditCard className="h-5 w-5" />}
                title="Cartão"
                subtitle="Crédito ou débito"
              />
              <PaymentChoice
                active={payment === "dinheiro"}
                onClick={() => setPayment("dinheiro")}
                icon={<Banknote className="h-5 w-5" />}
                title="Dinheiro"
                subtitle="Na entrega"
              />
            </div>

            {payment === "dinheiro" && (
              <div className="mt-4">
                <Field label="Troco para quanto?">
                  <input
                    value={change}
                    onChange={(e) => setChange(e.target.value)}
                    className="input"
                    placeholder="Ex: R$ 100,00"
                  />
                </Field>
              </div>
            )}
            {payment === "pix" && (
              <p className="mt-3 text-xs text-muted-foreground">
                O QR Code do Pix será gerado na confirmação do pedido.
              </p>
            )}
          </Card>
        </div>

        {/* RIGHT: summary */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card title="Resumo">
            <div className="space-y-2 text-sm">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Taxa de entrega</span>
                <span className="font-semibold text-gold">🚚 Grátis</span>
              </div>
              <div className="my-3 border-t border-border" />
              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">Total</span>
                <span className="font-display text-2xl font-bold text-gold">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            {!hasPizza && (
              <p className="mt-4 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                Adicione pelo menos 1 pizza para finalizar. Bebidas só podem ser compradas junto com pizza.
              </p>
            )}
            <button
              type="submit"
              disabled={!hasPizza}
              className="mt-5 w-full rounded-full bg-gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
            >
              Confirmar pedido
            </button>
            <p className="mt-3 text-center text-[11px] text-muted-foreground">
              Tempo estimado de entrega: 35–45 min
            </p>
          </Card>
        </aside>
      </form>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-input);
          padding: 0.7rem 0.9rem;
          font-size: 0.875rem;
          color: var(--color-foreground);
          transition: border-color .15s;
        }
        .input::placeholder { color: var(--color-muted-foreground); }
        .input:focus { outline: none; border-color: var(--color-primary); }
      `}</style>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-5 shadow-elegant sm:p-6">
      <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({
  label,
  full,
  children,
}: {
  label: string;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", full && "sm:col-span-2")}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function PaymentChoice({
  active,
  onClick,
  icon,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex flex-col items-start gap-1 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-primary bg-primary/10 shadow-glow"
          : "border-border hover:border-primary/40",
      )}
    >
      <div className={cn("text-gold", !active && "text-muted-foreground")}>{icon}</div>
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-[11px] text-muted-foreground">{subtitle}</div>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
