import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from '../../redux/actionType';
import { ProdCategory } from 'src/app/models/prodCategory';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {
  public shwonProducts: string;
  public searchValue: string;
  public prodCategories: ProdCategory[];
  public user:User=new User(); 

  constructor(private redux: NgRedux<AppState>, ) { }

  async ngOnInit() {
    
   await this.redux.subscribe(() => {
      this.prodCategories = this.redux.getState().prodCategories;
      this.user=this.redux.getState().user;
    });   
    this.searchValue = '';
    this.shwonProducts = '';
  }   

// search and dsiplay products that have the search value in the name or category
  public search(): void {
    const newShownProducts = this.redux.getState().allProducts.
    filter(p => p.name.toLowerCase().
    indexOf( this.searchValue.toLowerCase() )> -1|| p.prodCategory.name.toLowerCase().indexOf( this.searchValue.toLowerCase() )> -1)
    
    if(newShownProducts.length>0){
      const action: Action = { type: ActionType.swicthShownProducts, payload: newShownProducts };  
      this.redux.dispatch(action);
    }else{
      alert("No products contains your search word")
    }
  }

// diplay products by category
  public changeShownProducts(categoryID): void {
    if (categoryID === "all") {
      const action: Action = { type: ActionType.swicthShownProducts, payload: this.redux.getState().allProducts };
      this.redux.dispatch(action);
      return
    }
    const newShownProducts = this.redux.getState().allProducts.filter(p => p.prodCategory._id === categoryID)
    const action: Action = { type: ActionType.swicthShownProducts, payload: newShownProducts };
    this.redux.dispatch(action);
  }

// switch to admin area
  public changeAdminAreaTrue(value): void {  
    const action: Action = { type: ActionType.changeAdminAreaTrue, payload: value };
    this.redux.dispatch(action);
    const secondAction: Action = { type: ActionType.updateProduct, payload: 'new' };
    this.redux.dispatch(secondAction);
  }

//switch to products area
  public changeAdminAreaFalse(value): void {  
    const action: Action = { type: ActionType.changeAdminAreaFalse, payload: value };
    this.redux.dispatch(action);
  }


}
    