import { useState } from "react";
import { Plus, Star } from "lucide-react";
import { formatPrice, type MenuItem } from "@/data/menu";
import { CustomizeDialog } from "./CustomizeDialog";

export function PizzaCard({ item }: { item: MenuItem }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <article className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-elegant transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
        {item.bestSeller && (
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-gradient-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gold-foreground shadow-gold">
            <Star className="h-3 w-3 fill-current" />
            Mais vendida
          </span>
        )}

        <div className="aspect-square overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            width={800}
            height={800}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <div className="p-5">
          <h3 className="font-display text-xl font-semibold tracking-tight">{item.name}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.description}</p>

          {item.customizable && item.prices && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {(["P", "M", "G"] as const).map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1 rounded-md border border-border bg-background/60 px-2 py-1 text-[11px] font-medium"
                >
                  <span className="font-bold text-gold">{s}</span>
                  <span className="text-muted-foreground">{formatPrice(item.prices![s])}</span>
                </span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                {item.customizable ? "A partir de" : "Preço"}
              </div>
              <div className="font-display text-2xl font-bold text-gold">
                {formatPrice(item.basePrice)}
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              aria-label={`Adicionar ${item.name}`}
            >
              <Plus className="h-4 w-4" />
              Adicionar
            </button>
          </div>
        </div>
      </article>

      <CustomizeDialog item={item} open={open} onOpenChange={setOpen} />
    </>
  );
}
