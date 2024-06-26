"use client";
import { Button } from "antd";
import { useLocale } from 'next-intl';
import React, { FC, useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateItem } from "@/redux/features/cartSlice";
import { update } from "@/redux/features/counterSlice";
import { IProduct, IProductCart } from "@/interfaces/product";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { NO_IMAGE } from "@/constant";
// interface ProductProps {
//   products: IProduct[];

// }

// const Cart: FC<ProductProps> = () => {
const Cart = () => {
  const localeActive = useLocale();
  const t = useTranslations('cart');
  const [note, setNote] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
console.log('note',note)
  const handleChangeNote = (event:any) => {
    setNote(event.target.value);
  };

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    if (cartString) {
      const cart = JSON.parse(cartString);
      dispatch(updateItem(cart));
    }
  }, []);

  let count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();
  const cartRedux = useAppSelector((state) => state.cart.items);
   console.log("cartRedux", cartRedux);

  const handleRemove = (index: number,itemQuantity:number) => {
    console.log("id item remove", index);
console.log("so luong cua item",itemQuantity)
    count = count - itemQuantity;
    localStorage.setItem("count", count.toString());
    dispatch(update(count));

   
    const updatedCart = uniqueProducts.filter((_, i) => i !== index);
    console.log("updated cart khi xoa",updatedCart)
   
 
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch(updateItem(updatedCart));
  };
const handleContinue =()=>{
  localStorage.setItem("note",note);
}



useEffect(() => {
  const price = cartRedux.reduce(
    (acc, product) =>
      localeActive === 'vi'
        ? acc + product.price_vnd * product.quantity
        : acc + product.price_usd * product.quantity,
    0
  );
  setTotalPrice(price);
}, [cartRedux, localeActive]);
  // console.log("totalPrice", totalPrice);

  const uniqueProducts = cartRedux.reduce<IProductCart[]>((acc, product) => {
    const existingProduct = acc.find(p => p.product_id === product.product_id && p.size === product.size);
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      acc.push({ ...product });
    }
    return acc;
  }, []);

  console.log("uniqueProducts", uniqueProducts);




  return (
    <div className="text-center  px-2 roboto">
      <h3 className="py-4 text-xl">{t('yourCart')}</h3>
      <div className="flex flex-row justify-between px-3 py-4 text-sm">
        <p>{t('product')}</p>
        <p>{t('remove')}</p>
      </div>
      {/*  nơi chứa list item */}
      <div>
        {uniqueProducts.map((item,index) => (
          <div className="border-dashed border rounded border-black p-4 flex flex-row mb-2 " key={index}>
         
            {item.image && item.image.length > 0 ? (
              <img
                src={item.image[0]}
                alt=""
                className="mr-3"
                style={{ width: "65px", height: "auto", objectFit: "contain" }}
              />
            ) : (
              <img
                src={NO_IMAGE} // You can set a default image path if needed
                alt="default"
                className="mr-3"
                style={{ width: "65px", height: "auto", objectFit: "cover" }}
              />
            )}
            <div className="mr-10 w-full text-left">
              <p>{item.name}</p>
              <p>{t('size')}: {item.size.toUpperCase()}</p>
              <p>{t('quantity')}: {item.quantity}</p>
              <p>{localeActive=='vi' ? (item?.price_vnd*(item.quantity) ).toLocaleString():(item?.price_usd*(item.quantity) ).toLocaleString() } {t('currency')}</p>
            </div>
            <div className="right-4">
              <Button
                onClick={() => handleRemove(index,item.quantity)}
                type="text"
                shape="circle"
                icon={<CloseOutlined />}
                size={"small"}
                style={{ backgroundColor: "#f3f3f3", color: "black" }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="border-dashed border rounded border-black p-4 flex flex-row justify-between mb-2 mt-8 ">
        <p>{t('summary')}</p>
        <p>{count}</p>
      </div>
      <div className="border-dashed border rounded border-black p-4 mb-2 text-left">
     
        <div className="flex justify-between">
        <p>{t('subtotal')}</p>  <p> {totalPrice.toLocaleString()} {t('currency')}</p>
        </div>
        <p>{t('taxes&ship')} </p> 
      </div>
      <input type="text" placeholder={t('addNote')} value={note} onChange={handleChangeNote}   className="w-full border-dashed border rounded border-black p-4 mb-2 text-left"/>
     {totalPrice==0 ? '' :    <Link href={`/${localeActive}/information`} >
        <div
          className=" rounded p-4 mb-2  mt-8 text-white flex justify-between   "
          style={{ backgroundColor: "#002549" }}
        >
          <button className="pr-2" onClick={handleContinue}> {t('checkOut')}</button>
          <p> {totalPrice.toLocaleString()} {t('currency')}</p>
        </div>
      </Link> } 
      
   
      <Link href={`/`}>
      <div
        className=" rounded  p-4 mb-2 "
        style={{ backgroundColor: "#d8d8d8" }}
      >
      
          <button onClick={handleContinue}>{t('continueShopping')}</button>
    
      </div>
      </Link>
    </div>
  );
};

export default Cart;
