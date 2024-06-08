"use client";
import React, { useState } from 'react';

import { Breadcrumb } from 'antd';
import Link from "next/link";
import { useLocale } from 'next-intl';

import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';
  const Payment  = () => {
    const localeActive = useLocale();
    const [value, setValue] = useState(1);
    const onChange = (e: RadioChangeEvent) => {
      console.log('radio checked', e.target.value);
      setValue(e.target.value);
    };
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
        title: <Link href={`/${localeActive}/information`} className="">
       Information
         </Link>,
      },
      {
        title:<p className='text-black font-bold'>
       Payment
              </p>
      }
    ]}
  />
      <div className="border-dashed border rounded border-black p-4 mb-2 text-left">
        <div>
        <p>CONTACT</p>
        <p>SHIP TO</p>
        <p>abcde</p>
        <p>SHIPPING METHOD</p>
      <p>INTERNATIONAL 25USD/ITEM</p>
        </div>
      <div>
        <button>CHANGE</button>
      </div>
      </div>
      <div>
        <p>PAYMENT</p>
      </div>
      <div className="border-dashed border rounded border-black p-4 mb-2 text-left">
      <Radio.Group onChange={onChange} value={value}>
      <Space >
        <Radio value={1}>COD</Radio>
        <Radio value={2}>BANKING
        
        </Radio>
       
      </Space>
    </Radio.Group>
    {value === 2 ? <img src="/images/bankAccount.jpg" alt="" /> : null}
      </div>
      <Link href={`/${localeActive}/payment`} >
        <div
          className=" rounded p-4 mb-2  mt-8 text-center text-white "
          style={{ backgroundColor: "#002549" }}
        >
          <button className="pr-2"> COMPLETE ORDER</button>
         
        </div>
      </Link>
  </div>
);}

export default Payment;
