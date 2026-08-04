import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ana Silva',
    text: 'Produtos incríveis e entrega rápida! Recomendo a todos.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Ana+Silva&background=c9a94e&color=fff&size=64',
  },
  {
    id: 2,
    name: 'Carlos Souza',
    text: 'Atendimento excelente, produtos de qualidade. Minha loja favorita.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Carlos+Souza&background=c9a94e&color=fff&size=64',
  },
  {
    id: 3,
    name: 'Marina Lima',
    text: 'A melhor loja online que já comprei. Sempre encontro o que preciso.',
    rating: 4,
    avatar: 'https://ui-avatars.com/api/?name=Marina+Lima&background=c9a94e&color=fff&size=64',
  },
  {
    id: 4,
    name: 'Rafael Oliveira',
    text: 'Produtos exclusivos e atendimento personalizado. Nota 10!',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Rafael+Oliveira&background=c9a94e&color=fff&size=64',
  },
  {
    id: 5,
    name: 'Carla Mendes',
    text: 'Comprei um presente e foi um sucesso. Voltarei sempre.',
    rating: 5,
    avatar: 'https://ui-avatars.com/api/?name=Carla+Mendes&background=c9a94e&color=fff&size=64',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const itemsPerView = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerView);
  const maxIndex = totalPages - 1;

  const goToNext = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    setTimeout(() => setIsAnimating(false), 400);
  }, [maxIndex, isAnimating]);

  const goToPrev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
    setTimeout(() => setIsAnimating(false), 400);
  }, [maxIndex, isAnimating]);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(goToNext, 6000);
    return () => clearInterval(timer);
  }, [goToNext]);

  const visibleItems = testimonials.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView
  );

  return (
    <section className="py-16 md:py-20 bg-[#1a1a1a] text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl">Nossos clientes também dizem</h2>
          <div className="gold-rule mx-auto mt-2" />
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-300">
            {visibleItems.map((t) => (
              <div
                key={t.id}
                className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
              >
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-16 h-16 rounded-full border-2 border-[#c9a94e] mb-4"
                  loading="lazy"
                />
                <p className="text-lg italic text-gray-300 leading-relaxed">"{t.text}"</p>
                <p className="mt-4 font-semibold text-[#c9a94e]">— {t.name}</p>
                <div className="flex gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < t.rating ? 'text-[#c9a94e]' : 'text-gray-500'}>
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={goToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 md:-ml-6 bg-[#c9a94e] hover:bg-[#b89a3e] text-black p-2 rounded-full shadow-lg transition-colors z-10"
            aria-label="Depoimento anterior"
            disabled={isAnimating}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 md:-mr-6 bg-[#c9a94e] hover:bg-[#b89a3e] text-black p-2 rounded-full shadow-lg transition-colors z-10"
            aria-label="Próximo depoimento"
            disabled={isAnimating}
          >
            <ChevronRight size={24} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (!isAnimating) {
                    setIsAnimating(true);
                    setCurrentIndex(i);
                    setTimeout(() => setIsAnimating(false), 400);
                  }
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'bg-[#c9a94e] w-8' : 'bg-gray-500 hover:bg-gray-400'
                }`}
                aria-label={`Ir para depoimentos ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;