import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProductGrid from '../components/public/ProductGrid';
import HeroSection from '../components/public/HeroSection';
import AboutSection from '../components/public/AboutSection';
import Testimonials from '../components/public/Testimonials';
import Newsletter from '../components/public/Newsletter';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import { animateOnScroll } from '../utils/gsapAnimations';
import gsap from 'gsap';

const Home: React.FC = () => {
  const { produtos, loading, fetchProdutos } = useProducts();
  const { categorias } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  useEffect(() => {
    fetchProdutos();
    // Animar seções adicionais
    animateOnScroll('.about-section', { start: 'top 80%' });
    animateOnScroll('.testimonials-section', { start: 'top 80%' });
    animateOnScroll('.newsletter-section', { start: 'top 85%' });
  }, []);

  // Filtrar produtos
  const filtered = produtos.filter((p) => {
    const matchNome = p.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = selectedCategory ? p.categoriaNome === selectedCategory : true;
    const matchPreco =
      (priceRange.min ? p.preco >= Number(priceRange.min) : true) &&
      (priceRange.max ? p.preco <= Number(priceRange.max) : true);
    return matchNome && matchCat && matchPreco;
  });

  return (
    <div className="min-h-screen bg-white">
      <ScrollProgressBar />
      <Header />

      <main>
        <HeroSection />

        {/* Filtros */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 items-center justify-between bg-gray-50 p-4 rounded-xl">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="input flex-1 min-w-[180px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Buscar produtos"
            />
            <select
              className="input flex-1 min-w-[140px]"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filtrar por categoria"
            >
              <option value="">Todas categorias</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.nome}>
                  {cat.nome}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min R$"
                className="input w-28"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                aria-label="Preço mínimo"
              />
              <input
                type="number"
                placeholder="Max R$"
                className="input w-28"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                aria-label="Preço máximo"
              />
            </div>
          </div>
        </section>

        {/* Grid de produtos */}
        <section className="container mx-auto px-4 py-8">
          <ProductGrid produtos={filtered} loading={loading} />
        </section>

        <AboutSection />
        <Testimonials />
        <Newsletter />
      </main>

      <Footer />
    </div>
  );
};

export default Home;