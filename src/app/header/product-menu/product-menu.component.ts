// src/app/components/product-menu/product-menu.component.ts
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-menu',
  templateUrl: './product-menu.component.html',
  styleUrls: ['./product-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductMenuComponent {
  // Grab the MatMenu instance from the template (the template-ref is #menu="matMenu")
  @ViewChild('menu', { static: true }) menu!: MatMenu;

  constructor(private router: Router) {
  }

  navigate(category: string, subcategory: string = '') {
    this.router.navigate(['/products', category, subcategory])
  }
}