// src/app/pages/product-list/product-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CategoryType, CategoryTypeLabel, OEMScanTool, OEMScanToolLabel, PaginatedProducts, Product, SubcategoryName } from '../product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];

  category = CategoryType.OEMScanTool;
  subcategory?: SubcategoryName;
  breadcrumbs?: {
      label: string | undefined;
      url: string;
  }[]

  loading = false;
  errorMessage: string | null = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.category = Number(params.get('category')) as CategoryType;
      this.subcategory = params.get('subcategory') as OEMScanTool;
      await this.fetchProducts();
      this.applyFilters();

      const category = CategoryTypeLabel.get(this.category);
      let path = [
        { label: 'Home', url: '/' },
        { label: category, url: `/products/${this.category}` },
      ]
      if (this.subcategory) {
      const subcategory = OEMScanToolLabel.get(this.subcategory as OEMScanTool);
        path.push( { label: subcategory, url: `/products/${this.category}/${this.subcategory}}` })
      }
      this.breadcrumbs = path
    });
  }

  async fetchProducts(): Promise<void> {
    this.loading = true;
    this.errorMessage = null;

    const paginated = await this.productService.getProductByCategory(this.category, this.subcategory);
    this.products = paginated?.results ?? [];
    this.loading = false;
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
