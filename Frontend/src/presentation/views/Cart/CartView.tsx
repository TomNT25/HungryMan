import React from 'react';
import { Link } from 'react-router-dom';
import { useCartView } from './useCartView';
import styles from './CartView.module.css';
import { ShoppingCart, Plus, Minus, Trash2, ArrowLeft, CheckCircle2, Ticket } from 'lucide-react';

export const CartView: React.FC = () => {
  const {
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
  } = useCartView();

  if (orderComplete) {
    return (
      <div className={styles.cartPageContainer}>
        <div className={`${styles.checkoutSuccessCard} glass-panel animate-fade-in`}>
          <CheckCircle2 size={56} className={styles.successIcon} />
          <h2>Order Received!</h2>
          <p>
            Your gourmet meal request has been sent to our kitchen. 
            A driver will pick up your order shortly.
          </p>
          <div className={styles.orderDetailsSummary}>
            <span className={styles.orderId}>Order ID: #{Math.floor(100000 + Math.random() * 900000)}</span>
            <span className={styles.estimatedTime}>ETA: 25 - 35 mins</span>
          </div>
          <Link to="/" className="btn btn-primary" onClick={() => setOrderComplete(false)}>
            Back to Storefront
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPageContainer}>
      <div className={styles.cartContentWrapper}>
        <Link to="/" className={styles.btnBackLink}>
          <ArrowLeft size={16} />
          <span>Continue Browsing</span>
        </Link>

        <h1 className={styles.cartTitle}>Your Order Summary</h1>

        {items.length > 0 ? (
          <div className={styles.cartGrid}>
            <div className={styles.cartItemsSection}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className={`${styles.cartItemRow} glass-panel animate-fade-in`}>
                  <div className={styles.itemImgContainer}>
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className={styles.itemImgFallback}>Food</div>
                    )}
                  </div>

                  <div className={styles.itemDetails}>
                    <h3>{product.name}</h3>
                    <p className={styles.itemUnitPrice}>${product.price.toFixed(2)} each</p>
                  </div>

                  <div className={styles.itemQuantityControls}>
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className={styles.qtyBtn}
                    >
                      <Minus size={14} />
                    </button>
                    <span className={styles.qtyValue}>{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className={styles.qtyBtn}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <div className={styles.itemSubtotalPrice}>
                    ${(product.price * quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className={styles.btnRemoveItem}
                    title="Remove from cart"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummarySection}>
              <div className={`${styles.summaryCard} glass-panel`}>
                <h3>Order Total</h3>
                
                <div className={styles.summaryRows}>
                  <div className={styles.summaryRow}>
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                    <div className={`${styles.summaryRow} ${styles.discount}`}>
                      <span>Promo Discount</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className={styles.summaryRow}>
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryRow}>
                    <span>Estimated Tax (8%)</span>
                    <span>${taxAmount.toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryDivider}></div>
                  <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                    <span>Total Amount</span>
                    <span className={styles.grandTotalAmount}>${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                <form onSubmit={handleApplyCoupon} className={styles.couponForm}>
                  <div className={styles.couponInputWrapper}>
                    <Ticket size={16} className={styles.couponIcon} />
                    <input
                      type="text"
                      placeholder="Promo Code (HUNGRY5)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className={styles.couponInput}
                    />
                  </div>
                  <button type="submit" className={`btn btn-secondary ${styles.btnApplyCoupon}`}>
                    Apply
                  </button>
                </form>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className={`btn btn-primary ${styles.btnCheckoutAction}`}
                >
                  {isCheckingOut ? <div className={styles.spinner}></div> : 'Confirm Order & Pay'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className={`${styles.emptyCartView} glass-panel animate-fade-in`}>
            <ShoppingCart size={48} className={styles.emptyCartIcon} />
            <h2>Your basket is empty</h2>
            <p>You haven't added any gourmet items to your order yet.</p>
            <Link to="/" className="btn btn-primary">
              View Menu & Order
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
