import { Component, Input} from '@angular/core';
import { ShoopingCartService } from '../shooping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product :{};
  @Input('show-actions') showActions = true;
  @Input('productId') productId;
  @Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoopingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product,this.productId);  
  }
  removeFromCart() {
    this.cartService.removeFromCart(this.product,this.productId);
  }
  
  getQuantity() {
    if(!this.shoppingCart) return 0;
    let item = this.shoppingCart.items[this.productId];
    return item ? item.quantity : 0 ;
  }
}
