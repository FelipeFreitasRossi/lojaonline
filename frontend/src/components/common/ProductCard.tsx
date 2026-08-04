import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';
import gsap from 'gsap';

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

interface ProductCardProps {
  produto: Produto;
}

const ProductCard: React.FC<ProductCardProps> = ({ produto }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(el, {
        rotateX: y * -4,
        rotateY: x * 4,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 600,
      });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5 });
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300"
    >
      <Link to={`/produto/${produto.id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-gray-100">
          <img
            src={produto.imagemUrl || '/placeholder.png'}
            alt={produto.nome}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => (e.currentTarget.src = '/placeholder.png')}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <div className="p-4">
          {produto.categoriaNome && (
            <span className="text-xs uppercase tracking-wider text-gray-500">
              {produto.categoriaNome}
            </span>
          )}
          <h3 className="font-display text-lg font-semibold mt-1 group-hover:text-[#c9a94e] transition-colors">
            {produto.nome}
          </h3>
          <p className="text-xl font-bold text-[#c9a94e] mt-2">
            {formatCurrency(produto.preco)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;