'use client';
import './globals.css';
import React, { Children, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import HeaderComponent from '../component/header/HeaderComponent';

import FooterComponent from '../component/footer/FooterComponent';
import MenuBot from '@/component/menuBot/MenuBot';

import { makeStore, AppStore } from '../redux/store';
import { useRef } from 'react';
import StoreProvider from '../redux/StoreProvider';
import { LogoutOutlined,ShopOutlined,RiseOutlined,ProductOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import MenuAdmin from '@/component/menuAdmin/MenuAdmin';

const { Header, Content, Footer, Sider } = Layout;



const items = [
  {
    key: '1',
    icon: <ShopOutlined />,
    label: 'Shop',
  },
  {
    key: '2',
    icon: <ProductOutlined />,
    label: 'Stock Manager',
  },
  {
    key: '3',
    icon: <RiseOutlined />,
    label: 'Statistics',
  },
  {
    key: '4',
    icon: <LogoutOutlined />,
    label: 'Log Out',
  },
]
const RootLayout = ({ children }: React.PropsWithChildren) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const itemCount = Children.count(children);

  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  const pathname = usePathname();
  //console.log('pathname menu', pathname);
  const pathnameAdmin = pathname.slice(0,6);
  //console.log('pathname admin',pathnameAdmin)
  let hideMenu = false;
  let adminMenu = false;
  // if (pathname === '/about' || pathname === '/admin' || pathname ==='/login') {
  //   hideMenu = true;
  // }

  if (pathnameAdmin === '/admin' || pathname === '/login') {
    hideMenu = true;
  }
  if (pathnameAdmin === '/admin') {
    adminMenu = true;
  }

  return (
    <html lang="en">
      {hideMenu ? (
        adminMenu ? (
          <body>
             <StoreProvider count={itemCount}>
                    <Layout>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div className="demo-logo-vertical" />
            {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} /> */}
            <MenuAdmin itemCount={itemCount} />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, background: colorBgContainer,textAlign:'center',fontWeight:'bold',fontSize:'32px' }}>EASYBADWORK</Header>
            <Content style={{ margin: '24px 16px 0' }}>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                     
           
              <div className="">{children}</div>
          
        
          
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
        </StoreProvider>
          </body>
  
    
        ) : (
          <body className="">
            <StoreProvider count={itemCount}>
              <div className="">{children}</div>
            </StoreProvider>
          </body>
        )
      ) : (
        <body className="p-2 bg-white">
          <HeaderComponent />
          <StoreProvider count={itemCount}>
            <div className="pt-10">{children}</div>
            <MenuBot itemCount={itemCount} />
          </StoreProvider>
          <FooterComponent />
        </body>
      )}
    </html>
  );
};

export default RootLayout;
