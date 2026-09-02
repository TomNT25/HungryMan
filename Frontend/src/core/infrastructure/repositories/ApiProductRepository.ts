import type { IProductRepository } from '../../domain/repositories/IProductRepository';
import type { Product, Category } from '../../domain/entities/Product';
import { HttpClient } from '../http/HttpClient';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../mocks/MockStoreData';

export class ApiProductRepository implements IProductRepository {
  private httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.httpClient.get<Category[]>('/products/categories');
      return response.data && response.data.length > 0 ? response.data : MOCK_CATEGORIES;
    } catch {
      return MOCK_CATEGORIES;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.httpClient.get<Product[]>('/products');
      return response.data && response.data.length > 0 ? response.data : MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const allProducts = await this.getProducts();
    return allProducts.filter((p) => p.categoryId === categoryId);
  }
}
