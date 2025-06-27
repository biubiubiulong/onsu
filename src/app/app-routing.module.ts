import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/:category', component: ProductListComponent },
  { path: 'products/:category/:subcategory', component: ProductListComponent },

  { path: 'products/:category/:subcategory/:id', component: ProductDetailComponent },
  { path: 'products/:category/:id',component: ProductDetailComponent },

  { path: 'checkout', component: CheckoutComponent },
  { path: 'success', component: CheckoutComponent },
  { path: 'cancel', component: CheckoutComponent },
  
  { path: '', component: HomeComponent }, // Home route
  { path: '**', redirectTo: '' } // Catch-all for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

  
}
