import { ProdCategory } from './prodCategory';

export class Product{
   
    public constructor(
        public _id?:String,
        public name?: String,
        public prodCategory?:ProdCategory,
        public price?:String,
        public image?: String
      ){}
}