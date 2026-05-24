"use client";

import { useEffect } from "react";

/**
 * Reveal-on-scroll global pour toute la page : IntersectionObserver scanne
 * les éléments `.rk-reveal`, leur ajoute la classe `.is-visible` quand ils
 * entrent dans le viewport (déclenche l'animation opacity + translateY).
 *
 * Unique source de vérité pour les fades de section — pas de Framer Motion
 * par bloc, on garde la dépendance pour les besoins ponctuels.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = document.querySelectorAll<HTMLElement>(".rk-reveal");

    if (reduced) {
      // Si l'user a demandé moins de motion, on rend tout visible direct
      // et on n'instancie même pas l'observer.
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);

  return null;
}
