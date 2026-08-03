import React from 'react';
import { Link } from 'react-router-dom';
import { Produto } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ProductCardProps {
  produto: Produto;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto, index = 0 }) => {
  const { id, nome, preco, imagemUrl, categoriaNome } = produto;

  return (
    <div
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
      style={{
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <Link to={`/produto/${id}`} className="block">
        {/* Imagem com overlay */}
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          <img
            src={imagemUrl || '/placeholder.png'}
            alt={nome}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder.png';
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>

        {/* Info */}
        <div className="p-4">
          {categoriaNome && (
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {categoriaNome}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-[#c9a94e] transition-colors">
            {nome}
          </h3>
          <p className="text-xl font-bold text-[#c9a94e] mt-2">
            {formatCurrency(preco)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;