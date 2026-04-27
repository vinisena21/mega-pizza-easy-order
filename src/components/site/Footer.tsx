import { Pizza, Instagram, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary">
                <Pizza className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-display text-lg font-bold">
                Mega <span className="text-gold">Pizza</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Massa artesanal de fermentação natural, ingredientes selecionados e entrega
              quente até a sua porta.
            </p>
          </div>

          <div className="text-sm">
            <h4 className="mb-3 font-display text-base text-gold">Horário</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Terça a Quinta · 18h às 23h</li>
              <li>Sexta e Sábado · 18h às 00h</li>
              <li>Domingo · 18h às 23h</li>
            </ul>
          </div>

          <div className="text-sm">
            <h4 className="mb-3 font-display text-base text-gold">Contato</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> (33) 99153-9731
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Av. Ana Caburé, 1700 — Ponto dos Volantes/MG</span>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="h-4 w-4" /> @megapizza
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mega Pizza. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
