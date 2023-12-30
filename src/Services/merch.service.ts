// product-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './../Interfaces/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';

private myList: Product[]= [];
//carrito observable
private myCart = new BehaviorSubject<Product[]>([]);
myCart$ = this.myCart.asObservable();

  constructor(private http: HttpClient) {}

  getProductsClothing(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products) => {
        // Filtrar solo la categoría "men's clothing"
        return products.filter((product) => product.category === "men's clothing");
      })
    );
  }
  getProductsElectronics(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products) => {
        // Filtrar solo la categoría "electronics"
        return products.filter((product) => product.category === "electronics");
      })
    );
  }
  getProductsJewelery(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((products) => {
        // Filtrar solo la categoría " jewelery"
        return products.filter((product) => product.category === "jewelery");
      })
    );
  }
  addProduct(product:Product){
    // debugger;
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      //emito la lista para los que estén escuchando
      this.myCart.next(this.myList);

    } else {
      const productMod = this.myList.find((element) => {
        return element.id === product.id
      })
      if (productMod) {
        productMod.cantidad = productMod.cantidad + 1;
        this.myCart.next(this.myList);
      } else {
        product.cantidad = 1;
        this.myList.push(product);
        //ojo hay que emitir la lista!!
        this.myCart.next(this.myList);
      }

    }
  }
  deleteProduct(id:string){
    this.myList =this.myList.filter((product)=>{
      return product.id !=id
    })
    this.myCart.next(this.myList);
  }
  findProduct(id: string){

    return this.myList.find((element)=>{
      return element.id === id;
    }
    )
  }
  totalCart() {
    const total = this.myList.reduce(function (acc, product) { return acc + (product.cantidad * product.price); }, 0)
    return total
  }
}
