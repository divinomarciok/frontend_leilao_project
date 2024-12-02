// app/products/[id]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/productDetails";
import { useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [nomeProduto, setNomeProduto] = useState<string | null>(null);
  const [productDetailsData, setProductDetailsData] = useState<
    { empresa: string; preco: number; tamanho: string }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchParams = async () => {
      try {
        const resolvedParams = await params;
        setId(resolvedParams.id);

        // Obter o nome do produto dos parâmetros da URL
        const nome = searchParams.get("nome");
        if (nome) {
          setNomeProduto(nome);
        }
      } catch (err) {
        console.error("error ",err)
        setError("Erro ao obter os parâmetros.");
      }
    };

    fetchParams();
  }, [params, searchParams]);

  useEffect(() => {
    if (id) {
      // Somente buscar dados da API quando o `id` estiver disponível
      const fetchProductDetails = async () => {
        try {
          const token = Cookies.get("authToken"); // Obtém o token do cookie
          if (!token) {
            throw new Error("Token de autenticação não encontrado.");
          }

          const myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${token}`);

          const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow" as RequestRedirect,
          };

          const response = await fetch(
            `https://leilao-project-deploy.onrender.com/products/${id}/enterprises`,
            requestOptions
          );

          if (!response.ok) {
            throw new Error("Erro ao buscar detalhes do produto");
          }

          console.log(response.ok);
          const data = await response.json();
          setProductDetailsData(data);
        } catch (err) {
          console.error("Erro ao buscar detalhes do produto: ", err);
          setError("Erro ao buscar detalhes do produto.");
        } finally {
          setLoading(false);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-gray-100 py-10 text-center">Carregando...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-100 py-10 text-center text-red-600">{error}</div>;
  }

  if (!id || !nomeProduto) {
    return <div className="min-h-screen bg-gray-100 py-10 text-center">Carregando...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ProductDetails
        productDetails={productDetailsData}
        productId={id}
        productName={nomeProduto}
      />
    </main>
  );
}
