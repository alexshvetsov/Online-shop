import { Address } from './adress';
//role [0:user , 1:admin, 2:sadran]
export class User{
   
    public constructor(
      public role:Number=0,
        public _id?:String,
        public firstName?: String,
        public lastName?: String,
        public username?:String,
        public email?: String,
        public password?: String,
        public phone?:String,
        // public adress?:Adress
      ){}
}