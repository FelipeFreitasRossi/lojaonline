// Layout usado em todas as páginas do admin: tem um menu lateral fixo
// e o conteúdo de cada página aparece do lado direito (via <Outlet />).
import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Tags,
  Users,
  ClipboardList,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/produtos', label: 'Produtos', icon: Package },
  { to: '/admin/categorias', label: 'Categorias', icon: Tags },
  { to: '/admin/clientes', label: 'Clientes', icon: Users },
  { to: '/admin/pedidos', label: 'Pedidos', icon: ClipboardList },
];

const AdminLayout: React.FC = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const sair = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      {/* Botão do menu (mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-black text-white p-2 rounded-lg"
        onClick={() => setMenuAberto((v) => !v)}
        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
      >
        {menuAberto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Menu lateral */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-black text-white flex flex-col transition-transform duration-300 ${
          menuAberto ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <p className="font-display text-xl">
            Loja<span style={{ color: 'var(--color-gold)' }}>.</span> Admin
          </p>
          <p className="text-xs text-gray-400 mt-1">Olá, {username}</p>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1" aria-label="Menu administrativo">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuAberto(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive ? 'bg-white/10 text-[#c9a94e]' : 'text-gray-300 hover:bg-white/5'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 flex flex-col gap-1">
          <NavLink
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/5"
          >
            <ExternalLink size={18} />
            Ver vitrine
          </NavLink>
          <button
            onClick={sair}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-gray-300 hover:bg-white/5 text-left"
          >
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Fundo escuro quando o menu mobile está aberto */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMenuAberto(false)}
          aria-hidden="true"
        />
      )}

      <main className="flex-1 p-6 md:p-10 pt-20 md:pt-10 w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
