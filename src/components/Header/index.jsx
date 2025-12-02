"use client";

import { useState, useEffect } from "react";
import styles from "./header.module.css";

export default function Header() {
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const extractName = (u) => {
        if (!u) return null;
        if (typeof u === "string") {
          const isEmail = u.includes("@");
          return isEmail ? u.split("@")[0] : u;
        }
        return (
          u.name || u.nome || u.fullName || u.firstName || u.username || (u.email && u.email.split("@")[0]) || null
        );
      };

      const tryKeys = ["user", "usuario", "userExists", "name", "username", "userData", "profile"];
      console.debug(
        "[Header] tentando keys:",
        tryKeys.map((k) => ({ key: k, value: localStorage.getItem(k) }))
      );

      for (const key of tryKeys) {
        const raw = localStorage.getItem(key);
        if (!raw) continue;

        try {
          const parsed = JSON.parse(raw);
          console.debug("[Header] parsed", key, parsed);
          const found = extractName(parsed);
          if (found) {
            console.debug("[Header] name found from", key, found);
            setUserName(found);
            return;
          }
        } catch (e) {
          console.debug("[Header] raw string for", key, raw);
          const found = extractName(raw);
          if (found) {
            console.debug("[Header] name found from raw", key, found);
            setUserName(found);
            return;
          }
        }
      }

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const payload = token.split(".")[1];
          if (payload) {
            const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
            console.debug("[Header] decoded token payload", json);
            const fromToken = extractName(json);
            if (fromToken) {
              setUserName(fromToken);
              return;
            }
          }
        } catch (e) {
          console.debug("[Header] não foi possível decodificar token JWT", e);
        }
      }

      console.debug("[Header] nenhum nome encontrado no localStorage");
    } catch (err) {
      console.error("Erro lendo usuário do localStorage:", err);
    }
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.leftSection}>
        <h2 className={styles.title}>{userName ? `Olá, ${userName}` : "Olá"}</h2>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search Task"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.headerContent}>
          <button className={styles.filterButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            <span>Category</span>
          </button>

          <button className={styles.filterButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
            <span>Sort By: Deadline</span>
          </button>

          <button className={styles.iconButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </button>

          <button className={styles.iconButton}>
            <svg className={styles.icon} viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="10" r="2.5" fill="white" />
              <path d="M12 15c-2 0-3 1-3 2v2h6v-2c0-1-1-2-3-2" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
