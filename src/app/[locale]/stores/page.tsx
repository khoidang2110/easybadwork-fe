'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import styles from './styles.module.css';
import { useTranslations } from "next-intl";
const Stores = () => {
  const t = useTranslations('stores');
  return (
    <div className="pb-20 roboto">
      <p className="text-2xl font-semibold text-center roboto ">{t('stores')}</p>
      <div className={styles.storeContainer}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold pb-5">OHQUAO</p>
          <p className="text-xl">{t('ohquaoAddress')}</p>
          <p>-</p>
          <p className="text-xl"> {t('hours')}: 08:00-20:00</p>
          <p className="text-xl"> {t('mondayToSunDay')}</p>
          <Link href={`https://maps.app.goo.gl/hEdTJsAY9TDpmtyu8`}>
          <button className={styles.SizeChartButton}>{t('seeLocation')}</button>
          </Link>
          
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/ohquaoq3.jpeg" alt="" className={styles.storeImage} />
        </div>
      </div>
      <div className={`${styles.storeContainer} ${styles.reverse}`}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold pb-5">GLAB</p>
          <p className="text-xl">{t('glabAddress')}</p>
          <p>-</p>
          <p className="text-xl"> {t('hours')}: 10:30-20:00</p>
          <p className="text-xl"> {t('mondayToSunDay')}</p>
          <Link href={`https://maps.app.goo.gl/z7DUScjmq1n8ef2U7`}>
          <button className={styles.SizeChartButton}>{t('seeLocation')}</button>
          </Link>
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/glab.jpeg" alt="" className={styles.storeImage} />
        </div>
      </div>
      <div className={styles.storeContainer}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold pb-5">OHQUAO 19</p>
          <p className="text-xl">{t('ohquao19Address')}</p>
          <p>-</p>
          <p className="text-xl">  {t('hours')}: 08:00-20:00</p>
          <p className="text-xl">  {t('mondayToSunDay')}</p>
          <Link href={`https://maps.app.goo.gl/hsAPE8JPxiQf2R9H8`}>
          <button className={styles.SizeChartButton}>{t('seeLocation')}</button>
          </Link>
        </div>
        <div className={styles.storeImageDiv}>
          <img src="/images/stores/ohquaoq2.jpeg" alt="" className={styles.storeImage}  />
        </div>
      </div>
      <div className={`${styles.storeContainer} ${styles.reverse}`}>
        <div className={styles.storeInfoDiv}>
          <p className="text-2xl font-semibold pb-5">DAU HANG</p>
          <p className="text-xl">{t('dauhangAddress')}</p>
          <p>-</p>
          <p className="text-xl">  {t('hours')}: 10:00-20:30</p>
          <p className="text-xl">  {t('mondayToSunDay')}</p>
          <Link href={`https://maps.app.goo.gl/oQvvGV8J5oB1bvU48`}>
          <button className={styles.SizeChartButton}>{t('seeLocation')}</button>
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
