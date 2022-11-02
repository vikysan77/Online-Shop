import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProducts } from '../../model/products';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private ProductService: ProductsService) { }

  basket!: IProducts[];
  basketSubscription!: Subscription;

  ngOnInit(): void {
    this.basketSubscription = this.ProductService.getProductsFromBasket().subscribe((data)=>{
      this.basket = data;
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

}
