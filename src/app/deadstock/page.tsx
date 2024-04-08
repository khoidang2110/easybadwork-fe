"use client"
import React from 'react';
import { Button } from 'antd';
import { Card, Col, Row } from 'antd';
import styles from "./styles.module.css";
import ProductList from '@/component/product/productList';
import { products } from '@/mockup'

const DeadStock = () => (
  <div className='relative' >

    <div className='pt-10 text-center'>
      <h1>DEAD STOCK</h1>
      <p>this place showing sold out items</p>
    </div>
<ProductList products={products} filterType='deadstock'/>
  </div>
);

export default DeadStock;