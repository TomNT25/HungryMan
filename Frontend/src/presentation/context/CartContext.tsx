import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { Product } from '../../core/domain/entities/Product';
import type { CartItem } from '../../core/domain/entities/CartItem';
import { SessionCartRepository } from '../../core/infrastructure/repositories/SessionCartRepository';
import { ManageCartUseCase } from '../../core/domain/usecases/ManageCartUseCase';

export type { CartItem };

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const cartRepo = useMemo(() => new SessionCartRepository(), []);
  const cartUseCase = useMemo(() => new ManageCartUseCase(cartRepo), [cartRepo]);

  const [items, setItems] = useState<CartItem[]>(() => cartUseCase.getInitialCart());

  useEffect(() => {
    cartUseCase.saveCart(items);
  }, [items, cartUseCase]);

  const addToCart = (product: Product) => {
    setItems((prev) => cartUseCase.addItem(prev, product));
  };

  const removeFromCart = (productId: number) => {
    setItems((prev) => cartUseCase.removeItem(prev, productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setItems((prev) => cartUseCase.updateQuantity(prev, productId, quantity));
  };

  const clearCart = () => {
    cartUseCase.clearCart();
    setItems([]);
  };

  const summary = useMemo(() => cartUseCase.calculateSummary(items), [items, cartUseCase]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems: summary.totalItems,
        totalPrice: summary.subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
