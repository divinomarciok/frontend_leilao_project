// app/components/productDetails.tsx
"use client";

import React from "react";

type ProductDetail = {
  empresa: string;
  preco: number;
  tamanho: string;
};

const ProductDetails = ({ productDetails }: { productDetails: ProductDetail[] }) => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Detalhes do Produto</h2>
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
