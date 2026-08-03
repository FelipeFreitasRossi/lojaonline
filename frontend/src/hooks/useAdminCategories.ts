import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import type { Categoria } from '../types';

export type CategoriaInput = Omit<Categoria, 'id'>;

export const useAdminCategories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Categoria[]>('/admin/categorias/todos');
      setCategorias(data);
    } catch (err) {
      setError('Não foi possível carregar as categorias.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    buscar();
  }, [buscar]);

  const criar = async (dados: CategoriaInput) => {
    await api.post('/admin/categorias', dados);
    await buscar();
  };

  const atualizar = async (id: number, dados: CategoriaInput) => {
    await api.put(`/admin/categorias/${id}`, dados);
    await buscar();
  };

  const excluir = async (id: number) => {
    await api.delete(`/admin/categorias/${id}`);
    await buscar();
  };

  return { categorias, loading, error, criar, atualizar, excluir, recarregar: buscar };
};
