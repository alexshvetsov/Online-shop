import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css']
})
export class CartProductComponent implements OnInit {
  @Input()
  public product: string;

  @Input()
  public name: string;

  public products: Product[];

  public image: String;


  @Input()
  public price: number;

  @Input()
  public quantity: number;



  constructor(private router: Router,
    private cartService: CartService,
    private redux: NgRedux<AppState>) { }

  async  ngOnInit() {
    await this.redux.subscribe(() => {
      this.products = this.redux.getState().allProducts;
    });
    await setTimeout(() => {
    this.image = this.redux.getState().allProducts.find(p => p.name == this.name).image
    }, 1000)
  }


  //delete product from cart
  async delete() {
    const action: Action = { type: ActionType.deleteCartProduct, payload: this.product };
    await this.redux.dispatch(action);
    this.cartService.updateCart(this.redux.getState().cart).subscribe(
      data => {
      },
      err => console.log(err)
    );
  }

  // disable/able the cart product
  public disableCartArea(): boolean {
    return (this.router.url == '/products') ? true : false;
  }
}
