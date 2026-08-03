import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { animateHeader } from '../../utils/gsapAnimations';
import gsap from 'gsap';

const Header: React.FC = () => {
  const { isAuthenticated, logout, username } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  // Animação de entrada do header
  useEffect(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
    });
  }, []);

  // Animação de scroll (fundo escuro)
  useEffect(() => {
    if (headerRef.current) {
      animateHeader(headerRef.current);
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-colors duration-300"
      style={{ backgroundColor: 'transparent' }}
      role="banner"
      aria-label="Cabeçalho principal"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-display text-2xl tracking-wide hover:text-[#c9a94e] transition-colors"
          aria-label="Página inicial"
        >
          Loja<span className="text-[#c9a94e]">.</span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Menu principal">
          <Link to="/" className="text-white hover:text-[#c9a94e] transition-colors">
            Início
          </Link>
          <Link to="/sobre" className="text-white hover:text-[#c9a94e] transition-colors">
            Sobre
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/admin"
                className="text-white hover:text-[#c9a94e] transition-colors flex items-center gap-1"
              >
                <User size={18} />
                Painel
              </Link>
              <button
                onClick={handleLogout}
                className="text-white hover:text-[#c9a94e] transition-colors flex items-center gap-1"
                aria-label="Sair"
              >
                <LogOut size={18} />
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn-gold text-white px-6 py-2 rounded-full font-medium"
            >
              Entrar
            </Link>
          )}
        </nav>

        {/* Menu Mobile */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile expandido */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] px-4 py-6 border-t border-[#2a2a2a]">
          <nav className="flex flex-col gap-4" aria-label="Menu móvel">
            <Link
              to="/"
              className="text-white hover:text-[#c9a94e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Início
            </Link>
            <Link
              to="/sobre"
              className="text-white hover:text-[#c9a94e] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin"
                  className="text-white hover:text-[#c9a94e] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Painel Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-[#c9a94e] transition-colors text-left"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-gold text-white px-6 py-2 rounded-full font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Entrar
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;