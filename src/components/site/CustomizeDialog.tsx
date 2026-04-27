import { useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { toast } from "sonner";
import {
  CRUSTS,
  EXTRAS,
  SIZES,
  formatPrice,
  type CrustId,
  type ExtraId,
  type MenuItem,
  type SizeId,
} from "@/data/menu";
import { calcUnitPrice, useCart } from "@/store/cart";
import { cn } from "@/lib/utils";

export function CustomizeDialog({
  item,
  open,
  onOpenChange,
}: {
  item: MenuItem;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [size, setSize] = useState<SizeId>("M");
  const [crust, setCrust] = useState<CrustId>("tradicional");
  const [extras, setExtras] = useState<ExtraId[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [observations, setObservations] = useState("");
  const addItem = useCart((s) => s.addItem);

  const unitPrice = useMemo(
    () => calcUnitPrice({ basePrice: item.basePrice, size, crust, extras, customizable: item.customizable }),
    [item, size, crust, extras],
  );

  function toggleExtra(id: ExtraId) {
    setExtras((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]));
  }

  function handleAdd() {
    addItem(item, { size, crust, extras, quantity, observations });
    toast.success(`${item.name} adicionada ao carrinho!`);
    onOpenChange(false);
    // reset
    setSize("M");
    setCrust("tradicional");
    setExtras([]);
    setQuantity(1);
    setObservations("");
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="relative max-h-[92vh] w-full max-w-lg overflow-hidden rounded-t-3xl border border-border bg-card shadow-elegant sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 backdrop-blur transition-colors hover:bg-background"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative h-44 overflow-hidden">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
          <div className="absolute bottom-3 left-5 right-5">
            <h3 className="font-display text-2xl font-bold">{item.name}</h3>
            <p className="text-sm text-muted-foreground">{item.description}</p>
          </div>
        </div>

        <div className="max-h-[calc(92vh-11rem-5.5rem)] overflow-y-auto px-5 py-5">
          {item.customizable ? (
            <>
              <Section title="Tamanho">
                <div className="grid grid-cols-3 gap-2">
                  {SIZES.map((s) => {
                    const sp = item.prices?.[s.id] ?? item.basePrice;
                    return (
                      <Choice
                        key={s.id}
                        active={size === s.id}
                        onClick={() => setSize(s.id)}
                        title={`${s.id} · ${s.label}`}
                        subtitle={`${s.slices} · ${formatPrice(sp)}`}
                      />
                    );
                  })}
                </div>
              </Section>

              <Section title="Borda recheada">
                <div className="grid grid-cols-3 gap-2">
                  {CRUSTS.map((c) => {
                    const cp = c.prices[size];
                    return (
                      <Choice
                        key={c.id}
                        active={crust === c.id}
                        onClick={() => setCrust(c.id)}
                        title={c.label}
                        subtitle={cp === 0 ? "Grátis" : `+ ${formatPrice(cp)}`}
                      />
                    );
                  })}
                </div>
              </Section>

              <Section title="Adicionais (ingredientes)">
                <div className="space-y-2">
                  {EXTRAS.map((e) => {
                    const checked = extras.includes(e.id);
                    return (
                      <label
                        key={e.id}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 transition-colors",
                          checked
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/40",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleExtra(e.id)}
                            className="h-4 w-4 accent-primary"
                          />
                          <span className="text-sm font-medium">{e.label}</span>
                        </div>
                        <span className="text-sm text-gold">+ {formatPrice(e.price)}</span>
                      </label>
                    );
                  })}
                </div>
              </Section>

              <Section title="Observações">
                <textarea
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Sem cebola, bem assada..."
                  rows={2}
                  className="w-full rounded-xl border border-border bg-input px-4 py-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none"
                />
              </Section>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Bebida gelada, pronta para entrega.</p>
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-border bg-card/95 px-5 py-4">
          <div className="flex items-center gap-2 rounded-full border border-border bg-background px-2 py-1">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label="Diminuir"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-muted"
              aria-label="Aumentar"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex flex-1 items-center justify-between gap-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.02]"
          >
            <span>Adicionar ao carrinho</span>
            <span className="font-display text-base">{formatPrice(unitPrice * quantity)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <h4 className="mb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {title}
      </h4>
      {children}
    </div>
  );
}

function Choice({
  active,
  onClick,
  title,
  subtitle,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-xl border px-3 py-2.5 text-left transition-all",
        active
          ? "border-primary bg-primary/10 shadow-glow"
          : "border-border hover:border-primary/40",
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-[11px] text-muted-foreground">{subtitle}</div>
    </button>
  );
}
