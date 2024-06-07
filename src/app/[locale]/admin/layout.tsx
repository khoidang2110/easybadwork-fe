'use client'
import React, { useState } from 'react';
  import { Button, Layout, Menu, theme } from 'antd';
import MenuAdmin from '@/component/menuAdmin/MenuAdmin';

  const { Header, Sider, Content } = Layout;

export default function AdminLayout({
    children,  
  }: {
    children: React.ReactNode
  }) {

 const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


    return (
      <section>
       <body>
               
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
              <MenuAdmin  />
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
                     
           
                <div className=""> 
            {children}
         </div>
          
        
          
                </div>
              </Content>
        
            </Layout>
          </Layout>
         
            </body>
   
      </section>
    )
  }