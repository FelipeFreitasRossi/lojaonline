import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Produto } from '../../types';
import { gsap } from 'gsap';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  produto: Produto;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto, index = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animação hover com GSAP (opcional, pode ser feito com CSS)
  }, []);

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (cardRef.current && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.to(cardRef.current, {
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        scale: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-xl shadow-card overflow-hidden transition-all duration-300 hover:shadow-card-hover group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="article"
      aria-labelledby={`produto-${produto.id}`}
    >
      <div className="relative overflow-hidden aspect-square bg-gray-100">
        {produto.imagemUrl ? (
          <img
            src={produto.imagemUrl}
            alt={produto.nome}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-light text-gray-mid">
            <ShoppingBag size={48} className="opacity-30" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
          <span className="text-white font-semibold text-sm bg-gold px-3 py-1 rounded-full">
            {produto.categoriaNome || 'Categoria'}
          </span>
          <Link
            to={`/produto/${produto.id}`}
            className="bg-white/90 backdrop-blur-sm text-black-deep p-2 rounded-full hover:bg-gold hover:text-white transition-colors duration-300"
            aria-label={`Ver detalhes de ${produto.nome}`}
          >
            <Eye size={20} />
          </Link>
        </div>
        {!produto.ativo && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            Inativo
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 id={`produto-${produto.id}`} className="font-semibold text-lg text-black-deep truncate">
          {produto.nome}
        </h3>
        <p className="text-gray-mid text-sm truncate">{produto.descricao || 'Sem descrição'}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-2xl font-bold text-gold">{formatCurrency(produto.preco)}</span>
          <span className="text-sm text-gray-mid">
            Estoque: {produto.quantidadeEstoque}
          </span>
        </div>
        <Link
          to={`/produto/${produto.id}`}
          className="mt-3 w-full block text-center bg-black-deep text-white py-2 rounded-lg hover:bg-gold hover:text-black-deep transition-colors duration-300 font-medium"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;