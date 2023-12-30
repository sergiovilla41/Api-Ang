import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/merch.service';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces/Product.interface';


@Component({
  selector: 'app-jewelery',
  templateUrl: './jewelery.component.html',
  styleUrl: './jewelery.component.css'
})
export class JeweleryComponent implements OnInit {
  productsByCategory$: Observable<any[]> | null = null;
  Products: Product[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsByCategory$ = this.productService.getProductsJewelery();
  }

  addToCart(product:Product) {
    return this.productService.addProduct(product);
    console.log();
  }


}
