"use client";
import "./globals.css";
import React from 'react';

import Header from '../component/header/Header';

import Footer from "../component/footer/Footer";
import MenuBot from "@/component/menubot/MenuBot";






const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body 
    className="p-2 bg-white"
  
    >
      <Header/>
      
     <div className="pt-10">
   
   {children}
     </div>
   <MenuBot/>
      {/* <Footer/> */}
    </body>
  </html>
);

export default RootLayout;