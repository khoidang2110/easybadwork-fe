"use client"
import React from 'react';
import { Button } from 'antd';
import FormComponent from '@/src/component/form/Form';


const Contact = () => (
  <div className='text-center pt-5'>
    <h3>Liên hệ</h3>
<p>Instagram: @easybadwork</p>
<p>Facebook: EASYBADWORK</p>
<p>Email: easybadwork@gmail.com</p>
<div className='flex justify-center'>
<FormComponent/>
</div>

  </div>
);

export default Contact ;