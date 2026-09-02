import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { UserProfile } from '../../core/domain/entities/User';
import { ApiAuthRepository } from '../../core/infrastructure/repositories/ApiAuthRepository';
import { httpClient } from '../../core/infrastructure/http/HttpClient';
import { LoginUseCase } from '../../core/domain/usecases/LoginUseCase';

export type { UserProfile };

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authRepository = useMemo(() => new ApiAuthRepository(httpClient), []);
  const loginUseCase = useMemo(() => new LoginUseCase(authRepository), [authRepository]);

  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const restored = loginUseCase.restoreSession();
    if (restored) {
      setToken(restored.token);
      setUser(restored.user);
    }
    setIsLoading(false);
  }, [loginUseCase]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await loginUseCase.execute({ email, password });
      setToken(result.token);
      setUser(result.user);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    loginUseCase.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
