import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { Product, Category } from '../services/api';
import { Hero } from '../components/Hero';
import { ProductCard } from '../components/ProductCard';
import { Info, RefreshCw } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, prods] = await Promise.all([
        apiService.getCategories(),
        apiService.getProducts()
      ]);
      setCategories(cats);
      setProducts(prods);
    } catch (err) {
      console.error('Failed to load menu data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getCategoryName = (catId: number): string => {
    const found = categories.find((c) => c.id === catId);
    return found ? found.name : 'Food';
  };

  // Filter products based on search query and selected category
  const filteredProducts = products.filter((prod) => {
    const matchesSearch = 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategoryId === null || prod.categoryId === selectedCategoryId;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="dashboard-view-container">
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        categories={categories}
      />

      <div className="dashboard-content animate-fade-in">
        {loading ? (
          <div className="dashboard-loader-container">
            <RefreshCw size={28} className="spin-loader" />
            <p>Gathering fresh ingredients...</p>
          </div>
        ) : (
          <>
            <div className="catalog-header">
              <h2>
                {selectedCategoryId 
                  ? categories.find((c) => c.id === selectedCategoryId)?.name 
                  : 'Full Store Menu'}
              </h2>
              <span className="results-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-results glass-panel">
                <Info size={32} className="empty-icon" />
                <h3>No dishes found</h3>
                <p>We couldn't find any dishes matching "{searchQuery}". Try typing another keyword or selecting a different category.</p>
                <button onClick={() => { setSearchQuery(''); setSelectedCategoryId(null); }} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        .dashboard-view-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px 60px;
          width: 100%;
        }

        .dashboard-content {
          margin-top: 24px;
        }

        .dashboard-loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
          color: var(--text-secondary);
        }

        .spin-loader {
          color: var(--accent-primary);
          animation: spin 1.2s linear infinite;
        }

        .catalog-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 12px;
          margin-bottom: 24px;
        }

        .catalog-header h2 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .results-count {
          font-size: 0.85rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
        }

        .empty-results {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 24px;
          text-align: center;
          background: rgba(15, 20, 31, 0.4);
          max-width: 500px;
          margin: 40px auto;
        }

        .empty-icon {
          color: var(--accent-secondary);
          margin-bottom: 16px;
        }

        .empty-results h3 {
          font-size: 1.25rem;
          margin-bottom: 8px;
        }

        .empty-results p {
          font-size: 0.88rem;
          color: var(--text-secondary);
          margin-bottom: 24px;
          max-width: 380px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
};
