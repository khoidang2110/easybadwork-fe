//'use client';
import './globals.css';
import React from 'react';

import HeaderComponent from '../../component/header/HeaderComponent';

import FooterComponent from '../../component/footer/FooterComponent';
import MenuBot from '@/component/menuBot/MenuBot';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from './StoreProvider';


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
}
