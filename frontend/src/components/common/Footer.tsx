import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-[#0a0a0a] text-white pt-16 pb-8"
      role="contentinfo"
      aria-label="Rodapé"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Sobre */}
          <div>
            <h3 className="font-display text-2xl mb-4">
              Loja<span className="text-[#c9a94e]">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A melhor experiência de compras online, com produtos selecionados e
              atendimento de excelência.
            </p>
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-400 hover:text-[#c9a94e] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-400 hover:text-[#c9a94e] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-400 hover:text-[#c9a94e] transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-gray-400 hover:text-[#c9a94e] transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#c9a94e] transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-[#c9a94e] transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#c9a94e] transition-colors">
                  Painel Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contato</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Av. Principal, 1000 - Centro</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>contato@loja.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-3">
              Receba novidades e ofertas exclusivas.
            </p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Seu e-mail"
                className="input bg-[#1a1a1a] border-gray-700 text-white placeholder-gray-500"
                aria-label="E-mail para newsletter"
              />
              <button
                type="submit"
                className="btn-gold text-white font-medium py-2 rounded-lg"
              >
                Inscrever
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-[#2a2a2a] mt-12 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Loja Online. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;