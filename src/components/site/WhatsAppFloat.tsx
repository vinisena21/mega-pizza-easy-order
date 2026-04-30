import { MessageCircle } from "lucide-react";
import { buildWhatsAppOrderLink } from "@/config";

export function WhatsAppFloat() {
  return (
    <button
      type="button"
      onClick={() => window.open(buildWhatsAppOrderLink("Olá! Gostaria de fazer um pedido na Mega Pizza."), "_blank", "noopener,noreferrer")}
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-elegant transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <MessageCircle className="relative h-6 w-6" />
    </button>
  );
}
