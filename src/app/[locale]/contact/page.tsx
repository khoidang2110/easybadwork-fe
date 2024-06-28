"use client"
import React, { useEffect } from 'react';

import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations('contact');

 return (
  
  <div  className='pt-20 text-center  '>
  <p className='text-xl font-semibold roboto pb-3' >{t('contact')}</p>
 
<p className='text-xl roboto'> {t('order')}</p>
<p className='text-xl roboto pb-20'>easybadwork@gmail.com </p> 
 
  </div>
);
};

export default Contact;