'use client';
import React, { useEffect, useState } from 'react';

import { LogoutOutlined,ShopOutlined,RiseOutlined,ProductOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { products } from '@/mockup';

import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { update } from '@/redux/features/counterSlice';
//import { getFilterProduct, getListProduct } from '@/utils/fetchFromAPI';

const MenuAdmin: React.FC<{  }> = ({  }) => {
  const dispatch = useAppDispatch();

  const countRedux = useAppSelector((state) => state.counter.count);
  // const countRedux = useAppSelector(state => state.counter.count);
  // console.log("countRedux", countRedux);

  const [isToggled, setIsToggled] = useState(false);
  const [tabActive, setTabActive] = useState('');

  // console.log("istogled", isToggled);
  // console.log("tabActive", tabActive);/
  const router = useRouter();
  const pathname = usePathname();
  //console.log("pathname menu", pathname);
  const pathnameId = pathname.slice(8);
  //console.log("pathname id", pathnameId);

  const pathnameLocale = pathname.slice(1,3);
  console.log('pathname locale:',pathnameLocale)
  // let adminPage = false;
  // if (pathnameAdmin === 'admin') {
  //   adminPage = true;
  // }



  const currentProduct = products.find((product) => product.product_id === pathnameId);
  // console.log(currentProduct?.status);

  const handleToggle = (position: any) => {
    if (tabActive == '') {
      // console.log("mở");
      setIsToggled(!isToggled);
      setTabActive(position);
    } else if (tabActive == position) {
      // console.log("đóng");
      if (tabActive == 'deadstock') {
        router.push('/deadstock');
        // setIsToggled(!isToggled);
        // setTabActive("");
      } else if (pathname == '/deadstock' || currentProduct?.status == 'deadstock') {
        setTabActive('deadstock');
      } else if (pathname == '/cart') {
        setTabActive('cart');
      } else {
        // console.log("case 3 đóng");
        setIsToggled(!isToggled);
        setTabActive('');
      }
    } else {
      // console.log("chuyển");

      setTabActive(position);
    }
  };
  // useEffect(() => {
  //   const countString = localStorage.getItem('count');
  //   const count = countString ? parseInt(countString) : 0;
  //   if (count !== null) {
  //     dispatch(update(count));
  //   }
  //   // console.log("count load lan dau", count);
  //   // handle menu bar active
  //   if (pathname == '/cart') {
  //     setIsToggled(!isToggled);
  //     setTabActive('cart');
  //   } else if (pathname == '/deadstock' || currentProduct?.status == 'deadstock') {
  //     setIsToggled(!isToggled);
  //     setTabActive('deadstock');
  //   }
  // }, []);
  useEffect(() => {
    if (pathname == '/' || pathname == '/checkout') {
      setTabActive('');
      setIsToggled(false);
    }
  }, [pathname]);

  const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   getListProduct()
  //     .then((res) => {
  //       console.log(res);
  //       setProduct(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleFilter = (value: any) => {
    console.log('value', value);
    getFilterProduct(value.toLowerCase());
  };

  const dataShop = [
    { name: 'TEE', id: 1 },
    { name: 'SHIRT', id: 2 },
    { name: 'JACKET', id: 3 },
    { name: 'BANDANA', id: 4 },
    { name: 'ACCESSORIES', id: 5 },
    { name: 'SILVER', id: 6 },
    { name: 'DECORATION', id: 7 },
  ];
  const items = [
    {
      key: '1',
      icon:
       <ShopOutlined />,
       label: 'Shop',
       onClick: () => router.push(`/${pathnameLocale}/admin`)
    },
    {
      key: '2',
      icon: <ProductOutlined />,
      label: 'Stock Manager',
      onClick: () => router.push(`/${pathnameLocale}/admin/stockmanager`)
    },
    {
      key: '3',
      icon: <RiseOutlined />,
      label: 'Statistics',
      onClick: () => router.push(`/${pathnameLocale}/admin/statistics`)
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
