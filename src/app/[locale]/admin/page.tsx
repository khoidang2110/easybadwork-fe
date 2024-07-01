"use client";

import React, { useEffect, useState } from 'react';
import { Space, Table, DatePicker, Drawer,Button , Modal, ConfigProvider,  List, Avatar, Input} from 'antd';
import type { TableProps } from 'antd';
import type { DatePickerProps } from 'antd';
import { orderService, productService, stockService } from '@/service/service';
import { IProduct, IStock } from '@/interfaces/product';
import { NO_IMAGE } from '@/constant';
import styles from './styles.module.css';

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
  const [searchInput, setSearchInput] = useState('');

  //console.log('search input',searchInput)

  const [stock, setStock] = useState<IStock[]>([]);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);
//console.log('ket qua tim kiem',searchResults)

  const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
  const [allProduct, setAllProduct] = useState<any[]>([]);
  //console.log('all product', allProduct);
  const [dayPick, setDayPick] = useState<string>('');
  const [orderList, setOrderList] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [openDrawerProduct, setOpenDrawerProduct] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<DataType | null>(null);
  const [currentProduct, setCurrentProduct] = useState<IProduct | null>(null);
  //console.log('product pick',currentProduct)
  //console.log('order list', orderList);
  //console.log('day pick', dayPick);
  const [randomNumber, setRandomNumber] = useState(11);
  const [isToggled, setIsToggled] = useState(true);
  const [sizeSelect, setSizeSelect] = useState('');

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    setDayPick(dateString.toString());
  };

  const handleSearchInputChange = (event: any) => {
    setSearchInput(event.target.value);
  };
  const handleSizeChange = (position: string) => {
   
    
    
      }
  // gọi api hàng
  useEffect(() => {
    // if (searchInput.trim() === '') {
    //   setSearchResults([]); // Clear search results if search input is empty
    //   return;
    // }
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

 // console.log('currentOrder', currentOrder);

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

//Drawer tạo sp
  const onCloseDrawerProduct = () => {
    setOpenDrawerProduct(false);
   // setCurrentOrder(null);
  };

// Modal tìm sp
  const showModalProduct = () => {
    setIsModalOpenProduct(true);
  };

// tắt trang tìm sp
  const handleCancelProduct = () => {
    setIsModalOpenProduct(false);
  };
  // chọn sp
  const handleClickItemSearch = (product:IProduct) => {
console.log('chọn sp',product)
  
   // setCurrentProduct(product);
   // setIsModalOpenProduct(false);
  };

  // gọi stock size theo id
  useEffect(() => {
    stockService
      .getStockById(Number(currentProduct?.product_id))
      .then((res) => {
       // console.log("stock api", res);
        // setProducts(res.data.content);

        // filter size hết
        const filteredInventory:IStock[] = res.data.filter((item:IStock) => item.stock !== 0);
        const sizeOrder = ["xs","s", "m", "l", "xl", "xxl"];
        filteredInventory.sort((a, b) => {
          return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
        });
        setStock(filteredInventory);
      
       // setSizeSelect(filteredInventory[0].size)
       // setItemAvailable(filteredInventory[0].stock-1)
      })
      .catch((err) => {});
  }, [currentProduct]);

  return (
    <>
      <div className='flex justify-between'>
        <div className='flex'>
        <p className='pb-2 pr-2'>Xem đơn đặt hàng theo ngày</p>
         
         <DatePicker className='mb-2' onChange={onChange} size='large' />
        </div>
   
        <Button type="primary" onClick={()=>setOpenDrawerProduct(true)}>Tạo đơn hàng</Button>
      </div>

      <Table columns={columns} dataSource={orderList} />
        {/* detail */}
        <Drawer
        title="Order Detail"
        placement='left'
        closable={false}
        onClose={onClose}
        size='large'
        open={open}
        // key='left'
      >
        <p>Số order {currentOrder?.order_id}</p>
        <p>Tên {currentOrder?.full_name}</p>
        <p>Số điện thoại {currentOrder?.phone}</p>
        <p>Email {currentOrder?.email}</p>
        <p>Đơn hàng</p>
        <Table columns={LittleColumns} dataSource={currentOrder?.order_cart} />
      </Drawer>
     
      {/* tạo order */}
      <Drawer
        title="Tạo đơn hàng"
        placement='left'
        closable={false}
        onClose={onCloseDrawerProduct}
        size='default'
        open={openDrawerProduct}
        key='left'
      >
        <div className=''>
        <Button onClick={showModalProduct}>Chọn Sản phẩm </Button>
        <div className='flex pt-2'> 
            <img
                src={currentProduct?.image[0] ? `https://api.easybadwork.com/${currentProduct?.image[0]?.slice(5)}` : NO_IMAGE}
                alt=""
                className="mr-3"
                style={{ width: "65px", height: "auto", objectFit: "contain" }}
              />
              <div>
              <p>{currentProduct?.name}</p>
              <p> {currentProduct?.price_vnd.toLocaleString()} VND</p>
              </div>
              <div className='flex pt-2'>
        {stock?.map((item,index) =>(
            <div className='pr-2' key={index}>
            <button className={`${styles.SizeButton} ${isToggled && sizeSelect == item.size ? styles.SizeButtonActive : '' }`}  onClick={() => handleSizeChange(item?.size)}> 
              {item.size}
              </button>
            </div>
        ))}
          </div>
              </div>
        </div>
       
     
        
      </Drawer>
      {/* chọn sp */}
      <Modal title="Chọn Sản Phẩm" open={isModalOpenProduct} footer='' onCancel={handleCancelProduct}>
      <div className='flex justify-between'>
               
                <Input placeholder="nhập tên sản phẩm"    value={searchInput}
                  onChange={handleSearchInputChange} />
                
             
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
      </Modal>
    
    </>
  );
};

export default ShopPage;
