// src/app/pages/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {ProductService } from '../services/product.service';
import { CategoryType, CategoryTypeLabel, OEMScanTool, OEMScanToolLabel, Product, SubcategoryName } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  category = CategoryType.OEMScanTool;
  subcategory?: SubcategoryName;
  breadcrumbs?: {
      label?: string;
      url: string;
  }[]
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.category = params.get('category') as CategoryType;
      this.subcategory = params.get('subcategory') as OEMScanTool;
      this.id = params.get('id');

      if (this.id) {
        this.product = await this.productService.getProductById(this.id);
      }
      
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

    // Option B (RxJS switchMap):
    // this.product$ = this.route.paramMap.pipe(
    //   switchMap((params: ParamMap) => {
    //     this.category = params.get('category');
    //     this.subcategory = params.get('subcategory');
    //     this.id = params.get('id');
    //     return this.id ? this.productService.getProductById(this.id) : of(undefined);
    //   })
    // );
  }

  
}
