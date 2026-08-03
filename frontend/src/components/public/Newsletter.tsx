import React, { useEffect } from 'react';
import { animateOnScroll } from '../../utils/gsapAnimations';

const Newsletter: React.FC = () => {
  useEffect(() => {
    animateOnScroll('.newsletter-card', { start: 'top 85%' });
  }, []);

  return (
    <section className="newsletter-section py-20 bg-[#f5f5f5]">
      <div className="container mx-auto px-4">
        <div className="newsletter-card max-w-2xl mx-auto bg-white p-10 rounded-2xl shadow-lg text-center">
          <h3 className="font-display text-3xl">Fique por dentro</h3>
          <p className="text-gray-600 mt-2">
            Assine nossa newsletter e receba novidades em primeira mão.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 mt-6">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="input flex-1"
            />
            <button type="submit" className="btn-gold text-white px-8 py-3 rounded-lg font-medium">
              Inscrever
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;