"use client";

import { useEffect, useState } from "react";
import { InstagramIcon } from "./PlatformIcons";

/**
 * Mockup post Instagram — carrousel auto avec les 8 slides du dossier
 * /public/carousel/. La slide 1 (hook) reste affichée plus longtemps
 * (4.5 s) pour laisser le temps de lire ; les suivantes défilent toutes
 * les 2 s. Transition opacity 400 ms entre slides. Dots indicateurs en
 * bas + badge « N/8 ».
 *
 * Détails techniques :
 *   - Toutes les images sont stack en absolute pour éviter le flash
 *     blanc qu'on aurait avec un swap de src.
 *   - useEffect avec setTimeout (et non setInterval) pour pouvoir varier
 *     la durée selon l'index courant — le timer se reprogramme à chaque
 *     changement d'index.
 *   - `loading="lazy"` sur les slides ≥ 2 (la 1re doit charger tôt pour
 *     ne pas voir un placeholder vide au premier render).
 */
const N_SLIDES = 8;
const SLIDE_DURATION_FIRST_MS = 4500;
const SLIDE_DURATION_OTHER_MS = 2000;

export default function InstagramPost() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const wait = idx === 0 ? SLIDE_DURATION_FIRST_MS : SLIDE_DURATION_OTHER_MS;
    const t = setTimeout(() => setIdx((i) => (i + 1) % N_SLIDES), wait);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <article className="w-full bg-surface rounded-xl border border-line overflow-hidden text-left">
      {/* Header */}
      <header className="flex items-center gap-3 p-3.5">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet via-[#E4405F] to-[#F0AD4E] p-[2px]">
          <img
            src="/profil_ludo.png"
            alt="Ludovic Nédélec"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[12.5px] font-medium text-ink leading-tight truncate">
            ludovicnedelec
          </p>
        </div>
        <InstagramIcon size={16} />
      </header>

      {/* Visuel carrousel : stack des 8 slides, opacity toggle */}
      <div className="aspect-square bg-ink relative overflow-hidden">
        {Array.from({ length: N_SLIDES }, (_, i) => i + 1).map((n) => (
          <img
            key={n}
            src={`/carousel/${n}.png`}
            alt=""
            loading={n === 1 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === n - 1 ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Badge slide N / 8 */}
        <span className="absolute top-3 right-3 text-[10px] text-cream bg-black/45 backdrop-blur-sm px-1.5 py-0.5 rounded tracking-wide z-10">
          {idx + 1} / {N_SLIDES}
        </span>
        {/* Dots indicateurs (cliquables… pour l'effet visuel) */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {Array.from({ length: N_SLIDES }, (_, i) => (
            <span
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                idx === i ? "bg-cream" : "bg-cream/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Actions Instagram (sans compteurs) + caption */}
      <div className="p-3.5">
        <div className="flex items-center gap-4 mb-2 text-ink">
          <span aria-hidden className="text-[16px]">♥</span>
          <span aria-hidden className="text-[16px]">💬</span>
          <span aria-hidden className="text-[16px]">↗</span>
        </div>
        <p className="text-[12px] text-ink leading-[1.45]">
          <span className="font-medium">ludovicnedelec</span> L&apos;IA ne va pas
          remplacer votre business. Elle va remplacer ceux qui n&apos;y touchent
          pas. J&apos;ai construit Replikr pour ça.{" "}
          <span className="text-graphite">... plus</span>
        </p>
      </div>
    </article>
  );
}
