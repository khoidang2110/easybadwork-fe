export interface IProduct {
    product_id: string ;
    name:string;
    price_vnd:number;
    price_usd:number;
    desc_vi: string;
    desc_en: string;
    category:string;
    image:string[];
    stock:string[];
  }