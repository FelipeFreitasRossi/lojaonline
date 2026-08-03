import React, { useEffect } from 'react';
import { animateOnScroll } from '../../utils/gsapAnimations';

const AboutSection: React.FC = () => {
  useEffect(() => {
    animateOnScroll('.about-card', { stagger: 0.1, start: 'top 85%' });
  }, []);

  return (
    <section className="about-section py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl">Sobre Nós</h2>
          <div className="gold-rule mx-auto mt-2" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Missão', desc: 'Oferecer produtos de qualidade com preços justos.' },
            { title: 'Visão', desc: 'Ser referência em comércio online sustentável.' },
            { title: 'Valores', desc: 'Transparência, respeito e inovação constante.' },
          ].map((item, i) => (
            <div
              key={i}
              className="about-card bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className="font-display text-2xl text-[#c9a94e]">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AboutSection;