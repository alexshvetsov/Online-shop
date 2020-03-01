import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Cart } from '../models/cart';
import { Action } from '../redux/action';
import { ActionType } from '../redux/actionType';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient, private redux: NgRedux<AppState>) { }

//get cart if user have active cart in progress  
  public getOneCart(body:any):any{
    this.httpClient.get<Cart>("http://localhost:3000/api/carts/"+body).subscribe(cart => {
     if(typeof cart==="string"){
       const action: Action = { type: ActionType.newCart, payload:  this.redux.getState().user._id };
       this.redux.dispatch(action);
      }else{
        const action: Action = { type: ActionType.updateCart, payload: cart };
        this.redux.dispatch(action);
      }
    })
  }


  //save cart to DB
  public saveCart(body: any){
    return this.httpClient.post('http://127.0.0.1:3000/api/carts',body,{  
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  }
  
  //update cart in  DB
  public updateCart(body: any){
    return this.httpClient.put('http://127.0.0.1:3000/api/carts/'+body._id,body,{  
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  }

}
