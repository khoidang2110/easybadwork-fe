"use client";
import "./globals.css";
import React, { useState } from 'react';

import Header from '../component/header/Header';

import Footer from "../component/footer/Footer";
import MenuBot from "@/component/menubot/MenuBot";



import { makeStore, AppStore } from '../redux/store'
import { useRef } from 'react'
import StoreProvider from "./StoreProvider";


const RootLayout = ({ children }: React.PropsWithChildren) => {
  
  const [itemCount, setItemCount] = useState(0);
  
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return(
  <html lang="en">
    <body 
    className="p-2 bg-white"
  
    >
      <Header/>
      <StoreProvider>
     <div className="pt-10">
     {/* {React.cloneElement(children, { setItemCount })}  */}
   {children }
     </div>
   <MenuBot itemCount={itemCount} />
   </StoreProvider>
      <Footer/>
    </body>
  </html>
);}

export default RootLayout;