// app/products/[id]/page.tsx
"use client";

import React from "react";
import ProductDetails from "../../components/productDetails";
import { useSearchParams } from "next/navigation";

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = React.useState<string | null>(null);
  const [nomeProduto, setNomeProduto] = React.useState<string | null>(null);
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setId(resolvedParams.id);

      // Obter o nome do produto dos parâmetros da URL
      const nome = searchParams.get("nome");
      if (nome) {
        setNomeProduto(nome);
      }
    };
    fetchParams();
  }, [params, searchParams]);

  if (!id || !nomeProduto) {
    return <div>Carregando...</div>;
  }

  const productDetailsData = [
    {
      empresa: "Loja Esportiva XYZ",
      preco: 399.99,
      tamanho: "42",
    },
    // demais empresas...
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ProductDetails productDetails={productDetailsData} productId={id} productName={nomeProduto} />
    </main>
  );
}
