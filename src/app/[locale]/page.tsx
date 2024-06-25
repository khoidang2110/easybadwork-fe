"use client"

import React  from 'react';
import { useTranslations } from "next-intl";



const Home = () => {
const t = useTranslations('Index');
  // console.log(t('title'))
  return(
  <div className="App">
 
<img src="/images/kos6.jpg" alt="" className='pt-8'/>
{/* <div>{t('title')}</div> */}
  </div>
);}

export default Home;