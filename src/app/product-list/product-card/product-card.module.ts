// src/app/product-menu/product-menu.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modules needed by the menu
import { MatMenuModule   } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule   } from '@angular/material/icon';
import { ProductCardComponent } from './product-card.component';


@NgModule({
  declarations: [
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ProductCardComponent
  ]
})
export class ProductCardModule { }