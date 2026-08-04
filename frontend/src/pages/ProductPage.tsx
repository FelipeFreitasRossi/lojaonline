import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProduct } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';
import { ArrowLeft } from 'lucide-react';
import gsap from 'gsap';

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { produto, loading, error } = useProduct(id);

  useEffect(() => {
    if (produto) {
      gsap.from('.product-image', { opacity: 0, scale: 0.95, duration: 1 });
      gsap.from('.product-info', { opacity: 0, x: 30, duration: 0.8, delay: 0.3 });
    }
  }, [produto]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c9a94e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !produto) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || 'Produto não encontrado'}
      </div>
    );
  }

  return (
    <main className="pt-24 pb-12 container mx-auto px-4 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c9a94e] transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Voltar
      </Link>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="product-image overflow-hidden rounded-xl bg-gray-100">
          <img
            src={produto.imagemUrl || '/placeholder.png'}
            alt={produto.nome}
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="product-info">
          <span className="text-sm uppercase tracking-wider text-gray-500">
            {produto.categoriaNome}
          </span>
          <h1 className="font-display text-4xl font-bold mt-2">{produto.nome}</h1>
          <p className="text-3xl font-bold text-[#c9a94e] mt-4">
            {formatCurrency(produto.preco)}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Estoque: {produto.quantidadeEstoque} unidades
          </p>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Descrição</h3>
            <p className="text-gray-700 leading-relaxed">{produto.descricao}</p>
          </div>
          <button
            className="btn-gold text-black font-bold px-8 py-3 rounded-full shadow-2xl hover:shadow-2xl transition-all duration-300 text-base tracking-wider hover:scale-105 mt-8 w-full md:w-auto"
            onClick={() => {
              const u = new SpeechSynthesisUtterance(`${produto.nome}. ${produto.descricao}`);
              u.lang = 'pt-BR';
              window.speechSynthesis.speak(u);
            }}
          >
            Ouvir descrição
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;