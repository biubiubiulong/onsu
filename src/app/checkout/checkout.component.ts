// src/app/pages/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    // Subscribe to total quantity or total price if you want
    this.total$ = this.cartService.totalQuantity$;
  }

  ngOnInit(): void {
    // Get current cart items (you could also subscribe to a subject if you want live updates)
    this.cartItems = this.cartService.getCartItems();
  }
}
