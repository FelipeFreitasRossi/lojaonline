import { useState, useEffect } from 'react';
import api from '../api/api';

// Tipo local
interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidadeEstoque: number;
  categoriaId: number;
  categoriaNome?: string;
  imagemUrl?: string;
  ativo: boolean;
}

export const useProducts = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Produto[]>('/produtos');
      setProdutos(data);
    } catch {
      setError('Erro ao carregar produtos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return { produtos, loading, error, fetchProdutos };
};

export const useProduct = (id: string | undefined) => {
  const [produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    api
      .get<Produto>(`/produtos/${id}`)
      .then((res) => setProduto(res.data))
      .catch(() => setError('Produto não encontrado.'))
      .finally(() => setLoading(false));
  }, [id]);

  return { produto, loading, error };
};