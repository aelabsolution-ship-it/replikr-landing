"use client";

import { motion } from "framer-motion";

/**
 * Section 1 — Hero · 100vh
 *
 * Layout 2 colonnes (desktop) :
 *   - GAUCHE : eyebrow + H1 + sous-titre + CTA
 *   - DROITE : thumbnail vidéo statique noire avec bouton play + 6 micro-cards
 *             réseaux disposées autour (preview de l'animation qui viendra
 *             en Section 2). C'est un teasing visuel.
 *
 * Animation : fade-in du H1 mot par mot via Framer (stagger 100ms), comme
 * spec — la SEULE animation décorative du hero. Le reste est statique.
 */

const h1Line1 = "Pense une fois.";
const h1Line2 = "Publie dix fois.";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="rk-section pt-32 md:pt-40 pb-24 md:pb-32 relative"
    >
      <div className="max-w-page mx-auto w-full grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-center">
        {/* ── Colonne texte (gauche) ─────────────────────────────── */}
        <div>
          <h1 className="font-serif text-[clamp(3.5rem,9vw,10rem)] leading-[0.98] tracking-[-0.035em] text-ink mb-0">
            <AnimatedLine text={h1Line1} delay={0.15} />
            <br />
            <span className="text-violet">
              <AnimatedLine text={h1Line2} delay={0.5} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-graphite text-base md:text-lg max-w-xl mt-8 mb-8 leading-relaxed"
          >
            Vous montez votre prochaine vidéo YouTube. Replikr publie l&apos;actuelle
            sur LinkedIn, X, Instagram, Threads, TikTok et Facebook à votre
            place. Avec votre voix. Sans vous.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2.5 mb-10 max-w-xl"
          >
            {[
              "Replikr apprend votre style à partir de vos vidéos passées.",
              "Génère 7 posts natifs, adaptés à chaque réseau.",
              "Publie automatiquement aux meilleures heures. Validation mobile en 12 minutes, ou mode autopilot.",
            ].map((bullet, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[14.5px] text-ink leading-snug"
              >
                <span
                  aria-hidden
                  className="mt-[7px] w-1.5 h-1.5 rounded-full bg-violet flex-shrink-0"
                />
                <span>{bullet}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-2.5"
          >
            <a href="https://app.replikr.io" className="rk-btn-primary">
              Démarrer gratuitement <span aria-hidden="true">→</span>
            </a>
            <p className="text-[12px] text-graphite/70 leading-snug">
              Sans carte bancaire. Crédits offerts pour 1 vidéo complète.
            </p>
          </motion.div>
        </div>

        {/* ── Colonne visuelle (droite) ─ Vidéo + 6 micro-cards posts ─ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full aspect-square max-w-[440px] mx-auto"
          aria-hidden="true"
        >
          {/* Vidéo centrale : rectangle noir avec triangle play (teasing
              statique — la vraie vidéo est jouable en section Démo). */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] aspect-[16/10] bg-ink rounded-xl flex items-center justify-center z-10 shadow-[0_8px_32px_-8px_rgba(26,22,18,0.25)]">
            <span
              className="ml-1 inline-block w-0 h-0"
              style={{
                borderLeft: "16px solid #F4EFE6",
                borderTop: "11px solid transparent",
                borderBottom: "11px solid transparent",
              }}
            />
          </div>

          {/* 7 micro-cards posts : 4 coins + haut-centre + bas-centre + Facebook côté gauche */}
          <MicroCard
            position="top-0 left-0"
            color="#0A66C2"
            iconPath="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM7.6 19h-3V9.5h3V19zM6.1 8.2C5.1 8.2 4.4 7.5 4.4 6.6c0-.9.8-1.6 1.8-1.6 1 0 1.8.7 1.8 1.6 0 .9-.7 1.6-1.9 1.6zM19 19h-3v-5.1c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V19h-3V9.5h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4V19z"
            lines={[80, 60, 70]}
          />
          <MicroCard
            position="top-0 right-0"
            color="#1A1612"
            iconPath="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
            lines={[50, 40, 35]}
          />
          <MicroCard
            position="bottom-0 left-0"
            color="#E4405F"
            iconPath="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            isImage
          />
          <MicroCard
            position="bottom-0 right-0"
            color="#FF0000"
            iconPath="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            lines={[70, 85]}
          />
          <MicroCard
            position="top-2 left-1/2 -translate-x-1/2 !w-[68px] !aspect-square"
            color="#1A1612"
            iconPath="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z"
            iconOnly
          />
          <MicroCard
            position="bottom-2 left-1/2 -translate-x-1/2 !w-[68px] !aspect-square"
            color="#1A1612"
            iconPath="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.74-1.757-.504-.586-1.288-.883-2.327-.89h-.029c-.834 0-1.965.23-2.686 1.302l-1.692-1.136c.97-1.434 2.546-2.225 4.378-2.225h.044c3.063.019 4.888 1.881 5.07 5.126.103.061.227.124.337.187 1.469.835 2.498 2.085 3.018 3.694.546 1.626.526 3.674-.07 5.62l2.043.65c.673-2.245.7-4.624.073-6.531z"
            iconOnly
          />
          <MicroCard
            position="top-1/2 left-1 -translate-y-1/2 !w-[60px] !aspect-square"
            color="#1877F2"
            iconPath="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
            iconOnly
          />
        </motion.div>
      </div>

      {/* ── Scroll indicator discret en bas ─────────────────────── */}
      <a
        href="#demo"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] uppercase text-graphite/70 hover:text-ink transition-colors flex items-center gap-2"
      >
        <span aria-hidden="true" className="animate-bounce-soft">↓</span>
        Comment ça fonctionne
      </a>

      <style jsx>{`
        @keyframes bounce-soft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        :global(.animate-bounce-soft) {
          animation: bounce-soft 2s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </section>
  );
}

/* ── Sous-composants helpers ─────────────────────────────────── */

/**
 * Affiche une ligne de H1 mot par mot avec stagger.
 * Chaque mot est wrappé dans un span pour permettre le stagger natif.
 */
function AnimatedLine({ text, delay }: { text: string; delay: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

/**
 * Micro-card de réseau (76×54px par défaut) avec icône SVG du logo réseau
 * + lignes de texte simulées. Reproduit exactement les thumbnails de la
 * spec HTML. Utilise des SVG inline pour éviter une dépendance à une lib
 * d'icônes externe.
 */
function MicroCard({
  position,
  color,
  iconPath,
  lines,
  iconOnly,
  isImage,
}: {
  position: string;
  color: string;
  iconPath: string;
  lines?: number[];
  iconOnly?: boolean;
  isImage?: boolean;
}) {
  return (
    <div
      className={`absolute ${position} w-[76px] aspect-[76/54] bg-surface rounded-lg p-[7px] border border-line shadow-[0_2px_8px_-2px_rgba(26,22,18,0.04)]`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-3.5 h-3.5 ${iconOnly ? "mx-auto mt-1" : ""}`}
        fill={color}
        aria-hidden="true"
      >
        <path d={iconPath} />
      </svg>
      {!iconOnly && (
        <div className="mt-1.5 space-y-[3px]">
          {isImage ? (
            <div className="h-[26px] bg-[#F1EFE8] rounded-sm" />
          ) : (
            lines?.map((w, i) => (
              <div
                key={i}
                className="h-[2px] bg-[#EBE7DD] rounded-full"
                style={{ width: `${w}%` }}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
