import { useState, useEffect } from 'react';
import api from '../api/api';

// Tipo local
interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

export const useCategories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  useEffect(() => {
    api
      .get<Categoria[]>('/categorias')
      .then((res) => setCategorias(res.data))
      .catch(console.error);
  }, []);

  return { categorias };
};