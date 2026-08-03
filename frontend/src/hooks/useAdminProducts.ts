// Igual ao useProducts, mas para a área administrativa: aqui dá pra ver
// TODOS os produtos (inclusive inativos) e também criar, editar e excluir.
import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import type { Produto } from '../types';

export type ProdutoInput = Omit<Produto, 'id' | 'categoriaNome'>;

export const useAdminProducts = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Produto[]>('/admin/produtos/todos');
      setProdutos(data);
    } catch (err) {
      setError('Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const criar = async (dados: ProdutoInput) => {
    await api.post('/admin/produtos', dados);
    await buscar();
  };

  const atualizar = async (id: number, dados: ProdutoInput) => {
    await api.put(`/admin/produtos/${id}`, dados);
    await buscar();
  };

  const excluir = async (id: number) => {
    await api.delete(`/admin/produtos/${id}`);
    await buscar();
  };

  return { produtos, loading, error, criar, atualizar, excluir, recarregar: buscar };
};
