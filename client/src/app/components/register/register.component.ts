import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Address } from 'src/app/models/adress';
import { Router } from '@angular/router';
import { UserServices } from 'src/app/services/user.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { CartService } from 'src/app/services/cart.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // public adress: Adress= new Adress()
  public user: User = new User()
  public error: boolean | string;

  constructor(
    private redux: NgRedux<AppState>,
    private userServices: UserServices,
    private router: Router,
    private cartServices: CartService) { }

  ngOnInit() {
    this.error = false;
  }


//check if user available and register
  public register() {
    this.user.username = this.user.email;
    this.userServices.register(JSON.stringify(this.user)).subscribe(data => {
      const loginData = { username: this.user.username, password: this.user.password }
      this.userServices.login(JSON.stringify(loginData))
        .subscribe(
          async (data) => {
            const action: Action = { type: ActionType.login, payload: data };
            await this.redux.dispatch(action);
            const secondAction: Action = { type: ActionType.newCart, payload: this.redux.getState().user._id };
            this.redux.dispatch(secondAction);
            this.router.navigate(["/products"])
          },
          err => console.log(err)
        )
    }, err => {
      this.error = err.error;
    }
    )
  }
}