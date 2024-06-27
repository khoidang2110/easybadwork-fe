'use client'
import React, { useEffect, useState, useTransition } from 'react';
import { Button, ConfigProvider } from 'antd';
import styles from './styles.module.css';
import Image from 'next/image';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Space, Switch } from 'antd';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';


const HeaderComponent = () => {
  const localeActive = useLocale();

  const pathname = usePathname();

   const pathnameChild = pathname.slice(4,15);
   const pathnameAdmin = pathname.slice(4,9);
  //console.log('pathname child:',pathnameChild)
  //console.log('header pathname admin:',pathnameAdmin);
  // let currentLocale = "en";
  // if (pathnameLocale === 'vi') {
  //   currentLocale = pathnameLocale;
  // }
let hideHead = false;
if(pathnameChild=="information" || pathnameChild=='payment' || pathnameAdmin=='admin' ){
  hideHead=true;
}
  const [check, setCheck] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();


  
 // let onChecked = true;
  const onChange = (checked: boolean) => {
    let nextLocale = 'vi';
    console.log(`switch to ${checked}`);
 
    if(checked== false){
      nextLocale ='en'
    }
    setCheck(checked);
    startTransition(() => {
      router.replace(`/${nextLocale}`);
    });
  };
  useEffect(() => {
    if(localeActive=='en')
    setCheck(false)
  
  
  }, []);



  return (
    <div>

    
   { hideHead ? '' :  <div>
    
      <div className="">
      <div className='text-right'>
      <ConfigProvider
  theme={{
    token: {
      colorPrimary:'#002549'
    },
  }}
>
<Space direction="vertical">
    <Switch checkedChildren="VI" unCheckedChildren="EN" 
   checked ={check}
   
     onChange={onChange} />
   
  </Space>
</ConfigProvider>

      </div>
        <div className="flex flex-col justify-between items-center ">
           <Link href={'/'} className=" w-full h-24 ">
            {' '}
            <Image width={90} height={90} src="/images/ebw_logo2.png" alt="menu" className={styles.headerImg} />
          </Link> 
         
        </div>
        
      </div>
      

    </div>}
    </div>
  );
};

export default HeaderComponent;
