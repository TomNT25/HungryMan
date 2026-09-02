import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export const useCartView = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryFee = totalPrice > 0 ? 3.99 : 0;
  const taxRate = 0.08;
  const taxAmount = totalPrice * taxRate;
  const grandTotal = Math.max(0, totalPrice - discount + deliveryFee + taxAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.toUpperCase() === 'HUNGRY5') {
      setDiscount(5.00);
      setCouponCode('');
    } else {
      alert('Invalid coupon code! Try "HUNGRY5" for $5.00 off.');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  return {
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    deliveryFee,
    taxAmount,
    discount,
    grandTotal,
    isCheckingOut,
    orderComplete,
    setOrderComplete,
    couponCode,
    setCouponCode,
    handleApplyCoupon,
    handleCheckout
  };
};
