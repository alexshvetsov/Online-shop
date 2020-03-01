import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { Cart } from 'src/app/models/cart';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  public cart: Cart;
  public quantity: number;


  @Input()
  public name: string;

  @Input()
  public role: number;

  @Input()
  public _id: string;

  @Input()
  public image: string;


  @Input()
  public price: number;
  constructor(private cartService: CartService, private redux: NgRedux<AppState>) { }

  ngOnInit() {
    this.redux.subscribe(() => {
      this.cart = this.redux.getState().cart;
    });
    this.quantity = 1;
  }

//update product in redux for admin mode
  public updateProduct(productID): void {
    const action: Action = { type: ActionType.updateProduct, payload: productID };
    this.redux.dispatch(action);
  }

//check if product in cart and update or add product
  public addToCart(): void {
    if (this.quantity < 1) {
      return alert("quamtity must be positive")
    }

    const data = { product: this._id, price: +this.price, quantity: this.quantity, name: this.name }
    if (this.redux.getState().cart.cartProducts.find(cP => cP.product == this._id)) {
      const action: Action = { type: ActionType.switchCartProduct, payload: data };
      this.redux.dispatch(action);
    } else {
      const action: Action = { type: ActionType.addToCart, payload: data };
      this.redux.dispatch(action);
    }
    if (!this.redux.getState().cart._id) {
      this.cartService.saveCart(this.redux.getState().cart).subscribe(
        data => {
          const action: Action = { type: ActionType.updateCart, payload: data };
          this.redux.dispatch(action);
        },
        err => console.log(err)
      );
    } else {
      this.cartService.updateCart(this.redux.getState().cart).subscribe(
        data => {
        },
        err => console.log(err)
      );
    }
  }
}
