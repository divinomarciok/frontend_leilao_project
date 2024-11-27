"use client";

import React, { useState } from "react";

const AddProduct = () => {
  const [nomeProd, setNomeProd] = useState("");
  const [categoriaProd, setCategoriaProd] = useState("");
  const [tamanhoProd, setTamanhoProd] = useState("");
  const [quantidadeProd, setQuantidadeProd] = useState(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      nomeProd,
      categoriaProd,
      tamanhoProd,
      quantidadeProd,
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        setSuccessMessage("Produto cadastrado com sucesso!");
        setNomeProd("");
        setCategoriaProd("");
        setTamanhoProd("");
        setQuantidadeProd(0);
      } else {
        setSuccessMessage("Falha ao cadastrar o produto. Tente novamente.");
      }
    } catch (error) {
        console.error("Erro ao criar produto",error)
      setSuccessMessage("Erro ao conectar ao servidor. Tente novamente.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 border border-gray-300 rounded-lg shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastrar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nomeProd" className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Produto:
          </label>
          <input
            type="text"
            id="nomeProd"
            value={nomeProd}
            onChange={(e) => setNomeProd(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categoriaProd" className="block text-sm font-medium text-gray-700 mb-2">
            Categoria do Produto:
          </label>
          <input
            type="text"
            id="categoriaProd"
            value={categoriaProd}
            onChange={(e) => setCategoriaProd(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tamanhoProd" className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho do Produto:
          </label>
          <input
            type="text"
            id="tamanhoProd"
            value={tamanhoProd}
            onChange={(e) => setTamanhoProd(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantidadeProd" className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade do Produto:
          </label>
          <input
            type="number"
            id="quantidadeProd"
            value={quantidadeProd}
            onChange={(e) => setQuantidadeProd(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        {successMessage && <p className="text-center text-green-600 mb-4">{successMessage}</p>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
