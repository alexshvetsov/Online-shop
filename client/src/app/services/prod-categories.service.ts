
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProdCategory } from '../models/prodCategory';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Action } from '../redux/action';
import { ActionType } from '../redux/actionType';
@Injectable({
  providedIn: 'root'
})
export class ProdCategoriesService {

  constructor(private httpClient: HttpClient, private redux: NgRedux<AppState>) { }

// get product category from DB and update redux
  public getAllProdCategories(): void {
    this.httpClient.get<ProdCategory[]>("http://localhost:3000/api/prodCategories").subscribe(prodCategories => {
      const action: Action = { type: ActionType.getAllProdCategories, payload: prodCategories };
      this.redux.dispatch(action);
    })
  }
}
