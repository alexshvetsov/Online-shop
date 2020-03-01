import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import { ProdCategory } from '../models/prodCategory';


export class AppState {
    public user: User = new User();
    public isLogged: boolean = false;
    public adminArea: boolean = false; 
    public role: number = 0;
    public allProducts: Product[] = [];
    public shownProducts: Product[] = [];
    public product: Product = new Product();
    public cart: Cart = new Cart();
    public prodCategories: ProdCategory[] = [];
    public cities: any = [];

} 