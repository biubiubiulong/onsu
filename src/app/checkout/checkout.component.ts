// src/app/pages/checkout/checkout.component.ts
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem, CartService } from '../services/cart.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalItems: Observable<number>;
  totalPrice: string;
  stripe: any;

  constructor(private cartService: CartService) {
    // Subscribe to total quantity or total price if you want
    this.totalItems = this.cartService.totalQuantity;
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + Number(item.product.price) * item.quantity, 0).toFixed(2)
  }

  async ngOnInit(): Promise<void> {
    // Get current cart items (you could also subscribe to a subject if you want live updates)
    this.cartItems = this.cartService.getCartItems();    
    this.stripe = await loadStripe('pk_test_51RCFHzGaonqq4ByEeIATq3dwVkufn3I4wYp9FC4XgJ4xssEfmrP6ucMsf96R4QnboZoe4WQDhZLqcIbHvmfb7JxB00YlXEANfQ'); // Replace with your Stripe public key
 
  }


  async handlePayment() {
    // Create an instance of the payment method
    const lineItems = this.cartItems.map(item => ({ price:( item.product.price_id).toString(), quantity: item.quantity }))
    console.log("lineItems: ", lineItems)
    const {error} = await this.stripe.redirectToCheckout({
      lineItems: lineItems,
      mode: 'payment',
      successUrl: window.location.origin + '/onsu/success',
      cancelUrl: window.location.origin + '/onsu/cancel',
    });

    if (error) {
      console.log('Error:', error);
    }
  }
}
