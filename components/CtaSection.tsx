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

        <div className="text-graphite text-base md:text-lg max-w-xl mx-auto mb-12 leading-relaxed rk-reveal space-y-6 text-left md:text-center">
          <div className="space-y-2">
            <p className="text-ink font-medium text-lg md:text-xl">
              Essai gratuit immédiat.
            </p>
            <p>
              Crédits offerts pour décliner 1 vidéo YouTube en 7 posts. Soit
              une semaine complète de publication multi-réseaux.
            </p>
            <p className="text-[15px] text-graphite/80">
              Sans carte bancaire. Sans engagement.
            </p>
          </div>

          <div className="space-y-2 pt-2 border-t border-line">
            <p className="text-ink font-medium text-lg md:text-xl">
              Et si vous voulez continuer&nbsp;?
            </p>
            <p>
              Tarif fondateur{" "}
              <span className="text-violet font-medium">29 €/mois</span>,
              verrouillé à vie.
            </p>
            <p className="text-[15px] text-graphite/80 italic">
              Réservé aux 50 premiers comptes qui passent payant.
            </p>
          </div>
        </div>

        <div className="rk-reveal">
          <a
            href="https://app.replikr.io"
            className="rk-btn-primary text-base md:text-lg !px-8 !py-4"
          >
            Démarrer gratuitement <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
