import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from 'src/app/redux/actionType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public shownProducts: Product[];
  public allProducts: Product[];
  constructor(private productsService: ProductsService,
    private redux: NgRedux<AppState>,
    private router:Router) { }

    //cehck if user is logged and redirect if needed
  ngOnInit() {
    if(!this.redux.getState().isLogged){
      this.router.navigate(['/'])
    }

    this.redux.subscribe(() =>{
      this.shownProducts = this.redux.getState().shownProducts;
      this.allProducts = this.redux.getState().allProducts;
  });
// if products arr empty then call DB
  if(this.redux.getState().allProducts.length == 0) {
   this.productsService.getAllPrdoucts();
  }
  else {
      this.allProducts = this.redux.getState().allProducts;
      this.shownProducts = this.redux.getState().shownProducts;
  }
  }

}
