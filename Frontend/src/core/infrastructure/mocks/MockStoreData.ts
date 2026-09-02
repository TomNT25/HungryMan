import type { Category, Product } from '../../domain/entities/Product';

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
