// src/app/models/product.model.ts


export enum OTHER {
  // more in the future
}

export enum OEMScanTool {
  TestLeadKit = 'test-lead-kit',
  ADAS = 'adas',
  Audi = 'audi',
  Porsche = 'porsche'
}

export const OEMScanToolLabel = new Map<OEMScanTool, string>([
  [OEMScanTool.TestLeadKit, 'Test Lead Kit'],
  [OEMScanTool.ADAS, 'ADAS'],
  [OEMScanTool.Audi, 'For Audi'],
  [OEMScanTool.Porsche, 'For Porsche']
])

export enum CategoryType {
  OEMScanTool = 'oem-scan-tool',
  Other = 'other'
}

export const CategoryTypeLabel = new Map<CategoryType, string>([
  [CategoryType.OEMScanTool, 'OEM Scan Tool']
])

export interface Category {
  id: number;
  name: CategoryType;
}

export interface Subcategory {
  id: number;
  name: SubcategoryName;
  category: Category;
}

export type SubcategoryName = OEMScanTool | OTHER;

export function buildProductUrl(type: CategoryType, sub: SubcategoryName): string {
  return `/products/${type}/${sub}`;
}

export interface ProductImage {
  id: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
  price_id: string;
  category: Category;
  subcategory?: Subcategory;
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
