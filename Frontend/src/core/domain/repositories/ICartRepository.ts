import type { CartItem } from '../entities/CartItem';

export interface ICartRepository {
  loadCart(): CartItem[];
  saveCart(items: CartItem[]): void;
  clearCart(): void;
}
