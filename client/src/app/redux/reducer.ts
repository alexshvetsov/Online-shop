import { AppState } from './appState';
import { Action } from './action';
import { ActionType } from './actionType';
import { User } from '../models/user';
import { Address } from '../models/adress';
import { Cart } from '../models/cart';
import { Product } from '../models/product';

export class Reducer {

    public static reduce(oldState: AppState, action: Action): AppState {
        const newState = { ...oldState };
        switch (action.type) {

            case ActionType.login:
                newState.isLogged = true;
                newState.user = action.payload;
                newState.role = action.payload.role;
                break;

            case ActionType.newCart:
                newState.cart = new Cart();
                newState.cart.user = action.payload;
                newState.cart.date = new Date();
                newState.cart.cartProducts = [];

                break;

            case ActionType.logout:
                newState.isLogged = false;
                newState.user = new User();
                newState.cart = new Cart();
                break;

            case ActionType.getAllProducts:
                newState.allProducts = action.payload
                newState.shownProducts = action.payload
                break;

            case ActionType.swicthShownProducts:
                newState.shownProducts = action.payload
                break;


            case ActionType.getAllProdCategories:
                newState.prodCategories = action.payload
                break;

            case ActionType.getCities:
                newState.cities = action.payload
                break;

            case ActionType.addToCart:
                newState.cart.cartProducts.push(action.payload)
                break;

            case ActionType.switchCartProduct:
                for (let i = 0; i < newState.cart.cartProducts.length; i++) {
                    if (newState.cart.cartProducts[i].product === action.payload.product) {
                        newState.cart.cartProducts[i].quantity += action.payload.quantity
                    }
                }
                break;

            case ActionType.deleteCartProduct:
                for (let i = 0; i < newState.cart.cartProducts.length; i++) {
                    if (newState.cart.cartProducts[i].product === action.payload) {
                        newState.cart.cartProducts.splice(i, 1)
                    }
                }
                break;

            case ActionType.updateTotalPrice:
                newState.cart.totalPrice = action.payload;
                break;

            case ActionType.updateCart:
                newState.cart = action.payload;
                break;

            case ActionType.changeAdminAreaFalse:
                newState.adminArea = false
                break;

            case ActionType.changeAdminAreaTrue:
                newState.adminArea = true
                break;

            case ActionType.updateProduct:
                if (action.payload == 'new') {
                    newState.product = new Product()
                } else {
                    newState.product = newState.allProducts.find(p => p._id == action.payload)
                }
                break;
        }




        return newState;
    }
}
