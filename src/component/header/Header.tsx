import React, { useEffect, useState } from "react";
import { Button } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";

import Link from "next/link";


const Header = () => {



  return(
    <div>
  <div className=''>
  <div className="flex flex-col justify-between items-center ">
 
  <Link href={"/"}  className="">  <Image width={70} height={80} src="/images/khimhead.png" alt="menu" className={styles.headerImg}/> 
      </Link>
    
   
         
            

   
  </div>
  
  </div>


    </div>


)};

export default Header;
