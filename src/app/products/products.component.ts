import { ShoopingCartService } from './../shooping-cart.service';
import { switchMap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit ,OnDestroy{
  products: {key: string , data:any}[] = [];
  filteredProducts: any[] = [];
  subscription: Subscription;
  category: string;
  cart:any;

  constructor(
    route: ActivatedRoute,
    productService: ProductService,
    private shoppingCartService: ShoopingCartService
    ) { 
    
    productService
        .getAll()
        .pipe(switchMap(products => {
         this.products = products;
         return route.queryParamMap;
        }))
        .subscribe(params => {
          this.category = params.get('category');
    
          this.filteredProducts = (this.category) ?
            this.products.filter(p => p.data.category === this.category):
            this.products;
        });
  }

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart()).valueChanges()
    .subscribe(cart => this.cart = cart);
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 

}
