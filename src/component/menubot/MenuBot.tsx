"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { products } from "@/mockup";

import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { update } from "@/redux/slices/counterSlice";

const MenuBot: React.FC<{ itemCount: number }> = ({ itemCount }) => {
  const dispatch = useAppDispatch();

  const countRedux = useAppSelector((state) => state.counter.count);
  // const countRedux = useAppSelector(state => state.counter.count);
  console.log("countRedux", countRedux);

  const [isToggled, setIsToggled] = useState(false);
  const [tabActive, setTabActive] = useState("");

  console.log("istogled", isToggled);
  console.log("tabActive", tabActive);
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname menu", pathname);
  const pathnameId = pathname.slice(8);
  console.log("pathname id", pathnameId);
  const currentProduct = products.find((product) => product.id === pathnameId);
  console.log(currentProduct?.status);
  const handleToggle = (position: any) => {
    if (tabActive == "") {
      console.log("mở");
      setIsToggled(!isToggled);
      setTabActive(position);
    } else if (tabActive == position) {
      console.log("đóng");
      if (tabActive == "deadstock") {
        router.push("/deadstock");
        // setIsToggled(!isToggled);
        // setTabActive("");
      } else if (
        pathname == "/deadstock" ||
        currentProduct?.status == "deadstock"
      ) {
        setTabActive("deadstock");
      } else if (pathname == "/cart") {
        setTabActive("cart");
      } else {
        console.log("case 3 đóng");
        setIsToggled(!isToggled);
        setTabActive("");
      }
    } else {
      console.log("chuyển");

      setTabActive(position);
    }
  };
  useEffect(() => {
    const countString = localStorage.getItem("count");
    const count = countString ? parseInt(countString) : 0;
    if (count !== null) {
      dispatch(update(count));
    }
    console.log("count load lan dau", count);
    // handle menu bar active
    if (pathname == "/cart") {
      setIsToggled(!isToggled);
      setTabActive("cart");
    } else if (
      pathname == "/deadstock" ||
      currentProduct?.status == "deadstock"
    ) {
      setIsToggled(!isToggled);
      setTabActive("deadstock");
    }
  }, []);
  return (
    <div className={styles.footer}>
      <div className={styles.fContainer}>
        <div></div>
        <div
          className={`${styles.fButtonContainer} ${
            isToggled && tabActive !== "deadstock" && tabActive !== "cart"
              ? styles.fButtonClick
              : ""
          }`}
        >
          <div>
            <div
              className={
                isToggled && tabActive == "menu"
                  ? styles.textShow
                  : styles.textHide
              }
            >
              <p>ABOUT</p>
              <p>FAIRFAX THEATRE</p>
              <p>STORES</p>
              <p>CONTACT</p>
            </div>

            <div
              className={
                isToggled && tabActive == "shop"
                  ? styles.textShow
                  : styles.textHide
              }
            >
              <p>TEE</p>
              <p>SHIRT</p>
              <p>JACKET</p>
              <p>BANDANA</p>
              <p>ACCESSORIES</p>
              <p>SILVER</p>
              <p>DECORATION</p>
            </div>

            <div
              className={
                isToggled && tabActive == "search"
                  ? styles.textShow
                  : styles.textHide
              }
            >
              <input
                type="text"
                placeholder="TYPE HERE"
                className={styles.inputBg}
              />
            </div>
            {/* <div
              className={
                isToggled && tabActive == "cart" ? styles.textShow : styles.textHide
              }
            >
            <p>YOUR CART IS EMPTY.</p>
              
              
              
            </div> */}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handleToggle("menu")}
              className={`z-30 ${styles.fButton} ${
                isToggled && tabActive == "menu" ? styles.fButtonActive : ""
              }`}
            >
              {/* <img src="/images/icons/menu4.png" className="w-5 h-3" /> */}
              <svg
                // className="w-5 h-3"
                style={{width:'15px',height:'auto'}}
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="64.000000pt"
                height="64.000000pt"
                viewBox="0 0 64.000000 64.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                 className={`z-30 ${styles.fButton} ${
                  isToggled && tabActive == "menu" ? styles.fButtonActive : ""
                }`}
                  transform="translate(0.000000,64.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M9 624 c-9 -11 -10 -20 -2 -32 9 -15 41 -17 313 -17 272 0 304 2 313
17 8 12 7 21 -2 32 -12 14 -52 16 -311 16 -259 0 -299 -2 -311 -16z"
                  />
                  <path
                    d="M5 430 c-15 -48 -3 -50 315 -50 318 0 330 2 315 50 -6 20 -13 20
-315 20 -302 0 -309 0 -315 -20z"
                  />
                  <path
                    d="M10 255 c-6 -8 -9 -23 -5 -35 6 -20 13 -20 315 -20 302 0 309 0 315
20 15 48 3 50 -315 50 -248 0 -300 -2 -310 -15z"
                  />
                  <path
                    d="M9 54 c-9 -11 -10 -20 -2 -32 9 -15 41 -17 313 -17 272 0 304 2 313
17 8 12 7 21 -2 32 -12 14 -52 16 -311 16 -259 0 -299 -2 -311 -16z"
                  />
                </g>
              </svg>
            </button>

            <button
              className={`z-30  ${styles.fButton} ${
                isToggled && tabActive == "shop" ? styles.fButtonActive : ""
              }`}
              onClick={() => handleToggle("shop")}
            >
              SHOP
            </button>
            <button
              className={`z-30 ${styles.fButton} ${
                isToggled && tabActive == "search" ? styles.fButtonActive : ""
              }`}
              onClick={() => handleToggle("search")}
            >
              SEARCH
            </button>
            <button
              className={`z-30 ${styles.fButton} ${styles.lineThrough} ${
                isToggled && tabActive == "deadstock"
                  ? styles.fButtonActive
                  : ""
              }`}
              onClick={() => handleToggle("deadstock")}
            >
              <Link href={"/deadstock"} className="">
                deadstock
              </Link>
            </button>

            <a
              className={`z-30 ${styles.fButton} ${
                isToggled && tabActive == "cart" ? styles.fButtonActive : ""
              }`}
              onClick={() => handleToggle("cart")}
            >
              <Link href={"/cart"} className="">
                CART {countRedux}
              </Link>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBot;
