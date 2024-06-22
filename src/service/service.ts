import { axiosClient } from "./configs";
import { IOrder, IProduct } from '../interfaces/product';


export let productService = {
    getProductList: () => {
        return axiosClient.get(`/product/get-products-category/?categoryName=&page=1&size=5`);
        // return axiosClient.get<IProduct[]>(`/product/get-products-category/?categoryName=&page=1&size=5`);
      },
      getProductById: (product_id:number)=>{
        return axiosClient.get(`/product/find-product-by-id?product_id=${product_id}`)
      },
      getAllProduct:()=>{
        return axiosClient.get(`/product/get-all-product`)
      },
      createProduct:(value:any)=>{
        return axiosClient.post(`/product/create-product`,value)
      },
      updateProduct:(value:any)=>{
        return axiosClient.put(`/product/update-product`,value)
      },
      deleteProduct:(product_id:number)=>{
        return axiosClient.put(`/product/delete-product/${product_id}`)
      }
  };

  export let stockService = {
    getStockById:(product_id:number)=>{
        return axiosClient.get(`/stock/get-stock-by-id?product_id=${product_id}`)
    },
 
    createStock:(value:any)=>{
      return axiosClient.post(`/stock/create-stock`,value)
    },
    deleteStock:(stock_id:number)=>{
      return axiosClient.delete(`/stock/delete-stock?stock_id=${stock_id}`)
    },
    updateStock:(value:any)=>{
      return axiosClient.put(`/stock/update-stock`,value)
    }
  }

  export let orderService = {
    createOrder:(order:IOrder)=>{
      return axiosClient.post(`/order/create-order`,order)
    },
    getOrderByDay:(start_day:string,end_day:string)=>{
      return axiosClient.get(`/order/get-order-by-day?start_day=${start_day}&end_day=${end_day}&page=1&size=50`)
    },
  
  }

  export let userService = {
    login: (valueForm:any) => {
      return axiosClient.post(`/user/login`, valueForm);
    }
  
  };

  export let categoryService = {
    getAllCategory:()=>{
      return axiosClient.get(`/category/get-all-category`)
    }
  }