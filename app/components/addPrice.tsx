"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";

const AddPrice = () => {
  const [enterpriseId, setEnterpriseId] = useState("");
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPrice = {
      enterprise_id: Number(enterpriseId),
      product_id: Number(productId),
      price,
    };

    try {
      const token = Cookies.get("authToken"); // Obtém o token do cookie

      if (!token) {
        throw new Error("Usuário não autenticado");
      }

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(newPrice),
      };

      const response = await fetch("http://localhost:8000/addenterpriseproduct", requestOptions);

      if (response.ok) {
        setSuccessMessage("Preço cadastrado com sucesso!");
        setEnterpriseId("");
        setProductId("");
        setPrice(0);
        setErrorMessage(null);
      } else {
        setErrorMessage("Falha ao cadastrar o preço. Tente novamente.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Erro ao cadastrar preço", error);
      setErrorMessage("Erro ao conectar ao servidor. Tente novamente.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cadastrar Preço</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="enterpriseId" className="block text-sm font-medium text-gray-700 mb-2">
            ID da Empresa:
          </label>
          <input
            type="text"
            id="enterpriseId"
            value={enterpriseId}
            onChange={(e) => setEnterpriseId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
            ID do Produto:
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Preço:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
          />
        </div>
        {successMessage && <p className="text-center text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-center text-red-600 mb-4">{errorMessage}</p>}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
        >
          Cadastrar Preço
        </button>
      </form>
    </div>
  );
};

export default AddPrice;
