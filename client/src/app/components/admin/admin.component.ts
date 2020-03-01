import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public product:Product;
  public allProducts:Product[];

  constructor(
    public router:Router,
    public redux:NgRedux<AppState>,
    private productsService:ProductsService
  ) { }

  ngOnInit() {
// check if user is admin if not redirect to home
    if(this.redux.getState().user.role!=1){
      this.router.navigate(['/'])
    }

    if(this.redux.getState().allProducts.length == 0) {
      this.productsService.getAllPrdoucts();
     }
    this.product=new Product();
    this.redux.subscribe(() => {
      this.allProducts = this.redux.getState().allProducts; 
    });
  }

}
