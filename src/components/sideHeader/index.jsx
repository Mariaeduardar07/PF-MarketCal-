"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from './sideHeader.module.css';

export default function SideHeader() {
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarContent}>
        {/* Logo */}
        <div className={styles.logoSection}>
          <Image
            src="/image/logo.png"
            alt="MarketCal"
            width={550}
            height={550}
            className={styles.logo}
            priority
          />
        </div>

        {/* Navegação */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link 
                href="/dashboard" 
                className={`${styles.navLink} ${isActive('/dashboard') ? styles.active : ''}`}
              >
                <span className={styles.navText}>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/pageTask" 
                className={`${styles.navLink} ${isActive('/pageTask') ? styles.active : ''}`}
              >
                <span className={styles.navText}>Feed</span>
              </Link>
            </li>
            <li>
              <Link 
                href="/pageExplore" 
                className={`${styles.navLink} ${isActive('/pageExplore') ? styles.active : ''}`}
              >
                <span className={styles.navText}>Influencers</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Rodapé da sidebar */}
        <div className={styles.sidebarFooter}>
          <Link href="/Login" className={styles.logoutBtn}>
            <span className={styles.navText}>Sair</span>
          </Link>
        </div>
      </div>
    </aside>
  );
}