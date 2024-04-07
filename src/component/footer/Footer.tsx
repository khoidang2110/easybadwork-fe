import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";

const Footer: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [tabActive, setTabActive] = useState("");

  const handleToggle = (position: any) => {
    console.log("position", position);
    console.log("isToggled", isToggled);
    console.log("tabActive", tabActive);
    if (tabActive == "") {
      setIsToggled(!isToggled);
      setTabActive(position);
    } else if (tabActive == position) {
      setIsToggled(!isToggled);
      setTabActive("");
    } else {
      setTabActive(position);
    }
  };

  return (
    <div className={styles.footer}>
      <div className={styles.fContainer}>
        <div></div>
        <div
          className={`${styles.fButtonContainer} ${
            isToggled&&tabActive!=="deadStock" ? styles.fbuttonClick : ""
          }`}
        >
          <div>
            <div
              className={
                isToggled && tabActive == "menu" ? styles.aa : styles.aaDis
              }
            >
              <p>ABOUT</p>
              <p>FAIRFAX THEATRE</p>
              <p>STORES</p>
              <p>CONTACT</p>
            </div>

            <div
              className={
                isToggled && tabActive == "shop" ? styles.aa : styles.aaDis
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
                isToggled && tabActive == "search" ? styles.aa : styles.aaDis
              }
            >
            <input type="text" placeholder="TYPE HERE" className={styles.inputBg}/>
              
              
              
            </div>
            <div
              className={
                isToggled && tabActive == "cart" ? styles.aa : styles.aaDis
              }
            >
            <p>YOUR CART IS EMPTY.</p>
              
              
              
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => handleToggle("menu")}
              className={`z-30 ${styles.menuButton} ${
                isToggled && tabActive == "menu" ? styles.fbuttonActive : ""
              }`}
            >
              {/* <Image
                width={20}
                height={14}
                src="/images/icons/menu4.png"
                alt="menu"
               
              /> */}
              <img src="/images/icons/menu4.png" className="w-5 h-3"/>
            </button>

            <button
              className={`z-30  ${styles.fbutton} ${
                isToggled && tabActive == "shop" ? styles.fbuttonActive : ""
              }`}
              onClick={() => handleToggle("shop")}
            >
              SHOP
            </button>
            <button
              className={`z-30 ${styles.fbutton} ${
                isToggled && tabActive == "search" ? styles.fbuttonActive : ""
              }`}
              onClick={() => handleToggle("search")}
            >
              SEARCH
            </button>
            <button
              className={`z-30 ${styles.fbutton} ${styles.lineThrough} ${
                isToggled && tabActive == "deadStock"
                  ? styles.fbuttonActive
                  : ""
              }`}
              onClick={() => handleToggle("deadStock")}
            >
              DEADSTOCK
            </button>

            <a
              className={`z-30 ${styles.fbutton} ${
                isToggled && tabActive == "cart" ? styles.fbuttonActive : ""
              }`}
              onClick={() => handleToggle("cart")}
            >
              {" "}
              CART 0
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
