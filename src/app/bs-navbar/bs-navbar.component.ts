import { ShoopingCartService } from './../shooping-cart.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductCardComponent } from '../product-card/product-card.component';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent  implements OnInit{

  appUser: AppUser;
  shoppingCartItemCount: number;
  public isCollapsed = true;
  
  constructor(private auth: AuthService, private shoopingCartService: ShoopingCartService) {
     
   }

  logout() {
    this.auth.logout();
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
   
    let cart$ = await this.shoopingCartService.getCart();
    cart$.valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      for (let productId in cart.items) 
        this.shoppingCartItemCount += cart.items[productId].quantity;
    });
  }

}
