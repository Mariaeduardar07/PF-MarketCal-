"use client";
import React from "react";
import styles from "./login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Validar email
const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (!form.email || !form.password) {
      setError("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    if (!validateEmail(form.email)) {
      setError("E-mail inválido. Por favor, verifique.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const { token, userExists } = response.data;

      if (!token) {
        throw new Error("Erro: token não recebido da API.");
      }

      // Armazenar token no localStorage
      localStorage.setItem("token", token);
      if (userExists) {
        localStorage.setItem("userExists", JSON.stringify(userExists));
      }

      setSuccess("Login realizado com sucesso! Redirecionando...");
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.code === "ERR_NETWORK") {
        setError("Erro de conexão. Verifique se o servidor está rodando.");
      } else {
        setError("E-mail ou senha incorretos. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

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
          width={250}
          height={250}
          className={styles.logoImg}
          priority
        />
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Senha
            </label>
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className={styles.input}
                placeholder="Digite sua senha"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                disabled={loading}
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          {error && <p className={styles.errorMessage}>{error}</p>}
          {success && <p className={styles.successMessage}>{success}</p>}

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? (
              <>
                <span className={styles.spinner}></span> Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>

          <p style={{ marginTop: "15px", textAlign: "center" }}>
            Não tem conta?{" "}
            <Link href="/cadastro" style={{ color: "#2d6962", fontWeight: "bold" }}>
              Faça cadastro
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}