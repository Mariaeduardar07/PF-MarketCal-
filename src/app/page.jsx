"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redireciona automaticamente para a página de login
    router.push("/Login");
  }, [router]);

  return null;
}
