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

  const pathname = usePathname();

  const pathnameLocale = pathname.slice(1,3);
  console.log('pathname locale:',pathnameLocale)
  // let currentLocale = "en";
  // if (pathnameLocale === 'vi') {
  //   currentLocale = pathnameLocale;
  // }

  const [check, setCheck] = useState(true);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
 // const localActive = useLocale();

  
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
    if(pathnameLocale=='en')
    setCheck(false)
  
  
  }, []);



  return (
    <div>
      <div className="">
        <div className="flex flex-col justify-between items-center ">
          <Link href={'/'} className="pt-3">
            {' '}
            <Image width={90} height={90} src="/images/khimhead.png" alt="menu" className={styles.headerImg} />
          </Link>
        </div>
        
      </div>
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
    </div>
  );
};

export default HeaderComponent;
