'use client';
import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Card, Col, Row } from 'antd';
import styles from './styles.module.css';
import ProductList from '@/component/product/productList';



const DeadStock = () => {
  return (
    <div className="relative">
      <div className=" text-center">
        <h1 className="py-4 text-xl roboto">DEAD STOCK</h1>
        <p>This place showing sold out items</p>
      </div>
      <ProductList filterType='' noStock={true} />
    </div>
  );
};

export default DeadStock;
