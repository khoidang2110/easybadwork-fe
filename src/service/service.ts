import { axiosClient } from "./configs";
import { IProduct } from '../interfaces/product';


export let productService = {
    getProductList: () => {
        return axiosClient.get(`/product/get-products-category/?categoryName=&page=1&size=5`);
        // return axiosClient.get<IProduct[]>(`/product/get-products-category/?categoryName=&page=1&size=5`);
      },
      getProductById: (product_id:number)=>{
        return axiosClient.get(`/product/find-product-by-id?product_id=${product_id}`)
      }
  };

  export let stockService = {
    getStockById:(product_id:number)=>{
        return axiosClient.get(`/stock/get-stock-by-id?product_id=${product_id}`)
    }
  }