import type { Product, Category } from '../core/domain/entities/Product';
import type { LoginResponseDTO } from '../core/domain/entities/AuthToken';
import type { BaseAPIRequest, BaseAPIResponse } from '../core/infrastructure/http/HttpClient';
import { httpClient } from '../core/infrastructure/http/HttpClient';
import { ApiProductRepository } from '../core/infrastructure/repositories/ApiProductRepository';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '../core/infrastructure/mocks/MockStoreData';

export type { Product, Category, LoginResponseDTO, BaseAPIRequest, BaseAPIResponse };
export { MOCK_CATEGORIES, MOCK_PRODUCTS };

const productRepository = new ApiProductRepository(httpClient);

export const apiService = {
  post: httpClient.post.bind(httpClient),
  get: httpClient.get.bind(httpClient),
  getCategories: () => productRepository.getCategories(),
  getProducts: () => productRepository.getProducts()
};
