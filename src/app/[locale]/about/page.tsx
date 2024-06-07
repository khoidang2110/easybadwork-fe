"use client"
import React from 'react';
import { Button } from 'antd';
import Image from 'next/image';


const About = () => (
  <div  className=''>
 
 <div className='flex justify-center '>
 <Image
              width={500}
              height={500}
              src="/images/bandana.png"
            
              alt="bandana"
/>
 </div>

<div className='px-5'>
<p className='text-center'>
easybadwork được lập ra từ năm 2019 bởi nghệ sĩ KhimDang với mục đích sản xuất ra sản phẩm phục vụ chính anh ấy. Trong quá trình sản xuất thì vô tình sử dụng không hết nên anh ấy đã mang đi bán bớt thông qua easybadwork.

Anh ấy vẫn cố gắng mỗi ngày để có đồ đẹp xịn sử dụng, các bạn hãy yên tâm nhé!
</p>
</div>


  </div>
);

export default About;