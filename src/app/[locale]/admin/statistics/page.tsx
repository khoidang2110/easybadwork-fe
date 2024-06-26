"use client"
import React, { useEffect, useState } from 'react';
import { DatePicker, Table } from 'antd';
import type { DatePickerProps } from 'antd';
import { orderService, productService } from '@/service/service';
import { ICartItem, IOrderInfo, IProduct } from '@/interfaces/product';
import { Dayjs } from 'dayjs';
const { RangePicker } = DatePicker;

const Statistics = () => {
  function formatNumber(num:number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [dayPick, setDayPick] = useState<string[]>(["", ""]);
  const [orderList, setOrderList] = useState<IOrderInfo[]>([]);
  console.log('order list',orderList)
  const [orderListUpdated, setOrderListUpdated] = useState<IOrderInfo[]>([]);
  console.log('order list update price',orderListUpdated)
  const [allProduct, setAllProduct] = useState<IProduct[]>([]);
  console.log('all product',allProduct)
  const [totalSum, setTotalSum] = useState<number>(0);

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
      setDayPick([dateStrings[0], dateStrings[1]]);
    } else {
      console.log('Clear');
      setDayPick(["", ""]);
    }
  };

  const fetchAllProduct = () => {
    productService
      .getAllProduct()
      .then((res) => {
        const filtered = res.data
          .filter((product: IProduct) => !product.delete)
          .map((product: IProduct) => ({
            product_id: product.product_id,
            price_vnd: product.price_vnd,
            price_usd: product.price_usd
          }));
        setAllProduct(filtered.reverse());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (dayPick[0] && dayPick[1]) {
      orderService
        .getOrderByDay(dayPick[0], dayPick[1])
        .then((res) => {
          console.log('info order get by day', res.data)
          if (res.data === 'No order found') {
            console.log('case not found')
            setOrderListUpdated([]);
          } else {
            setOrderList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setOrderList([]);
    }
  }, [dayPick]);

  useEffect(() => {
    fetchAllProduct();
  }, []);

  useEffect(() => {
    if (orderList.length && allProduct.length) {
      const updatedOrders = orderList.map(order => ({
        ...order,
        order_cart: order.order_cart.map(cartItem => {
          const product = allProduct.find(p => p.product_id === cartItem.product_id);
          return product
            ? { ...cartItem, price_vnd: product.price_vnd, price_usd: product.price_usd }
            : cartItem;
        })
      }));
      setOrderListUpdated(updatedOrders);

      const filteredOrders = updatedOrders
        .filter(order => !order.deleted)
        .map(order => order.order_cart.map(cartItem => ({
          price_vnd: cartItem.price_vnd ?? 0,
          quantity: cartItem.quantity
        })))
        .flat();
      const totalSum = filteredOrders.reduce((sum, item) => sum + (item.price_vnd * item.quantity), 0);
      setTotalSum(totalSum);
    }
  }, [orderList, allProduct]);
  

  const columns = [
    {
      title: 'Order id',
      dataIndex: 'order_id',
      key: 'order_id',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Payment',
      dataIndex: 'payment',
      key: 'payment',
    },
    {
      title: 'Bill',
      dataIndex: 'order_cart',
      key: 'bill',
      render: (order_cart: ICartItem[]) => {
        const bill = order_cart?.reduce((total, item) => total + (item.quantity * (item.price_vnd ?? 0)), 0);
        return <span>{formatNumber(bill)} VND</span>;
      },
    },
  ];
  
  return (
    <div className=''>
      <p>Xem doanh thu</p>
      <RangePicker onChange={onRangeChange} size='large' />
      <p>Doanh thu: {formatNumber(totalSum)} VND</p>
      <Table columns={columns} dataSource={orderListUpdated} rowKey="order_id" />
    </div>
  );
};

export default Statistics;
