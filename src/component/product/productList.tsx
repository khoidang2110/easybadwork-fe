'use client';
import React, { FC } from 'react';
import { Card } from 'antd';
import styles from './styles.module.css';
import { IProduct, ProductListProps } from '@/interfaces/product';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { productService } from '@/service/service';
// import { getListProduct, getFilterProduct } from '../../utils/fetchFromAPI';

const { Meta } = Card;


const ProductList: FC<ProductListProps> = ({filterType,noStock }) => {
  const localeActive = useLocale();
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log("product api state",products)

  useEffect(() => {
    productService
      .getProductList()
      .then((res) => {
        console.log("product api", res);
        // setProducts(res.data.content);
  
        setProducts(res.data);
      })
      .catch((err) => {});
  }, []);

  let filteredData = products;

  if (noStock) {
    filteredData = products.filter(product => 
      product.stock.length === 0 || product.stock.every(stockItem => stockItem.stock === 0)
    );
  } else {
    const productsWithStock = filteredData.filter(product => 
      product.stock.length > 0 && !product.stock.every(stockItem => stockItem.stock === 0)
    );
    filteredData = productsWithStock.filter(product => product.category === filterType);
  }

  console.log('Filtered Data', filteredData);



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
                  <Link href={`/${localeActive}/detail/${product.product_id}/`  }>
                    {/* <img alt={product.name} src={product.image[0]} /> */}
                    <img alt={product.name} src={`http://14.225.218.217:8081/${product.image[0]?.slice(5)}`} />
                  </Link>
                </div>
              }
            >
              <Meta title={product.name} description={`${product.price_vnd} VND`} />
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
