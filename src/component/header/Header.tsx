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
 
  <Link href={"/"}  className="pt-3">  <Image width={90} height={90} src="/images/khimhead.png" alt="menu" className={styles.headerImg}/> 
      </Link>
    
   
         
            

   
  </div>
  
  </div>


    </div>


)};

export default Header;
