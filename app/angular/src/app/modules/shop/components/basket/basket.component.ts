import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from '../../model/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasketComponent implements OnInit {

  constructor(private ProductService: ProductsService) { }

  basket!: IProducts[];
  basketSubscription!: Subscription;
  basketPrice: number = 0;
  basketAmount: number = 0;

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductsFromBasket().subscribe((data)=>{
      this.sumPriceToBasket(data);
      this.sumAmountToBasket(data);
    })
  }

  ngOnDestroy() {
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  minusItemToBasket(item: IProducts) {
    if(item.amount === 1){
      this.ProductService.deleteProductFromBasket(item.id).subscribe(()=>{
        let index = this.basket.findIndex((data) => data.id === item.id);
        this.basket.splice(index, 1);
      })
    } else {
      item.amount -= 1;
    this.ProductService.updateProductToBasket(item).subscribe((data) =>{})
    }
    
  }

  plusItemToBasket(item: IProducts) {
    item.amount += 1;
    this.ProductService.updateProductToBasket(item).subscribe((data) =>{})
  }

  deleteItemFromBasket(item: IProducts){
    this.ProductService.deleteProductFromBasket(item.id).subscribe(()=>{
      let index = this.basket.findIndex((data) => data.id === item.id);
      this.basket.splice(index, 1);
    })
  }

  sumPriceToBasket(data: IProducts[]){
      this.basket = data;
      let arrProductsPrice = this.basket.map(item => item.amount*item.price);
      this.basketPrice = arrProductsPrice.reduce((a, b) => a + b);
  }

  sumAmountToBasket(data: IProducts[]){
    this.basket = data;
      let arrProductsAmount = this.basket.map(item => item.amount);
      this.basketAmount = arrProductsAmount.reduce((a, b) => a + b);
  }

}
