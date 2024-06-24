'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Card, Col, Row } from 'antd';
import styles from './styles.module.css';
import ProductList from '@/component/product/productList';

import { useParams } from 'next/navigation';


const Category = () => {
  const params = useParams();
  const filterType = Array.isArray(params.id) ? params.id[0] : params.id;
  
  return (
    <div className="relative">
      <div className="pt-20 text-center">
        <h1 className="py-4 text-xl">cate:</h1>
        {/* <p>this place showing sold out items</p> */}
      </div>
      <ProductList  products={products}  filterType={filterType} noStock={false} />
    </div>
  );
};

export default Category ;
