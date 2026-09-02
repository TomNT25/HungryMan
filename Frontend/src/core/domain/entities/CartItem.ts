import type { Product } from './Product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  taxAmount: number;
  discount: number;
  grandTotal: number;
}
