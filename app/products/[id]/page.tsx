// app/products/[id]/page.tsx
import ProductDetails from "../../components/productDetails";

const productDetailsData = [
  {
    empresa: "Loja Esportiva XYZ",
    preco: 399.99,
    tamanho: "42",
  },
  {
    empresa: "Esporte Max",
    preco: 410.50,
    tamanho: "42",
  },
  {
    empresa: "Super Tênis Online",
    preco: 389.90,
    tamanho: "42",
  },
  {
    empresa: "Mega Calçados",
    preco: 420.00,
    tamanho: "42",
  },
  {
    empresa: "Calce Bem",
    preco: 395.00,
    tamanho: "42",
  },
];

interface ProductDetailsPageProps {
  params: {
    id: string;
  };
}

export default function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const { id } = params;

  // Aqui você pode usar o `id` para buscar dados específicos, se necessário

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <ProductDetails productDetails={productDetailsData} />
    </main>
  );
}
