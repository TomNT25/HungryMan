import React, { useState } from 'react';
import type { Product } from '../services/api';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  categoryName: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, categoryName }) => {
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

  return (
    <div className={`product-card glass-panel ${isOutOfStock ? 'disabled' : ''}`}>
      <div className="card-image-wrapper">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-image" loading="lazy" />
        ) : (
          <div className="product-image-fallback">No Image</div>
        )}
        <div className="category-badge">{categoryName}</div>
        
        {isOutOfStock && <div className="status-overlay out-of-stock">Sold Out</div>}
        {isLowStock && <div className="status-overlay low-stock">Only {product.stockQuantity} Left</div>}
      </div>

      <div className="card-body">
        <h3 className="product-title" title={product.name}>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="card-footer">
          <div className="price-tag">
            <span className="currency">$</span>
            <span className="amount">{product.price.toFixed(2)}</span>
          </div>

          <button
            onClick={handleAdd}
            disabled={isOutOfStock}
            className={`btn btn-add ${isAdded ? 'added' : ''}`}
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

      <style>{`
        .product-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          background: rgba(15, 20, 31, 0.45);
        }

        .product-card.disabled {
          opacity: 0.6;
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 180px;
          overflow: hidden;
        }

        .product-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .product-card:hover .product-image {
          transform: scale(1.08);
        }

        .product-image-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          color: var(--text-muted);
          font-weight: 600;
        }

        .category-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(15, 20, 31, 0.85);
          backdrop-filter: blur(4px);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.01em;
        }

        .status-overlay {
          position: absolute;
          bottom: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
        }

        .status-overlay.out-of-stock {
          background: var(--error);
          color: #fff;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
        }

        .status-overlay.low-stock {
          background: var(--warning);
          color: #0c0f16;
          box-shadow: 0 4px 10px rgba(245, 158, 11, 0.4);
        }

        .card-body {
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 16px;
        }

        .product-title {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 8px;
          color: var(--text-primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .product-description {
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 16px;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
          flex: 1;
        }

        .card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: auto;
        }

        .price-tag {
          display: flex;
          align-items: baseline;
          color: var(--text-primary);
        }

        .price-tag .currency {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-secondary);
          margin-right: 1px;
        }

        .price-tag .amount {
          font-size: 1.3rem;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
        }

        .btn-add {
          padding: 8px 16px;
          font-size: 0.85rem;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid var(--glass-border);
        }

        .btn-add:hover {
          background: var(--accent-gradient);
          color: #0c0f16;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(255, 95, 109, 0.2);
          transform: translateY(-1px);
        }

        .btn-add.added {
          background: var(--success);
          color: #fff;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};
