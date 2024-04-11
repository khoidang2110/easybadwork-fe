import React, { FC } from 'react';
import { Carousel } from 'antd';
import { IProduct } from '@/interfaces/product';

interface CarouselItemProps {
  products:  string[];
  // filterType:string
}
const contentStyle: React.CSSProperties = {
  // width:'100%',
  //  height: '520px',
  // lineHeight: '520px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CarouselComponent: FC<CarouselItemProps> = ({ products = [] }) => { 
  
  
  
  return (
  <Carousel 

  >
{ products.map((imageUrl, index)=>(
   <div key={index}>
    
   
   <div style={contentStyle}><img src={imageUrl} alt="Description of the image"  /></div>
 </div>
)
  
)

}
 
  
    
   
 
 

  </Carousel>
);}

export default CarouselComponent;