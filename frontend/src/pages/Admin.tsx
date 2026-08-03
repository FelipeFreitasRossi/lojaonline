import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import { isAuthenticated } from '../api/api';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Dashboard from '../components/admin/Dashboard';
import ProductList from '../components/admin/ProductList';
import ProductForm from '../components/admin/ProductForm';
import CategoryList from '../components/admin/CategoryList';
import CategoryForm from '../components/admin/CategoryForm';
import OrderList from '../components/admin/OrderList';
import OrderDetail from '../components/admin/OrderDetail';
import ClientList from '../components/admin/ClientList';
import { LayoutDashboard, Package, Home as HomeIcon, Users, ClipboardList } from 'lucide-react';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-light">
      <Header />
      <div className="flex pt-16">
        {/* Sidebar Admin */}
        <aside className="hidden md:block w-64 bg-black-deep text-white min-h-screen p-6 fixed top-16 left-0 overflow-y-auto">
          <nav className="space-y-4">
            <h2 className="text-gold font-playfair text-xl border-b border-gold/30 pb-2">Painel Admin</h2>
            <ul className="space-y-2">
              <li>
                <Link to="/admin" className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white/5">
                  <LayoutDashboard size={20} />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/admin/produtos" className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white/5">
                  <Package size={20} />
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/admin/categorias" className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white/5">
                  <HomeIcon size={20} />
                  Categorias
                </Link>
              </li>
              <li>
                <Link to="/admin/clientes" className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white/5">
                  <Users size={20} />
                  Clientes
                </Link>
              </li>
              <li>
                <Link to="/admin/pedidos" className="flex items-center gap-3 text-gray-300 hover:text-gold transition-colors duration-200 p-2 rounded-lg hover:bg-white/5">
                  <ClipboardList size={20} />
                  Pedidos
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/produtos" element={<ProductList />} />
            <Route path="/produtos/novo" element={<ProductForm />} />
            <Route path="/produtos/editar/:id" element={<ProductForm />} />
            <Route path="/categorias" element={<CategoryList />} />
            <Route path="/categorias/novo" element={<CategoryForm />} />
            <Route path="/categorias/editar/:id" element={<CategoryForm />} />
            <Route path="/clientes" element={<ClientList />} />
            <Route path="/pedidos" element={<OrderList />} />
            <Route path="/pedidos/:id" element={<OrderDetail />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;