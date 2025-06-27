// src/app/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { PaginatedProducts, Product, ProductImage, SubcategoryName } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products?: Product[];
  imageIndexMap = new Map<string, number>; // product id, index

  private apiUrl = "http://127.0.0.1:8000/api/products/";
  constructor(private http: HttpClient) {
    this.getProducts();
  }

  // api call, the list
  async getProducts(): Promise<PaginatedProducts> {
    const paginated =  await firstValueFrom(this.http.get<PaginatedProducts>(this.apiUrl));
    this.products = paginated.results
    return paginated;
  }

  // should be an api call
  async getProductById(id: string): Promise<Product | undefined> {
    return (await firstValueFrom(this.http.get<Product>(`${this.apiUrl}${id}/`)));
  }

  async getProductByCategory(category: number, subcategory?: SubcategoryName): Promise<PaginatedProducts | undefined> {
    try {
      let url = `${this.apiUrl}category/${category}/`;

      if (subcategory) {
        url += `subcategory/${subcategory}/`;
      }

      const paginated = await firstValueFrom(this.http.get<PaginatedProducts>(url));
      this.products = paginated.results
      return paginated;
    } catch(error) {
      console.error('Failed to fetch products by category:', error);
      return undefined;
    }
  }
  
  // ========== Image carousel logic (unchanged) ==========
  prevImage(id: string): void {
    const product = this.products?.find(p => p.id === id)
    if (!product) return;

    const len = product.images.length;
    const currentImageIndex = this.imageIndexMap.get(id) || 0;
    this.imageIndexMap.set(id, (currentImageIndex - 1 + len) % len)
  }

  nextImage(id: string): void {
    const product = this.products?.find(p => p.id === id)
    if (!product) return;

    const len = product.images.length;
    const currentImageIndex = this.imageIndexMap.get(id) || 0;
    this.imageIndexMap.set(id, (currentImageIndex + 1) % len)
  }

  goToImage(id: string, image: ProductImage): void {
    const product = this.products?.find(p => p.id === id)
    if (!product) return;

    this.imageIndexMap.set(id, product.images.findIndex((img) => img.id === image.id))
  }

  getCurrentImage(id: string) {
    const product = this.products?.find(p => p.id === id)
    const currentImageIndex = this.imageIndexMap.get(id);
    
    if (!product) return;
    return product.images[currentImageIndex || 0];
  }
}
