import { useState } from 'react';
import api from '../api/api';
import { Produto } from '../types';

export const useProducts = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/produtos');
      setProdutos(data);
    } catch (err) {
      setError('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  const getProduto = async (id: number): Promise<Produto> => {
    const { data } = await api.get(`/produtos/${id}`);
    return data;
  };

  return { produtos, loading, error, fetchProdutos, getProduto };
};