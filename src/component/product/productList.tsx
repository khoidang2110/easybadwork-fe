'use client';
import React, { FC } from 'react';
import { Card } from 'antd';
import styles from './styles.module.css';
import { IProduct } from '@/interfaces/product';
import Link from 'next/link';
const { Meta } = Card;

interface ProductListProps {
  products: IProduct[];
  filterType: string;
}

const ProductList: FC<ProductListProps> = ({ products = [], filterType }) => {
  const filteredData = products.filter((item) => item.status === filterType);
  console.log('filtered data', filteredData);
  return (
    <div className="relative">
      <div className="pt-10 text-center">
        {/* <h1>DEAD STOCK</h1>
        <p>this place showing sold out items</p> */}
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredData.reverse().map((product) => (
          <div className={styles.CardItem}>
            <Card
              key={product.product_id} // assuming each product has an id
              hoverable
              style={{ width: '100%' }}
              cover={
                <div className={styles.cardImg}>
                  <Link href={`/detail/${product.product_id}/`}>
                    <img alt={product.name} src={product.image[0]} />
                  </Link>
                </div>
              }
            >
              <Meta title={product.name} description={`${product.price_vnd}VND`} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
