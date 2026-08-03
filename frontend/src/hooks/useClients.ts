import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import type { Cliente } from '../types';

export type ClienteInput = Omit<Cliente, 'id'>;

export const useClients = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Cliente[]>('/admin/clientes');
      setClientes(data);
    } catch (err) {
      setError('Não foi possível carregar os clientes.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const criar = async (dados: ClienteInput) => {
    await api.post('/admin/clientes', dados);
    await buscar();
  };

  const atualizar = async (id: number, dados: ClienteInput) => {
    await api.put(`/admin/clientes/${id}`, dados);
    await buscar();
  };

  const excluir = async (id: number) => {
    await api.delete(`/admin/clientes/${id}`);
    await buscar();
  };

  return { clientes, loading, error, criar, atualizar, excluir, recarregar: buscar };
};
