import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-gold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          A página que você procura não existe ou foi movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mega Pizza — Pizzas artesanais com frete grátis" },
      {
        name: "description",
        content:
          "Pizzas artesanais com massa de fermentação natural. Frete grátis em todas as pizzas. Quinta a Segunda, 18h às 23h.",
      },
      { name: "theme-color", content: "#1a0e0e" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Mega Pizza" },
      { property: "og:title", content: "Mega Pizza — Frete grátis em todas as pizzas" },
      { name: "twitter:title", content: "Mega Pizza — Frete grátis em todas as pizzas" },
      { property: "og:description", content: "Pizzas artesanais com frete grátis. Peça já e receba quentinho." },
      { name: "twitter:description", content: "Pizzas artesanais com frete grátis. Peça já e receba quentinho." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74feac9f-6ef2-4259-b356-279dbcb8ee19/id-preview-e68a8e2c--aafbc74e-0eec-4656-ab2d-a6b9d1bed826.lovable.app-1777077068444.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/74feac9f-6ef2-4259-b356-279dbcb8ee19/id-preview-e68a8e2c--aafbc74e-0eec-4656-ab2d-a6b9d1bed826.lovable.app-1777077068444.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Toaster
        position="top-center"
        theme="dark"
        toastOptions={{
          style: {
            background: "oklch(0.18 0.014 30)",
            border: "1px solid oklch(0.28 0.012 30)",
            color: "oklch(0.97 0.01 80)",
          },
        }}
      />
    </div>
  );
}
