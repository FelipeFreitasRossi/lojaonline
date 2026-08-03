import React, { useEffect, useRef } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { animateFadeUp } from '../utils/gsapAnimations';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      animateFadeUp('.about-section', { trigger: sectionRef.current });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <main className="pt-20">
        <section ref={sectionRef} className="container mx-auto px-4 py-16">
          <div className="about-section max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold text-black-deep mb-8 text-center">
              Sobre a LojaOnline
            </h1>
            <div className="bg-white rounded-xl shadow-card p-8 md:p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                A LojaOnline é uma plataforma de e-commerce que conecta pessoas a produtos de alta qualidade.
                Nossa missão é oferecer uma experiência de compra simples, segura e agradável.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Trabalhamos com marcas parceiras e fornecedores cuidadosamente selecionados para garantir
                a qualidade e a procedência de todos os produtos.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Estamos comprometidos com a satisfação dos nossos clientes, oferecendo atendimento
                personalizado e suporte ágil.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;