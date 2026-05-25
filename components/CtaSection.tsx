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

        <div className="text-graphite text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed rk-reveal space-y-2">
          <p className="text-ink font-medium">
            Beta accompagnée — 50 youtubeurs entrepreneurs maximum.
          </p>
          <p>
            Tarif fondateur{" "}
            <span className="text-violet font-medium">29 €/mois</span>,
            verrouillé à vie.
          </p>
          <p>Compte Google suffisant. Aucune carte bancaire pour démarrer.</p>
          <p className="text-[15px] text-graphite/80 italic">
            Quand les 50 places sont prises, c&apos;est terminé.
          </p>
        </div>

        <div className="rk-reveal">
          <a
            href="https://app.replikr.io"
            className="rk-btn-primary text-base md:text-lg !px-8 !py-4"
          >
            Réserver ma place beta <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
