import React from 'react';
import { useProductCard } from './useProductCard';
import type { UseProductCardProps } from './useProductCard';
import styles from './ProductCard.module.css';
import { ShoppingBag, Plus } from 'lucide-react';

export const ProductCard: React.FC<UseProductCardProps> = (props) => {
  const { product, categoryName } = props;
  const { isAdded, isLowStock, isOutOfStock, handleAdd } = useProductCard(props);

  return (
    <div className={`${styles.productCard} glass-panel ${isOutOfStock ? styles.disabled : ''}`}>
      <div className={styles.cardImageWrapper}>
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className={styles.productImage} loading="lazy" />
        ) : (
          <div className={styles.productImageFallback}>No Image</div>
        )}
        <div className={styles.categoryBadge}>{categoryName}</div>
        
        {isOutOfStock && <div className={`${styles.statusOverlay} ${styles.outOfStock}`}>Sold Out</div>}
        {isLowStock && <div className={`${styles.statusOverlay} ${styles.lowStock}`}>Only {product.stockQuantity} Left</div>}
      </div>

      <div className={styles.cardBody}>
        <h3 className={styles.productTitle} title={product.name}>{product.name}</h3>
        <p className={styles.productDescription}>{product.description}</p>
        
        <div className={styles.cardFooter}>
          <div className={styles.priceTag}>
            <span className={styles.currency}>$</span>
            <span className={styles.amount}>{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`btn ${styles.btnAdd} ${isAdded ? styles.added : ''}`}
          >
            {isAdded ? (
              <ShoppingBag size={16} />
            ) : (
              <>
                <Plus size={16} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
