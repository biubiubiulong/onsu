import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'onsu';

  searchText: string = '';
  isFocused: boolean = false;

  totalItemsInCart$: Observable<number>;

  constructor(private router: Router, private cartService: CartService) {
    this.totalItemsInCart$ = this.cartService.totalQuantity$;
  }
  
  clearSearch() {
    this.searchText = ''; 
  }

  onFocus() {
    this.isFocused = true;
  }

  onBlur() {
    this.isFocused = false;
  }  
  
  goToCart(): void {
    this.router.navigate(['/checkout']);
  }
  
  goToHome() {
    this.router.navigate(['']);
  }  
  
  onSelect(option: string) {
    console.log('User clicked:', option);
    // … add any navigation or logic here …
  }
}
