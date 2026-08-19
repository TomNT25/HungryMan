import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CheckCircle2, Ticket } from 'lucide-react';

export const CartView: React.FC = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const deliveryFee = totalPrice > 0 ? 3.99 : 0;
  const taxRate = 0.08; // 8% tax
  const taxAmount = totalPrice * taxRate;
  const grandTotal = totalPrice - discount + deliveryFee + taxAmount;

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
    // Simulate API processing delay
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderComplete(true);
      clearCart();
    }, 1500);
  };

  if (orderComplete) {
    return (
      <div className="cart-page-container">
        <div className="checkout-success-card glass-panel animate-fade-in">
          <CheckCircle2 size={56} className="success-icon" />
          <h2>Order Received!</h2>
          <p>
            Your gourmet meal request has been sent to our kitchen. 
            A driver will pick up your order shortly.
          </p>
          <div className="order-details-summary">
            <span className="order-id">Order ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
            <span className="estimated-time">ETA: 25 - 35 mins</span>
          </div>
          <Link to="/" className="btn btn-primary" onClick={() => setOrderComplete(false)}>
            Back to Storefront
          </Link>
        </div>
        <style>{`
          .cart-page-container {
            min-height: calc(100vh - 120px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
          }
          .checkout-success-card {
            width: 100%;
            max-width: 480px;
            padding: 40px 32px;
            text-align: center;
            background: rgba(15, 20, 31, 0.7);
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .success-icon {
            color: var(--success);
            margin-bottom: 20px;
            animation: float 2s infinite ease-in-out;
          }
          .checkout-success-card h2 {
            font-size: 1.8rem;
            margin-bottom: 12px;
          }
          .checkout-success-card p {
            color: var(--text-secondary);
            font-size: 0.95rem;
            line-height: 1.5;
            margin-bottom: 24px;
          }
          .order-details-summary {
            background: rgba(0, 0, 0, 0.25);
            border: 1px solid var(--glass-border);
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            flex-direction: column;
            gap: 6px;
            width: 100%;
            margin-bottom: 32px;
          }
          .order-id {
            font-size: 0.9rem;
            font-weight: 700;
            color: var(--accent-secondary);
          }
          .estimated-time {
            font-size: 0.85rem;
            color: var(--text-primary);
            font-weight: 600;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page-container">
      <div className="cart-content-wrapper max-width-layout">
        <Link to="/" className="btn-back-link">
          <ArrowLeft size={16} />
          <span>Continue Browsing</span>
        </Link>

        <h1 className="cart-title">Your Order Summary</h1>

        {items.length > 0 ? (
          <div className="cart-grid">
            {/* Cart Items List */}
            <div className="cart-items-section">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="cart-item-row glass-panel animate-fade-in">
                  <div className="item-img-container">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="item-img-fallback">Food</div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3>{product.name}</h3>
                    <p className="item-unit-price">${product.price.toFixed(2)} each</p>
                  </div>

                  <div className="item-quantity-controls">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="qty-btn"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="qty-value">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="qty-btn"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className="item-subtotal-price">
                    ${(product.price * quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="btn-remove-item"
                    title="Remove from cart"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Receipt Summary Card */}
            <div className="cart-summary-section">
              <div className="summary-card glass-panel">
                <h3>Order Total</h3>
                
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="summary-row discount">
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="summary-row">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Estimated Tax (8%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-row grand-total">
                    <span>Total Amount</span>
                    <span className="grand-total-amount">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleApplyCoupon} className="coupon-form">
                  <div className="coupon-input-wrapper">
                    <Ticket size={16} className="coupon-icon" />
                    <input
                      type="text"
                      placeholder="Promo Code (HUNGRY5)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="coupon-input"
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary btn-apply-coupon">
                    Apply
                  </button>
                </form>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="btn btn-primary btn-checkout-action"
                >
                  {isCheckingOut ? <div className="spinner"></div> : 'Confirm Order & Pay'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-cart-view glass-panel animate-fade-in">
            <ShoppingCart size={48} className="empty-cart-icon" />
            <h2>Your basket is empty</h2>
            <p>You haven't added any gourmet items to your order yet.</p>
            <Link to="/" className="btn btn-primary">
              View Menu & Order
            </Link>
          </div>
        )}
      </div>

      <style>{`
        .cart-page-container {
          padding: 24px;
          min-height: calc(100vh - 120px);
        }

        .cart-content-wrapper {
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
        }

        .btn-back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 24px;
        }

        .btn-back-link:hover {
          color: var(--accent-primary);
        }

        .cart-title {
          font-size: 2rem;
          margin-bottom: 32px;
        }

        .cart-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        .cart-items-section {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item-row {
          display: flex;
          align-items: center;
          padding: 16px;
          background: rgba(15, 20, 31, 0.4);
          gap: 20px;
        }

        .item-img-container {
          width: 80px;
          height: 80px;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-tertiary);
          flex-shrink: 0;
        }

        .item-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-img-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          font-weight: 700;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 1.05rem;
          margin-bottom: 4px;
        }

        .item-unit-price {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .item-quantity-controls {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 4px;
        }

        .qty-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 6px;
          transition: all var(--transition-fast);
        }

        .qty-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
        }

        .qty-value {
          width: 32px;
          text-align: center;
          font-size: 0.9rem;
          font-weight: 700;
        }

        .item-subtotal-price {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          width: 80px;
          text-align: right;
        }

        .btn-remove-item {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          transition: all var(--transition-fast);
        }

        .btn-remove-item:hover {
          color: var(--error);
          background: rgba(239, 68, 68, 0.08);
        }

        /* Summary Card */
        .summary-card {
          background: rgba(15, 20, 31, 0.65);
          padding: 24px;
        }

        .summary-card h3 {
          font-size: 1.25rem;
          margin-bottom: 20px;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 12px;
        }

        .summary-rows {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .summary-row.discount {
          color: var(--success);
          font-weight: 600;
        }

        .summary-divider {
          height: 1px;
          background: var(--glass-border);
          margin: 8px 0;
        }

        .summary-row.grand-total {
          color: var(--text-primary);
          font-weight: 700;
          align-items: baseline;
        }

        .grand-total-amount {
          font-size: 1.5rem;
          font-family: 'Outfit', sans-serif;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .coupon-form {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .coupon-input-wrapper {
          position: relative;
          flex: 1;
        }

        .coupon-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .coupon-input {
          width: 100%;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid var(--glass-border);
          padding: 10px 12px 10px 36px;
          border-radius: 10px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.85rem;
          outline: none;
        }

        .coupon-input:focus {
          border-color: var(--accent-secondary);
        }

        .btn-apply-coupon {
          padding: 10px 16px;
          font-size: 0.85rem;
          border-radius: 10px;
        }

        .btn-checkout-action {
          width: 100%;
          height: 48px;
          border-radius: 12px;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #fff;
          animation: spin 0.8s linear infinite;
        }

        /* Empty Cart State */
        .empty-cart-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 24px;
          text-align: center;
          max-width: 500px;
          margin: 40px auto;
        }

        .empty-cart-icon {
          color: var(--text-muted);
          margin-bottom: 24px;
        }

        .empty-cart-view h2 {
          font-size: 1.5rem;
          margin-bottom: 8px;
        }

        .empty-cart-view p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          margin-bottom: 28px;
          line-height: 1.5;
        }

        @media (max-width: 850px) {
          .cart-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};
