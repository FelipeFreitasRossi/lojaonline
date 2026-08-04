import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const About: React.FC = () => {
  return (
    <main className="pt-24 pb-12 container mx-auto px-4 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-[#c9a94e] transition-colors mb-8"
      >
        <ArrowLeft size={20} /> Voltar
      </Link>
      <h1 className="font-display text-4xl md:text-5xl font-bold text-center mb-8">
        Sobre Nós
      </h1>
      <div className="gold-rule mx-auto mb-8" />
      <div className="max-w-3xl mx-auto text-center text-gray-700 text-lg leading-relaxed">
        <p className="mb-4">
          A <span className="font-semibold text-[#c9a94e]">SantoPresentesc</span> nasceu da
          paixão por presentes e da vontade de oferecer produtos únicos e cheios de
          significado.
        </p>
        <p>
          Cada item que vendemos é cuidadosamente selecionado para encantar você e quem
          recebe.
        </p>
      </div>
    </main>
  );
};

export default About;