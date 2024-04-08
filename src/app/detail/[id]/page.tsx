'use client'
import { useParams } from 'next/navigation'

import { products } from '@/mockup';




const Detail=() => {
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
