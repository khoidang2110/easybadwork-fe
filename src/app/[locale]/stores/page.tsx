'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';

const Stores = () => {
  return (
    <div className="pb-20 roboto">
      <p className="text-2xl font-semibold text-center roboto ">STORES</p>
      <div className={styles.storeContainer}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold">OHQUAO</p>
          <p className="text-xl">Hẻm 58 Phạm Ngọc Thạch, p.6, Q.3</p>
          <p>-</p>
          <p className="text-xl"> Hours: 08:00-20:00</p>
          <p className="text-xl"> Monday to Sunday</p>
          <Link href={`https://maps.app.goo.gl/hEdTJsAY9TDpmtyu8`}>
          <button className={styles.SizeChartButton}> SEE LOCATION</button>
          </Link>
          
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/ohquaoq3.jpeg" alt="" className={styles.storeImage} />
        </div>
      </div>
      <div className={`${styles.storeContainer} ${styles.reverse}`}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold">GLAB</p>
          <p className="text-xl">135/58 Trần Hưng Đạo, p.Cầu ông Lãnh, Q1</p>
          <p>-</p>
          <p className="text-xl"> Hours: 10:30-20:00</p>
          <p className="text-xl"> Monday to Sunday</p>
          <Link href={`https://maps.app.goo.gl/z7DUScjmq1n8ef2U7`}>
          <button className={styles.SizeChartButton}> SEE LOCATION</button>
          </Link>
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/glab.jpeg" alt="" className={styles.storeImage} />
        </div>
      </div>
      <div className={styles.storeContainer}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold">OHQUAO 19</p>
          <p className="text-xl">Đường 38, p. Thảo Điền, Q2</p>
          <p>-</p>
          <p className="text-xl"> Hours: 08:00-20:00</p>
          <p className="text-xl"> Monday to Sunday</p>
          <Link href={`https://maps.app.goo.gl/hsAPE8JPxiQf2R9H8`}>
          <button className={styles.SizeChartButton}> SEE LOCATION</button>
          </Link>
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/ohquaoq2.jpeg" alt="" className={styles.storeImage}  />
        </div>
      </div>
      <div className={`${styles.storeContainer} ${styles.reverse}`}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold">DAU HANG</p>
          <p className="text-xl">26/78 Nguyễn Bỉnh Khiêm, Đa kao, Q1</p>
          <p>-</p>
          <p className="text-xl"> Hours: 10:00-20:30</p>
          <p className="text-xl"> Monday to Sunday</p>
          <Link href={`https://maps.app.goo.gl/oQvvGV8J5oB1bvU48`}>
          <button className={styles.SizeChartButton}> SEE LOCATION</button>
          </Link>
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/dauhang.jpeg" alt="" className={styles.storeImage} />
        </div>
      </div>
    </div>
  );
};

export default Stores;
