"use client";

import { useEffect, useState } from "react";

/**
 * Nav minimaliste : logo replikr à gauche (carré violet rotaté 45° + wordmark),
 * lien "Déjà client" discret à droite qui redirige vers l'app Streamlit.
 *
 * Position fixed avec un fond crème qui apparaît au scroll (>20px) pour
 * éviter le chevauchement avec le hero quand on remonte.
 */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-line"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-page mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo Replikr (favicon) + wordmark */}
        <a
          href="/"
          className="inline-flex items-center gap-2.5 text-ink"
          aria-label="Replikr · accueil"
        >
          <img src="/logo.png" alt="" aria-hidden="true" className="w-7 h-7" />
          <span className="text-[15px] font-medium tracking-tight">replikr</span>
        </a>

        {/* Lien discret pour les clients existants : redirige vers l'app. */}
        <a
          href="https://app.replikr.io"
          className="rk-link-underline text-[13px] font-normal"
        >
          Déjà client <span aria-hidden="true">→</span>
        </a>
      </div>
    </nav>
  );
}
