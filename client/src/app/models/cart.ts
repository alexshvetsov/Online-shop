import { User } from './user';
import { Product } from './product';

export class Cart {
    public constructor(
        public user?: User,
        public _id?: String,
        public totalPrice?: Number,
        public date?: Date,
        public cartProducts?: {
            price?: number,
            product?: String,
            quantity?: number
        }[],
        public active: boolean = true
    ) { }
}