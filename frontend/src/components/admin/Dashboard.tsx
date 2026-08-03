import React, { useEffect, useState, useRef } from 'react';
import { Package, Users, ShoppingBag, DollarSign, Clock } from 'lucide-react';
import { DashboardResumo } from '../../types';
import api from '../../api/api';
import { animateCounter } from '../../utils/gsapAnimations';
import { formatCurrency } from '../../utils/formatters';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardResumo | null>(null);
  const [loading, setLoading] = useState(true);
  const countersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/admin/dashboard/resumo');
        setData(response.data);
      } catch (err) {
        console.error('Erro ao carregar dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  useEffect(() => {
    if (data && !loading) {
      // Animar contadores
      countersRef.current.forEach((el, index) => {
        if (el) {
          const values = [data.totalProdutos, data.totalClientes, data.totalPedidos, data.faturamentoMes, data.pedidosPendentes];
          animateCounter(el, values[index]);
        }
      });
    }
  }, [data, loading]);

  if (loading) return <div className="text-center py-8">Carregando...</div>;
  if (!data) return <div className="text-center py-8">Erro ao carregar dados.</div>;

  const cards = [
    { label: 'Produtos', value: data.totalProdutos, icon: Package, color: 'text-gold' },
    { label: 'Clientes', value: data.totalClientes, icon: Users, color: 'text-blue-500' },
    { label: 'Pedidos', value: data.totalPedidos, icon: ShoppingBag, color: 'text-purple-500' },
    { label: 'Faturamento Mês', value: data.faturamentoMes, icon: DollarSign, color: 'text-green-500', format: formatCurrency },
    { label: 'Pedidos Pendentes', value: data.pedidosPendentes, icon: Clock, color: 'text-red-500' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-playfair font-bold text-black-deep">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white p-6 rounded-xl shadow-card">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-mid text-sm">{card.label}</span>
                <Icon size={24} className={card.color} />
              </div>
              <div
                ref={(el) => (countersRef.current[index] = el)}
                className="text-3xl font-bold text-black-deep"
              >
                0
              </div>
              {card.format && <span className="text-xs text-gray-mid">{card.format(data.faturamentoMes)}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;