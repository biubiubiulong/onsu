// src/app/services/cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  // Expose a BehaviorSubject that holds the current total quantity
  private totalQuantitySubject = new BehaviorSubject<number>(0);
  totalQuantity$: Observable<number> = this.totalQuantitySubject.asObservable();

  constructor() {}

  /** Adds `quantity` of `product` to the cart (or increments if already present). */
  addToCart(product: Product, quantity: number): void {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
    this.emitTotalQuantity();
    console.log('Cart after add:', this.items);
  }

  /** Updates the in‐cart quantity for `product`. If `quantity<=0`, removes it. */
  updateQuantity(product: Product, quantity: number): void {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.quantity = quantity;
      if (existing.quantity <= 0) {
        this.items = this.items.filter((i) => i.product.id !== product.id);
      }
    }
    this.emitTotalQuantity();
    console.log('Cart after update:', this.items);
  }

  /** Completely removes `product` from the cart. */
  removeFromCart(product: Product): void {
    this.items = this.items.filter((i) => i.product.id !== product.id);
    this.emitTotalQuantity();
    console.log('Cart after remove:', this.items);
  }

  /** Returns a copy of all current CartItem entries. */
  getCartItems(): CartItem[] {
    return [...this.items];
  }

  /** Helper: Recalculates the sum of all item quantities and pushes it to the subject. */
  private emitTotalQuantity(): void {
    const total = this.items.reduce((sum, i) => sum + i.quantity, 0);
    this.totalQuantitySubject.next(total);
  }
}
