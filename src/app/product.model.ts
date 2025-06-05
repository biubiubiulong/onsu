// src/app/models/product.model.ts

export interface Category {
  id: number;
  name: string;
}

export interface Subcategory {
  id: number;
  name: string;
  category: Category;
}

export interface ProductImage {
  id: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  category: Category;
  subcategory: Subcategory | null;
  is_active: boolean;
  created_at: string;
  images: ProductImage[];
}

// A new interface for the paginated response:
export interface PaginatedProducts {
  count: string;
  next: string | null;
  previous: string | null;
  results: Product[];   // the actual array lives under "results"
}
