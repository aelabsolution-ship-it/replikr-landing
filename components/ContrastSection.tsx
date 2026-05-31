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
        <div className="space-y-10 md:space-y-16 max-w-4xl">
          <p
            className="font-serif text-[clamp(1.4rem,2.8vw,2.25rem)] leading-[1.2] text-ink rk-reveal"
            style={{ transitionDelay: "0ms" }}
          >
            Avant Replikr, vous passiez vos{" "}
            <span className="text-graphite">vendredis</span> à découper votre
            vidéo de la semaine pour chaque réseau.
          </p>

          <p
            className="font-serif text-[clamp(1.4rem,2.8vw,2.25rem)] leading-[1.2] text-ink rk-reveal"
            style={{ transitionDelay: "200ms" }}
          >
            Après Replikr, vous validez en{" "}
            <span className="text-violet">12 minutes</span> depuis le mobile.
            Ou pas du tout, en mode autopilot.
          </p>

          <p
            className="font-serif text-[clamp(1.4rem,2.8vw,2.25rem)] leading-[1.2] text-ink rk-reveal"
            style={{ transitionDelay: "400ms" }}
          >
            Toujours votre voix. Jamais le copier-coller générique d&apos;un
            ChatGPT.
          </p>
        </div>
      </div>
    </section>
  );
}
