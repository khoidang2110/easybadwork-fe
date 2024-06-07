"use client"

import React  from 'react';
import { useTranslations } from "next-intl";



const Home = () => {
const t = useTranslations('Index');
  // console.log(t('title'))
  return(
  <div className="App">
 
<img src="/images/bandana.png" alt="" />
<div>{t('title')}</div>
  </div>
);}

export default Home;