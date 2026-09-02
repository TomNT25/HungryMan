import type { IAuthRepository } from '../../domain/repositories/IAuthRepository';
import type { LoginRequest, LoginResponseDTO } from '../../domain/entities/AuthToken';
import type { UserProfile, JwtClaims } from '../../domain/entities/User';
import { HttpClient } from '../http/HttpClient';

function parseJwt(token: string): JwtClaims | null {
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
  } catch {
    return null;
  }
}

export class ApiAuthRepository implements IAuthRepository {
  private STORAGE_KEY = 'access_token';
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async login(request: LoginRequest): Promise<LoginResponseDTO> {
    try {
      const response = await this.httpClient.post<LoginRequest, LoginResponseDTO>('/auth/login', request);
      if (response.isSuccess && response.data) {
        return response.data;
      }
      throw new Error(response.message || 'Authentication failed');
    } catch (error: unknown) {
      console.warn('Real API login failed or backend unreachable. Attempting local mock authentication fallback...', error);
      
      if (request.email === 'admin@hungryman.com' && request.password === 'password123') {
        const mockPayload: JwtClaims = {
          sub: '999',
          email: 'admin@hungryman.com',
          name: 'Hungry Admin',
          role: ['Admin', 'Manager'],
          exp: Math.floor(Date.now() / 1000) + 7200
        };

        const header = window.btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = window.btoa(JSON.stringify(mockPayload));
        const signature = window.btoa('mock-signature');
        const mockToken = `${header}.${payload}.${signature}`;

        return {
          accessToken: mockToken,
          refreshToken: 'mock-refresh-token',
          expiresIn: 7200
        };
      }

      throw new Error('Invalid email or password. Hint: Use admin@hungryman.com / password123');
    }
  }

  getSavedToken(): string | null {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return null;

    const claims = parseJwt(token);
    const expiry = claims?.exp ? claims.exp * 1000 : 0;
    if (expiry && expiry <= Date.now()) {
      this.removeToken();
      return null;
    }
    return token;
  }

  saveToken(token: string): void {
    localStorage.setItem(this.STORAGE_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  parseTokenToProfile(token: string): UserProfile | null {
    const claims = parseJwt(token);
    if (!claims) return null;

    const rolesRaw = claims.role;
    const roles = rolesRaw ? (Array.isArray(rolesRaw) ? rolesRaw : [rolesRaw]) : ['User'];

    return {
      id: claims.sub || claims.nameid || '1',
      email: claims.email || claims.unique_name || 'user@example.com',
      username: claims.username || claims.name || 'HungryMan User',
      roles
    };
  }
}
