

export interface IStock {
  size: string;
  stock: number;
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