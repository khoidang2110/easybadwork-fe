//'use client';
import './globals.css';
import React, { Children, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HeaderComponent from '../../component/header/HeaderComponent';

import FooterComponent from '../../component/footer/FooterComponent';
import MenuBot from '../../component/menuBot/MenuBot';

import { makeStore, AppStore } from '../../redux/store';
import { useRef } from 'react';


import { Layout, Menu, theme } from 'antd';
import MenuAdmin from '@/component/menuAdmin/MenuAdmin';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import StoreProvider from './StoreProvider'

const { Header, Content, Footer, Sider } = Layout;



export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  
  const messages = await getMessages();
  return (
    <html lang={locale}>
    
        <body className="p-2 bg-white">
          <HeaderComponent />
          <StoreProvider>
            <div className="pt-10"> 
              <NextIntlClientProvider messages={messages}>
          {children}
          <MenuBot />
        </NextIntlClientProvider>
        </div>
           
          </StoreProvider>
          <FooterComponent />
        </body>
    
    </html>
  );
};


