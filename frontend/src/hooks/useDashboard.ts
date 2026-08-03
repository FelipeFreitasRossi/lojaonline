import { useState, useEffect } from 'react';
import api from '../api/api';
import type { DashboardResumo } from '../types';

export const useDashboard = () => {
  const [resumo, setResumo] = useState<DashboardResumo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<DashboardResumo>('/admin/dashboard/resumo')
      .then((res) => setResumo(res.data))
      .catch(() => setError('Não foi possível carregar o resumo.'))
      .finally(() => setLoading(false));
  }, []);

  return { resumo, loading, error };
};
