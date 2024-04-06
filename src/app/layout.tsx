"use client";
import "./globals.css";
import React from 'react';

import Header from '../component/header/Header';
import Menu from '../component/menu/Menu';
import Footer from "../component/footer/Footer";
import localFont from '@next/font/local'





const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <body 
    className="p-2 bg-white"
  
    >
      <Header/>
      
     <div className="pt-10">
   
   {children}
     </div>
   
      <Footer/>
    </body>
  </html>
);

export default RootLayout;