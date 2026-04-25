import margherita from "@/assets/pizza-margherita.jpg";
import pepperoni from "@/assets/pizza-pepperoni.jpg";
import quatroQueijos from "@/assets/pizza-quatro-queijos.jpg";
import calabresa from "@/assets/pizza-calabresa.jpg";
import trufada from "@/assets/pizza-trufada.jpg";
import frango from "@/assets/pizza-frango.jpg";
import chocolate from "@/assets/pizza-chocolate.jpg";
import banana from "@/assets/pizza-banana.jpg";
import cola from "@/assets/drink-cola.jpg";
import guarana from "@/assets/drink-guarana.jpg";
import water from "@/assets/drink-water.jpg";

export type Category = "tradicional" | "especial" | "doce" | "bebida";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  image: string;
  category: Category;
  bestSeller?: boolean;
  customizable: boolean; // pizzas yes, drinks no
};

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "tradicional", label: "Tradicionais" },
  { id: "especial", label: "Especiais" },
  { id: "doce", label: "Doces" },
  { id: "bebida", label: "Bebidas" },
];

export const SIZES = [
  { id: "P", label: "Pequena", multiplier: 0.8, slices: "4 fatias" },
  { id: "M", label: "Média", multiplier: 1, slices: "6 fatias" },
  { id: "G", label: "Grande", multiplier: 1.3, slices: "8 fatias" },
] as const;

export type SizeId = (typeof SIZES)[number]["id"];

export const CRUSTS = [
  { id: "tradicional", label: "Tradicional", price: 0 },
  { id: "catupiry", label: "Catupiry", price: 8 },
  { id: "cheddar", label: "Cheddar", price: 8 },
  { id: "chocolate", label: "Chocolate", price: 10 },
] as const;

export type CrustId = (typeof CRUSTS)[number]["id"];

export const EXTRAS = [
  { id: "mussarela", label: "Mussarela extra", price: 6 },
  { id: "bacon", label: "Bacon", price: 7 },
  { id: "catupiry", label: "Catupiry", price: 6 },
  { id: "azeitona", label: "Azeitona", price: 4 },
  { id: "cebola", label: "Cebola caramelizada", price: 5 },
] as const;

export type ExtraId = (typeof EXTRAS)[number]["id"];

export const MENU: MenuItem[] = [
  {
    id: "margherita",
    name: "Margherita",
    description: "Molho de tomate San Marzano, mussarela de búfala e manjericão fresco.",
    basePrice: 49.9,
    image: margherita,
    category: "tradicional",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "pepperoni",
    name: "Pepperoni",
    description: "Generosas fatias de pepperoni artesanal sobre mussarela derretida.",
    basePrice: 56.9,
    image: pepperoni,
    category: "tradicional",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "calabresa",
    name: "Calabresa",
    description: "Calabresa fatiada, cebola roxa e azeitonas pretas.",
    basePrice: 52.9,
    image: calabresa,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "quatro-queijos",
    name: "Quatro Queijos",
    description: "Mussarela, gorgonzola, parmesão e provolone.",
    basePrice: 58.9,
    image: quatroQueijos,
    category: "tradicional",
    customizable: true,
  },
  {
    id: "frango-catupiry",
    name: "Frango com Catupiry",
    description: "Frango desfiado temperado com cremoso catupiry original.",
    basePrice: 56.9,
    image: frango,
    category: "especial",
    bestSeller: true,
    customizable: true,
  },
  {
    id: "trufada",
    name: "Trufada com Funghi",
    description: "Funghi salteado, lascas de parmesão e azeite trufado.",
    basePrice: 74.9,
    image: trufada,
    category: "especial",
    customizable: true,
  },
  {
    id: "chocolate-morango",
    name: "Chocolate com Morango",
    description: "Chocolate ao leite belga, morangos frescos e açúcar de confeiteiro.",
    basePrice: 54.9,
    image: chocolate,
    category: "doce",
    customizable: true,
  },
  {
    id: "banana-canela",
    name: "Banana com Canela",
    description: "Banana caramelizada, canela e leite condensado.",
    basePrice: 49.9,
    image: banana,
    category: "doce",
    customizable: true,
  },
  {
    id: "coca-cola",
    name: "Coca-Cola 600ml",
    description: "Refrigerante gelado.",
    basePrice: 9.9,
    image: cola,
    category: "bebida",
    customizable: false,
  },
  {
    id: "guarana",
    name: "Guaraná Antarctica 600ml",
    description: "Refrigerante gelado.",
    basePrice: 9.9,
    image: guarana,
    category: "bebida",
    customizable: false,
  },
  {
    id: "agua",
    name: "Água Mineral 500ml",
    description: "Sem gás, gelada.",
    basePrice: 5.5,
    image: water,
    category: "bebida",
    customizable: false,
  },
];

export const DELIVERY_FEE = 8.9;

export function formatPrice(value: number) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
