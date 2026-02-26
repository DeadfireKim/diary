"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { routes } from "@/commons/constants/url";
import styles from "./styles.module.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className={styles.container}>
      <header className={styles.header} data-testid="layout-header">
        <div className={styles.logo}>Diary</div>
      </header>

      <div className={styles.gap} data-testid="layout-gap-1" />

      <div className={styles.banner} data-testid="layout-banner">
        <Image
          src="/images/banner.png"
          alt="Banner"
          width={1168}
          height={240}
          className={styles.bannerImage}
          priority
        />
      </div>

      <div className={styles.gap} data-testid="layout-gap-2" />

      <nav className={styles.navigation} data-testid="layout-navigation">
        <Link
          href={routes.diaries.path}
          className={`${styles.navLink} ${styles.diariesLink} ${
            pathname === routes.diaries.path ? styles.active : ""
          }`}
        >
          일기보관함
        </Link>
        <Link
          href={routes.pictures.path}
          className={`${styles.navLink} ${styles.picturesLink} ${
            pathname === routes.pictures.path ? styles.active : ""
          }`}
        >
          사진보관함
        </Link>
      </nav>

      <main className={styles.main} data-testid="layout-main">
        {children}
      </main>

      <footer className={styles.footer} data-testid="layout-footer">
        <div className={styles.footerContent}>
          <div className={styles.footerTitle}>민지의 다이러리</div>
          <div className={styles.footerCopyright}>
            © 2024 Diary. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
