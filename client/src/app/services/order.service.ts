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
export class OrderService {

  constructor(private httpClient:HttpClient, private redux: NgRedux<AppState>) { }

//add order to DB
  public saveOrder(body: any){
    return this.httpClient.post('http://127.0.0.1:3000/api/orders',body,{  
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')     
    });
  }

}
