import React from 'react';
import { useDashboard } from './useDashboard';
import styles from './DashboardView.module.css';
import { Hero } from '../../components/Hero';
import { ProductCard } from '../../components/ProductCard';
import { Info, RefreshCw } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const {
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredProducts,
    getCategoryName,
    clearFilters
  } = useDashboard();

  return (
    <div className={styles.dashboardViewContainer}>
      <Hero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={setSelectedCategoryId}
        categories={categories}
      />

      <div className={`${styles.dashboardContent} animate-fade-in`}>
        {loading ? (
          <div className={styles.dashboardLoaderContainer}>
            <RefreshCw size={28} className={styles.spinLoader} />
            <p>Gathering fresh ingredients...</p>
          </div>
        ) : (
          <>
            <div className={styles.catalogHeader}>
              <h2>
                {selectedCategoryId 
                  ? categories.find((c) => c.id === selectedCategoryId)?.name 
                  : 'Full Store Menu'}
              </h2>
              <span className={styles.resultsCount}>
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} available
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={styles.productsGrid}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={getCategoryName(product.categoryId)}
                  />
                ))}
              </div>
            ) : (
              <div className={`${styles.emptyResults} glass-panel`}>
                <Info size={32} className={styles.emptyIcon} />
                <h3>No dishes found</h3>
                <p>We couldn't find any dishes matching "{searchQuery}". Try typing another keyword or selecting a different category.</p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Clear Filters
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
