/**
 * Section 5 — CTA final · plein écran centré.
 */
export default function CtaSection() {
  return (
    <section
      id="cta"
      className="rk-section bg-cream text-center"
    >
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center">
        <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[1.02] text-ink mb-12 rk-reveal">
          Prêt à publier
          <br />
          <span className="text-violet">dix fois ?</span>
        </h2>

        <p className="text-graphite text-lg max-w-md mx-auto mb-12 leading-relaxed rk-reveal">
          Beta gratuite. Compte Google suffisant. Aucune carte bancaire
          demandée pour démarrer.
        </p>

        <div className="rk-reveal">
          <a
            href="https://replikr.io"
            className="rk-btn-primary text-base md:text-lg !px-8 !py-4"
          >
            Essayer Replikr <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
