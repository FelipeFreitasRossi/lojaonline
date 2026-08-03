import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Produto } from '../types';
import api from '../api/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatCurrency } from '../utils/formatters';
import { gsap } from 'gsap';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/produtos/${id}`);
        setProduto(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message || 'Produto não encontrado');
      } finally {
        setLoading(false);
      }
    };
    fetchProduto();
  }, [id]);

  useEffect(() => {
    if (!loading && produto) {
      // Animação da imagem
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          opacity: 0,
          x: -50,
          duration: 1,
          ease: 'power2.out',
        });
      }
      // Animação do conteúdo
      if (contentRef.current) {
        gsap.from(contentRef.current, {
          opacity: 0,
          x: 50,
          duration: 1,
          delay: 0.3,
          ease: 'power2.out',
        });
      }
    }
  }, [loading, produto]);

  if (loading) return <LoadingSpinner />;
  if (error || !produto) {
    return (
      <div className="min-h-screen bg-gray-light">
        <Header />
        <main className="container mx-auto px-4 py-20 text-center">
          <p className="text-red-500 text-xl">{error || 'Produto não encontrado'}</p>
          <Link to="/" className="text-gold hover:underline mt-4 inline-block">
            Voltar à vitrine
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Função de leitura em voz alta (acessibilidade)
  const handleReadAloud = () => {
    if ('speechSynthesis' in window) {
      const text = `${produto.nome}. ${produto.descricao}. Preço: ${formatCurrency(produto.preco)}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <Link to="/" className="inline-flex items-center text-gold hover:underline mb-6">
          <ArrowLeft size={20} className="mr-2" />
          Voltar
        </Link>
        <div className="bg-white rounded-xl shadow-card overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-12">
            <div ref={imageRef} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              {produto.imagemUrl ? (
                <img
                  src={produto.imagemUrl}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-mid">
                  <ShoppingBag size={64} className="opacity-30" />
                </div>
              )}
            </div>
            <div ref={contentRef} className="flex flex-col">
              <h1 className="text-3xl font-playfair font-bold text-black-deep mb-2">
                {produto.nome}
              </h1>
              <p className="text-gold font-semibold mb-4">{produto.categoriaNome || 'Categoria'}</p>
              <p className="text-gray-700 leading-relaxed mb-6">{produto.descricao || 'Sem descrição'}</p>
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-bold text-gold">{formatCurrency(produto.preco)}</span>
                <span className="text-sm text-gray-mid">
                  Estoque: {produto.quantidadeEstoque > 0 ? `${produto.quantidadeEstoque} unidades` : 'Indisponível'}
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  className="bg-gold text-black-deep px-8 py-3 rounded-lg font-semibold hover:bg-gold-light transition-colors duration-300 flex-1"
                  disabled={produto.quantidadeEstoque === 0}
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={handleReadAloud}
                  className="bg-gray-dark text-white px-6 py-3 rounded-lg hover:bg-gray-mid transition-colors duration-300 flex-1"
                  aria-label="Ouvir descrição do produto"
                >
                  Ouvir Descrição 🔊
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage;