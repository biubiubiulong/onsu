// src/app/product-menu/product-menu.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material modules needed by the menu
import { MatMenuModule   } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule   } from '@angular/material/icon';
import { ProductMenuComponent } from './product-menu.component';


@NgModule({
  declarations: [
    ProductMenuComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ProductMenuComponent
  ]
})
export class ProductMenuModule { }