import { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import type { Categoria } from '../types';

export const useCategories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buscar = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Categoria[]>('/categorias');
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

  return { categorias, loading, error, recarregar: buscar };
};
