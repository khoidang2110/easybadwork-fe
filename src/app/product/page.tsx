"use client"
import React from 'react';
import { Button, Divider } from 'antd';
import styles from "./styles.module.css";
import { Card, Col, Row } from 'antd';

const { Meta } = Card;
const Product = () => (
  <div >


<div className='px-10'>
  <div className='flex flex-wrap'>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width: 400 }}
    cover={<img alt="example" src="/images/tshirt/mikey.jpg" />}
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
  

  </div>








</div>
  </div>
);

export default Product;