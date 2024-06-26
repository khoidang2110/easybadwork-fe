'use client';
import React, { FC } from 'react';
import { Card } from 'antd';
import styles from './styles.module.css';
import { IProduct, ProductListProps } from '@/interfaces/product';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { productService } from '@/service/service';
import { NO_IMAGE } from '@/constant';
// import { getListProduct, getFilterProduct } from '../../utils/fetchFromAPI';

const { Meta } = Card;


const ProductList: FC<ProductListProps> = ({filterType,noStock }) => {
  const pathname = usePathname();
  const localeActive = useLocale();
  const pathnameDeadStock = pathname.slice(4);
  console.log('pathnameDeadStock',pathnameDeadStock)

  let showItem = true;
  if(pathnameDeadStock == 'deadstock'){
    console.log('case dead stock')
    showItem = false;
  }


  const [products, setProducts] = useState<IProduct[]>([]);
  console.log("product api state",products)

  useEffect(() => {
    productService
      .getProductListById(filterType)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.warn('Unexpected response data:', res.data);
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  let filteredData = products;
// console.log('dead noStock',noStock)
  if (noStock&&filterType=='') {
    filteredData = products.filter(product => 
      product.stock.length === 0 || product.stock.every(stockItem => stockItem.stock === 0)
    );
    // console.log('case1 filter dead')
  } 
  else if (filterType !== '') {
    // console.log('case2 filter dead')
    const productsWithStock = filteredData?.filter(product => 
      product.stock.length > 0 && !product.stock.every(stockItem => stockItem.stock === 0)
    );
    filteredData = productsWithStock.filter(product => product.category === filterType);
  }

  console.log('Filtered Data', filteredData);


  function formatNumber(num:number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <div className="relative">
      <div className="pt-10 text-center">
        {/* <h1>DEAD STOCK</h1>
        <p>this place showing sold out items</p> */}
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredData?.reverse().map((product) => (
          <div className={styles.CardItem}>
             <Link href={`/${localeActive}/detail/${product.product_id}/`  }>
            <Card
              key={product.product_id} // assuming each product has an id
              hoverable
              style={{ width: '100%' }}
              cover={
                <div className={styles.cardImg}>
                 
                    {/* <img alt={product.name} src={product.image[0]} /> */}
                    {/* <img alt={product.name} src={product.image[0] ? `http://14.225.218.217:8081/${product.image[0]?.slice(5)}` : NO_IMAGE} /> */}
                    <img alt={product.name} src={product.image[0] ? `https://api.easybadwork.com/${product.image[0]?.slice(5)}` : NO_IMAGE} />
                 
                </div>
              }
            >
              <Meta title={product.name} description={showItem && `${formatNumber(product.price_vnd)} VND`} className='roboto text-center ' />
            </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
