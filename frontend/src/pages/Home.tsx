import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import HeroSection from '../components/public/HeroSection';
import ProductGrid from '../components/public/ProductGrid';
import Testimonials from '../components/public/Testimonials';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import gsap from 'gsap';

const Home: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const { produtos, loading, error } = useProducts();
  const { categorias } = useCategories();

  useEffect(() => {
    gsap.from('.filters-bar', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power2.out',
    });
  }, []);

  const filtered = produtos.filter((p) => {
    const matchNome = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory
      ? p.categoriaNome?.toLowerCase() === selectedCategory.toLowerCase()
      : true;
    const matchPreco =
      (priceMin ? p.preco >= Number(priceMin) : true) &&
      (priceMax ? p.preco <= Number(priceMax) : true);
    return matchNome && matchCat && matchPreco;
  });

  return (
    <main>
      <HeroSection />

      <section
        id="vitrine"
        className="container mx-auto px-4 sm:px-6 -mt-4 md:-mt-6 relative z-10 scroll-mt-24"
      >
        <div className="filters-bar bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-4 flex flex-wrap gap-3 items-center">
          <div className="flex-1 min-w-[220px] flex items-center gap-2 border-2 border-gray-300 rounded-lg px-3 focus-within:border-[#c9a94e] transition-colors bg-white">
            <Search size={18} className="text-gray-600" />
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
              className="w-full py-3 outline-none text-sm text-gray-800 placeholder-gray-500 bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar produtos"
            />
          </div>

          <select
            className="p-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800 focus:border-[#c9a94e] outline-none transition-colors bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filtrar por categoria"
          >
            <option value="">Todas as categorias</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.nome}>
                {c.nome}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Preço mín."
              className="w-28 p-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-500 focus:border-[#c9a94e] outline-none transition-colors bg-white"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
              aria-label="Preço mínimo"
            />
            <input
              type="number"
              placeholder="Preço máx."
              className="w-28 p-3 border-2 border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-500 focus:border-[#c9a94e] outline-none transition-colors bg-white"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
              aria-label="Preço máximo"
            />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 py-8">
        <ProductGrid produtos={filtered} loading={loading} error={error} />
      </section>

      <Testimonials />

      <section className="py-16 md:py-20 bg-[#1a1a1a] text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl mb-4">Quer saber mais?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Conheça nossa história ou fale diretamente com a nossa equipe.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sobre"
              className="btn-gold inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-black hover:shadow-lg transition-shadow"
            >
              Sobre nós
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border-2 border-white/40 hover:border-[#c9a94e] hover:text-[#c9a94e] transition-colors"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;