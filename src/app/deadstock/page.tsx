"use client"
import React from 'react';
import { Button } from 'antd';
import { Card, Col, Row } from 'antd';
import styles from "./styles.module.css";
const { Meta } = Card;
const DeadStock = () => (
  <div className='relative' >

    <div className='pt-10 text-center'>
      <h1>DEAD STOCK</h1>
      <p>this place showing sold out items</p>
    </div>
  <div className='flex flex-wrap justify-center '>
  <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title={<p className={styles.itemName}>DISCONNECTEDLAND</p>} description="550,000VND" className=''/>
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>
    <div  className={styles.CardItem}>
    <Card
 
    hoverable
    style={{ width:'100%'  }}
    cover={<div className={styles.cardImg}>
 <img alt="example" src="/images/tshirt/mikey.jpg" />
    </div>
   }
  >
    <Meta title="DISCONNECTEDLAND" description="550,000VND" />
  </Card>
    </div>


  </div>
  </div>
);

export default DeadStock;