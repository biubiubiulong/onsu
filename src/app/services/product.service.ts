// src/app/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { PaginatedProducts, Product, ProductImage } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products?: Product[];
  imageIndexMap = new Map<string, number>; // product id, index

  private apiUrl = "http://127.0.0.1:8000/api/products/";
  constructor(private http: HttpClient) {
    this.getProducts();
  }

  // api call, the list
  async getProducts(): Promise<Observable<PaginatedProducts>> {
    const results = this.http.get<PaginatedProducts>(this.apiUrl);
    this.products = (await firstValueFrom(results)).results
    return results;
  }

  // should be an api call
  async getProductById(id: string): Promise<Product | undefined> {
    return (await firstValueFrom(this.http.get<PaginatedProducts>(this.apiUrl))).results[0];
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
