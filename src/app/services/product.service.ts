// src/app/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { PaginatedProducts, Product } from '../product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = "http://127.0.0.1:8000/api/products/";
  constructor(private http: HttpClient) {}

  // api call, the list
  getProducts(): Observable<PaginatedProducts> {
    return this.http.get<PaginatedProducts>(this.apiUrl);
  }

  // should be an api call
  async getProductById(id: string): Promise<Product | undefined> {
    return (await firstValueFrom(this.http.get<PaginatedProducts>(this.apiUrl))).results[0];
  }
}
