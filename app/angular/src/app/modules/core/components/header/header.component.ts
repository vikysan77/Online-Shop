import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/modules/shop/model/products';
import { ProductsService } from 'src/app/modules/shop/services/products.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  constructor(private ProductService: ProductsService) { }

  basket!: IProducts[];
  basketSubscription!: Subscription;
  basketLength: number = 0;

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductsFromBasket().subscribe((data)=>{
      this.sumProducts(data);
    })
    
  }

  sumProducts(data: IProducts[]){
    this.basket = data;
    let arrProducts = this.basket.map(item => item.amount);
    this.basketLength = arrProducts.reduce((a, b) => a + b);
   
  }
}
