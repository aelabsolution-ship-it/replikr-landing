"use client";

import { motion } from "framer-motion";

/**
 * Section 1 — Hero · 100vh
 *
 * Layout 2 colonnes (desktop) :
 *   - GAUCHE : H1 typographique + sous-titre + 3 bullets + CTA (above-the-fold).
 *   - DROITE : un SCHÉMA-PIPELINE statique « 1 vidéo YouTube → Replikr →
 *     6 réseaux ». But : faire capter la promesse en une seconde, sans rejouer
 *     l'animation de la section Démo (qui, elle, fait exploser des cartes posts
 *     autour de la vidéo). Ici c'est un diagramme propre, vertical, pas une
 *     constellation — langage visuel volontairement différent.
 *
 * Animation : fade-in du H1 mot par mot via Framer (stagger 100ms). Le reste
 * apparaît en fade léger. Le schéma est statique.
 */

const h1Line1 = "Pense une fois.";
const h1Line2 = "Publie dix fois.";

// Les 6 réseaux de sortie (la source = YouTube). Mêmes logos que les mockups.
const PLATFORMS: { label: string; color: string; path: string }[] = [
  {
    label: "LinkedIn",
    color: "#0A66C2",
    path: "M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zM7.6 19h-3V9.5h3V19zM6.1 8.2C5.1 8.2 4.4 7.5 4.4 6.6c0-.9.8-1.6 1.8-1.6 1 0 1.8.7 1.8 1.6 0 .9-.7 1.6-1.9 1.6zM19 19h-3v-5.1c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V19h-3V9.5h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4V19z",
  },
  {
    label: "X",
    color: "#1A1612",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "Instagram",
    color: "#E4405F",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zM12 0C8.741 0 8.332.014 7.052.072 5.197.157 3.355.673 2.014 2.014.673 3.355.157 5.197.072 7.052.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.085 1.855.601 3.697 1.942 5.038 1.341 1.341 3.183 1.857 5.038 1.942C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 1.855-.085 3.697-.601 5.038-1.942 1.341-1.341 1.857-3.183 1.942-5.038.058-1.28.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.085-1.855-.601-3.697-1.942-5.038C20.645.673 18.803.157 16.948.072 15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    label: "Threads",
    color: "#1A1612",
    path: "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 013.02.142c-.126-.742-.375-1.332-.74-1.757-.504-.586-1.288-.883-2.327-.89h-.029c-.834 0-1.965.23-2.686 1.302l-1.692-1.136c.97-1.434 2.546-2.225 4.378-2.225h.044c3.063.019 4.888 1.881 5.07 5.126.103.061.227.124.337.187 1.469.835 2.498 2.085 3.018 3.694.546 1.626.526 3.674-.07 5.62l2.043.65c.673-2.245.7-4.624.073-6.531z",
  },
  {
    label: "TikTok",
    color: "#1A1612",
    path: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z",
  },
  {
    label: "Facebook",
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

export default function HeroSection() {
  return (
    <section id="hero" className="rk-section relative">
      <div className="max-w-page mx-auto w-full grid md:grid-cols-[1.25fr_0.9fr] gap-10 md:gap-16 items-center">
        {/* ── Colonne texte (gauche) ─────────────────────────────── */}
        <div>
          <h1 className="font-serif text-[clamp(2.75rem,5.2vw,4.75rem)] leading-[1.0] tracking-[-0.035em] text-ink mb-6">
            <AnimatedLine text={h1Line1} delay={0.15} />
            <br />
            <span className="text-violet">
              <AnimatedLine text={h1Line2} delay={0.45} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="text-graphite text-base md:text-lg max-w-xl mb-6 leading-relaxed"
          >
            Vous montez votre prochaine vidéo YouTube. Replikr publie l&apos;actuelle
            sur LinkedIn, X, Instagram, Threads, TikTok et Facebook à votre
            place. Avec votre voix. Sans vous.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 mb-8 max-w-xl"
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
            transition={{ duration: 0.6, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-x-5 gap-y-2"
          >
            <a href="https://app.replikr.io" className="rk-btn-primary">
              Démarrer gratuitement <span aria-hidden="true">→</span>
            </a>
            <p className="text-[12px] text-graphite/70 leading-snug max-w-[15rem]">
              Sans carte bancaire. Crédits offerts pour 1 vidéo complète.
            </p>
          </motion.div>
        </div>

        {/* ── Colonne illustration (droite) ─ schéma 1 vidéo → 6 réseaux ─ */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-4 w-full max-w-[300px] mx-auto"
          aria-hidden="true"
        >
          {/* Source : la vidéo YouTube (le même teaser que la section Démo,
              en autoplay muet/boucle pour rendre le schéma vivant). */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-ink shadow-[0_16px_44px_-16px_rgba(26,22,18,0.35)]">
            <video
              src="/presentation.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              aria-hidden="true"
            />
            {/* Léger voile haut pour garder le badge lisible sur l'image */}
            <div
              className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/45 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <span className="absolute top-3 left-3 flex items-center gap-1.5 text-cream text-[11px] font-medium tracking-wide">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="#FF0000" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Votre vidéo
            </span>
          </div>

          {/* Connecteur + pastille Replikr */}
          <div className="flex flex-col items-center">
            <span className="block w-px h-3.5 bg-line" />
            <span className="px-3 py-1 rounded-full bg-violet text-cream text-[11px] font-medium tracking-wide shadow-[0_4px_12px_-4px_rgba(107,79,232,0.5)]">
              Replikr
            </span>
            <span className="block w-px h-3.5 bg-line" />
          </div>

          {/* Cibles : les 6 réseaux en natif */}
          <div className="w-full">
            <div className="grid grid-cols-3 gap-2.5">
              {PLATFORMS.map((p) => (
                <div
                  key={p.label}
                  className="aspect-square rounded-xl bg-surface border border-line flex items-center justify-center shadow-[0_2px_10px_-4px_rgba(26,22,18,0.08)]"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill={p.color} aria-hidden="true">
                    <path d={p.path} />
                  </svg>
                </div>
              ))}
            </div>
            <p className="mt-3 text-center text-[10.5px] uppercase tracking-[0.18em] text-graphite/70">
              Publié en natif, partout
            </p>
          </div>
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
