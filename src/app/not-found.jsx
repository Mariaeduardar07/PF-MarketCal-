"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./notFound.module.css";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoSection}>
          <Image
            src="/image/logo.png"
            alt="MarketCal Logo"
            width={200}
            height={200}
            className={styles.logo}
          />
        </div>

        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.title}>Página não encontrada</h2>
        <p className={styles.description}>
          Desculpe, a página que você está procurando não existe ou foi movida.
        </p>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => router.back()}
            className={styles.primaryButton}
          >
            Voltar
          </button>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className={styles.decorCircle1}></div>
      <div className={styles.decorCircle2}></div>
      <div className={styles.decorCircle3}></div>
    </div>
  );
}
