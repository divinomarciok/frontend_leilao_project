"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Product = {
  nome: string;
  tamanho: string;
  marca: string;
  categoria: string;
};

const ProductsList = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      <div className="flex gap-4 mb-6">
        <div className="flex flex-col space-y-4">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={() => router.push("/products/add")}
          >
            Cadastrar Produto
          </button>
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
            Cadastrar Empresa
          </button>
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Lista de Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <a
                key={index}
                href={`/products/${index}`}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 hover:bg-gray-100"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-900">{product.nome}</h3>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Tamanho:</strong> {product.tamanho}
                </p>
                <p className="text-sm text-gray-700 mb-1">
                  <strong>Marca:</strong> {product.marca}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Categoria:</strong> {product.categoria}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
