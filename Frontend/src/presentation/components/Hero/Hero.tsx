import React from 'react';
import { useHero } from './useHero';
import type { UseHeroProps } from './useHero';
import styles from './Hero.module.css';
import { Search, Sparkles } from 'lucide-react';

export const Hero: React.FC<UseHeroProps> = (props) => {
  const {
    searchQuery,
    selectedCategoryId,
    categories,
    handleSearchInput,
    handleSelectCategory
  } = useHero(props);

  return (
    <section className={`${styles.heroContainer} animate-fade-in`}>
      <div className={styles.heroBadge}>
        <Sparkles size={14} className={styles.sparkleIcon} />
        <span>Clean Architecture Storefront</span>
      </div>
      
      <h1 className={styles.heroTitle}>
        Exquisite Dishes <br />
        Delivered To Your <span className={styles.gradientText}>Plate</span>
      </h1>
      
      <p className={styles.heroSubtitle}>
        Savor premium culinary delights curated by expert local chefs, connected seamlessly through our robust Clean Architecture framework.
      </p>

      <div className={`${styles.searchBarWrapper} glass-panel`}>
        <Search className={styles.searchIcon} size={20} />
        <input 
          type="text" 
          placeholder="Search for burger, pizza, salads..." 
          value={searchQuery}
          onChange={handleSearchInput}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categoryTags}>
        <button 
          onClick={() => handleSelectCategory(null)}
          className={`${styles.tagBtn} ${selectedCategoryId === null ? styles.active : ''}`}
        >
          All Menus
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleSelectCategory(cat.id)}
            className={`${styles.tagBtn} ${selectedCategoryId === cat.id ? styles.active : ''}`}
          >
            {cat.shortName}
          </button>
        ))}
      </div>
    </section>
  );
};
