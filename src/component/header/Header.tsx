import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";
import Menu from "../menu/Menu";
import Link from "next/link";


const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return(
    <div>
  <div className={`${styles.navbar} ${scrollPosition > 0 ? styles.shrink : ''}`}>
  <div className="flex flex-row justify-between items-center ">
 
  <Link href={"/"}  className=""> {
      scrollPosition > 0 ? <Image width={300} height={45} src="/images/easybadwork.png" alt="menu" className={styles.transition}/> : <Image width={450} height={56} src="/images/easybadwork.png" alt="menu" className={styles.transition}/>
    }  </Link>
    
   
         
            

   
  </div>
  
  </div>


    </div>


)};

export default Header;
