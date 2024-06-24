

export interface IStock {
  stock_id?:number;
  size: string;
  stock: number;
  product_id?:number;
}

export interface IProduct {
  product_id: string;
  name: string;
  price_vnd: number;
  price_usd: number;
  desc_vi: string;
  desc_en: string;
  category: string;
  image: string[];
  stock: IStock[];
  delete:boolean;
}



export interface IProductCart {
  product_id: string;
  name: string;
  price_vnd: number;
  price_usd: number;
  desc_vi: string;
  desc_en: string;
  category: string; 
  image: string[] | undefined;
  quantity: number; 
  size: string; 
}


export interface ProductListProps {
 // product:IProduct;
  products: IProduct[];
  filterType?:string;
  noStock:boolean;
}

export interface IInfo{
  email?:string;
  country?:string;
  fullName?: string;
  address?:string;
  dist?:string;
  city?:string;
  phone?:string;
}

export interface ICartItem {
  product_id: number;
  size: string;
  quantity: number;
  price_vnd?: number;
  price_usd?: number;
}

export interface IOrder {
  full_name: string;
  email: string;
  address: string;
  dist?:string;
  city?:string;
  phone:string;
  note?:string;
  payment:string;
  cart: ICartItem[];
  deleted?: boolean;
}
export interface IOrderCart {
  order_cart_id:number;
  size:string;
  quantity:number;
  order_id:string;
  product_id:number;

}
export interface IOrderInfo {
order_id:string;
date:string;
full_name:string;
email:string;
address:string;
dist?:string;
city?:string;
phone:string;
payment:string;
deleted:boolean;
order_cart:IOrderCart[]
}