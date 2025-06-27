import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostListener
} from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from 'src/app/product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  quantity = 0;

  /**
   * Whether the user is currently “editing” quantity (i.e. showing [– n +] controls).
   * If false, we show just a single circle (either “+” or the number).
   */
  isEditingQuantity = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cartService: CartService,
    public productService: ProductService,
    private hostRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
  }


  // ========== Quantity / Cart logic ==========

  /**
   * Called when the user clicks the collapsed circle (plus icon or number).
   * This toggles into “editing” mode and, if quantity was 0, sets to 1.
   */
  toggleQuantityEditor(): void {
    if (!this.isEditingQuantity) {
      // If quantity was zero, add first item
      if (this.quantity === 0) {
        this.quantity = 1;
        this.cartService.addToCart(this.product, 1);
      }
      // Enter editing mode
      this.isEditingQuantity = true;
    }
    console.log("toggleQuantityEditor: ", this.isEditingQuantity)
    // If already editing, do nothing (we want user to click – or + explicitly)
  }

  /** Called when user clicks the “+” in editing mode */
  increment(): void {
    this.quantity++;
    this.cartService.updateQuantity(this.product, this.quantity);
  }

  /** Called when user clicks the “–” in editing mode */
  decrement(): void {
    this.quantity--;
    if (this.quantity <= 0) {
      // If quantity drops to zero, remove from cart and collapse
      this.cartService.removeFromCart(this.product);
      this.quantity = 0;
      this.isEditingQuantity = false;
    } else {
      this.cartService.updateQuantity(this.product, this.quantity);
    }
  }

  /**
   * Detect clicks anywhere in the document. If the click target
   * is outside of this component’s “quantity editor” area, collapse it.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isEditingQuantity) {
      return; // nothing to do if we’re not editing
    }
    const clickedInside = this.hostRef.nativeElement.contains(
      event.target as HTMLElement
    );
    if (!clickedInside) {
      // Collapse editor but keep the quantity (if > 0)
      this.isEditingQuantity = false;
    }
  }

  gotoProductDetail($event: MouseEvent) {
    $event.stopPropagation();
    let path = ['products', this.product.category.id];
    path = this.product.subcategory
    ? [...path, this.product.subcategory.name, this.product.id]
    : [...path, this.product.id];
    this.router.navigate(path);
  }
}
