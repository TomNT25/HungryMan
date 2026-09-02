import type { CartItem, CartSummary } from '../entities/CartItem';
import type { Product } from '../entities/Product';
import type { ICartRepository } from '../repositories/ICartRepository';

export class ManageCartUseCase {
  private cartRepository: ICartRepository;

  constructor(cartRepository: ICartRepository) {
    this.cartRepository = cartRepository;
  }

  getInitialCart(): CartItem[] {
    return this.cartRepository.loadCart();
  }

  saveCart(items: CartItem[]): void {
    this.cartRepository.saveCart(items);
  }

  addItem(items: CartItem[], product: Product): CartItem[] {
    const existingIndex = items.findIndex((i) => i.product.id === product.id);
    if (existingIndex >= 0) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + 1
      };
      return updated;
    }
    return [...items, { product, quantity: 1 }];
  }

  updateQuantity(items: CartItem[], productId: number, quantity: number): CartItem[] {
    if (quantity <= 0) {
      return this.removeItem(items, productId);
    }
    return items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
  }

  removeItem(items: CartItem[], productId: number): CartItem[] {
    return items.filter((item) => item.product.id !== productId);
  }

  clearCart(): void {
    this.cartRepository.clearCart();
  }

  calculateSummary(items: CartItem[], discount: number = 0): CartSummary {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryFee = subtotal > 0 ? 3.99 : 0;
    const taxRate = 0.08;
    const taxAmount = subtotal * taxRate;
    const grandTotal = Math.max(0, subtotal - discount + deliveryFee + taxAmount);

    return {
      items,
      totalItems,
      subtotal,
      deliveryFee,
      taxAmount,
      discount,
      grandTotal
    };
  }
}
