import React, { useEffect, useRef } from 'react';
import { animateOnScroll } from '../../utils/gsapAnimations';

const testimonials = [
  { name: 'Ana Silva', text: 'Produtos incríveis e entrega rápida!', rating: 5 },
  { name: 'Carlos Souza', text: 'Atendimento excelente, recomendo!', rating: 5 },
  { name: 'Marina Lima', text: 'A melhor loja online que já comprei.', rating: 4 },
];

const Testimonials: React.FC = () => {
  useEffect(() => {
    animateOnScroll('.testimonial-card', { stagger: 0.08, start: 'top 85%' });
  }, []);

  return (
    <section className="testimonials-section py-20 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl">O que nossos clientes dizem</h2>
          <div className="gold-rule mx-auto mt-2" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testimonial-card bg-[#2a2a2a] p-6 rounded-xl"
            >
              <p className="text-lg italic">"{t.text}"</p>
              <p className="mt-4 font-semibold text-[#c9a94e]">— {t.name}</p>
              <div className="flex gap-1 mt-2">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={j < t.rating ? 'text-[#c9a94e]' : 'text-gray-500'}>
                    ★
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;