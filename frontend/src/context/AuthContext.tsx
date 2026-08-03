import React, { createContext, useContext, useState, useEffect } from 'react';
import api, { setAuth } from '../api/api';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  username: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  // Verificar se já há credenciais salvas no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    const storedPass = localStorage.getItem('auth_pass');
    if (storedUser && storedPass) {
      setAuth(storedUser, storedPass);
      // Testar autenticação com um endpoint protegido
      api
        .get('/admin/dashboard/resumo')
        .then(() => {
          setIsAuthenticated(true);
          setUsername(storedUser);
        })
        .catch(() => {
          localStorage.removeItem('auth_user');
          localStorage.removeItem('auth_pass');
        });
    }
  }, []);

  const login = async (user: string, pass: string) => {
    setAuth(user, pass);
    try {
      await api.get('/admin/dashboard/resumo');
      setIsAuthenticated(true);
      setUsername(user);
      localStorage.setItem('auth_user', user);
      localStorage.setItem('auth_pass', pass);
      return true;
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsername(null);
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_pass');
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};