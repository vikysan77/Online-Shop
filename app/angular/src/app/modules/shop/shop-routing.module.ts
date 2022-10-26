import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketPageComponent } from './pages/basket-page/basket-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { ProductResolver } from './services/product.resolver';

const routes: Routes = [{
  path: 'main',
  component: MainPageComponent,
},
{
  path: 'products',
 component: ProductsPageComponent
},
{
  path: 'detail/:id',
  component: DetailPageComponent,
  resolve: {data: ProductResolver}
},
{
  path: 'basket',
  component: BasketPageComponent,
}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
