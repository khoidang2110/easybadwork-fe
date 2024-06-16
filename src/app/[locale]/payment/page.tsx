'use client';
import React, { useEffect, useState } from 'react';

import { Breadcrumb, ConfigProvider } from 'antd';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { updateItem } from '@/redux/features/cartSlice';
import type { RadioChangeEvent } from 'antd';
import { Input, Radio, Space } from 'antd';

import { useTranslations } from 'next-intl';
import styles from './styles.module.css';
import Image from 'next/image';
import { orderService } from '@/service/service';
import { ICartItem, IOrder } from '@/interfaces/product';
import { Button, Drawer } from 'antd';
import type { DrawerProps } from 'antd';
type FieldType = {
  email: string;
  country: string;
  fullName: string;
  address: string;
  dist: string;
  city: string;
  phone: string;
};
const Payment = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useAppDispatch();
  const [info, setInfo] = useState<FieldType>({
    email: '',
    country: '',
    fullName: '',
    address: '',
    dist: '',
    city: '',
    phone: '',
  });
  const t = useTranslations('payment');
  //const infoRedux = useAppSelector((state) => state.info.info);
  const cartRedux = useAppSelector((state) => state.cart.items);
  console.log('card redux', cartRedux);
  //  console.log('infoRedux',infoRedux)
  const localeActive = useLocale();

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setPaymentMethod(e.target.value);
  };

  const onFinishPayment = () => {
    
    const aggregateCartItems = (cart: any[]) => {
      return cart.reduce((acc: ICartItem[], item) => {
        const existingItem = acc.find(
          (i) => i.product_id === item.product_id && i.size === item.size
        );
    
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          acc.push({
            product_id: item.product_id,
            size: item.size,
            quantity: item.quantity,
          });
        }
    
        return acc;
      }, []);
    };
    
    const filteredCart = aggregateCartItems(cartRedux);
    console.log('filteredCart', filteredCart);


const newOrder:IOrder = {
  full_name:info.fullName,
  email: info.email,
  address: info.address,
  dist:info.dist,
  city:info.city,
  phone:info.phone,
  note:"note làm sau",
  payment:paymentMethod,
  cart:filteredCart,
}



    orderService
      .createOrder(newOrder)
      .then((res) => {
        console.log(' New oder.jsx:45 ~ .then ~ res:', res);
        localStorage.removeItem("cart");
        localStorage.removeItem("count");
        // message.success("Đăng ký thành công");
        //  navigate("/");
        // setTimeout(() => {
        //   // window.location.href = "/";

        // }, 1000);

        // form.resetFields();
        // setRandomNumber(Math.random());
        showDrawer();
      })
      .catch((err) => {
        console.log('🚀 ~ file: New order.jsx:49 ~ onFinish ~ err:', err);
        //  message.error("Đăng ký thất bại");
      });


  };

  let totalPrice: number = 0;

  if (localeActive == 'vi') {
    totalPrice = cartRedux.reduce((acc, product) => acc + product.price_vnd * product.quantity, 0);
    console.log('total price vi', totalPrice);
  } else {
    totalPrice = cartRedux.reduce((acc, product) => acc + product.price_usd * product.quantity, 0);
  }
  useEffect(() => {
    const localInfo = JSON.parse(localStorage.getItem('info') || '{}');
    if (localInfo) {
      setInfo(localInfo);
    }

    const cartString = localStorage.getItem('cart');
    if (cartString) {
      const cart = JSON.parse(cartString);
      dispatch(updateItem(cart));
    }
  }, []);

  return (
    <div className="text-center  px-2">
      <Image width={90} height={90} src="/images/khimhead.png" alt="menu" className={styles.headerImg} />
      <Breadcrumb
        className="flex justify-center"
        separator=">"
        items={[
          {
            title: (
              <Link href={`/${localeActive}/cart`} className="">
                {t('cart')}
              </Link>
            ),
          },
          {
            title: (
              <Link href={`/${localeActive}/information`} className="">
                {t('information')}
              </Link>
            ),
          },
          {
            title: <p className="text-black font-bold">{t('payment')}</p>,
          },
        ]}
      />
      <div className="flex justify-between p-3">
        <p>{t('orderTotal')}:</p>
        <p>
          {' '}
          {totalPrice.toLocaleString()} {t('currency')}
        </p>
      </div>

      <div className="border-dashed border rounded border-black p-4 mb-2 text-left">
        <div>
          <p>{t('contact')}</p>
          <p className="pl-2">Email: {info.email}</p>
          <p className="pl-2">
            {t('phone')}: {info.phone}
          </p>
          <p className="pt-4">{t('shipTo')}</p>
          <p className="pl-2">{`${info.address ? info.address : ''} ${info.dist ? info.dist : ''} ${
            info.city ? info.city : ''
          }`}</p>
          {/* <p>SHIPPING METHOD</p>
      <p>INTERNATIONAL 25USD/ITEM</p> */}
        </div>
        <div className="w-24">
          <Link href={`/${localeActive}/information`}>
            <div className=" rounded p-2  mt-8 text-center text-white " style={{ backgroundColor: '#002549' }}>
              <button className="pr-2">{t('change')}</button>
            </div>
          </Link>
        </div>
      </div>
      <div>
        <p>{t('paymentMethod')}</p>
      </div>
      <div className="border-dashed border rounded border-black p-4 mb-2 text-left">
        <ConfigProvider
          theme={{
            token: {
              /* here is your global tokens */
              // colorPrimary:"black",
              colorPrimary: '#002549',
            },
          }}
        >
          <Radio.Group onChange={onChange} value={paymentMethod}>
            <Space>
              <Radio value={'cod'}>COD</Radio>
              <Radio value={'bank'}>{t('banking')}</Radio>
            </Space>
          </Radio.Group>
        </ConfigProvider>
        {paymentMethod == 'bank' ? <img src="/images/bankAccount.jpg" alt="" /> : null}
      </div>
      <Link href={`/${localeActive}/payment`}>
        <div className=" rounded p-4 mb-2  mt-8 text-center text-white " style={{ backgroundColor: '#002549' }}>
          <button onClick={onFinishPayment} className="pr-2">
            {t('completeOrder')}
          </button>
        </div>
      </Link>
   
      <Drawer
        title=""
        placement="top"
        width={100}
        // height={80}
        closable={false}
        onClose={onClose}
        open={open}
     style={{}}
      >
        <div>
        <Image width={90} height={90} src="/images/khimhead.png" alt="menu" className={styles.headerImg} />
        <p className='pt-10 font-bold'>CHÚC MỪNG BẠN ĐÃ ĐẶT HÀNG THÀNH CÔNG</p>
        <div className=" rounded p-4 mb-2  mt-8 text-center text-white " style={{ backgroundColor: '#002549' }}>
          <button onClick={onClose} className="pr-2">
            ĐÓNG
          </button>
        </div>
        
        </div>
  
      </Drawer>
    </div>
  );
};

export default Payment;
