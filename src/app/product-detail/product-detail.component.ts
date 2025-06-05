// src/app/pages/product-detail/product-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import {ProductService } from '../services/product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  category: string | null = null;
  subcategory: string | null = null;
  id: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    // Option A: Use a single subscription to get all params and then fetch the product
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      this.category = params.get('category');
      this.subcategory = params.get('subcategory');
      this.id = params.get('id');

      if (this.id) {
        // Assuming your ProductService has a method getProductById(id: string)
        this.product = await this.productService.getProductById(this.id);
      }
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
