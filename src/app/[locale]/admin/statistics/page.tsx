"use client"
import React, { useEffect, useState } from 'react';
import { DatePicker, Table } from 'antd';
import type { DatePickerProps } from 'antd';
import { orderService, productService } from '@/service/service';

const { RangePicker } = DatePicker;

const Statistics = () => {
  const [dayPick, setDayPick] = useState<string[]>(["", ""]);
  const [orderList, setOrderList] = useState([]);
  const [orderListUpdated, setOrderListUpdated] = useState([]);
  const [allProduct, setAllProduct] = useState<any[]>([]);
  const [totalSum, setTotalSum] = useState<number>(0);

 
  const onChange: DatePickerProps['onChange'] = (dates,dateStrings) => {
    if (Array.isArray(dateStrings) && dateStrings.length === 2) {
      const [startDate, endDate] = dateStrings;
      setDayPick([startDate, endDate]);
      console.log('start', startDate, 'end', endDate);
    } else {
      setDayPick(["", ""]);
    }
  };

  const fetchAllProduct = () => {
    productService
      .getAllProduct()
      .then((res) => {
        const filtered = res.data
          .filter(product => !product.delete)
          .map(product => ({
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
    if (dayPick) {
      orderService
        .getOrderByDay(dayPick[0], dayPick[1])
        .then((res) => {
          if (res.data === 'No order found') {
            setOrderList([]);
          } else {
            setOrderList(res.data);
          }
        })
        .catch((err) => {
          console.error(err);
        });
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
        .map(order => order.order_cart.map(cartItem => {
          const product = allProduct.find(p => p.product_id === cartItem.product_id);
          return {
            price_vnd: product ? product.price_vnd : 0,
            quantity: cartItem.quantity
          };
        }))
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
      render: (text) => <a>{text}</a>,
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
      title: 'Bill',
      dataIndex: 'order_cart',
      key: 'bill',
      render: (order_cart) => {
        const bill = order_cart?.reduce((total, item) => total + (item.quantity * item.price_vnd), 0);
        return <span>{bill} VND</span>;
      },
    },
  ];

  return (
    <div className=''>
      <p>Xem doanh thu</p>
      <RangePicker onChange={onChange}  size='large' />
      <p>Doanh thu: {totalSum} VND</p>
      <Table columns={columns} dataSource={orderListUpdated} rowKey="order_id" />
    </div>
  );
};

export default Statistics;
