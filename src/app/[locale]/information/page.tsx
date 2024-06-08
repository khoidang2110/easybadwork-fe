"use client";
import React from 'react';
import { Breadcrumb } from 'antd';
import Link from "next/link";
import { useLocale } from 'next-intl';
const Information  = () => {
  const localeActive = useLocale();

    return(
    <div className="text-center pt-20 px-2">
    
     <Breadcrumb className='flex justify-center'
      separator=">"
    items={[
      {
        title: <Link href={`/${localeActive}/cart`} className="">
       Cart 
        </Link>,
      },
      {
        title: <p className='text-black font-bold'>
  Information
        </p>
       ,
      },
      {
        title:<Link href={`/${localeActive}/payment`} className="">
        Payment
         </Link>,
      }
    ]}
  />
  <div className="flex flex-row justify-between px-3 py-4 text-sm">
        <p>SHIPPING ADDRESS</p>
        
      </div>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="Country/region"></input>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="Full Name"></input>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="Address"></input>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="Dist"></input>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="City"></input>
      <input className="border-dashed border rounded border-black p-4 mb-2 text-left w-full" placeholder="Phone"></input>
      <Link href={`/${localeActive}/payment`} >
        <div
          className=" rounded p-4 mb-2  mt-8 text-center text-white "
          style={{ backgroundColor: "#002549" }}
        >
          <button className="pr-2"> CONTINUE TO PAYMENT</button>
         
        </div>
      </Link>
    </div>
  );}
  
  export default Information;
  