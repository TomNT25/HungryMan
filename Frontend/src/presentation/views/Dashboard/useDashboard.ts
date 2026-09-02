import { useState, useEffect, useMemo } from 'react';
import type { Product, Category } from '../../../core/domain/entities/Product';
import { ApiProductRepository } from '../../../core/infrastructure/repositories/ApiProductRepository';
import { httpClient } from '../../../core/infrastructure/http/HttpClient';
import { GetCatalogUseCase } from '../../../core/domain/usecases/GetCatalogUseCase';

export const useDashboard = () => {
  const productRepo = useMemo(() => new ApiProductRepository(httpClient), []);
  const getCatalogUseCase = useMemo(() => new GetCatalogUseCase(productRepo), [productRepo]);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const catalog = await getCatalogUseCase.fetchCatalog();
      setCategories(catalog.categories);
      setProducts(catalog.products);
    } catch (err) {
      console.error('Failed to load menu catalog:', err);
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

  const filteredProducts = useMemo(() => {
    return getCatalogUseCase.filterProducts(products, searchQuery, selectedCategoryId);
  }, [getCatalogUseCase, products, searchQuery, selectedCategoryId]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategoryId(null);
  };

  return {
    categories,
    loading,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    filteredProducts,
    getCategoryName,
    clearFilters
  };
};
