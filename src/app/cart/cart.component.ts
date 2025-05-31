import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(private router: Router) {}
  
  // Cart view content goes here, for example, an array of products
  products = [
    { image: 'assets/images/Japan1.jpg', description: 'Product Description 1', priceId: 'price_1RCFJwGaonqq4ByEGuvqFZQ9' },
    { image: 'assets/images/Japan2.jpg', description: 'Product Description 2', priceId: 'price_1RCGJDGaonqq4ByE70oiA7hr' }
  ];
  stripe: any;
  elements: any;

  async ngOnInit() {
    // Load Stripe
    this.stripe = await loadStripe('pk_test_51RCFHzGaonqq4ByEeIATq3dwVkufn3I4wYp9FC4XgJ4xssEfmrP6ucMsf96R4QnboZoe4WQDhZLqcIbHvmfb7JxB00YlXEANfQ'); // Replace with your Stripe public key
  }

  async handlePayment(product: any) {
    // Create an instance of the payment method
    const {error} = await this.stripe.redirectToCheckout({
      lineItems: [
        {price: product.priceId, quantity: 1},
      ],
      mode: 'payment',
      successUrl: window.location.origin + '/onsu/success',
      cancelUrl: window.location.origin + '/onsu/cancel',
    });

    if (error) {
      console.log('Error:', error);
    }
  }
}