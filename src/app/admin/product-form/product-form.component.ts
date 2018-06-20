import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  product = {};

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService, 
    private productService: ProductService) { 

    //this.categories$ = categoryService.getCategories().valueChanges();
    this.categories$ = categoryService.getCategories().snapshotChanges()
    .pipe(map(items => {             // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));

    let id = this.route.snapshot.paramMap.get('id');
    if (id) this.productService.get(id).valueChanges().subscribe(p => this.product = p);
  }

  save(product) {
    this.productService.create(product);
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
