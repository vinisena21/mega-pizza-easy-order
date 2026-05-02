export const WHATSAPP_NUMBER = "5533991539731";
export const RESTAURANT_NAME = "Mega Pizza";

// Chave Pix (telefone) — formato exigido pelo padrão BR Code: +5533991539731
export const PIX_KEY = "+5533991539731";
export const PIX_KEY_DISPLAY = "(33) 99153-9731";
export const PIX_CITY = "BRASIL";

export function buildWhatsAppOrderLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
