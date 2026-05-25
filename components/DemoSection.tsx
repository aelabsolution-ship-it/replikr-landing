"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LinkedInPost from "./mockups/LinkedInPost";
import XPost from "./mockups/XPost";
import InstagramPost from "./mockups/InstagramPost";
import YouTubePost from "./mockups/YouTubePost";
import TikTokPost from "./mockups/TikTokPost";
import ThreadsPost from "./mockups/ThreadsPost";
import FacebookPost from "./mockups/FacebookPost";

/**
 * Section 2 — La démonstration · 200vh (sticky scroll)
 *
 * C'est LA seule animation magique de la page. Le mécanisme :
 *   1. La vidéo (rectangle noir avec play) reste sticky au centre pendant
 *      tout le scroll de la section.
 *   2. Au scroll, 6 cartes posts (mockups réalistes des 6 réseaux) émergent
 *      depuis la position de la vidéo et se déploient vers leurs 6 positions
 *      finales en grille autour (haut, bas, gauche, droite, diagonales).
 *   3. Stagger 80ms entre cartes, easeOutCubic, durée 1.2s.
 *   4. Une fois l'animation terminée : texte "Une vidéo. Six réseaux. Votre
 *      voix sur chacun." apparaît en fade-in.
 *
 * Pourquoi GSAP ScrollTrigger plutôt que Framer Motion : on pin la section
 * pendant 200vh de scroll, c'est exactement ce que ScrollTrigger fait
 * nativement. Framer le fait aussi mais avec plus de boilerplate.
 */

// Position cible des 7 cards depuis le centre.
// Layout : 3 cards à gauche, 3 cards à droite, 1 card au-dessus de la vidéo.
// Unités en % du conteneur (translateX/Y depuis le centre).
const FINAL_POSITIONS = [
  // Colonne gauche
  { x: "-150%", y: "-110%", rotate: -3 }, // LinkedIn  (haut-gauche)
  { x: "-160%", y: "0%",    rotate: -1 }, // Instagram (gauche-centre)
  { x: "-150%", y: "110%",  rotate: 2  }, // Threads   (bas-gauche)
  // Colonne droite
  { x: "150%",  y: "-110%", rotate: 3  }, // X         (haut-droite)
  { x: "160%",  y: "0%",    rotate: 1  }, // YouTube   (droite-centre)
  { x: "150%",  y: "110%",  rotate: -2 }, // TikTok    (bas-droite)
  // Centre-haut (au-dessus de la vidéo)
  { x: "0%",    y: "-170%", rotate: 1  }, // Facebook  (haut-centre)
];

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.registerPlugin(ScrollTrigger);

    if (!sectionRef.current || !stickyRef.current) return;

    // Si reduced motion : on affiche directement les cards à leurs positions
    // finales sans animation. Pas de pin, scroll normal.
    if (reduced) {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const pos = FINAL_POSITIONS[i];
        gsap.set(card, {
          x: pos.x,
          y: pos.y,
          rotate: pos.rotate,
          opacity: 1,
          scale: 1,
        });
      });
      if (captionRef.current) gsap.set(captionRef.current, { opacity: 1 });
      return;
    }

    // ── État initial : toutes les cards superposées sur la vidéo, invisibles
    cardsRef.current.forEach((card) => {
      if (!card) return;
      gsap.set(card, { x: 0, y: 0, opacity: 0, scale: 0.4, rotate: 0 });
    });
    if (captionRef.current) gsap.set(captionRef.current, { opacity: 0 });

    // ── Timeline ancrée au scroll : pin la section, scrub l'animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%", // ~150vh de scroll pour dérouler l'animation
        pin: stickyRef.current,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animation des cards : émergent du centre + se positionnent + se gonflent.
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const pos = FINAL_POSITIONS[i];
      tl.to(
        card,
        {
          x: pos.x,
          y: pos.y,
          rotate: pos.rotate,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        i * 0.08 // stagger 80ms entre cards (comme spec)
      );
    });

    // Caption finale : fade-in en toute fin de timeline
    if (captionRef.current) {
      tl.to(
        captionRef.current,
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        ">-0.3"
      );
    }

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: "250vh" }}
    >
      {/* Stage sticky : pin pendant le scroll, contient vidéo + cards */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {/* ── Conteneur central : vidéo (centre) + 7 cards (positions finales) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Vidéo centrale : sticky, point d'émergence des cards.
              Background = photo de Ludo, overlay sombre, play button au centre. */}
          <div
            className="relative z-20 w-[260px] aspect-video rounded-2xl overflow-hidden flex items-center justify-center shadow-[0_24px_72px_-24px_rgba(26,22,18,0.35)] bg-ink"
            style={{
              backgroundImage: "url('/profil_ludo.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            aria-hidden="true"
          >
            <div className="absolute inset-0 bg-ink/35" />
            <span className="relative z-10 w-16 h-16 rounded-full bg-cream/95 flex items-center justify-center shadow-lg">
              <span
                className="ml-1.5 inline-block w-0 h-0"
                style={{
                  borderLeft: "16px solid #1A1612",
                  borderTop: "11px solid transparent",
                  borderBottom: "11px solid transparent",
                }}
              />
            </span>
            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-[11px] tracking-[0.18em] uppercase text-graphite z-20">
              Votre vidéo
            </span>
          </div>

          {/* Les 7 cards : positionnées en absolute, transform animé par GSAP.
              Initial = superposées sur la vidéo (x=0, y=0, opacity=0, scale=0.4).
              L'ordre doit correspondre à FINAL_POSITIONS. */}
          {[
            { Comp: LinkedInPost, label: "LinkedIn" },
            { Comp: InstagramPost, label: "Instagram" },
            { Comp: ThreadsPost, label: "Threads" },
            { Comp: XPost, label: "X" },
            { Comp: YouTubePost, label: "YouTube" },
            { Comp: TikTokPost, label: "TikTok" },
            { Comp: FacebookPost, label: "Facebook" },
          ].map(({ Comp, label }, i) => (
            <div
              key={label}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] z-10 origin-center"
              style={{ willChange: "transform, opacity" }}
            >
              <Comp />
            </div>
          ))}
        </div>

        {/* Caption finale qui apparaît à la fin de la timeline */}
        <div
          ref={captionRef}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 text-center px-6"
        >
          <p className="font-serif text-2xl md:text-4xl text-ink leading-tight">
            Une vidéo. Sept réseaux.
            <br />
            <span className="text-violet">Votre voix sur chacun.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
