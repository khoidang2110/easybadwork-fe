"use client";
import { Button } from "antd";

import React, { FC, useEffect } from "react";
import { CloseOutlined} from '@ant-design/icons';
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateItem } from "@/redux/features/cartSlice";
import { update } from "@/redux/features/counterSlice";
import { IProduct } from "@/interfaces/product";
import Link from "next/link";

// interface ProductProps {
//   products: IProduct[];

// }


// const Cart: FC<ProductProps> = () => {
  const Checkout  = () => {


  return(
  <div className="text-center pt-20 px-2">
   check out page
  </div>
);}

export default Checkout;
