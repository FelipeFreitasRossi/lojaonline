import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { parallaxHero, typewriter } from '../../utils/gsapAnimations';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      parallaxHero(heroRef.current);
    }

    const timer = setTimeout(() => {
      if (titleRef.current) {
        typewriter(titleRef.current, 'Produtos que Inspiram');
      }
    }, 400);

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

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[80vh] md:min-h-[85vh] flex items-start pt-16 md:pt-20 overflow-hidden"
      aria-label="Banner principal"
    >
      {/* Fundo com gradiente mais escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a2a2a]" />

      {/* Elementos decorativos de fundo - bem sutis */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-48 h-48 md:w-64 md:h-64 bg-[#c9a94e] rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-56 h-56 md:w-80 md:h-80 bg-[#c9a94e] rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#c9a94e]/10 rounded-full filter blur-3xl animate-pulse delay-500" />
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 relative z-10 text-white">
        <div className="max-w-3xl">
          <h1
            ref={titleRef}
            className="font-display text-4xl md:text-6xl font-bold leading-tight text-white drop-shadow-2xl"
          />
          <p className="hero-subtitle text-lg md:text-2xl text-white font-light mt-4 md:mt-6 leading-relaxed drop-shadow-2xl">
            Os melhores produtos com preços incríveis para você
          </p>
          <div className="hero-cta mt-8 md:mt-10">
            <Link
              to="#vitrine"
              className="btn-gold text-black font-bold px-8 md:px-10 py-3 md:py-4 rounded-full inline-block shadow-2xl hover:shadow-2xl transition-all duration-300 text-base md:text-lg tracking-wider hover:scale-105"
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