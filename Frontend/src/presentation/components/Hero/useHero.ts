import type { Category } from '../../../core/domain/entities/Product';

export interface UseHeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategoryId: number | null;
  onSelectCategory: (id: number | null) => void;
  categories: Category[];
}

export const useHero = ({
  searchQuery,
  onSearchChange,
  selectedCategoryId,
  onSelectCategory,
  categories
}: UseHeroProps) => {
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleSelectCategory = (id: number | null) => {
    onSelectCategory(id);
  };

  const formattedCategories = categories.map((cat) => ({
    ...cat,
    shortName: cat.name.split(' ')[0]
  }));

  return {
    searchQuery,
    selectedCategoryId,
    categories: formattedCategories,
    handleSearchInput,
    handleSelectCategory
  };
};
