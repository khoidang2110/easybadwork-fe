'use client';
import React, { useEffect, useState } from 'react';

import { LogoutOutlined,ShopOutlined,RiseOutlined,ProductOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { update } from '@/redux/features/counterSlice';
//import { getFilterProduct, getListProduct } from '@/utils/fetchFromAPI';

const MenuAdmin: React.FC<{  }> = ({  }) => {

  const localeActive = useLocale();


  // const [isToggled, setIsToggled] = useState(false);
  // const [tabActive, setTabActive] = useState('');

  // console.log("istogled", isToggled);
  // console.log("tabActive", tabActive);/
  const router = useRouter();
  const pathname = usePathname();






  // useEffect(() => {
  //   if (pathname == '/' || pathname == '/checkout') {
  //     setTabActive('');
  //     setIsToggled(false);
  //   }
  // }, [pathname]);



  
  const items = [
    {
      key: '1',
      icon:
       <ShopOutlined />,
       label: 'Shop',
       onClick: () => router.push(`/${localeActive}/admin`)
    },
    {
      key: '2',
      icon: <ProductOutlined />,
      label: 'Stock Manager',
      onClick: () => router.push(`/${localeActive}/admin/stockmanager`)
    },
    {
      key: '3',
      icon: <RiseOutlined />,
      label: 'Statistics',
      onClick: () => router.push(`/${localeActive}/admin/statistics`)
    },
    {
      key: '4',
      icon: <LogoutOutlined />,
      label: 'Log Out',
    },
  ]
  return (
    <div >
   <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
    </div>
  );
};

export default MenuAdmin;
