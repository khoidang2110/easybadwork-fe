'use client';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { CloseOutlined  } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from '@/redux/hook';

import { update } from '@/redux/features/counterSlice';
import { Avatar, ConfigProvider, List,Button } from 'antd';
import { useTranslations } from 'next-intl';
import { IProduct } from '@/interfaces/product';
import { productService } from '@/service/service';

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
  const pathnameLocale = pathname.slice(3);
  //console.log("pathname locale", pathnameLocale);
  //const pathnameDetail =
  //lam lai pathname ID ( htem /vn)
  const pathnameId = pathname.slice(8);
  //console.log("pathnameId",pathnameId)
  // const pathnameCategory = pathname.substr(4,8);
  // console.log('pathnameCategory',pathnameCategory)
  const pathnameAdmin = pathname.slice(4, 9);
  //const pathnameInfo = pathname.slice(4,15);
  const pathnameChild = pathname.slice(4, 15);
  // const pathnamePayment = pathname.slice(4,11);
  //console.log('pathname pay:', pathnameChild);
  let hideMenuBar = false;
  if (
    pathnameAdmin === 'admin' ||
    pathnameChild === 'information' ||
    pathnameChild === 'payment' ||
    pathnameChild == 'login'
  ) {
    hideMenuBar = true;
  }

  //console.log("pathname id", pathnameId);
  //const currentProduct = products.find((product) => product.product_id === pathnameId);
  // console.log(currentProduct?.status);

  const handleToggle = (position: any) => {
    // console.log('position',position)
    if (tabActive == '') {
      console.log('mở');
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
    } else {
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



  const dataShop = [
    { name: t('t-shirt'), id: 't-shirt' },
    { name: t('head-wear'), id: 'head-wear' },
    { name: t('body-cover'), id: 'body-cover' },
    { name: t('bandana'), id: 'bandana' },
    { name: t('footwear'), id: 'footwear' },
    { name: t('sliver'), id: 'sliver' },
    { name: t('shirt'), id: 'shirt' },
    { name: t('decoration'), id: 'decoration' },
    { name: t('kid'), id: 'kid' },
  ];
  // search
  const [searchInput, setSearchInput] = useState('');
  //console.log('search keyword', searchInput);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
  //console.log('searchResults', searchResults);
  
  useEffect(() => {
 
    const delayDebounceFn = setTimeout(() => {
      if (searchInput.trim() !== '') {
      productService
        .searchProduct(searchInput)
        .then((res) => {
          if (Array.isArray(res.data)) {
            setSearchResults(res.data);
          } else {
            console.warn('Unexpected response data:', res.data);
            setSearchResults([]);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch products', err);
        });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);

  };

  const handleClickItemSearch = (product:IProduct) => {
    //console.log('product click picker',product)
    router.push(`/${localeActive}/detail/${product.product_id}/`);
    setIsToggled(false);
    setTabActive('');
  };

  const handleStoresClick = () => {
  
    router.push(`/${localeActive}/stores`);
    setTabActive('');
    setIsToggled(false);
  };
  const handleContactClick = () => {
    router.push(`/${localeActive}/contact`);
    setTabActive('');
    setIsToggled(false);
  }
const handleCloseSearch = () =>{
  setTabActive('');
  setIsToggled(false);
}

  return (
    <div className={styles.footer}>
      {hideMenuBar ? (
        ''
      ) : (
        <div className={styles.fContainer}>
          <div></div>
          <div
            className={`${styles.fButtonContainer} ${
              isToggled && tabActive !== 'deadstock' && tabActive !== 'cart' ? styles.fButtonClick : ''
            }`}
          >
            <div>
              <div className={`roboto  ${isToggled && tabActive == 'menu' ? styles.textShow : styles.textHide}`}>
                <Link href={`https://www.khimdang.com/`}>
                  <p className='text-[#002549] font-semibold'>{t('about')}</p>
                </Link>
                <button onClick={handleStoresClick}>
                <p className='text-[#002549] font-semibold'>{t('stores')}</p>
                </button>
                <br></br>
               <button onClick={handleContactClick}>
               <p className='text-[#002549] font-semibold'>{t('contact')}</p>
               </button>
                
              </div>

              <div className={` roboto ${isToggled && tabActive == 'shop' ? styles.textShow : styles.textHide}`}>
                {dataShop.map((item, index) => (
                  <Link href={`/${localeActive}/category/${item.id}/`} key={index}>
                    <p onClick={() => handleFilter(item.name)} key={item.id} className='text-[#002549] font-semibold'>
                      {item.name}
                    </p>
                  </Link>
                ))}
              </div>

              <div className={isToggled && tabActive == 'search' ? styles.textShow : styles.textHide}>
                <div className='flex justify-between'>
                <input
                  type="text"
                  placeholder={t('typeHere')}
                  className={` roboto ${styles.inputBg} text-[#002549]`}
                  value={searchInput}
                  onChange={handleSearchInputChange}
                />
                
                  <ConfigProvider
                      theme={{
                        components: {
                          Button: {
                            primaryShadow:'0 2px 0 rgba(0, 0, 0, 0.02)',
                            
                          },
                        },
                        token: {
                          colorPrimary: '#002549',
                          
                        },
                      }}
                    >
                 <Button  type="primary" onClick={handleCloseSearch} shape="circle"  size='small' icon={<CloseOutlined />} className='mt-3 mr-3'/>
                 </ConfigProvider>
                </div>
            
                {/* list tìm */}
            
                    <ConfigProvider
                      theme={{
                        token: {
                          colorPrimary: '#002549',
                        },
                      }}
                    >
                          <List
                  itemLayout="horizontal"
                  dataSource={searchResults}
                  pagination={{
                    onChange: (page) => {
                      // console.log(page);
                    },
                    pageSize: 3,
                  }}
                  renderItem={(item, index) => (
                      <List.Item>
                        <button onClick={() => handleClickItemSearch(item)} className="w-full text-left">
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                shape="square"
                                size={64}
                                src={`https://api.easybadwork.com/${item.image[0]?.slice(5)}`}
                              />
                            }
                            title={<p >{item.name}</p>}
                            description=""
                            key={index}
                          />
                        </button>
                      </List.Item>
   )}
   />
                    </ConfigProvider>
               
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => handleToggle('menu')}
                className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${
                  isToggled && tabActive == 'menu' ? styles.fButtonActive : ''
                }`}
              >
                {isToggled && tabActive == 'menu' ? (
                  <Image width={30} height={30} src="/images/icons/menuActive3.png" alt="menu" />
                ) : (
                  <Image width={30} height={30} src="/images/icons/menu3.png" alt="menu" />
                )}
              </button>

              <button
                className={`z-30 roboto   ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${
                  isToggled && tabActive == 'shop' ? styles.fButtonActive : ''
                }`}
                onClick={() => handleToggle('shop')}
              >
               <p className={ isToggled && tabActive == 'shop' ?`font-semibold text-white ` :`text-[#002549] font-semibold`}>{t('shop')} </p> 
              </button>
              <button
                className={`z-30  ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${
                  isToggled && tabActive == 'search' ? styles.fButtonActive : ''
                }`}
                onClick={() => handleToggle('search')}
              >
                {/* {t('search')}  */}
                {isToggled && tabActive == 'search' ? (
                  <Image width={30} height={30} src="/images/icons/searchActive3.png" alt="search" />
                ) : (
                  <Image width={30} height={30} src="/images/icons/search3.png" alt="search" />
                )}

                {/* <SearchOutlined style={{ fontSize: "20px" }} /> */}
              </button>
              <button
                className={`z-30 roboto ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton}  ${
                  isToggled && tabActive == 'deadstock' ? styles.fButtonActive : ''
                }`}
                onClick={() => handleToggle('deadstock')}
              >
                <Link href={`/${localeActive}/deadstock`} className={ isToggled && tabActive == 'deadstock' ?`font-semibold text-white ` :`text-[#002549] font-semibold`}>
                  {t('deadstock')}
                </Link>
              </button>

              <div
                className={`z-30 ${localeActive == 'vi' ? styles.fButtonVi : styles.fButton} ${
                  isToggled && tabActive == 'cart' ? styles.fButtonActive : ''
                }`}
                onClick={() => handleToggle('cart')}
              >
                <Link href={`/${localeActive}/cart`} className="flex ">
                  {/* {t('cart')}  */}
                  {/* <ShoppingCartOutlined style={{ fontSize: "20px" }}  /> */}
                  {isToggled && tabActive == 'cart' ? (
                    <Image width={30} height={30} src="/images/icons/cartActive3.png" alt="cart" className="pr-1" />
                  ) : (
                    <Image width={30} height={30} src="/images/icons/cart3.png" alt="cart" className="pr-1" />
                  )}
                  <p className={isToggled && tabActive == 'cart' ?`text-base roboto text-white font-semibold ` : `text-base roboto text-[#002549] font-semibold`}> {countRedux}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBot;
