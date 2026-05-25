/**
 * Section 3 — Le contraste avant/après
 *
 * 3 lignes seulement, sérif italique, alignées à gauche, grosse respiration.
 * Pas d'icônes, pas de cards, pas de bullets. C'est du editorial pur.
 */
export default function ContrastSection() {
  return (
    <section
      id="contrast"
      className="rk-section bg-cream"
    >
      <div className="max-w-page mx-auto w-full">
        <div className="space-y-16 md:space-y-24 max-w-4xl">
          <p
            className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-ink rk-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            Avant Replikr, vous passez{" "}
            <span className="text-graphite">quatre heures</span> à adapter
            chaque vidéo.
          </p>

          <p
            className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-ink rk-reveal"
            style={{ transitionDelay: "200ms" }}
          >
            Après Replikr, vous passez{" "}
            <span className="text-violet">douze minutes</span> à valider ce
            qu&apos;il propose.
          </p>

          <p
            className="font-serif text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] text-ink rk-reveal"
            style={{ transitionDelay: "400ms" }}
          >
            Toujours votre style. Jamais l&apos;IA générique.
          </p>
        </div>
      </div>
    </section>
  );
}
