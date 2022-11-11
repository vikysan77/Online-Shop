import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from '../../model/products';
import { ProductsService } from '../../services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  products!: IProducts[];
  productsSubscription!: Subscription;
  basket!: IProducts[];
  basketSubscription!: Subscription;
  canEdit: boolean = false;
  canView:boolean = false;
  
  constructor(private ProductsService: ProductsService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.canEdit = true;
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data; 
    });
    this.basketSubscription =  this.ProductsService.getProductsFromBasket().subscribe((data) => {
      this.basket = data;
    });
 
  }

  addToBasket(product: IProducts){
    product.amount = 1;
    let findItem;

    if(this.basket.length > 0){
      findItem = this.basket.find((item) => item.id === product.id)
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);

    } else this.postToBasket(product);
    
  }

  postToBasket(product: IProducts){
    this.ProductsService.postProductToBasket(product).subscribe((data => this.basket.push(data)))
  }

  updateToBasket(product: IProducts){
    product.amount += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => {

    })
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.data = product;
    const dialogRef = this.dialog.open(DialogBoxComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((data)=>{
      if(data){
         if(data && data.id)
      this.updateData(data);
      else 
        this.postData(data)
      }
    })
  }

  postData(data: IProducts){
    this.ProductsService.postProduct(data).subscribe((data => this.products.push(data)))
  }

  updateData(product: IProducts){
    this.ProductsService.updateProduct(product).subscribe((data => {
      this.products = this.products.map((product) =>{
        if(product.id === data.id) return data;
        else return product;
      }) 
    }))
  }

  ngOnDestroy() {
    if (this.productsSubscription) this.productsSubscription.unsubscribe();
    if (this.basketSubscription) this.basketSubscription.unsubscribe();
  }

  deleteItem(id: number){
    console.log(id)
    this.ProductsService.deleteProduct(id).subscribe(() => this.products.find((item)=>{
      if(id === item.id){
        let idx = this.products.findIndex((data) => data.id === id);
        this.products.splice(idx, 1);
      }
    }))
  }

}
