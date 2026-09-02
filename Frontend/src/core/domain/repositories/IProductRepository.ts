import type { Product, Category } from '../entities/Product';

export interface IProductRepository {
  getCategories(): Promise<Category[]>;
  getProducts(): Promise<Product[]>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
}
