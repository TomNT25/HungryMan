export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  isAvailable: boolean;
  imageUrl?: string;
}
