import React from "react";
import styles from "./login.module.css";
import Image from "next/image";

export default function Login() {
  return (
    <div className={styles.containerLogin}>
      {/* ESQUERDA */}
      <div className={styles.left}>
        <div className={styles.intro}>
          <h1 className={styles.title}>Bem vindo(a) ao MarketCal</h1>
          <p className={styles.text}>
            Sua estratégia de social media, organizada para performar
          </p>
        </div>
      </div>

      {/* DIREITA */}
      <div className={styles.right}>
        <Image
          src="/image/logo.png"
          alt="Logo do MarketCal"
          width={215}
          height={215}
          className={styles.logoImg}
          priority
        />
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="Digite seu e-mail"
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              placeholder="Digite sua senha"
            />
          </div>
          <button type="submit" className={styles.button}>
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
