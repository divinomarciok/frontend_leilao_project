// app/products/page.tsx
"use client";

import ProductsList from "../components/products";

const productsData = [
  {
    nome: "Camiseta Básica",
    tamanho: "M",
    marca: "Zara",
    categoria: "Vestuário"
  },
  {
    nome: "Notebook Pro",
    tamanho: "15.6 polegadas",
    marca: "Dell",
    categoria: "Eletrônicos"
  },
  {
    nome: "Tênis Running",
    tamanho: "42",
    marca: "Nike",
    categoria: "Calçados"
  },
  {
    nome: "Café Torrado e Moído",
    tamanho: "500g",
    marca: "Melitta",
    categoria: "Alimentos"
  },
  {
    nome: "Geladeira Frost Free",
    tamanho: "340L",
    marca: "Brastemp",
    categoria: "Eletrodomésticos"
  },
  {
    nome: "Geladeira Frost Free",
    tamanho: "340L",
    marca: "Brastemp",
    categoria: "Eletrodomésticos"
  },
  {
    nome: "Geladeira Frost Free",
    tamanho: "340L",
    marca: "Brastemp",
    categoria: "Eletrodomésticos"
  }
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ProductsList products={productsData} />
    </main>
  );
}
