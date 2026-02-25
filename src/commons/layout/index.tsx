import { ReactNode } from "react";
import styles from "./styles.module.css";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.container}>
      <header className={styles.header} data-testid="layout-header">
        Header
      </header>

      <div className={styles.gap} data-testid="layout-gap-1" />

      <div className={styles.banner} data-testid="layout-banner">
        Banner
      </div>

      <div className={styles.gap} data-testid="layout-gap-2" />

      <nav className={styles.navigation} data-testid="layout-navigation">
        Navigation
      </nav>

      <main className={styles.main} data-testid="layout-main">
        {children}
      </main>

      <footer className={styles.footer} data-testid="layout-footer">
        Footer
      </footer>
    </div>
  );
}
