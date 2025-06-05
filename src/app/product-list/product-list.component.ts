// src/app/pages/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PaginatedProducts, Product } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];

  category: string | null = null;
  subcategory: string | null = null;

  loading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category');
      this.subcategory = params.get('subcategory');
      this.applyFilters();
    });
  }

  fetchProducts(): void {
    this.loading = true;
    this.errorMessage = null;

    this.productService.getProducts().subscribe({
      next: (paginated: PaginatedProducts) => {
        this.products = paginated.results;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = "Failed to load products.";
        this.loading = false;
      }
    })
  }

  get breadcrumbs() {
    return [
      { label: 'Home', url: '/' },
      { label: this.category, url: `/products/${this.category}` },
      { label: this.subcategory, url: `/products/${this.category}/${this.subcategory}` },
    ]
  }

  private applyFilters() {
    // If no category is in the URL, show everything:
    if (!this.category) {
      this.filtered = this.products;
      return;
    }

    // Otherwise, only show products whose category matches:
    let temp = this.products.filter(p => p.category.name === this.category);

    // If there’s also a subcategory param, filter further (assuming your Product model has it)
    if (this.subcategory) {
      temp = temp.filter(p => p.subcategory === this.subcategory);
    }

    this.filtered = temp;
  }

  // Example stubs for filter clicks (you’d implement actual logic)
  onSortChange(sortBy: string) {
    console.log('Sort by', sortBy);
    // Reorder this.products based on sortBy
  }
  onFilter(filterName: string) {
    console.log('Filter by', filterName);
    // Apply filter to this.products or navigate to filtered route
  }
}
