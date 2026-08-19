import React from 'react';
import { Search, Sparkles } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  categories: Array<{ id: number; name: string }>;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onSelectCategory,
  categories
}) => {
  return (
    <section className="hero-container animate-fade-in">
      <div className="hero-badge">
        <Sparkles size={14} className="sparkle-icon" />
        <span>Premium Food Microservice Storefront</span>
      </div>
      
      <h1 className="hero-title">
        Exquisite Dishes <br />
        Delivered To Your <span className="gradient-text">Plate</span>
      </h1>
      
      <p className="hero-subtitle">
        Savor premium culinary delights curated by expert local chefs, connected seamlessly through our robust .NET backend database.
      </p>

      <div className="search-bar-wrapper glass-panel">
        <Search className="search-icon" size={20} />
        <input 
          type="text" 
          placeholder="Search for burger, pizza, salads..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-tags">
        <button 
          onClick={() => onSelectCategory(null)}
          className={`tag-btn ${selectedCategoryId === null ? 'active' : ''}`}
        >
          All Menus
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`tag-btn ${selectedCategoryId === cat.id ? 'active' : ''}`}
          >
            {cat.name.split(' ')[0]} {/* Shorten name for tag */}
          </button>
        ))}
      </div>

      <style>{`
        .hero-container {
          text-align: center;
          padding: 60px 24px 40px;
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hero-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 95, 109, 0.08);
          border: 1px solid rgba(255, 95, 109, 0.2);
          color: var(--accent-primary);
          padding: 6px 14px;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 24px;
          letter-spacing: 0.02em;
        }

        .sparkle-icon {
          animation: float 2s infinite ease-in-out;
        }

        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 16px;
        }

        .gradient-text {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-subtitle {
          color: var(--text-secondary);
          font-size: 1.1rem;
          margin-bottom: 32px;
          max-width: 600px;
          line-height: 1.6;
        }

        .search-bar-wrapper {
          display: flex;
          align-items: center;
          width: 100%;
          max-width: 540px;
          padding: 6px 16px;
          border-radius: 9999px;
          background: rgba(15, 20, 31, 0.5);
          margin-bottom: 32px;
        }

        .search-icon {
          color: var(--text-muted);
          margin-right: 12px;
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          padding: 10px 0;
          font-family: inherit;
          font-size: 1rem;
          outline: none;
        }

        .search-input::placeholder {
          color: var(--text-muted);
        }

        .category-tags {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .tag-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 8px 18px;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .tag-btn:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
        }

        .tag-btn.active {
          background: var(--accent-gradient);
          color: #0c0f16;
          border-color: transparent;
          box-shadow: 0 4px 12px rgba(255, 95, 109, 0.2);
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.6rem;
          }
          .hero-subtitle {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};
