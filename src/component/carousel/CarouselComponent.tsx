import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '520px',
  lineHeight: '520px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const CarouselComponent: React.FC = () => (
  <Carousel autoplay 
  // effect="fade"
  >
    <div>
    
   
      <div style={contentStyle}><img src="/images/slider/slide1.png" alt="Description of the image"  /></div>
    </div>
    <div>
    
   
      <div style={contentStyle}><img src="/images/slider/slide1.png" alt="Description of the image"  /></div>
    </div>
    <div>
    
   
    <div style={contentStyle}><img src="/images/slider/slide1.png" alt="Description of the image"  /></div>
  </div>
 

  </Carousel>
);

export default CarouselComponent;