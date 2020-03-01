import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/adress';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { User } from 'src/app/models/user';
import { Cc } from 'src/app/models/cc';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  public address: Address
  public cart: Cart;
  public cities: any[];
  public procced: boolean;
  public cc: Cc;
  public order: Order
  public months = [];
  public years = [];

  constructor(public redux: NgRedux<AppState>,
    public router: Router,
    private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit() {
//fetch city list
    if (this.redux.getState().cities.length === 0) {
      fetch('/assets/cities/cities.json')
        .then(response => response.json())
        .then(cities => {
          const action: Action = { type: ActionType.getCities, payload: cities };
          this.redux.dispatch(action);
        })
        .catch(err => { console.log(err) })
    }
    this.redux.subscribe(() => {
      this.cart = this.redux.getState().cart;
    });

    this.address = new Address();
    this.order = new Order();
    this.cc = new Cc(undefined, { month: undefined, year: undefined }, undefined);
    for (let i = 1; i <= 12; i++) {
      this.months.push(+i)
    };
    for (let i = +new Date().getFullYear().toString().slice(2); i <= +new Date().getFullYear().toString().slice(2) + 10; i++) {
      this.years.push(i.toString());
    };
    this.procced = false;

  }


//set cc month
  public ccMonthHandler  = (month: number) => {
    this.cc.expiration.month = month
  }

//set city in the adress
  public cityHandler = (city: string) => {
    this.address.city = city
  }

//set cc year
  public ccYearHandler = (year: number) => {
    this.cc.expiration.year = year
  }

// submit adress form and redirect to cc form
  public submitForm(): void {
    this.procced = true;
  }

// submit order and update DB 
  public submitForm2(): void {

    this.order.user = this.redux.getState().user;
    this.order.cart = this.redux.getState().cart;
    this.order.cart.active = false;
    this.order.address = this.address;
    this.order.cc = this.cc
    this.order.address = this.address
    this.cartService.updateCart(this.order.cart).subscribe(
      data => {
      },
      err => console.log(err)
    );
    this.orderService.saveOrder(this.order).subscribe(
      data => {
        const action: Action = { type: ActionType.newCart, payload: this.redux.getState().user._id };
        this.redux.dispatch(action);
        this.order = new Order()
        this.address = new Address();
        this.cc = new Cc(undefined, { month: undefined, year: undefined }, undefined);
        this.procced = false;
      },
      err => console.log(err)
    );
    this.router.navigate(['/orderd'])
  }
} 
