export interface BaseAPIRequest<T> {
  data: T;
  requestId?: string;
  timestamp?: string;
}

export interface BaseAPIResponse<T> {
  isSuccess: boolean;
  statusCode: number;
  message?: string;
  data?: T;
  errors?: string[];
  timestamp?: string;
}

export interface LoginResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
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

export interface Category {
  id: number;
  name: string;
  description: string;
}

const API_BASE_URL = 'http://localhost:5132/api/v1';

// Pre-seeded local Mock Data for beautiful store showcase
export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Burgers & Sandwiches', description: 'Freshly grilled premium beef patties and crispy chicken burgers' },
  { id: 2, name: 'Artisan Pizzas', description: 'Fresh stone-baked crusts with gourmet toppings' },
  { id: 3, name: 'Healthy Salads', description: 'Crisp vegetables, seeds, and organic dressings' },
  { id: 4, name: 'Signature Desserts', description: 'Sweet delights, molten lava cakes, and cheesecakes' },
  { id: 5, name: 'Cold Beverages', description: 'Artisanal sodas, fresh juices, and milkshakes' },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 101,
    categoryId: 1,
    name: 'Glazed Truffle Beef Burger',
    description: 'Aged angus beef, caramelized onions, Swiss cheese, fresh arugula, and premium truffle mayo on a toasted brioche bun.',
    price: 14.99,
    stockQuantity: 15,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 102,
    categoryId: 1,
    name: 'Crispy Avocado Chicken Sandwich',
    description: 'Golden fried chicken breast, sliced avocado, butter lettuce, ripe tomato, and spicy chipotle aioli.',
    price: 12.49,
    stockQuantity: 8,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 201,
    categoryId: 2,
    name: 'Truffle Mushroom Pizza',
    description: 'White base pizza with wild porcini mushrooms, fresh mozzarella, truffle oil, and fresh parsley.',
    price: 18.99,
    stockQuantity: 10,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 202,
    categoryId: 2,
    name: 'Spicy Diablo Pepperoni Pizza',
    description: 'House tomato sauce, mozzarella, spicy Italian salami, jalapeno slices, chili flakes, and hot honey drizzle.',
    price: 16.99,
    stockQuantity: 12,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 301,
    categoryId: 3,
    name: 'Harvest Quinoa Salad',
    description: 'Fluffy quinoa, baby spinach, roasted sweet potato, dried cranberries, goat cheese, and apple cider vinaigrette.',
    price: 11.99,
    stockQuantity: 20,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 401,
    categoryId: 4,
    name: 'Molten Belgian Chocolate Cake',
    description: 'Rich chocolate cake with a warm, liquid dark chocolate core, served with a scoop of premium vanilla bean ice cream.',
    price: 8.99,
    stockQuantity: 6,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 501,
    categoryId: 5,
    name: 'Salted Caramel Milkshake',
    description: 'Double blended vanilla ice cream, house-made salted caramel sauce, whipped cream, and a pinch of pink Himalayan salt.',
    price: 6.49,
    stockQuantity: 25,
    isAvailable: true,
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&auto=format&fit=crop&q=80'
  }
];

export const apiService = {
  /**
   * Helper to make HTTP POST requests with wrapped request data
   */
  async post<TRequest, TResponse>(path: string, requestData: TRequest): Promise<BaseAPIResponse<TResponse>> {
    const payload: BaseAPIRequest<TRequest> = {
      data: requestData,
      requestId: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2),
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        let parsedError;
        try {
          parsedError = JSON.parse(errorText);
        } catch {
          // not JSON
        }
        throw new Error(parsedError?.message || `Server responded with status ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.warn(`API request to ${path} failed, falling back or handling:`, error);
      throw error;
    }
  },

  /**
   * Helper to make HTTP GET requests
   */
  async get<TResponse>(path: string): Promise<BaseAPIResponse<TResponse>> {
    try {
      const response = await fetch(`${API_BASE_URL}${path}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token') || ''}`
        }
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.warn(`API request to ${path} failed:`, error);
      throw error;
    }
  },

  /**
   * Fetch all categories
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await this.get<Category[]>('/products/categories');
      return response.data || MOCK_CATEGORIES;
    } catch {
      return MOCK_CATEGORIES;
    }
  },

  /**
   * Fetch all products
   */
  async getProducts(): Promise<Product[]> {
    try {
      // Direct call or mapped call
      const response = await this.get<Product[]>('/products');
      return response.data || MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  }
};
