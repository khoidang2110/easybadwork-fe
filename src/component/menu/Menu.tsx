import React, { useState } from "react";
import type { DrawerProps, RadioChangeEvent } from "antd";
import { Button, ConfigProvider, Drawer, Radio, Space } from "antd";
import Link from "next/link";
import Image from "next/image";
import localFont from 'next/font/local'
import styles from "./styles.module.css";


const myFont = localFont({
  src: '../../app/fonts/PretoriaRegular.ttf',
  display: 'swap',
})

const Menu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Space>
        <button onClick={showDrawer}>
          <Image
            width={35}
            height={35}
            src="/images/menu.png"
            alt="menu"
            className="mx-3"
          />
        </button>
      </Space>
      <ConfigProvider
        theme={{
          token: {
            colorBgElevated: "black",
          },
        }}
      >
        <Drawer
          title="Basic Drawer"
          placement="left"
          closable={false}
          onClose={onClose}
          open={open}
          key="left"
        >
          <div
            className="absolute cursor-pointer left-7 top-7"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="40"
              height="40"
              viewBox="0 0 172 172"
              style={{ fill: "#000000" }}
            >
              <g
                fill="none"
                fill-rule="nonzero"
                stroke="none"
                stroke-width="1"
                stroke-linecap="butt"
                stroke-linejoin="miter"
                stroke-miterlimit="10"
                stroke-dasharray=""
                stroke-dashoffset="0"
                font-family="none"
                font-weight="none"
                font-size="none"
                text-anchor="none"
              >
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#ffffff">
                  <path d="M30.96,13.76c-9.45834,0 -17.2,7.74166 -17.2,17.2v110.08c0,9.45834 7.74166,17.2 17.2,17.2h110.08c9.45834,0 17.2,-7.74166 17.2,-17.2v-110.08c0,-9.45834 -7.74166,-17.2 -17.2,-17.2zM30.96,20.64h110.08c5.73958,0 10.32,4.58042 10.32,10.32v110.08c0,5.73958 -4.58042,10.32 -10.32,10.32h-110.08c-5.73958,0 -10.32,-4.58042 -10.32,-10.32v-110.08c0,-5.73958 4.58042,-10.32 10.32,-10.32zM57.47219,52.60781l-4.86437,4.86437l28.52781,28.52781l-28.52781,28.52781l4.86437,4.86437l28.52781,-28.52781l28.52781,28.52781l4.86437,-4.86437l-28.52781,-28.52781l28.52781,-28.52781l-4.86437,-4.86437l-28.52781,28.52781z"></path>
                </g>
              </g>
            </svg>
          </div>

          <div className={"pl-12 pt-12 " + myFont.className}>
            <div className="py-2.5 text-2xl font-bold">
              <Link href={"/product"} onClick={onClose} className="text-white">
                SHOP
              </Link>
            </div>
            <div className="py-2.5 text-2xl font-bold">
              <Link
                href={"/newarrivals"}
                onClick={onClose}
                className="text-white"
              >
                NEW ARRIVALS
              </Link>
            </div >
            <div className="py-2.5 text-2xl font-bold">
              <Link href={"/about"} onClick={onClose} className="text-white">
               EASYBADWORK
              </Link>
            </div>
            <div className="py-2.5 text-2xl font-bold">
              <Link href={"/contact"} onClick={onClose} className="text-white">
                CONTACT
              </Link>
            </div>
          </div>
          
        </Drawer>
      </ConfigProvider>
    </>
  );
};

export default Menu;
