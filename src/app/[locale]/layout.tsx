//'use client';
import './globals.css';
import React from 'react';

import HeaderComponent from '../../component/header/HeaderComponent';
//import { Toaster } from "react-hot-toast";
import FooterComponent from '../../component/footer/FooterComponent';
import MenuBot from '@/component/menuBot/MenuBot';
import {Roboto} from 'next/font/google';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from './StoreProvider';

const roboto_init = Roboto ({
  subsets:['latin'],
  weight:'400',
  variable:'--font-roboto',
});

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`${roboto_init.variable} p-2 bg-white`}>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
        <HeaderComponent />
        <StoreProvider>
          <div className="">
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
}
