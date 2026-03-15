"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/commons/constants/url";
import { useLinkRouting } from "./hooks/index.link.routing.hook";
import { useAreaVisibility } from "./hooks/index.area.hook";
import styles from "./styles.module.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLinkRouting();
  const visibility = useAreaVisibility();

  return (
    <div className={styles.container}>
      {visibility.header && (
        <>
          <header className={styles.header} data-testid="layout-header">
            <Link href={routes.diaries.path} className={styles.logoLink}>
              <div className={styles.logo} data-testid="header-logo">
                Diary
              </div>
            </Link>
          </header>

          <div className={styles.gap} data-testid="layout-gap-1" />
        </>
      )}

      {visibility.banner && (
        <>
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
        </>
      )}

      {visibility.navigation && (
        <nav className={styles.navigation} data-testid="layout-navigation">
          <Link
            href={routes.diaries.path}
            className={`${styles.navLink} ${styles.diariesLink} ${
              pathname === routes.diaries.path ? styles.active : ""
            }`}
            data-testid="nav-link-diaries"
          >
            일기보관함
          </Link>
          <Link
            href={routes.pictures.path}
            className={`${styles.navLink} ${styles.picturesLink} ${
              pathname === routes.pictures.path ? styles.active : ""
            }`}
            data-testid="nav-link-pictures"
          >
            사진보관함
          </Link>
        </nav>
      )}

      <main className={styles.main} data-testid="layout-main">
        {children}
      </main>

      {visibility.footer && (
        <footer className={styles.footer} data-testid="layout-footer">
          <div className={styles.footerContent}>
            <div className={styles.footerTitle}>민지의 다이러리</div>
            <div className={styles.footerCopyright}>
              © 2024 Diary. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
