import React, { useEffect, useRef } from 'react';
import { PackageSearch } from 'lucide-react';
import ProductCard from '../common/ProductCard';
import { animateOnScroll } from '../../utils/gsapAnimations';

// Tipo local
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  categoriaId: number;
  categoriaNome?: string;
  imagemUrl?: string;
  ativo: boolean;
}

interface ProductGridProps {
  produtos: Produto[];
  loading: boolean;
  error?: string | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({ produtos, loading, error }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && produtos.length > 0) {
      animateOnScroll('.product-card', { stagger: 0.06, start: 'top 90%', distance: 30 });
    }
  }, [loading, produtos]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-[#c9a94e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 py-16">{error}</p>;
  }

  if (produtos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
        <PackageSearch size={40} />
        <p>Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="container mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {produtos.map((produto) => (
        <ProductCard key={produto.id} produto={produto} />
      ))}
    </div>
  );
};

export default ProductGrid;