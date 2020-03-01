import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/adress';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { UserServices } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  public user: User = new User()
  public error:boolean;

  constructor(
    private redux: NgRedux<AppState>,
    private userServices: UserServices,
    private cartServices: CartService,
    private router: Router) { }

  ngOnInit() {
    this.error=false;
  }

//check if username and password is correct and login
  public login() {
    this.error=false;
    this.user.username = this.user.email;
    this.userServices.login(JSON.stringify(this.user))
      .subscribe(
        async (data) => {
          const action: Action = { type: ActionType.login, payload: data };
          await this.redux.dispatch(action);
       this.checkForCart(this.redux.getState().user._id)
          if (typeof this.redux.getState().cart === 'string') {
            const secondAction: Action = { type: ActionType.newCart, payload: this.redux.getState().user._id };
            await this.redux.dispatch(secondAction);
          }
          this.router.navigate(["/products"])
        },
        err => {
          this.error=true;
        }
      )
  }

// check if active cart exists
  public checkForCart(userId): any {
    this.cartServices.getOneCart(userId)

  }
}
