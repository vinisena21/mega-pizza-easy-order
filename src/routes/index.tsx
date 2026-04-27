import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck, Truck } from "lucide-react";
import heroPizza from "@/assets/hero-pizza.jpg";
import { MENU } from "@/data/menu";
import { PizzaCard } from "@/components/site/PizzaCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mega Pizza — Pizzas artesanais com delivery e frete grátis" },
      {
        name: "description",
        content:
          "Massa de fermentação natural, ingredientes selecionados e entrega quente. Peça agora pelo nosso cardápio digital.",
      },
      { property: "og:title", content: "Mega Pizza — Frete Grátis em todas as pizzas" },
      {
        property: "og:description",
        content: "Pizzas artesanais entregues quentinhas. Peça já.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const bestSellers = MENU.filter((m) => m.bestSeller);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-glow" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:gap-6 md:py-24">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
              🚚 Frete Grátis em todas as pizzas
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Pizza artesanal,
              <br />
              <span className="text-gold">entregue quentinha.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground sm:text-lg">
              Massa de fermentação natural por 48 horas, ingredientes selecionados e entrega
              em até 45 minutos.
            </p>
            <p className="mt-3 text-sm font-semibold text-gold">
              ⏰ Quinta a Segunda · 18h às 23h
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/cardapio"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Pedir agora
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/cardapio"
                className="rounded-full border border-border bg-card/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-gold/50 hover:text-gold"
              >
                Ver cardápio
              </Link>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-4 text-center">
              <Stat icon={<Clock className="h-4 w-4" />} value="45min" label="Entrega" />
              <Stat icon={<Truck className="h-4 w-4" />} value="Grátis" label="Frete" />
              <Stat icon={<ShieldCheck className="h-4 w-4" />} value="4.9★" label="Avaliação" />
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-10 rounded-full bg-primary/30 blur-3xl"
              aria-hidden
            />
            <img
              src={heroPizza}
              alt="Pizza artesanal Mega Pizza"
              width={1536}
              height={1024}
              className="relative w-full rounded-3xl object-cover shadow-elegant"
            />
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-card/95 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-gold backdrop-blur shadow-gold whitespace-nowrap">
              🚚 Frete Grátis em todas as pizzas
            </div>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Mais pedidas
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              As favoritas da casa
            </h2>
          </div>
          <Link
            to="/cardapio"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:underline"
          >
            Ver cardápio completo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.map((item) => (
            <PizzaCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* INFO BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-gold/30 bg-gradient-dark p-10 shadow-elegant sm:p-14">
          <div
            className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-primary/40 blur-3xl"
            aria-hidden
          />
          <div className="relative grid items-center gap-6 md:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Atendimento
              </span>
              <h3 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Quinta a Segunda · 18h às 23h
              </h3>
              <p className="mt-3 text-muted-foreground">
                Peça sua pizza favorita com frete grátis, direto na sua porta.
              </p>
            </div>
            <div className="flex items-center justify-end">
              <Link
                to="/cardapio"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
              >
                Ver cardápio
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 px-3 py-3 backdrop-blur">
      <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-gold">
        {icon}
      </div>
      <div className="font-display text-base font-bold">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
