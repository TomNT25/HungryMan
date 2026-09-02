import type { IProductRepository } from '../repositories/IProductRepository';
import type { Product, Category } from '../entities/Product';

export class GetCatalogUseCase {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async fetchCatalog(): Promise<{ categories: Category[]; products: Product[] }> {
    const [categories, products] = await Promise.all([
      this.productRepository.getCategories(),
      this.productRepository.getProducts()
    ]);
    return { categories, products };
  }

  filterProducts(
    products: Product[],
    searchQuery: string,
    selectedCategoryId: number | null
  ): Product[] {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((prod) => {
      const matchesSearch =
        !query ||
        prod.name.toLowerCase().includes(query) ||
        prod.description.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategoryId === null || prod.categoryId === selectedCategoryId;

      return matchesSearch && matchesCategory;
    });
  }
}
