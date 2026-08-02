import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Para usar autenticação Basic Auth
export const setAuth = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  api.defaults.headers.common['Authorization'] = `Basic ${token}`;
};

export default api;