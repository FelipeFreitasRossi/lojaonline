import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="mt-auto bg-[#0a0a0a] text-gray-400">
    <div className="container mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <p className="font-display text-white text-lg">
        Santo<span className="text-[#c9a94e]">Presentesc</span>
      </p>
      <nav className="flex gap-6 text-sm">
        <Link to="/" className="hover:text-[#c9a94e] transition-colors">
          Vitrine
        </Link>
        <Link to="/sobre" className="hover:text-[#c9a94e] transition-colors">
          Sobre
        </Link>
        <Link to="/contato" className="hover:text-[#c9a94e] transition-colors">
          Contato
        </Link>
      </nav>
      <p className="text-sm">© {new Date().getFullYear()} Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;