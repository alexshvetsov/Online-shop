
export class Cc{
    public constructor(
  public number?:Number |undefined,
  public expiration?:{month:Number|undefined, year:Number|undefined},
  public ccv?:number|undefined
      ){}
} 