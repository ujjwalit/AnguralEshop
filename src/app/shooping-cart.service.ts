import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ShoppingCart } from './models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoopingCartService {

  constructor(private db: AngularFireDatabase) { }
  quantity:number;
  
  private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart(): Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId);
  }
  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;
  
    let result = await this.create();
    localStorage.setItem('cartId',result.key);
    return result.key;
      
    
  }

  private getItem(cartId:string,productId:string){
    
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
  async addToCart(product:any,productId:string) {
    
    this.updateItemQuantity(product,productId,1);
    
  }

  async removeFromCart(product:any,productId:string) {
    
    this.updateItemQuantity(product,productId,-1);
  }

  private async updateItemQuantity(product:any,productId:string,change: number) {
    let cartId = await this.getOrCreateCartId();
  
    let item$ = this.getItem(cartId,productId);
    item$.valueChanges().subscribe(item => {
      item$.update({ product: product});
      
    });
    var ref = firebase.database().ref();
    ref.child("/shopping-carts/" +cartId + '/items/'+ productId + '/quantity').transaction(function(currentValue) {
      return (currentValue || 0) + change;
    });
  }
}
