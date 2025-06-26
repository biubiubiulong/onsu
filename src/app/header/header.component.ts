import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../services/cart.service';
import { buildProductUrl, Category, CategoryType, OEMScanTool, OEMScanToolLabel, Subcategory, SubcategoryName } from '../product.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly CategoryType = CategoryType;
  readonly OEMScanToolLabel = OEMScanToolLabel;
  preservedOrder = () => 0;

  title = 'onsu';

  searchText: string = '';
  isFocused: boolean = false;

  totalItemsInCart$: Observable<number>;
  @Output() onMenuToggle = new EventEmitter<boolean>();
  
  isMenuOpen = false;

  constructor(private router: Router, private cartService: CartService) {
    this.totalItemsInCart$ = this.cartService.totalQuantity;
  }

  toggleMenu(isOpen: boolean) {
    this.isMenuOpen = isOpen;
    this.onMenuToggle.emit(this.isMenuOpen);
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
  
  goToSubcategory(type: CategoryType, sub: SubcategoryName): void {
    this.toggleMenu(false);
    this.router.navigateByUrl(buildProductUrl(type, sub));
  }
}
