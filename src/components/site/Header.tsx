import { Link, useNavigate } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/store/cart";
import logoMegaPizza from "@/assets/logo-mega-pizza.png";

export function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Mega Pizza - Início">
          <img
            src={logoMegaPizza}
            alt="Mega Pizza - Pizzaria Delivery"
            className="h-12 w-auto transition-transform group-hover:scale-105 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
          />
          <div className="leading-none hidden sm:block">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Delivery Premium
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
            activeProps={{ className: "text-gold" }}
          >
            Início
          </Link>
          <Link
            to="/cardapio"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
            activeProps={{ className: "text-gold" }}
          >
            Cardápio
          </Link>
        </nav>

        <button
          onClick={() => navigate({ to: "/checkout" })}
          className="relative inline-flex items-center gap-2 rounded-full bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-105"
          aria-label="Abrir carrinho"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Carrinho</span>
          {totalItems > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-gold-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
