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
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-ink text-cream rounded-xl p-4 z-50 shadow-[0_24px_60px_-20px_rgba(26,22,18,0.5)]"
      role="dialog"
      aria-label="Préférences de cookies"
    >
      <p className="text-[13px] leading-relaxed mb-3">
        On utilise quelques cookies pour mesurer l&apos;audience anonymement.
        Aucun tracking publicitaire.
      </p>
      <div className="flex items-center justify-end gap-3 text-[12px]">
        <button
          onClick={handleRefuse}
          className="text-cream/70 hover:text-cream transition-colors"
        >
          Refuser
        </button>
        <button
          onClick={handleAccept}
          className="bg-cream text-ink px-4 py-1.5 rounded-md font-medium hover:bg-cream/90 transition-colors"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
