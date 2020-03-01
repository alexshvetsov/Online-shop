
import { User } from './user';
import { Cart } from './cart';
import { Address } from './adress'
import { Cc } from './cc';

export class Order {
    public constructor(
        public user?: User,
        public cart?: Cart,
        public address?: Address,
        public cc?: Cc, 
        public _id?: String,
    ) { }
}