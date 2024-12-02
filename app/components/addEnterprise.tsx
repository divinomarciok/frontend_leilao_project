"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";

const AddEnterprise = () => {
  const [nomeEmp, setNomeEmp] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newEnterprise = {
      nomeEmp,
      cnpj,
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
        body: JSON.stringify(newEnterprise),
      };

      const response = await fetch("https://leilao-project-deploy.onrender.com/createenterprise", requestOptions);

      if (response.ok) {
        setSuccessMessage("Empresa cadastrada com sucesso!");
        setNomeEmp("");
        setCnpj("");
        setErrorMessage(null);
      } else {
        setErrorMessage("Falha ao cadastrar a empresa. Tente novamente.");
        setSuccessMessage(null);
      }
    } catch (error) {
      console.error("Erro ao criar empresa", error);
      setErrorMessage("Erro ao conectar ao servidor. Tente novamente.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Cadastrar Empresa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nomeEmp" className="block text-sm font-medium text-gray-700 mb-2">
            Nome da Empresa:
          </label>
          <input
            type="text"
            id="nomeEmp"
            value={nomeEmp}
            onChange={(e) => setNomeEmp(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-gray-900"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-2">
            CNPJ:
          </label>
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
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
          Cadastrar Empresa
        </button>
      </form>
    </div>
  );
};

export default AddEnterprise;
