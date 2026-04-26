export const WHATSAPP_NUMBER = "5533991539731"; // Substitua pelo número real
export const RESTAURANT_NAME = "Mega Pizza";

export function buildWhatsAppOrderLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
