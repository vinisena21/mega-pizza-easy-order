import modaMineira from "@/assets/pizza-moda-mineira.jpg";
import calabresa from "@/assets/pizza-calabresa.jpg";
import frango from "@/assets/pizza-frango.jpg";
import portuguesa from "@/assets/pizza-portuguesa.jpg";
import quatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import napolitana from "@/assets/pizza-napolitana.jpg";
import brocolisBacon from "@/assets/pizza-brocolis-bacon.jpg";
import carneSol from "@/assets/pizza-carne-sol.jpg";
import carneSolBanana from "@/assets/pizza-carne-sol-banana.jpg";
import camarao from "@/assets/pizza-camarao.jpg";
import mussarela from "@/assets/pizza-mussarela.jpg";
import bolonhesa from "@/assets/pizza-bolonhesa.jpg";
import vegetariana from "@/assets/pizza-vegetariana.jpg";
import salaminho from "@/assets/pizza-salaminho.jpg";

export type Category = "tradicional" | "especial";

export type SizeId = "P" | "M" | "G";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  /** Preço base (P para pizzas; preço único para bebidas). Usado em "a partir de". */
  basePrice: number;
  /** Preços por tamanho (apenas para itens customizáveis). */
  prices?: Record<SizeId, number>;
  image: string;
  category: Category;
  bestSeller?: boolean;
  customizable: boolean; // pizzas yes, drinks no
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tradicional", label: "Tradicionais" },
  { id: "especial", label: "Especiais" },
];

export const SIZES: { id: SizeId; label: string; slices: string }[] = [
  { id: "P", label: "Pequena", slices: "4 fatias" },
  { id: "M", label: "Média", slices: "6 fatias" },
  { id: "G", label: "Grande", slices: "8 fatias" },
];

/** Bordas recheadas — preço varia por tamanho. */
export const CRUSTS = [
  { id: "tradicional", label: "Tradicional", prices: { P: 0, M: 0, G: 0 } },
  { id: "catupiry", label: "Catupiry", prices: { P: 2, M: 3, G: 4 } },
  { id: "cheddar", label: "Cheddar", prices: { P: 2, M: 3, G: 4 } },
] as const;

export type CrustId = (typeof CRUSTS)[number]["id"];

/** Adicionais (ingredientes extras). */
export const EXTRAS = [
  { id: "milho", label: "Milho", price: 2 },
  { id: "ervilha", label: "Ervilha", price: 2 },
  { id: "palmito", label: "Palmito", price: 2 },
] as const;

export type ExtraId = (typeof EXTRAS)[number]["id"];

export const MENU: MenuItem[] = [
  {
    id: "moda-mineira",
    name: "Moda Mineira",
    description:
      "Molho de tomate, frango desfiado, tomate, pimentão, ovos, cebola, azeitona, mussarela e orégano.",
    basePrice: 38,
    prices: { P: 38, M: 43, G: 50 },
    image: modaMineira,
    category: "especial",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "calabresa",
    name: "Calabresa",
    description: "Molho de tomate, mussarela, calabresa, cebola, azeitona e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 40, G: 45 },
    image: calabresa,
    category: "tradicional",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "frango-catupiry",
    name: "Frango com Catupiry",
    description: "Molho de tomate, mussarela, frango desfiado, catupiry e orégano.",
    basePrice: 43,
    prices: { P: 43, M: 50, G: 55 },
    image: frango,
    category: "especial",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "portuguesa",
    name: "Portuguesa",
    description:
      "Molho de tomate, presunto, tomate, palmito, ervilha, milho, ovos, azeitona, mussarela e orégano.",
    basePrice: 40,
    prices: { P: 40, M: 45, G: 50 },
    image: portuguesa,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "quatro-queijos",
    name: "Quatro Queijos",
    description: "Molho de tomate, mussarela, provolone, parmesão, catupiry e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 42, G: 49 },
    image: quatroQueijos,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "napolitana",
    name: "Napolitana",
    description: "Molho de tomate, mussarela, tomate, parmesão e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 42, G: 49 },
    image: napolitana,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "brocolis-bacon",
    name: "Brócolis com Bacon",
    description: "Molho de tomate, brócolis, mussarela, bacon, azeitona e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 42, G: 49 },
    image: brocolisBacon,
    category: "especial",
    customizable: true,
  },
  {
    id: "carne-de-sol",
    name: "Carne de Sol",
    description:
      "Molho de tomate, mussarela, carne de sol desfiada, tomate, cebola, azeitona, orégano e pimenta calabresa.",
    basePrice: 40,
    prices: { P: 40, M: 45, G: 50 },
    image: carneSol,
    category: "especial",
    customizable: true,
  },
  {
    id: "carne-de-sol-banana",
    name: "Carne de Sol com Banana",
    description:
      "Molho de tomate, mussarela, carne de sol desfiada, banana da terra, orégano e pimenta calabresa.",
    basePrice: 40,
    prices: { P: 40, M: 45, G: 50 },
    image: carneSolBanana,
    category: "especial",
    customizable: true,
  },
  {
    id: "camarao",
    name: "Camarão",
    description: "Molho de tomate, mussarela, camarão, tomate, cebola, azeitona e orégano.",
    basePrice: 50,
    prices: { P: 50, M: 55, G: 58 },
    image: camarao,
    category: "especial",
    customizable: true,
  },
  {
    id: "mussarela",
    name: "Mussarela Tradicional",
    description: "Molho de tomate, mussarela, tomate, azeitona e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 40, G: 45 },
    image: mussarela,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "bolonhesa",
    name: "Bolonhesa",
    description: "Molho de tomate, mussarela, carne moída, tomate, cebola, azeitona e orégano.",
    basePrice: 35,
    prices: { P: 35, M: 40, G: 45 },
    image: bolonhesa,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "vegetariana",
    name: "Vegetariana",
    description: "Molho de tomate, palmito, milho, ervilha, tomate, mussarela e orégano.",
    basePrice: 37,
    prices: { P: 37, M: 42, G: 48 },
    image: vegetariana,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "salaminho-italiano",
    name: "Salaminho Italiano",
    description: "Molho de tomate, mussarela, salaminho, cebola e orégano.",
    basePrice: 42,
    prices: { P: 42, M: 47, G: 52 },
    image: salaminho,
    category: "especial",
    customizable: true,
  },
];




export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
