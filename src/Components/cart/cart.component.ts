import { Product } from './../../Interfaces/Product.interface';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/merch.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

constructor(private productService: ProductService ){}
  ngOnInit(): void {

  }
  myCart$= this.productService.myCart$
  totalProduct(price:number, units:number){
    return price * units
  }
  deleteProduct(id:string){
    this.productService.deleteProduct(id)
  }
  updateUnits(operation: string, id: string) {

    const product = this.productService.findProduct(id)
    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad = product.cantidad - 1;
      }
      if (operation === 'add') {
        product.cantidad = product.cantidad + 1;

      }
      if (product.cantidad === 0) {
        this.deleteProduct(id)
      }
    }

  }
  totalCart() {
    const result = this.productService.totalCart();
    return result;
  }
}
