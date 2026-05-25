/**
 * Section PricingPath : insérée entre HowSection et CtaSection.
 *
 * Objectif : clarifier la mécanique commerciale (essai gratuit → décision →
 * tarif fondateur conditionnel) pour lever l'ambiguïté entre "gratuit" et
 * "29 €/mois". Présentée en 3 étapes claires, design minimal cohérent.
 */

type Column = {
  eyebrow: string;
  title: string;
  desc: string;
};

const COLUMNS: Column[] = [
  {
    eyebrow: "Aujourd’hui",
    title: "Vous démarrez gratuitement.",
    desc: "Crédits offerts : 1 vidéo, 7 posts, 1 semaine de publication.",
  },
  {
    eyebrow: "Crédits épuisés",
    title: "Vous décidez.",
    desc: "Continuer en fondateur ou arrêter, sans frais.",
  },
  {
    eyebrow: "Si vous continuez",
    title: "29 €/mois verrouillé à vie.",
    desc: "Tant qu’il reste des places fondateur.",
  },
];

export default function PricingPathSection() {
  return (
    <section
      id="pricing-path"
      className="bg-cream px-6 md:px-12 py-24 md:py-28"
    >
      <div className="max-w-page mx-auto w-full">
        <ol className="grid sm:grid-cols-3 gap-10 md:gap-14">
          {COLUMNS.map((col, i) => (
            <li
              key={col.eyebrow}
              className="rk-reveal"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <span className="rk-eyebrow block mb-4">{col.eyebrow}</span>
              <p className="font-serif text-2xl md:text-3xl text-ink leading-tight mb-3">
                {col.title}
              </p>
              <p className="text-[14.5px] text-graphite leading-relaxed">
                {col.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
