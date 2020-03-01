import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../redux/appState';
import { Action } from '../redux/action';
import { ActionType } from '../redux/actionType';

@Injectable({
  providedIn: 'root'
})
export class UserServices { 
  
  
  
    constructor(private httpClient:HttpClient, private redux: NgRedux<AppState>) { }

// register user to DB
  public register(body: any){
    return this.httpClient.post('http://127.0.0.1:3000/auth/register',body,{  
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  }
  
//login user to site 
  public login(body: any){
    return this.httpClient.post('http://127.0.0.1:3000/auth/login',body,{  
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json') 
    });
  } 

  public user(){
    return this.httpClient.get('http://127.0.0.1:3000/auth/home',{  
      observe:'body', 
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  } 

//check if user is already logged from this computer 
  public isLoggedCheck(){
    return this.httpClient.get('http://127.0.0.1:3000/auth/isLogged',{  
      observe:'body', 
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  }

//logout user from site
  public logout(){
    return this.httpClient.get('http://127.0.0.1:3000/auth/logout',{  
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('Content-Type','application/json')
      
    });
  }
}
