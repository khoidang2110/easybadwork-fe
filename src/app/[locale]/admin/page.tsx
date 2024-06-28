"use client";

import React, { useEffect, useState } from 'react';
import { Space, Table, DatePicker, Drawer } from 'antd';
import type { TableProps } from 'antd';
import type { DatePickerProps } from 'antd';
import { orderService, productService } from '@/service/service';
import type { DrawerProps } from 'antd';

interface LittleDataType {
  order_cart_id: number;
  order_id: string;
  product_id: number;
  image: string;
  name: string;
  quantity: number;
  size: string;
  price_vnd:number;
}

interface DataType {
  order_id: string;
  full_name: string;
  email: string;
  phone: string;
  payment: string;
  note:string;
  order_cart?: LittleDataType[];
}

const ShopPage = () => {
  const [allProduct, setAllProduct] = useState<any[]>([]);
  console.log('all product', allProduct);
  const [dayPick, setDayPick] = useState<string>('');
  const [orderList, setOrderList] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<DataType | null>(null);
  console.log('order list', orderList);
  console.log('day pick', dayPick);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDayPick(dateString.toString());
  };

  console.log('currentOrder', currentOrder);

  const showDrawer = async (order: DataType) => {
    console.log('order pick', order);

    setOpen(true);
    if (order.order_cart) {
      const updatedCart = order.order_cart.map((item) => {
        const product = allProduct.find((p) => p.product_id === item.product_id);
        return {
          ...item,
          name: product ? product.name : item.name,
          image: product ? product.image[0] : item.image,
          price_vnd: product ? product.price_vnd : item.price_vnd
        };
      });

      setCurrentOrder({ ...order, order_cart: updatedCart });
    } else {
      setCurrentOrder(order);
    }
  };

  const onClose = () => {
    setOpen(false);
    setCurrentOrder(null);
  };

  const columns: TableProps<DataType>['columns'] = [
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
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: 'Payment',
      key: 'payment',
      dataIndex: 'payment',
    },
    
    {
      title: 'Note',
      key: 'note',
      dataIndex: 'note',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <button onClick={() => showDrawer(record)}>
            <a>Detail</a>
          </button>
        </Space>
      ),
    },
  ];

  const LittleColumns: TableProps<LittleDataType>['columns'] = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => (text ? <img src={text} alt="product" width={50} /> : 'No image'),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price vnd',
      dataIndex: 'price_vnd',
      key: 'price_vnd',
    },
  ];

  useEffect(() => {
    if (typeof dayPick === 'string' && dayPick) {
      orderService
        .getOrderByDay(dayPick, dayPick)
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
    productService
      .getAllProduct()
      .then((res) => {
        console.log(res);
        setAllProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className='flex'>
        <p className='pb-2 pr-2'>Xem đơn đặt hàng theo ngày</p>
        <DatePicker className='mb-2' onChange={onChange} size='large' />
      </div>

      <Table columns={columns} dataSource={orderList} />

      <Drawer
        title="Order Detail"
        placement='left'
        closable={false}
        onClose={onClose}
        size='large'
        open={open}
        key='left'
      >
        <p>Số order {currentOrder?.order_id}</p>
        <p>Tên {currentOrder?.full_name}</p>
        <p>Số điện thoại {currentOrder?.phone}</p>
        <p>Email {currentOrder?.email}</p>
        <p>Đơn hàng</p>
        <Table columns={LittleColumns} dataSource={currentOrder?.order_cart} />
      </Drawer>
    </>
  );
};

export default ShopPage;
