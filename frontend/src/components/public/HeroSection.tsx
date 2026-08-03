import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { typewriter, parallaxHero } from '../../utils/gsapAnimations';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Parallax no fundo
    if (heroRef.current) {
      parallaxHero(heroRef.current, 15);
    }

    // Typewriter no título
    if (titleRef.current) {
      setTimeout(() => {
        typewriter(titleRef.current, 'Produtos que Inspiram', 60);
      }, 400);
    }

    // Animação do subtítulo e botão
    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 1.2,
      ease: 'power2.out',
    });
    gsap.from('.hero-cta', {
      opacity: 0,
      scale: 0.9,
      duration: 0.8,
      delay: 1.6,
      ease: 'back.out(1.7)',
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden"
      aria-label="Banner principal"
    >
      {/* Fundo com gradiente + overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]"
        style={{ transform: 'translateY(0)' }}
      />
      {/* Partículas (simples) – opcional */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#c9a94e] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#c9a94e] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="font-display text-4xl md:text-6xl font-bold leading-tight"
          />
          <p className="hero-subtitle text-lg md:text-xl text-gray-300 mt-6 font-light">
          </p>
          <div className="hero-cta mt-10">
            <Link
              to="#produtos"
              className="btn-gold text-white px-10 py-4 rounded-full font-medium inline-block hover:shadow-2xl"
            >
              Explorar Agora
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;