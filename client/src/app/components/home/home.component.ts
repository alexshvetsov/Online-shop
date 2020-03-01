import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Product } from 'src/app/models/product';
import { AppState } from 'src/app/redux/appState';
import { ProdCategoriesService } from 'src/app/services/prod-categories.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home', 
  templateUrl: './home.component.html',  
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router,
    private productsService: ProductsService,
    private redux: NgRedux<AppState>) {

   }
   public products: number;

  
 async ngOnInit() {
 await this.redux.subscribe(() =>{
    this.products = this.redux.getState().allProducts.length;
}); 
  }

 

}
