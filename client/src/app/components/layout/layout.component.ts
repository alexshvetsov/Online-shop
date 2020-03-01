import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ProdCategoriesService } from 'src/app/services/prod-categories.service';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private prodCategoriesService: ProdCategoriesService,
    private productsService: ProductsService,
    private redux: NgRedux<AppState>,
    private router: Router) { }

  ngOnInit() {

    if (this.redux.getState().allProducts.length == 0) {
      this.prodCategoriesService.getAllProdCategories();
      this.productsService.getAllPrdoucts();
    }
    this.router.navigate(['/home'])

  }
}
