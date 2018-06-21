import { Component, OnInit , Input} from '@angular/core';
import { CategoryService } from '../../category.service';
import { map } from 'rxjs/operators';



@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  categories$;
  constructor(categoryService: CategoryService) { 
    this.categories$ = categoryService.getAll()
    .snapshotChanges()
    .pipe(map(items => {             // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  ngOnInit() {
  }

}
