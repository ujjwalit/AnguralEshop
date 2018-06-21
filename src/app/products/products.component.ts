import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent  {
  products: {key: string , data:any}[] = [];
  filteredProducts: any[] = [];
  
  category: string;

  constructor(
    route: ActivatedRoute,
    productService: ProductService
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

 

}
