"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ProductsList from "../components/products";

export default function ProductsPage() {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = Cookies.get("authToken"); // Obtém o token do cookie

        if (!token) {
          throw new Error("Usuário não autenticado");
        }

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        const requestOptions = {
          method: "GET",
          headers: myHeaders,
        };

        const response = await fetch("https://leilao-project-deploy.onrender.com/getAllProducts", requestOptions);
        if (response.ok) {
          const data = await response.json();
          setProductsData(data);
        } else {
          setError("Erro ao buscar produtos.");
        }
      } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        setError("Erro ao conectar ao servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 py-10 text-center">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 py-10 text-center text-red-600">{error}</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ProductsList products={productsData} />
    </main>
  );
}
