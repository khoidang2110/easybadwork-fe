"use client"
import { useAppDispatch } from '@/redux/hook';
import { updateProduct } from '@/redux/slices/productSlice';
import { getListProduct } from '@/utils/fetchFromAPI';
import React, { useEffect } from 'react';




const Home = () => {
  // const dispatch = useAppDispatch();
  // // const [product, setProduct] = useState(null);
  // // console.log('product be',product)
  // useEffect(() => {


  //   getListProduct()
  //     .then((res) => {
  //       dispatch(updateProduct(res));
  //       console.log(res);
  //       // setProduct(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  
  // }, []);
  
  return(
  <div className="App">
 
<img src="/images/bandana.png" alt="" />

  </div>
);}

export default Home;