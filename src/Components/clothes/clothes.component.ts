import { Product } from './../../Interfaces/Product.interface';

import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/merch.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.css'],
})
export class ClothesComponent implements OnInit {
  productsByCategory$: Observable<any[]> | null = null;
  Products: Product[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsByCategory$ = this.productService.getProductsClothing();
  }

  addToCart(product:Product) {
    return this.productService.addProduct(product);
    console.log();
  }
}
