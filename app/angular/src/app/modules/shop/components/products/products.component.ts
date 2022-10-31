import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { IProducts } from '../../model/products';
import { ProductsService } from '../../services/products.service';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: IProducts[];
  productsSubscription!: Subscription;
  canEdit: boolean = false;
  canView:boolean = false;
  
  constructor(private ProductsService: ProductsService,public dialog: MatDialog) { }

  ngOnInit(): void {

    this.canEdit = true;
    this.productsSubscription = this.ProductsService.getProducts().subscribe((data) => {
      this.products = data;
  });
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
