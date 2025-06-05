import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select'; 
import { HeaderComponent } from './header/header.component';
import { ProductMenuModule } from './header/product-menu/product-menu.module';
import { ProductCardModule } from './product-list/product-card/product-card.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './services/product.service';
import { CartService } from './services/cart.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatBadgeModule }               from '@angular/material/badge';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductListComponent,
    CheckoutComponent,
    ProductDetailComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatBadgeModule,
    ProductMenuModule,
    ProductCardModule,
    HttpClientModule
  ],
  providers: [CartService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
