"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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

// Position cible des 7 cards depuis le centre, en pixels absolus.
// Layout asymétrique 3x3 + 1 :
//   Haut    : LinkedIn (-320,-240)  Facebook (0,-300)  X (320,-240)
//   Milieu  : Instagram (-360, 60)                     YouTube (360, 60)
//   Bas     : Threads (-300, 310)                      TikTok (300, 310)
// Cards w-[200px], YouTube/TikTok contraints à maxHeight 220 pour rester
// sur la même hauteur que les cards paysage.
// Vidéo en arrière-plan (440px, opacity 55%, z-0), cards z-10 par-dessus.
// Disposition compacte (mai 2026) : 3 cards à gauche, 3 à droite, 1 en
// bas-centre. L'ancienne position « haut-centre » pour Facebook coupait
// la card sur viewports < 800px de haut (Ludovic mai 2026). Vidéo =
// 480×270 ; cards 200px. Séparation horizontale assurée par x ≥ ±340
// (centre vidéo ±240 + marge ≥ 100). Y resserré à ±200 pour rester
// dans 100vh même sur 600px de haut.
const FINAL_POSITIONS = [
  // Colonne gauche (haut → bas)
  { x: "-380px", y: "-200px", rotate: -3 }, // LinkedIn  (haut-gauche)
  { x: "-400px", y: "30px",   rotate: -1 }, // Instagram (milieu-gauche)
  { x: "-340px", y: "240px",  rotate: 2  }, // Threads   (bas-gauche)
  // Colonne droite (haut → bas)
  { x: "380px",  y: "-200px", rotate: 3  }, // X         (haut-droite)
  { x: "400px",  y: "30px",   rotate: 1  }, // YouTube   (milieu-droite, Short)
  { x: "340px",  y: "240px",  rotate: -2 }, // TikTok    (bas-droite)
  // Bas-centre, sous la vidéo (avant la caption qui est à bottom-6)
  { x: "0px",    y: "260px",  rotate: 1  }, // Facebook  (bas-centre)
];

export default function DemoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const captionRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // État UI play/mute pour les boutons overlay (controls natifs YouTube
  // sont cachés via `controls=0` pour épurer le rendu — on reconstruit
  // juste les 2 boutons qui comptent pour l'user).
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const sendYTCommand = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*",
    );
  }, []);

  const togglePlay = useCallback(() => {
    if (playing) {
      sendYTCommand("pauseVideo");
      setPlaying(false);
    } else {
      sendYTCommand("playVideo");
      setPlaying(true);
    }
  }, [playing, sendYTCommand]);

  const toggleMute = useCallback(() => {
    if (muted) {
      sendYTCommand("unMute");
      setMuted(false);
    } else {
      sendYTCommand("mute");
      setMuted(true);
    }
  }, [muted, sendYTCommand]);

  // Autoplay (muet) de la vidéo dès que la section entre dans le viewport.
  // Mute obligatoire : les navigateurs bloquent tout autoplay avec son
  // sans interaction utilisateur préalable (Chrome autoplay policy 2018+).
  // L'user peut activer le son d'un clic sur le bouton son. Idempotent :
  // on ne déclenche play qu'UNE fois, sinon la lecture redémarrerait à
  // chaque sortie/entrée du viewport (pénible si l'user scroll back).
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    let played = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3 && !played) {
            played = true;
            sendYTCommand("playVideo");
            setPlaying(true);
          }
        });
      },
      { threshold: [0, 0.3, 0.6, 1] },
    );
    observer.observe(iframe);
    return () => observer.disconnect();
  }, [sendYTCommand]);

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

    // ── Timeline ancrée au scroll : pin la section, scrub l'animation.
    // end ramené de 150% → 70% et stagger 80ms → 40ms pour que les 7
    // cards apparaissent BEAUCOUP plus tôt — sinon l'user dépasse la
    // section avant que l'animation "1 vidéo → 7 réseaux" soit lisible.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=70%",
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
          duration: 0.9,
          ease: "power3.out",
        },
        i * 0.04,
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
      style={{ height: "170vh" }}
    >
      {/* Stage sticky : pin pendant le scroll, contient vidéo + cards */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
      >
        {/* ── Conteneur central : vidéo (centre) + 7 cards (positions finales) ── */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Vidéo centrale : iframe YouTube AU-DESSUS des cards (z-20).
              Les cards émergent depuis le centre et se déploient AUTOUR.
              `controls=0` cache toute l'UI YouTube native (timeline,
              titre, avatar chaîne, logo YouTube, fullscreen) — on
              reconstruit juste les 2 boutons qui servent : play/pause
              et son. `pointer-events-none` sur l'iframe pour que nos
              boutons overlay reçoivent les clics. */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[480px] max-w-[82vw] aspect-video rounded-2xl overflow-hidden shadow-[0_24px_72px_-24px_rgba(26,22,18,0.35)] bg-ink group">
            <iframe
              ref={iframeRef}
              className="w-full h-full pointer-events-none"
              src="https://www.youtube-nocookie.com/embed/iLbyJmJ36ds?enablejsapi=1&controls=0&rel=0&modestbranding=1&mute=1&playsinline=1&iv_load_policy=3&disablekb=1&fs=0&loop=1&playlist=iLbyJmJ36ds"
              title="Teaser Replikr — Pense une fois. Publie dix fois."
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            />

            {/* Overlay clic = toggle play/pause. Couvre toute la zone
                vidéo, transparent ; le bouton play visible apparaît au
                centre uniquement quand la vidéo est en pause. */}
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-transparent cursor-pointer"
              aria-label={playing ? "Mettre en pause" : "Lire la vidéo"}
            >
              {!playing && (
                <span className="w-20 h-20 rounded-full bg-cream/95 flex items-center justify-center shadow-lg pointer-events-none">
                  <span
                    className="ml-1.5 inline-block w-0 h-0"
                    style={{
                      borderLeft: "20px solid #1A1612",
                      borderTop: "14px solid transparent",
                      borderBottom: "14px solid transparent",
                    }}
                  />
                </span>
              )}
            </button>

            {/* Bouton son bas-droite (mute/unmute) — toujours visible.
                Discret par défaut, scale au hover. Couvre aussi le
                watermark YouTube qui reste affiché malgré controls=0. */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-ink/70 hover:bg-ink/90 backdrop-blur-sm flex items-center justify-center text-cream transition-all hover:scale-110 z-10"
              aria-label={muted ? "Activer le son" : "Couper le son"}
            >
              {muted ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                </svg>
              )}
            </button>
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] z-10 origin-center"
              style={{ willChange: "transform, opacity" }}
            >
              <Comp />
            </div>
          ))}
        </div>

        {/* Caption finale qui apparaît à la fin de la timeline.
            z-30 et fond cream pour passer DEVANT les cards qui débordent. */}
        <div
          ref={captionRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-6 z-30 bg-cream/95 backdrop-blur-sm py-2 rounded-lg"
        >
          <p className="font-serif text-2xl md:text-3xl text-ink leading-tight">
            Une idée forte.
            <br />
            Sept déclinaisons travaillées.
            <br />
            <span className="text-violet">Publiées sans vous.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
