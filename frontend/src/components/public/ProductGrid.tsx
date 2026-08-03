import React, { useEffect, useRef } from 'react';
import ProductCard from './ProductCard';
import { Produto } from '../../types';
import { animateOnScroll } from '../../utils/gsapAnimations';

interface ProductGridProps {
  produtos: Produto[];
  loading?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ produtos, loading }) => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current && produtos.length > 0) {
      animateOnScroll('.product-card', { stagger: 0.06, start: 'top 90%' });
    }
  }, [produtos]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-12 h-12 border-4 border-[#c9a94e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (produtos.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500">
        Nenhum produto encontrado.
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    >
      {produtos.map((produto, i) => (
        <div key={produto.id} className="product-card">
          <ProductCard produto={produto} index={i} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;