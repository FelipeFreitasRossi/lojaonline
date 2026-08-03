import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import { formatCurrency } from '../utils/formatters';
import gsap from 'gsap';
import { ArrowLeft } from 'lucide-react';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getProduto, loading } = useProducts();
  const [produto, setProduto] = useState(null);

  useEffect(() => {
    if (id) {
      getProduto(Number(id)).then(setProduto);
    }
  }, [id]);

  useEffect(() => {
    if (produto) {
      // Animações de entrada
      gsap.from('.product-image', {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
      });
      gsap.from('.product-info', {
        opacity: 0,
        x: 30,
        duration: 0.8,
        delay: 0.3,
        ease: 'power2.out',
      });
      gsap.from('.product-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out',
      });
    }
  }, [produto]);

  if (loading || !produto) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#c9a94e] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const { nome, descricao, preco, imagemUrl, categoriaNome, quantidadeEstoque } =
    produto;

  return (
    <>
      <ScrollProgressBar />
      <Header />
      <main className="pt-24 pb-12 container mx-auto px-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c9a94e] transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Voltar
        </Link>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Imagem */}
          <div className="product-image overflow-hidden rounded-xl bg-gray-100">
            <img
              src={imagemUrl || '/placeholder.png'}
              alt={nome}
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Info */}
          <div className="product-info">
            <span className="text-sm uppercase tracking-wider text-gray-500">
              {categoriaNome}
            </span>
            <h1 className="font-display text-4xl font-bold mt-2">{nome}</h1>
            <p className="text-3xl font-bold text-[#c9a94e] mt-4">
              {formatCurrency(preco)}
            </p>
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Estoque: {quantidadeEstoque} unidades
              </p>
            </div>
            <div className="product-description mt-6">
              <h3 className="font-semibold mb-2">Descrição</h3>
              <p className="text-gray-700 leading-relaxed">{descricao}</p>
            </div>
            <button
              className="btn-gold text-white px-8 py-3 rounded-full font-medium mt-8 w-full md:w-auto"
              onClick={() => {
                // Ler descrição em voz alta
                const utterance = new SpeechSynthesisUtterance(
                  `${nome}. ${descricao}`
                );
                utterance.lang = 'pt-BR';
                window.speechSynthesis.speak(utterance);
              }}
            >
              Ouvir descrição
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;