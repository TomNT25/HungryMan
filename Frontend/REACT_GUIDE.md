# ⚛️ Comprehensive React & Frontend Architecture Guide

Welcome to the definitive guide for mastering **React 19**, **TypeScript**, and **Clean Architecture Frontend Development**. This guide covers core fundamentals, basic concepts, advanced patterns, and enterprise architectural principles using real-world examples from the **HungryMan Storefront**.

---

## 📌 Table of Contents
1. [Core Fundamentals of React](#1-core-fundamentals-of-react)
2. [Basic Concepts & React Hooks](#2-basic-concepts--react-hooks)
3. [Advanced Concepts & React Design Patterns](#3-advanced-concepts--react-design-patterns)
4. [Clean Architecture in React Frontend](#4-clean-architecture-in-react-frontend)
5. [The Component Triplet Pattern (HTML, CSS, JS Separation)](#5-the-component-triplet-pattern-html-css-js-separation)
6. [Best Practices & Performance Checklist](#6-best-practices--performance-checklist)

---

## 🏛️ 1. Core Fundamentals of React

### 1.1 Declarative vs. Imperative Programming
Traditional JavaScript (DOM manipulation) is **Imperative**: you tell the browser step-by-step *how* to modify DOM elements.

React is **Declarative**: you describe *what* the UI should look like for a given state, and React handles DOM updates automatically.

```javascript
// ❌ IMPERATIVE (Traditional DOM Manipulation)
const button = document.createElement('button');
button.innerText = 'Cart (0)';
button.addEventListener('click', () => {
  count++;
  button.innerText = `Cart (${count})`;
});
document.body.appendChild(button);

// ✅ DECLARATIVE (React Approach)
const CartButton = ({ count }) => {
  return <button>Cart ({count})</button>;
};
```

---

### 1.2 Virtual DOM & Reconciliation
Updating the real browser DOM is slow. React uses a **Virtual DOM (VDOM)**—a lightweight, in-memory representation of the DOM tree.

```
       State/Props Change
               │
               ▼
   1. Create New Virtual DOM Tree
               │
               ▼
   2. Diffing (Compare New VDOM vs Old VDOM)
               │
               ▼
   3. Reconciliation (Commit Minimal Changes to Real DOM)
```

1. **Render Phase**: React calls your component functions to construct a new Virtual DOM tree.
2. **Diffing Phase**: React calculates differences between the new Virtual DOM and the previous Virtual DOM tree.
3. **Commit Phase**: React applies *only* the modified nodes to the real browser DOM.

---

### 1.3 JSX / TSX (JavaScript/TypeScript XML)
JSX is a syntax extension for JavaScript that looks similar to HTML. Under the hood, build tools like Vite transform JSX into standard JavaScript function calls.

```tsx
// JSX Syntax
const element = <h1 className="title">Hello {user.name}</h1>;

// Compiled JavaScript (React 18+)
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", { className: "title", children: ["Hello ", user.name] });
```

---

## 🛠️ 2. Basic Concepts & React Hooks

### 2.1 Components & Props
Components are reusable functions that accept input objects called **Props** (Properties) and return JSX elements. Props are **read-only (immutable)**.

```tsx
interface ProductCardProps {
  name: string;
  price: number;
  isAvailable: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ name, price, isAvailable }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <span className={isAvailable ? 'badge-in-stock' : 'badge-out-of-stock'}>
        {isAvailable ? 'In Stock' : 'Sold Out'}
      </span>
    </div>
  );
};
```

---

### 2.2 Component State (`useState`)
State allows a component to remember data between renders and update dynamically based on user interactions.

```tsx
import React, { useState } from 'react';

export const Counter: React.FC = () => {
  // useState returns [currentValue, updaterFunction]
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1); // Functional state update
  };

  return (
    <div>
      <p>Quantity: {quantity}</p>
      <button onClick={handleIncrement}>Increase</button>
    </div>
  );
};
```

---

### 2.3 Side Effects (`useEffect`)
`useEffect` lets you perform side effects in functional components, such as fetching network data, subscribing to browser events, or setting timers.

```tsx
import React, { useState, useEffect } from 'react';

export const ProductList: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      const response = await fetch('/api/v1/products');
      const data = await response.json();
      if (isMounted) {
        setProducts(data);
        setLoading(false);
      }
    }

    loadData();

    // Cleanup function executed when component unmounts
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array = Runs once on mount

  if (loading) return <div>Loading menu...</div>;

  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
};
```

---

### 2.4 Lists & Keys
When rendering lists using `.map()`, React requires a unique `key` prop on the root item to track additions, deletions, and reorders efficiently.

```tsx
// ✅ Always use a unique identifier (ID) as the key
{categories.map((cat) => (
  <button key={cat.id} className="category-tag">
    {cat.name}
  </button>
))}
```

---

## ⚡ 3. Advanced Concepts & React Design Patterns

### 3.1 Custom Hooks Pattern
Custom hooks extract state management and side effects out of component templates into standalone functions. Any function starting with `use` can call other React hooks.

```typescript
// useCatalog.ts - Custom Hook
import { useState, useEffect, useMemo } from 'react';
import type { Product } from '../entities/Product';

export const useCatalog = (initialSearch: string = '') => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/v1/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); });
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  return { searchQuery, setSearchQuery, filteredProducts, loading };
};
```

---

### 3.2 Context API & Global State (`createContext` + `useContext`)
The Context API provides global state across the component tree without passing props through intermediate components ("Prop-Drilling").

```tsx
// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';
import type { CartItem } from '../entities/CartItem';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (newItem: CartItem) => {
    setItems(prev => [...prev, newItem]);
  };

  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
```

---

### 3.3 Performance Optimization Techniques

| Hook / API | Purpose | Use Case Example |
| :--- | :--- | :--- |
| `useMemo` | Caches the **computed value** of an expensive calculation. | Filtering and sorting a 1,000-item dish menu based on multiple criteria. |
| `useCallback` | Caches a **function instance** between re-renders. | Passing event handler callbacks to memoized child components. |
| `React.memo` | Prevents component re-renders if its `props` haven't changed. | Pure presentation components like `<ProductCard />` or `<Navbar />`. |

```tsx
// useMemo Example
const calculatedSummary = useMemo(() => {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const delivery = subtotal > 0 ? 3.99 : 0;
  return { subtotal, tax, grandTotal: subtotal + tax + delivery };
}, [items]);
```

---

## 🏛️ 4. Clean Architecture in React Frontend

Clean Architecture decouples core business logic from framework rendering layers.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│      React Views, Components, Contexts, CSS Modules         │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Invokes Use Cases)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     APPLICATION LAYER                       │
│    Use Cases (GetCatalogUseCase, ManageCartUseCase, Login)  │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Operates on Entities & Repositories)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CORE DOMAIN LAYER                       │
│     Domain Entities (Product, User), Repository Contracts   │
└──────────────────────────────▲──────────────────────────────┘
                               │ (Implements Interfaces)
┌──────────────────────────────┴──────────────────────────────┐
│                    INFRASTRUCTURE LAYER                     │
│    REST API Adapters (HttpClient), Storage, Mock Data       │
└─────────────────────────────────────────────────────────────┘
```

### Key Clean Architecture Rules:
1. **Domain Entities (`core/domain/entities`)**: Pure TypeScript types with zero dependencies on React or browser APIs.
2. **Repository Interfaces (`core/domain/repositories`)**: Abstractions defining what data operations exist (e.g., `IProductRepository.ts`).
3. **Use Cases (`core/domain/usecases`)**: Pure business logic (e.g., cart promo code validation, catalog filtering logic).
4. **Infrastructure (`core/infrastructure`)**: HTTP clients, API repositories, and Web Storage adapters.
5. **Presentation (`presentation`)**: UI components, React hooks, and CSS modules.

---

## 🧩 5. The Component Triplet Pattern (HTML, CSS, JS Separation)

To maintain maximum maintainability and separation of concerns, every UI component and view is organized into a **3-file component triplet**:

```
src/presentation/components/ProductCard/
├── useProductCard.ts           <-- 1. JS / TS Logic (Custom Hook)
├── ProductCard.module.css      <-- 2. CSS Styles (Scoped CSS Module)
├── ProductCard.tsx             <-- 3. HTML / JSX (Pure View Template)
└── index.ts                    <-- 4. Component Barrel Export
```

### File 1: `useProductCard.ts` (JS / TS Logic)
```typescript
import { useState } from 'react';
import type { Product } from '../../../core/domain/entities/Product';
import { useCart } from '../../context/CartContext';

export interface UseProductCardProps {
  product: Product;
  categoryName: string;
}

export const useProductCard = ({ product }: UseProductCardProps) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    if (!product.isAvailable || product.stockQuantity <= 0) return;
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 800);
  };

  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 5;
  const isOutOfStock = !product.isAvailable || product.stockQuantity <= 0;

  return { isAdded, isLowStock, isOutOfStock, handleAdd };
};
```

### File 2: `ProductCard.module.css` (CSS Styles)
```css
.productCard {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: rgba(15, 20, 31, 0.45);
  border-radius: 16px;
  overflow: hidden;
}

.productTitle {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.btnAdd {
  padding: 8px 16px;
  border-radius: 10px;
  background: var(--accent-gradient);
}
```

### File 3: `ProductCard.tsx` (HTML / JSX View)
```tsx
import React from 'react';
import { useProductCard } from './useProductCard';
import type { UseProductCardProps } from './useProductCard';
import styles from './ProductCard.module.css';
import { Plus, ShoppingBag } from 'lucide-react';

export const ProductCard: React.FC<UseProductCardProps> = (props) => {
  const { product, categoryName } = props;
  const { isAdded, isLowStock, isOutOfStock, handleAdd } = useProductCard(props);

  return (
    <div className={`${styles.productCard} glass-panel`}>
      <div className={styles.cardBody}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <span className={styles.categoryBadge}>{categoryName}</span>

        <button
          onClick={handleAdd}
          disabled={isOutOfStock}
          className={`btn ${styles.btnAdd} ${isAdded ? styles.added : ''}`}
        >
          {isAdded ? <ShoppingBag size={16} /> : <Plus size={16} />}
        </button>
      </div>
    </div>
  );
};
```

---

## 📋 6. Best Practices & Performance Checklist

- [x] **Always Use Unique Keys**: Use unique IDs (not index numbers) for `.map()` lists.
- [x] **Keep Components Small**: Single-responsibility principle—break complex views into smaller components.
- [x] **Separate Logic from UI**: Extract state and side effects into custom hooks (`useComponent.ts`).
- [x] **Avoid Inline Style Blocks**: Use CSS Modules (`.module.css`) for scoped component styles.
- [x] **Use Explicit Type Imports**: When `verbatimModuleSyntax` is enabled in `tsconfig.json`, use `import type { Model }`.
- [x] **Clean Up Effects**: Always return cleanup handlers in `useEffect` when setting up timers or subscriptions.
- [x] **Memoize Expensive Logic**: Use `useMemo` for heavy data filtering or mathematical summaries.

---

*Document version: 1.0.0 — Comprehensive React & Frontend Architecture Guide for HungryMan.*
