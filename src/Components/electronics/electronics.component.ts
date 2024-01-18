import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/merch.service';
import { Observable } from 'rxjs';
import { Product } from '../../Interfaces/Product.interface';

@Component({
  selector: 'app-electronics',
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css'
})
export class ElectronicsComponent implements OnInit{
  productsByCategory$: Observable<any[]> | null = null;
  Products: Product[]=[];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productsByCategory$ = this.productService.getProductsElectronics();
  }

  addToCart(product:Product) {
    return this.productService.addProduct(product);

  }

}
