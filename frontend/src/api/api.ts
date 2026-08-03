import axios from 'axios';
import { LoginCredentials } from '../types';

// URL base da API (usar variável de ambiente)
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Criação da instância do Axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para adicionar token de autenticação (Basic Auth)
api.interceptors.request.use(
  (config) => {
    const auth = localStorage.getItem('auth');
    if (auth) {
      const { username, password } = JSON.parse(auth);
      const token = btoa(`${username}:${password}`);
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para tratamento global de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Erro com resposta do servidor
      const { status, data } = error.response;
      if (status === 401) {
        // Não autorizado: limpar autenticação
        localStorage.removeItem('auth');
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }
      return Promise.reject({
        message: data?.message || 'Erro na requisição',
        status,
        data,
      });
    }
    return Promise.reject({ message: 'Erro de rede ou timeout' });
  }
);

// Função para definir as credenciais de autenticação
export const setAuth = (username: string, password: string) => {
  localStorage.setItem('auth', JSON.stringify({ username, password }));
  window.dispatchEvent(new CustomEvent('auth:login'));
};

// Função para limpar autenticação
export const clearAuth = () => {
  localStorage.removeItem('auth');
  window.dispatchEvent(new CustomEvent('auth:logout'));
};

// Função para verificar se está autenticado
export const isAuthenticated = (): boolean => {
  return localStorage.getItem('auth') !== null;
};

export default api;