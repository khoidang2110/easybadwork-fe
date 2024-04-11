'use client'
import { useParams } from 'next/navigation'

import { products } from '@/mockup';
import CarouselComponent from '@/component/carousel/CarouselComponent';



import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { increment, update } from '@/redux/slices/counterSlice';
import { updateLocalStorageData } from '@/redux/slices/localStorageSlice';





const Detail=() => {

  const dispatch = useAppDispatch()
  
  let count = useAppSelector(state => state.counter.count);
  console.log('count add',count)
  const params = useParams();
  console.log(params.id);


  
  const handleClick = () => {
    count = count +1;
    
    localStorage.setItem('count', count.toString());
    dispatch(update(count));
  };

  const currentProduct = products.find(product => product.id === params.id);

  // Check if the currentProduct is found
  if (!currentProduct) {
    return <div>Product not found</div>;
  }

  return (
    <section className='pt-1'>
      {/* <img src={currentProduct.image[0]} alt="" /> */}
      <CarouselComponent products={currentProduct.image}/>
      <p>1369000d</p>
      <p>name: mikey</p>
      <p>detail</p>
      <p>Our classic short sleeve printed t-shirt. Lost in Translation&nbsp;art by Sam Harkham&nbsp;on the front.</p>
      <p>SIZE</p><p>Size Chart</p>
      <p>S X L</p>
      <p> - 1 +</p>
      <button onClick={handleClick}>Add to Cart</button>
    </section>
  );
}

export default Detail;
