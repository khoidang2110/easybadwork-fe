"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { products } from "@/mockup";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { updateLocalStorageData } from "@/redux/slices/localStorageSlice";
import { update } from "@/redux/slices/counterSlice";

const MenuBot: React.FC<{ itemCount: number }> = ({ itemCount }) => {
  const dispatch = useAppDispatch();

  const countRedux = useAppSelector((state) => state.counter.count);
  // const countRedux = useAppSelector(state => state.counter.count);
  console.log("countRedux", countRedux);
  useEffect(() => {
    const countString = localStorage.getItem("count");
    const count = countString ? parseInt(countString) : 0;
    if (count !== null) {
      dispatch(update(count));
    }
    console.log("count load lan dau", count);
  }, []);

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
      if (tabActive == "deadStock") {
        router.push("/deadstock");
        // setIsToggled(!isToggled);
        // setTabActive("");
      } else if (
        pathname == "/deadstock" ||
        currentProduct?.status == "deadstock"
      ) {
        setTabActive("deadStock");
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

  return (
    <div className={styles.footer}>
      <div className={styles.fContainer}>
        <div></div>
        <div
          className={`${styles.fButtonContainer} ${
            isToggled && tabActive !== "deadStock" && tabActive !== "cart"
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
              <img src="/images/icons/menu4.png" className="w-5 h-3" />
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
                isToggled && tabActive == "deadStock"
                  ? styles.fButtonActive
                  : ""
              }`}
              onClick={() => handleToggle("deadStock")}
            >
              <Link href={"/deadstock"} className="">
                DEADSTOCK
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
