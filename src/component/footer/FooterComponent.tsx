'use client'

import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
const FooterComponent: React.FC = () => {
  const pathname = usePathname();

  const pathnameAdmin = pathname.slice(4,9);
  //console.log('pathname admin:',pathnameAdmin)
  let adminPage = false;
  if (pathnameAdmin === 'admin') {
    adminPage = true;
  }

  return (
    <div>
{adminPage ? ( ""):(<div className="text-center py-20 text-[#002549]">
  EasyBadWork copyright 2024
</div>)}
    </div>

  );
};

export default FooterComponent;
