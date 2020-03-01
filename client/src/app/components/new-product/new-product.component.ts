import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Action } from '../../redux/action';
import { ActionType } from 'src/app/redux/actionType';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ProdCategory } from 'src/app/models/prodCategory';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  public product: Product;
  public prodCategories: ProdCategory[];
  public file;


  constructor(private productsService: ProductsService,
    private redux: NgRedux<AppState>,
    private router: Router,
    private productServices: ProductsService) { }

   ngOnInit() {
     this.redux.subscribe(() => {
      this.product = this.redux.getState().product;
      this.prodCategories = this.redux.getState().prodCategories;
    });
  }


// set product category
  public prodCategoryHandler = (prodCategory: any) => { 
   this.product.prodCategory=prodCategory
   
  }

//update the product that is updating in the redux
  public updateProduct(): void {
    const action: Action = { type: ActionType.updateProduct, payload: 'new' };
    this.redux.dispatch(action);
  }

// set file  
  public setFile(e: any) {
    this.file = e.target.files[0];
  }

//check if its new or updated product and update the DB3
  public submitForm(): void {
    if(+this.product.price<1){
      this.product.price=''
      return alert('Price must be positive');
    }
    if (!this.product._id) {
      this.productsService.uploadProductImage(this.file)
        .subscribe((newFileName: String) => {
          this.product.image = newFileName;
          this.productsService.addProduct(this.product)
            .subscribe(addedProduct => {
              const action: Action = { type: ActionType.updateProduct, payload: 'new' };
              this.redux.dispatch(action);
              this.redux.getState().allProducts.push(addedProduct);
              alert("your action has been successful")
            });
        });

    } else {
      if (!this.file) {
        this.productsService.updateProduct(this.product)
          .subscribe(updatedProduct => {
            const action: Action = { type: ActionType.updateProduct, payload: 'new' };
            this.redux.dispatch(action);
            alert("your action has been successful")

          });
      } else {
        this.productsService.uploadProductImage(this.file)
          .subscribe((newFileName: String) => {
            this.product.image = newFileName;
            this.productsService.updateProduct(this.product)
              .subscribe(updatedProduct => {
                const action: Action = { type: ActionType.updateProduct, payload: 'new' };
                this.redux.dispatch(action);
                alert("your action has been successful")
 
              });
          });
      }
    }
  }


}
