export const WHATSAPP_NUMBER = "5533991539731";
export const RESTAURANT_NAME = "Mega Pizza";
export const PHONE_DISPLAY = "(33) 99153-9731";
export const ADDRESS_DISPLAY = "Av. Ana Caburé, 1700 — Ponto dos Volantes/MG";

/** Chave Pix (telefone) — formato BR Code: +5533991539731 */
export const PIX_KEY = "+5533991539731";
export const PIX_KEY_DISPLAY = PHONE_DISPLAY;
export const PIX_CITY = "BRASIL";

export function buildWhatsAppOrderLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
