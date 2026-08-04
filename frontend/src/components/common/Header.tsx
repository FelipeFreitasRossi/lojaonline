import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';

const links = [
  { to: '/', label: 'Vitrine' },
  { to: '/sobre', label: 'Sobre' },
  { to: '/contato', label: 'Contato' },
];

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.drawer', { x: '100%' }, { x: 0, duration: 0.4, ease: 'power3.out' });
      gsap.fromTo('.drawer-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3 });
    } else {
      document.body.style.overflow = 'auto';
      gsap.to('.drawer', { x: '100%', duration: 0.3 });
      gsap.to('.drawer-overlay', { opacity: 0, duration: 0.2 });
    }
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#0a0a0a] shadow-lg'
            : 'bg-[#0a0a0a]'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="font-display text-xl md:text-2xl text-white tracking-wide">
            Santo<span className="text-[#c9a94e]">Presentesc</span>
          </Link>

          <nav className="hidden md:flex gap-8">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-sm transition-colors ${
                    isActive ? 'text-[#c9a94e]' : 'text-gray-200 hover:text-[#c9a94e]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className="drawer-overlay fixed inset-0 bg-black/60 z-50 hidden md:hidden"
        style={{ opacity: 0 }}
        onClick={closeMenu}
      />

      {/* Drawer */}
      <div
        className="drawer fixed top-0 right-0 h-full w-3/4 max-w-sm bg-[#0a0a0a] z-50 shadow-2xl md:hidden overflow-y-auto"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full p-6 pt-20">
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>

          <div className="flex-1 space-y-6 mt-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block text-lg font-medium ${
                    isActive ? 'text-[#c9a94e]' : 'text-white hover:text-[#c9a94e]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-auto pt-6 border-t border-[#2a2a2a]">
            <p className="text-sm text-gray-500">
              Santo<span className="text-[#c9a94e]">Presentesc</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;