import { Component, OnInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { NgRedux } from 'ng2-redux';
import { User } from 'src/app/models/user';
import { UserServices } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Address } from 'src/app/models/adress';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {

  public isLogged: boolean;
  public adminArea: boolean = false;
  public user: User;
  public adress: Address;
  public cart: Cart;

  constructor(public redux: NgRedux<AppState>,
    private userServices: UserServices, 
    private cartServices: CartService,
     private router: Router,
     private cdRef:ChangeDetectorRef){}



    ngOnInit() {
      this.redux.subscribe(() => {
        this.isLogged = this.redux.getState().isLogged;
        this.user = this.redux.getState().user;
        this.cart = this.redux.getState().cart;
        this.adminArea = this.redux.getState().adminArea;
      });
      this.checkIsLogged()
   
  }
 
 
  

// check if a active cart exists
  public checkForCart(userId): any {
    this.cartServices.getOneCart(userId)
  }

//check if a user is connected 
  public checkIsLogged(): void {
    this.userServices.isLoggedCheck()
      .subscribe(
        data => {
          const action: Action = { type: ActionType.login, payload: data };
          this.redux.dispatch(action);
          if (this.user._id) {
            this.checkForCart(this.user._id)
            this.router.navigate(['/products'])
          }
        },
        err => console.log('not logged in')

      )
  }
//logout user
  public logout(): void {
    this.userServices.logout()
      .subscribe(
        data => {
          const action: Action = { type: ActionType.logout };
          this.redux.dispatch(action);
          this.router.navigate(['/login'])
        },
        err => console.log(err)
      )
  }

// update total price for the cart
  public totalCartPrice(): number {
    let sum: number = 0;
    if (this.cart) {
      if (this.cart.cartProducts) {
        if (this.cart.cartProducts.length > 0) {
          for (let product of this.cart.cartProducts) {
            sum = sum + product.price * product.quantity
          }
          const action: Action = { type: ActionType.updateTotalPrice, payload: sum };
          this.redux.dispatch(action);
          return sum;
        }
      }
    }
    return 0
  }

// disable/able the ordeer button
public disableOrder(): string {
  if(this.isLogged && this.cart.cartProducts){
    return (this.cart.cartProducts.length>0)? 'abled' : 'disabled';
  }else{
    return 'disabled'
  } 
}

}