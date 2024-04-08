'use client'
import { useParams } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import { products } from '@/mockup';
import { IProduct } from '@/interfaces/product';
import { FC } from 'react';

interface DetailProps {
  item: IProduct;
}

const Detail: FC<DetailProps> = ({ item }) => {
  const params = useParams();
  console.log(params.id);


  const currentProduct = products.find(product => product.id === params.id);

  // Check if the currentProduct is found
  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <section className='pt-1'>
      <img src={currentProduct.image[0]} alt="" />
    </section>
  );
}

export default Detail;
