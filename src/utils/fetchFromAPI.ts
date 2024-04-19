import axios from 'axios';

export const BASE_URL = 'http://localhost:8081';


export const getListProduct = async () => {
    const {data} = await axios.get(`${BASE_URL}/product/get-all-products`)
    return data;
   }