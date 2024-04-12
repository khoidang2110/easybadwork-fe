"use client";
import { Button } from "antd";

import React, { FC, useEffect } from "react";
import { CloseOutlined} from '@ant-design/icons';
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateItem } from "@/redux/slices/cartSlice";
import { update } from "@/redux/slices/counterSlice";
import { IProduct } from "@/interfaces/product";


// interface ProductProps {
//   products: IProduct[];

// }


// const Cart: FC<ProductProps> = () => {
  const Cart  = () => {

    useEffect(() => {
      const cartString = localStorage.getItem("cart");
      if(cartString){
        const cart = JSON.parse(cartString)
        dispatch(updateItem(cart));
      }
   
   
      
    }, []);


  let count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();
  const cartRedux = useAppSelector((state) => state.cart.items);
console.log("cartRedux",cartRedux)

const handleRemove = (id:string) =>{
  count = count - 1;
  localStorage.setItem("count", count.toString());
  dispatch(update(count));

console.log("id item remove",id)
const updatedCart = cartRedux.filter(item => item.id !== id);
dispatch(updateItem(updatedCart));
// trừ count khi xoá

}


  return(
  <div className="text-center pt-20 px-2">
    <h3 className="py-4 text-xl">YOUR CART</h3>
    <div className="flex flex-row justify-between px-3 py-4 text-sm">
      <p>PRODUCT</p>
      <p>REMOVE</p>
    </div>
    {/*  nơi chứa list item */}
    <div>
      { cartRedux.map(item=>(
 <div className="border-dashed border rounded border-black p-4 flex flex-row mb-2 " >
      

<img  src={item.image[0]} alt="" className="mr-3" style={{width:'65px',height:'auto',objectFit:"cover"}} />
 <div className="mr-10 w-full text-left">
   <p>{item.name}</p>
   <p>Size</p>
   <p>{item.price}</p>
 </div>
 <div className="right-4">
  
 <Button  onClick={() => handleRemove(item.id)}   type="primary" shape="circle" icon={<CloseOutlined /> } size={"small"} style={{ backgroundColor: '#f3f3f3', color: 'black' }}/>
 </div>
</div>
      ))}
     

    </div>
<div className="border-dashed border rounded border-black p-4 flex flex-row justify-between mb-2 mt-8 ">
  <p>SUMARY</p>
  <p>{count}</p>
</div>
<div className="border-dashed border rounded border-black p-4 mb-2 text-left">
  <p>SUBTOTAL</p>
  <p>Taxes & shipping calculated at checkout</p>
</div>
<div className="border-dashed border rounded border-black p-4 mb-2 text-left">
  Add Note
</div>
<div className=" rounded p-4 mb-2  mt-8 " style={{backgroundColor:'#d0f491'}}>
<button > CHECK OUT 500000</button>
</div>

<div className=" rounded  p-4 mb-2 " style={{backgroundColor:'#f3f3f3'}}>
<button >CONTINUE SHOPPING</button>
</div>


  </div>
);}

export default Cart;
