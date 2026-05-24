/**
 * Section 4 — Comment ça marche · 3 étapes
 *
 * Liste numérotée énorme : chiffres en serif italique 96px violet,
 * texte de l'étape en sans 24px ink.
 */

const STEPS = [
  {
    n: "01",
    title: "Vous déposez votre vidéo.",
    sub: "YouTube, MP4, Loom, fichier local — Replikr l'accepte.",
  },
  {
    n: "02",
    title: "Replikr apprend votre voix et génère vos posts.",
    sub: "Ton, accroches, signature, lead magnets : tout est respecté.",
  },
  {
    n: "03",
    title: "Vous validez. Replikr publie ou programme.",
    sub: "Calendrier éditorial intégré, publication directe sur 6 réseaux.",
  },
];

export default function HowSection() {
  return (
    <section
      id="how"
      className="rk-section bg-cream"
    >
      <div className="max-w-page mx-auto w-full">
        <div className="rk-eyebrow mb-8 rk-reveal">04 · Comment ça marche</div>

        <h2 className="font-serif text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.05] text-ink mb-20 max-w-4xl rk-reveal">
          Trois étapes.
          <br />
          <span className="text-graphite">Puis vous publiez.</span>
        </h2>

        <ol className="space-y-12 md:space-y-16 max-w-5xl">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className="grid grid-cols-[auto_1fr] gap-6 md:gap-12 items-start rk-reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="font-serif text-violet text-[clamp(3rem,7vw,6rem)] leading-none">
                {step.n}
              </span>
              <div className="pt-2 md:pt-4">
                <p className="text-[clamp(1.25rem,2.4vw,1.875rem)] font-medium text-ink leading-snug mb-2">
                  {step.title}
                </p>
                <p className="text-base md:text-lg text-graphite leading-relaxed max-w-prose">
                  {step.sub}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
