import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CATEGORIES, MENU, type Category } from "@/data/menu";
import { PizzaCard } from "@/components/site/PizzaCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/cardapio")({
  head: () => ({
    meta: [
      { title: "Cardápio — Mega Pizza" },
      {
        name: "description",
        content:
          "Confira nosso cardápio completo: pizzas tradicionais, especiais e bebidas geladas com entrega em Ponto dos Volantes/MG.",
      },
      { property: "og:title", content: "Cardápio — Mega Pizza" },
      {
        property: "og:description",
        content: "Pizzas artesanais e bebidas. Peça pelo cardápio digital da Mega Pizza.",
      },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const [active, setActive] = useState<Category | "todas">("todas");

  const filtered =
    active === "todas" ? MENU : MENU.filter((m) => m.category === active);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Banner Frete Grátis */}
      <div className="mb-8 flex flex-col items-center gap-2 rounded-2xl border border-gold/40 bg-gradient-to-r from-primary/15 via-gold/10 to-primary/15 px-6 py-5 text-center shadow-glow sm:flex-row sm:justify-center sm:gap-4">
        <span className="font-display text-2xl font-bold text-gold sm:text-3xl">
          🚚 Frete Grátis
        </span>
        <span className="text-sm text-foreground/90 sm:text-base">
          em todas as pizzas · Quinta a Segunda · 18h às 23h
        </span>
      </div>

      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          Cardápio digital
        </span>
        <h1 className="mt-2 font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Escolha a sua favorita
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Personalize tamanho, borda e adicionais. Bebidas só podem ser compradas junto com uma pizza.
        </p>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 -mx-4 mb-8 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <FilterChip active={active === "todas"} onClick={() => setActive("todas")}>
            Todas
          </FilterChip>
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              active={active === c.id}
              onClick={() => setActive(c.id)}
            >
              {c.label}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PizzaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-5 py-2 text-sm font-semibold transition-all",
        active
          ? "border-primary bg-gradient-primary text-primary-foreground shadow-glow"
          : "border-border bg-card text-foreground/80 hover:border-gold/40 hover:text-gold",
      )}
    >
      {children}
    </button>
  );
}
