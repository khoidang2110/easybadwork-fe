'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { update } from '@/redux/features/counterSlice';

import { useTranslations } from "next-intl";

const MenuBot = () => {
  const t = useTranslations('BotMenu');
  const dispatch = useAppDispatch();
  const localeActive = useLocale();

  const countRedux = useAppSelector((state) => state.counter.count);
  // const countRedux = useAppSelector(state => state.counter.count);
  // console.log("countRedux", countRedux);

  const [isToggled, setIsToggled] = useState(false);
  const [tabActive, setTabActive] = useState('');

 //console.log("istogled", isToggled);
  // console.log("tabActive", tabActive);
  const router = useRouter();
  const pathname = usePathname();
  const pathnameLocale= pathname.slice(3)
  //console.log("pathname locale", pathnameLocale);
  //const pathnameDetail = 
  //lam lai pathname ID ( htem /vn)
  const pathnameId = pathname.slice(8);
//console.log("pathnameId",pathnameId)
// const pathnameCategory = pathname.substr(4,8);
// console.log('pathnameCategory',pathnameCategory)
 const pathnameAdmin = pathname.slice(4,9);
  //const pathnameInfo = pathname.slice(4,15);
  const pathnameChild = pathname.slice(4,15);
 // const pathnamePayment = pathname.slice(4,11);
  console.log('pathname pay:',pathnameChild)
  let hideMenuBar = false;
  if (pathnameAdmin === 'admin' || pathnameChild==='information' || pathnameChild ==='payment' || pathnameChild == 'login' ) {
    hideMenuBar  = true;
  }

  //console.log("pathname id", pathnameId);
  //const currentProduct = products.find((product) => product.product_id === pathnameId);
  // console.log(currentProduct?.status);

  const handleToggle = (position: any) => {
   // console.log('position',position)
    if (tabActive == '') {
       console.log("mở");
      setIsToggled(!isToggled);
      setTabActive(position);
    } else if (tabActive == position) {
      // console.log("đóng");
      if (tabActive == 'deadstock') {
        router.push(`/${localeActive}/deadstock`);
        // setIsToggled(!isToggled);
        // setTabActive("");
      } else if (pathnameLocale == '/deadstock') {
        setTabActive('deadstock');
      } else if (pathnameLocale == '/cart') {
        setTabActive('cart');
      } 
      // else if(tabActive=='shop'){
        
      //     // chọn 
      //     console.log('case chọn')
      //    // setIsToggled(!isToggled);
      //    setIsToggled(!isToggled);
      //     setTabActive('');
             
      // }
      
      else {
        // console.log("case 3 đóng");
        setIsToggled(!isToggled);
        setTabActive('');
      }
    } 
    else {
      // console.log("chuyển");

      setTabActive(position);
    }
  };
  useEffect(() => {
    const countString = localStorage.getItem('count');
    const count = countString ? parseInt(countString) : 0;
    if (count !== null) {
      dispatch(update(count));
    }
    // console.log("count load lan dau", count);
    // handle menu bar active
    if (pathnameLocale == '/cart') {
      setIsToggled(!isToggled);
      setTabActive('cart');
    } else if (pathnameLocale == '/deadstock') {
      setIsToggled(!isToggled);
      setTabActive('deadstock');
    }
    //  else if ( )
  }, []);

  useEffect(() => {
    if (pathnameLocale == '/' || pathnameLocale == '/checkout') {
      setTabActive('');
      setIsToggled(false);
    }
  }, [pathname]);

  //const [product, setProduct] = useState(null);

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
    console.log('value filter', value);
   // getFilterProduct(value.toLowerCase());
        // chọn 
       //   console.log('case chọn')
          setTabActive('');
          setIsToggled(false);
  };

  // "tShirt":"T-SHIRT",
  // "headWear":"HEAD WEAR",
  // "bandana":"BANDANA",
  // "bodyCover":"BODY COVER",
  // "footWear":"FOOT WEAR",
  // "shirt":"SHIRT",
  // "decoration":"DECORATION",
  // "kid":"KID",
  // "sliver":"SLIVER",


  const dataShop = [
    { name: t('t-shirt') , id: 't-shirt' },
    { name: t('head-wear'), id: 'head-wear' },
    { name: t('body-cover'), id: 'body-coverR' },
    { name: t('bandana'), id: 'bandana' },
    { name:t('footwear'), id: 'footwear' },
    { name: t('sliver'), id: 'sliver' },
    { name: t('shirt'), id: 'shirt' },
    { name: t('decoration'), id: 'decoration' },
    { name: t('kid'), id: 'kid' },
  ];

  return (
   
    <div className={styles.footer}>
 {hideMenuBar? ("") : (  <div className={styles.fContainer}>
        <div></div>
        <div
          className={`${styles.fButtonContainer} ${
            isToggled && tabActive !== 'deadstock' && tabActive !== 'cart' ? styles.fButtonClick : ''
          }`}
        >
          <div>
            <div className={isToggled && tabActive == 'menu' ? styles.textShow : styles.textHide}>
            <Link href={`https://www.khimdang.com/`  } >
              <p>{t('about')}</p>
            </Link>
              <p>{t('stores')}</p>
              <p>{t('contact')}</p>

    
            </div>

            <div className={isToggled && tabActive == 'shop' ? styles.textShow : styles.textHide}>
              {dataShop.map((item, index) => (
                <Link href={`/${localeActive}/category/${item.id}/`  } key={index}>
                <p onClick={() => handleFilter(item.name)} key={item.id}>
                  {item.name}
                </p>
</Link>




              ))}
            </div>

            <div className={isToggled && tabActive == 'search' ? styles.textShow : styles.textHide}>
              <input type="text" placeholder={t('typeHere')} className={styles.inputBg} />
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handleToggle('menu')}
              className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi :  styles.fButton} ${isToggled && tabActive == 'menu' ? styles.fButtonActive : ''}`}
            >
              <svg
                // className="w-5 h-3"
                style={{ width: '15px', height: 'auto' }}
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="64.000000pt"
                height="64.000000pt"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  className={`z-30 ${styles.fButton} ${isToggled && tabActive == 'menu' ? styles.fButtonActive : ''}`}
                  transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M9 624 c-9 -11 -10 -20 -2 -32 9 -15 41 -17 313 -17 272 0 304 2 313
17 8 12 7 21 -2 32 -12 14 -52 16 -311 16 -259 0 -299 -2 -311 -16z"
                  />
                  <path
                    d="M5 430 c-15 -48 -3 -50 315 -50 318 0 330 2 315 50 -6 20 -13 20
-315 20 -302 0 -309 0 -315 -20z"
                  />
                  <path
                    d="M10 255 c-6 -8 -9 -23 -5 -35 6 -20 13 -20 315 -20 302 0 309 0 315
20 15 48 3 50 -315 50 -248 0 -300 -2 -310 -15z"
                  />
                  <path
                    d="M9 54 c-9 -11 -10 -20 -2 -32 9 -15 41 -17 313 -17 272 0 304 2 313
17 8 12 7 21 -2 32 -12 14 -52 16 -311 16 -259 0 -299 -2 -311 -16z"
                  />
                </g>
              </svg>
            </button>

            <button
              className={`z-30  ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${isToggled && tabActive == 'shop' ? styles.fButtonActive : ''}`}
              onClick={() => handleToggle('shop')}
            >
          {t('shop')} 
            </button>
            <button
              className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${isToggled && tabActive == 'search' ? styles.fButtonActive : ''}`}
              onClick={() => handleToggle('search')}
            >
           {t('search')} 
            </button>
            <button
              className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton}  ${
                isToggled && tabActive == 'deadstock' ? styles.fButtonActive : ''
              }`}
              onClick={() => handleToggle('deadstock')}
            >
              <Link href={`/${localeActive}/deadstock`} className="">
              {t('deadstock')} 
              </Link>
            </button>

            <a
              className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${isToggled && tabActive == 'cart' ? styles.fButtonActive : ''}`}
              onClick={() => handleToggle('cart')}
            >
              <Link href={`/${localeActive}/cart`} className="">
              {t('cart')}  {countRedux}
              </Link>
            </a>
          </div>
        </div>
      </div>)}
    
    </div>
  );
};

export default MenuBot;
