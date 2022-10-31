import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducts } from '../model/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<IProducts[]>(this.url);
  }

  getProduct(id: number){
    return this.http.get<IProducts>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts){
    return this.http.post<IProducts>(this.url, product);
  }

  deleteProduct(id: number){
    return this.http.delete<IProducts>(`${this.url}/${id}`);
  }

  updateProduct(product: IProducts){
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  postProductToBasket(product: IProducts){
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  getProductsFromBasket() {
    return this.http.get<IProducts[]>(this.urlBasket);
  }

  updateProductToBasket(product: IProducts){
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }

  deleteProductFromBasket(id: number){
    return this.http.delete<IProducts>(`${this.urlBasket}/${id}`);
  }
}
