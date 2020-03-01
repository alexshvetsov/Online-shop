import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Cart } from '../../models/cart'
import { Product } from 'src/app/models/product';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(  public redux: NgRedux<AppState>) { }
public cart: Cart;
public products:Product[]
public isCart:boolean




  ngOnInit() {
    this.redux.subscribe(() =>{
      this.cart = this.redux.getState().cart;
      this.products = this.redux.getState().shownProducts;
      this.isCart= this.redux.getState().cart? true:false;
  });
  this.isCart=false;
  }

}
