import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import type { Pedido, StatusPedido } from '../types';

export interface NovoPedidoItem {
  produtoId: number;
  quantidade: number;
}

export interface NovoPedidoInput {
  clienteId: number;
  itens: NovoPedidoItem[];
}

export const useOrders = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Pedido[]>('/admin/pedidos');
      setPedidos(data);
    } catch (err) {
      setError('Não foi possível carregar os pedidos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const criar = async (dados: NovoPedidoInput) => {
    await api.post('/admin/pedidos', dados);
    await buscar();
  };

  const atualizarStatus = async (id: number, status: StatusPedido) => {
    await api.put(`/admin/pedidos/${id}/status`, null, { params: { status } });
    await buscar();
  };

  const excluir = async (id: number) => {
    await api.delete(`/admin/pedidos/${id}`);
    await buscar();
  };

  return { pedidos, loading, error, criar, atualizarStatus, excluir, recarregar: buscar };
};

export const useOrder = (id: string | undefined) => {
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api
      .get<Pedido>(`/admin/pedidos/${id}`)
      .then((res) => setPedido(res.data))
      .catch(() => setError('Pedido não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { pedido, loading, error };
};
