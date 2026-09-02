import { useState } from 'react';
import type { Product } from '../../../core/domain/entities/Product';
import { useCart } from '../../context/CartContext';

export interface UseProductCardProps {
  product: Product;
  categoryName: string;
}

export const useProductCard = ({ product }: UseProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (!product.isAvailable || product.stockQuantity <= 0) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const isOutOfStock = !product.isAvailable || product.stockQuantity <= 0;

  return {
    isAdded,
    isLowStock,
    isOutOfStock,
    handleAdd
  };
};
