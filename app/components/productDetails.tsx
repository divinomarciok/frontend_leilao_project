// app/components/productDetails.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";

type ProductDetail = {
  empresa: string;
  preco: number;
  tamanho: string;
};

type ProductDetailsProps = {
  productDetails: ProductDetail[];
  productId: string;
  productName: string;
};

const ProductDetails = ({ productDetails, productId, productName }: ProductDetailsProps) => {
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Detalhes do Produto</h2>
        <button
          className="bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
          onClick={() =>
            router.push(`/products/addPrice?id=${productId}&nome=${encodeURIComponent(productName)}`)
          }
        >
          Cadastrar Preço
        </button>
      </div>
      <ul className="space-y-4">
        {productDetails.map((detail, index) => (
          <li
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-bold text-gray-900">{detail.empresa}</h3>
              <span className="text-xl font-semibold text-blue-600">R$ {detail.preco.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-700">
              <strong>Tamanho:</strong> {detail.tamanho}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
