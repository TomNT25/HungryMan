import type { IAuthRepository } from '../repositories/IAuthRepository';
import type { UserProfile } from '../entities/User';
import type { LoginRequest } from '../entities/AuthToken';

export class LoginUseCase {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(request: LoginRequest): Promise<{ token: string; user: UserProfile }> {
    const response = await this.authRepository.login(request);
    const token = response.accessToken;
    this.authRepository.saveToken(token);

    const user = this.authRepository.parseTokenToProfile(token);
    if (!user) {
      throw new Error('Failed to decode user profile from session token.');
    }

    return { token, user };
  }

  restoreSession(): { token: string; user: UserProfile } | null {
    const savedToken = this.authRepository.getSavedToken();
    if (!savedToken) return null;

    const user = this.authRepository.parseTokenToProfile(savedToken);
    if (!user) {
      this.authRepository.removeToken();
      return null;
    }

    return { token: savedToken, user };
  }

  logout(): void {
    this.authRepository.removeToken();
  }
}
