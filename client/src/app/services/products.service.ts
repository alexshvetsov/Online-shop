import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProdCategory } from '../models/prodCategory';
import { Observable, Observer } from 'rxjs';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Action } from '../redux/action';
import { ActionType } from '../redux/actionType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { async } from '@angular/core/testing';



@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient, private redux: NgRedux<AppState>) { }


// get all products from DB and update redux
  public getAllPrdoucts(): void {
    this.httpClient.get<Product[]>("http://localhost:3000/api/products/").subscribe(async (products) => {    
      const action: Action = { type: ActionType.getAllProducts, payload: products };
      await this.redux.dispatch(action);
    })
  }

// add product to DB
public addProduct(product) {
  return this.httpClient.post("http://localhost:3000/api/products", product);
}

// upload image
  public uploadProductImage(file) {
    const formData = new FormData();
    formData.append("image", file, file.name)
    return this.httpClient.post("http://localhost:3000/upload-image", formData);
  }


//update product to DB
  public updateProduct(product) {
    return this.httpClient.put("http://localhost:3000/api/products", product);
  }

}
