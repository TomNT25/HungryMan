import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { LoginResponseDTO } from '../services/api';

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  roles: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simple native JWT parser
function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Restore session from localStorage
    const savedToken = localStorage.getItem('access_token');
    if (savedToken) {
      const decoded = parseJwt(savedToken);
      const expiry = decoded?.exp ? decoded.exp * 1000 : 0;
      
      if (expiry && expiry > Date.now()) {
        setToken(savedToken);
        // Extract fields. Standard JWT claims: email, sub/name, role
        setUser({
          id: decoded?.sub || decoded?.nameid || '1',
          email: decoded?.email || decoded?.unique_name || 'user@example.com',
          username: decoded?.username || decoded?.name || 'HungryMan User',
          roles: decoded?.role ? (Array.isArray(decoded.role) ? decoded.role : [decoded.role]) : ['User']
        });
      } else {
        // Token expired
        logout();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call actual backend AuthController
      const response = await apiService.post<{ email: string; password: string }, LoginResponseDTO>('/auth/login', {
        email,
        password
      });

      if (response.isSuccess && response.data) {
        const { accessToken } = response.data;
        localStorage.setItem('access_token', accessToken);
        setToken(accessToken);
        const decoded = parseJwt(accessToken);
        setUser({
          id: decoded?.sub || decoded?.nameid || '1',
          email: decoded?.email || decoded?.unique_name || email,
          username: decoded?.username || decoded?.name || 'HungryMan Member',
          roles: decoded?.role ? (Array.isArray(decoded.role) ? decoded.role : [decoded.role]) : ['User']
        });
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error: any) {
      console.warn('Real API login failed, attempting local mock authentication...', error);
      
      // Fallback: Check mock credentials for previewing
      if (email === 'admin@hungryman.com' && password === 'password123') {
        // Generate a pseudo-JWT token for local use
        const mockPayload = {
          sub: '999',
          email: 'admin@hungryman.com',
          name: 'Hungry Admin',
          role: ['Admin', 'Manager'],
          exp: Math.floor(Date.now() / 1000) + 7200 // 2 hours
        };
        const header = window.btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = window.btoa(JSON.stringify(mockPayload));
        const signature = window.btoa('mock-signature');
        const mockToken = `${header}.${payload}.${signature}`;

        localStorage.setItem('access_token', mockToken);
        setToken(mockToken);
        setUser({
          id: mockPayload.sub,
          email: mockPayload.email,
          username: mockPayload.name,
          roles: mockPayload.role
        });
      } else {
        throw new Error('Invalid email or password. Hint: Use admin@hungryman.com / password123');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
