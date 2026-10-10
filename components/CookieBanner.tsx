"use client";

import { useEffect, useState } from "react";

/**
 * Bandeau RGPD minimaliste en bas de page.
 *
 * Spec : "Pas de cookie banner immédiat (RGPD : juste un bandeau discret
 * en bas)". On délaie l'apparition de 2s pour ne pas casser le hero.
 * Si l'utilisateur a déjà choisi, on n'affiche rien.
 *
 * Pas de tracking analytique invasif → on demande juste le consentement
 * pour stats anonymes Plausible/Umami (futur). Pour l'instant, juste
 * l'opt-in essentiel pour rester conforme.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Pas afficher si choix déjà fait
    const choice = typeof window !== "undefined"
      ? localStorage.getItem("rk_cookie_choice")
      : null;
    if (choice) return;

    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("rk_cookie_choice", "accepted");
    setVisible(false);
  };
  const handleRefuse = () => {
    localStorage.setItem("rk_cookie_choice", "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="rk-cookie"
      role="dialog"
      aria-labelledby="rk-cookie-title"
    >
      <p className="rk-cookie__title" id="rk-cookie-title">Cookies</p>
      <p>
        On utilise des cookies pour mesurer l&apos;audience et améliorer le site.
        Aucun tracking publicitaire.{" "}
        <a
          href="https://app.hybana.com/legal/confidentialite"
          target="_blank"
          rel="noopener noreferrer"
        >
          En savoir plus
        </a>
      </p>
      <div className="rk-cookie__actions">
        <button onClick={handleRefuse} className="rk-cookie__choice">
          Tout refuser
        </button>
        <button
          onClick={handleAccept}
          className="rk-cookie__choice rk-cookie__choice--accept"
        >
          Tout accepter
        </button>
      </div>
    </div>
  );
}
