import type { LoginRequest, LoginResponseDTO } from '../entities/AuthToken';
import type { UserProfile } from '../entities/User';

export interface IAuthRepository {
  login(request: LoginRequest): Promise<LoginResponseDTO>;
  getSavedToken(): string | null;
  saveToken(token: string): void;
  removeToken(): void;
  parseTokenToProfile(token: string): UserProfile | null;
}
