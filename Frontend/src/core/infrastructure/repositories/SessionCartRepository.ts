import type { ICartRepository } from '../../domain/repositories/ICartRepository';
import type { CartItem } from '../../domain/entities/CartItem';

export class SessionCartRepository implements ICartRepository {
  private STORAGE_KEY = 'hungryman_cart';

  loadCart(): CartItem[] {
    const data = sessionStorage.getItem(this.STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data) as CartItem[];
    } catch {
      return [];
    }
  }

  saveCart(items: CartItem[]): void {
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
  }

  clearCart(): void {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }
}
