import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { AsideComponent } from './components/aside/aside.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {NgRedux, NgReduxModule} from 'ng2-redux';
import {AppState} from './redux/appState';
import {Reducer} from './redux/reducer';
import { HomeComponent } from './components/home/home.component';
import { UserServices } from './services/user.service';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CartProductComponent } from './components/cart-product/cart-product.component';
import { OrderComponent } from './components/order/order.component';
import { HeadingComponent } from './components/heading/heading.component';
import { AdminComponent } from './components/admin/admin.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { OrderdComponent } from './components/orderd/orderd.component';

@NgModule({
  declarations: [
    LayoutComponent,
    AsideComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    CartComponent,
    CartProductComponent,
    OrderComponent,
    HeadingComponent,
    AdminComponent,
    NewProductComponent,
    OrderdComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgReduxModule
  ],
  providers: [UserServices],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(ngRedux:NgRedux<AppState>){
    ngRedux.configureStore(Reducer.reduce,new AppState())
  }
 }
