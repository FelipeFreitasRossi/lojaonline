import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useOrder, useOrders } from '../../hooks/useOrders';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatarMoeda, formatarData, statusLabel, statusCor } from '../../utils/formatters';
import type { StatusPedido } from '../../types';

const statusDisponiveis: StatusPedido[] = ['PENDENTE', 'PAGO', 'ENVIADO', 'CANCELADO'];

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pedido, loading, error } = useOrder(id);
  const { atualizarStatus } = useOrders();
  const [atualizando, setAtualizando] = useState(false);
  const [statusAtual, setStatusAtual] = useState<StatusPedido | null>(null);

  const mudarStatus = async (novoStatus: StatusPedido) => {
    if (!pedido) return;
    setAtualizando(true);
    try {
      await atualizarStatus(pedido.id, novoStatus);
      setStatusAtual(novoStatus);
    } finally {
      setAtualizando(false);
    }
  };

  if (loading) return <LoadingSpinner texto="Carregando pedido..." />;
  if (error || !pedido) return <p className="text-red-600">{error ?? 'Pedido não encontrado.'}</p>;

  const status = statusAtual ?? pedido.status;

  return (
    <div>
      <Link
        to="/admin/pedidos"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors mb-6"
      >
        <ArrowLeft size={16} /> Voltar aos pedidos
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-[#1a1a1a]">Pedido #{pedido.id}</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pedido.clienteNome} • {formatarData(pedido.dataPedido)}
          </p>
        </div>
        <span className={`px-3 py-1.5 rounded-full text-sm ${statusCor[status]}`}>
          {statusLabel[status]}
        </span>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-display text-lg text-[#1a1a1a] mb-4">Itens do pedido</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-100">
              <th className="py-2 pr-4">Produto</th>
              <th className="py-2 pr-4">Quantidade</th>
              <th className="py-2 pr-4">Preço unitário</th>
              <th className="py-2 pr-4">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.itens.map((item) => (
              <tr key={item.id} className="border-b border-gray-50 last:border-0">
                <td className="py-3 pr-4">{item.produtoNome}</td>
                <td className="py-3 pr-4">{item.quantidade}</td>
                <td className="py-3 pr-4">{formatarMoeda(item.precoUnitario)}</td>
                <td className="py-3 pr-4 font-medium">{formatarMoeda(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4 pt-4 border-t border-gray-100">
          <p className="font-display text-xl text-[#1a1a1a]">Total: {formatarMoeda(pedido.total)}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <h2 className="font-display text-lg text-[#1a1a1a] mb-4">Alterar status</h2>
        <div className="flex flex-wrap gap-2">
          {statusDisponiveis.map((s) => (
            <button
              key={s}
              onClick={() => mudarStatus(s)}
              disabled={atualizando || s === status}
              className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                s === status
                  ? 'border-transparent text-black'
                  : 'border-gray-200 text-gray-600 hover:border-[#c9a94e]'
              }`}
              style={s === status ? { backgroundColor: 'var(--color-gold)' } : undefined}
            >
              {statusLabel[s]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
