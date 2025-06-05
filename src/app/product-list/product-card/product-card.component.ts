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

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;

  currentImageIndex = 0;
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
    private hostRef: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {
    this.currentImageIndex = 0;
  }

  // ========== Image carousel logic (unchanged) ==========
  prevImage(): void {
    const len = this.product.images.length;
    this.currentImageIndex =
      (this.currentImageIndex - 1 + len) % len;
    console.log("product.images[currentImageIndex]: ", this.product.images)
  }

  nextImage(): void {
    const len = this.product.images.length;
    this.currentImageIndex =
      (this.currentImageIndex + 1) % len;
  }

  goToImage(i: number): void {
    if (i >= 0 && i < this.product.images.length) {
      this.currentImageIndex = i;
    }
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

  gotoProductDetail() {
    this.router.navigate([this.product.id], { relativeTo: this.route });
  }
}
