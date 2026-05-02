// Gera payload Pix "Copia e Cola" estático (BR Code EMV) conforme padrão Bacen.
// Suporta chave do tipo telefone no formato +5533991539731.

function tlv(id: string, value: string) {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

function sanitize(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .slice(0, max)
    .trim();
}

export function buildPixPayload(opts: {
  key: string; // chave Pix (telefone no formato +5533991539731)
  merchantName: string;
  merchantCity: string;
  amount?: number;
  txid?: string;
}) {
  const merchantAccount =
    tlv("00", "br.gov.bcb.pix") + tlv("01", opts.key);

  const amountStr = opts.amount ? opts.amount.toFixed(2) : undefined;
  const txid = sanitize(opts.txid ?? "***", 25) || "***";

  let payload =
    tlv("00", "01") +
    tlv("26", merchantAccount) +
    tlv("52", "0000") +
    tlv("53", "986");

  if (amountStr) payload += tlv("54", amountStr);

  payload +=
    tlv("58", "BR") +
    tlv("59", sanitize(opts.merchantName, 25) || "RECEBEDOR") +
    tlv("60", sanitize(opts.merchantCity, 15) || "BRASIL") +
    tlv("62", tlv("05", txid));

  payload += "6304";
  payload += crc16(payload);
  return payload;
}
