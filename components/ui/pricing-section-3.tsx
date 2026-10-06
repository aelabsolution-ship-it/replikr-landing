"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    id: "freemium", name: "Gratuit", tagline: "Testez sans carte bancaire", price: 0, annual: 0, annualMonthly: 0, credits: "100 crédits offerts",
    features: ["Créez à partir de vos documents, liens ou vidéos", "Textes, images et infographies", "Textes pour vos vidéos", "Filmez et téléchargez vos vidéos brutes"],
    excluded: ["Carrousels illustrés", "Montage et sous-titres", "Publication et programmation"],
    featured: false, free: true,
    highlights: ["100 crédits offerts", "Vos documents comme point de départ", "Textes, images, infographies"],
  },
  {
    id: "power", name: "Créateur", tagline: "Créez vos contenus", price: 35, annual: 348, annualMonthly: 29, credits: "410 crédits / mois",
    base: "Gratuit",
    features: ["Organisez vos publications par sujet", "Croisez plusieurs documents pour enrichir vos publications", "Carrousels illustrés", "Montage et sous-titres des vidéos courtes", "Copiez vos textes et téléchargez vos images", "Crédits supplémentaires à la demande"],
    excluded: ["Publication et programmation"],
    featured: false, free: false,
    highlights: ["410 crédits / mois", "Vos publications organisées par sujet", "Carrousels et montage"],
  },
  {
    id: "power_pub", name: "Solopreneur", tagline: "Créez et publiez partout", price: 66, annual: 660, annualMonthly: 55, credits: "660 crédits / mois",
    base: "Créateur",
    features: ["Préparez vos publications à l’avance", "Publiez directement sur vos réseaux", "Choisissez le jour et l’heure de publication", "Retrouvez vos vidéos avec les publications du même sujet"],
    excluded: [], featured: true, free: false,
    highlights: ["660 crédits / mois", "Vos publications programmées", "Publication directe"],
  },
  {
    id: "community_manager", name: "Agence", tagline: "Gérez jusqu’à 10 marques", price: 359, annual: 3588, annualMonthly: 299, credits: "4 470 crédits / mois",
    base: "Solopreneur",
    features: ["10 marques", "100 carnets de publication, 100 contenus chacun", "Recharge de 5 € = 190 crédits"],
    excluded: [], featured: false, free: false, booking: true,
    highlights: ["4 470 crédits / mois", "10 marques", "100 carnets de publication"],
  },
];

// Une même sélection alimente les cartes et le comparatif de cette landing.
const landingPlans = plans
  .map((plan, index) => ({ plan, index }))
  .filter(({ plan }) => plan.id !== "community_manager");

// Agenda de Ludovic : l'Agence peut en parler avant de payer, l'Entreprise
// commence toujours par là (22 sept. 2026).
const BOOKING_URL = "https://calendar.app.google/FMCaxhBxAvHCFKai9";

const ENTERPRISE = {
  name: "Entreprise",
  price: "Sur devis",
  description: "Replikr installé pour votre organisation : votre marque, vos gabarits, vos règles éditoriales, vos canaux.",
  features: [
    "Gabarits d’infographies et de carrousels dessinés à votre charte, validés avec vous",
    "Une instance à votre marque, plusieurs marques ou équipes, un accès par personne",
    "Méthode éditoriale calée sur vos prises de parole : ton, vocabulaire, interdits",
    "Intégrations à vos outils et à vos canaux, publication comprise",
    "Mise en route accompagnée et un interlocuteur dédié",
    "Hébergement en Europe, données cloisonnées par compte",
  ],
  cta: "Prendre rendez-vous",
};

// Deux mois offerts : 348 € au lieu de 12 × 35 €.
const SAVING = Math.round((1 - plans[1].annual / (plans[1].price * 12)) * 100);

const euros = (n: number) => Math.round(n).toLocaleString("fr-FR");

/** Le prix passe d'un montant à l'autre en défilant, sans sauter d'un coup. */
function Amount({ value }: { value: number }) {
  const still = useReducedMotion();
  const raw = useMotionValue(value);
  const spring = useSpring(raw, { stiffness: 220, damping: 30 });
  const text = useTransform(spring, (v) => euros(v));

  useEffect(() => {
    if (still) spring.jump(value);
    else raw.set(value);
  }, [value, still, raw, spring]);

  return (
    <>
      <span className="rk-card__amount-sr">{euros(value)}</span>
      <motion.span className="rk-card__amount" aria-hidden="true">{text}</motion.span>
    </>
  );
}

// Ce qui distingue vraiment les offres — l'essai compris, pour qu'on voie tout
// de suite ce qu'il permet et ce qu'il ne permet pas.
type Cell = string | boolean;
const COMPARE: { label: string; values: Cell[] }[] = [
  { label: "Crédits", values: [plans[0].credits + " · une seule fois", "410 par mois", "660 par mois", "4 470 par mois"] },
  { label: "Recharge de 5 €", values: [false, "110 crédits", "150 crédits", "190 crédits"] },
  { label: "Sujets de publication conservés", values: ["2", "10", "30", "100"] },
  { label: "Contenus conservés par sujet", values: ["5", "30", "50", "100"] },
  { label: "Documents, liens ou vidéos par sujet", values: ["3", "6", "6", "6"] },
  { label: "Créer à partir de vos documents", values: [true, true, true, true] },
  { label: "Post avec image, infographie, script", values: [true, true, true, true] },
  { label: "Carrousel illustré", values: [false, true, true, true] },
  { label: "Filmer et télécharger vos vidéos brutes", values: [true, true, true, true] },
  { label: "Montage et sous-titres des vidéos courtes", values: [false, true, true, true] },
  { label: "Vidéos conservées par sujet", values: ["Aucune", "Aucune", "2", "2"] },
  { label: "Publier et programmer", values: [false, false, true, true] },
  { label: "Marques", values: ["1", "1", "1", "10"] },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  // Au téléphone, « En savoir + » ouvre le comparatif plus bas et y descend.
  const compare = useRef<HTMLDetailsElement>(null);
  const showCompare = () => {
    if (!compare.current) return;
    compare.current.open = true;
    compare.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const periods: { key: boolean; label: string }[] = [
    { key: false, label: "Mensuel" },
    { key: true, label: "Annuel" },
  ];

  return (
    <section className="section oi-cta rk-pricing" id="essai" aria-labelledby="pricing-title">
      <div className="container">
        <h2 id="pricing-title">Choisissez votre rythme.</h2>

        <div className="rk-pricing__switch" role="group" aria-label="Période de facturation">
          {periods.map((p) => (
            <button key={p.label} type="button" aria-pressed={annual === p.key}
                    onClick={() => setAnnual(p.key)}>
              {annual === p.key && (
                <motion.span layoutId="rk-pricing-pill" className="rk-pricing__pill"
                             transition={{ type: "spring", stiffness: 420, damping: 34 }} />
              )}
              <span className="rk-pricing__switch-label">
                {p.label}
                {p.key && <span className="rk-pricing__save">−{SAVING} %</span>}
              </span>
            </button>
          ))}
        </div>
        <div className="rk-pricing__grid" aria-label="Les offres Replikr" aria-live="polite" aria-atomic="true">
          {landingPlans.map(({ plan }) => (
            <article key={plan.name} className={`rk-card${plan.featured ? " rk-card--featured" : ""}${plan.free ? " rk-card--free" : ""}`}>
              <div className="rk-card__head">
                <p className="rk-card__price">
                  <Amount value={annual ? plan.annualMonthly : plan.price} />
                  <span>{plan.free ? "€" : "€/mois"}</span>
                </p>
                {!plan.free && (
                  <p className="rk-card__annual">{annual ? `${euros(plan.annual)} € TTC facturés par an` : `${euros(plan.price)} € TTC facturés par mois`}</p>
                )}
                <h3>{plan.name}</h3>
                <p className="rk-card__tagline">{plan.tagline}</p>
              </div>
              <div className="rk-card__credits"><strong>{plan.credits}</strong></div>
              <ul className="rk-card__highlights">
                {plan.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              {"base" in plan && plan.base && <p className="rk-card__base">Tout {plan.base}, plus :</p>}
              <ul className="rk-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}><span aria-hidden="true" className="rk-card__check">✓</span>{feature}</li>
                ))}
                {plan.excluded.map((feature) => (
                  <li key={feature} className="rk-card__excluded"><span aria-hidden="true">−</span><span>{feature}<span className="rk-sr-only"> : non inclus</span></span></li>
                ))}
              </ul>
              <a className="rk-card__button" href={plan.free ? "https://app.replikr.io" : `https://app.replikr.io/billing?plan=${plan.id}&period=${annual ? "year" : "month"}`}
                 aria-label={plan.free ? "Commencer gratuitement" : `Choisir ${plan.name}`}>
                <span className="rk-card__label-long">{plan.free ? "Commencer gratuitement" : `Choisir ${plan.name}`}</span>
                <span className="rk-card__label-short" aria-hidden="true">{plan.free ? "Essayer" : "Choisir"}</span>
                <span aria-hidden="true">↗</span>
              </a>
              {"booking" in plan && plan.booking && (
                <a className="rk-card__button rk-card__button--booking" href={BOOKING_URL}
                   target="_blank" rel="noopener noreferrer" aria-label={`Prendre rendez-vous pour l’offre ${plan.name}`}>
                  <span className="rk-card__label-long">Prendre rendez-vous</span>
                  <span className="rk-card__label-short" aria-hidden="true">RDV</span>
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          ))}
        </div>
        <button type="button" className="rk-pricing__more" onClick={showCompare}>En savoir + sur les offres</button>
        <article className="rk-enterprise" aria-label="Offre Entreprise, sur devis">
          <div className="rk-enterprise__pitch">
            <h3><span className="rk-card__label-long">{ENTERPRISE.name}</span><span className="rk-card__label-short">Sur mesure</span></h3>
            <p className="rk-enterprise__price">{ENTERPRISE.price}</p>
            <p className="rk-enterprise__description">{ENTERPRISE.description}</p>
            <a className="rk-card__button rk-enterprise__button" href={BOOKING_URL}
               target="_blank" rel="noopener noreferrer">
              {ENTERPRISE.cta}<span aria-hidden="true">↗</span>
            </a>
          </div>
          <ul className="rk-card__features rk-enterprise__features">
            {ENTERPRISE.features.map((feature) => (
              <li key={feature}><span aria-hidden="true" className="rk-card__check">✓</span>{feature}</li>
            ))}
          </ul>
        </article>
        <details className="rk-compare-fold" ref={compare}>
          <summary>
            <span>Ce qui change d’une offre à l’autre</span>
            <span className="rk-compare-fold__icon" aria-hidden="true">+</span>
          </summary>
          <div className="rk-compare-fold__body">
        <p className="solo-pricing-explanation">Un sujet regroupe vos documents et les contenus créés à partir d’eux : une offre, une méthode, une question fréquente. Dans Replikr, cet espace s’appelle un carnet de publication.</p>
        <p className="solo-pricing-explanation">Les limites ci-dessous indiquent ce que vous pouvez conserver. Chaque création utilise des crédits ; le nombre de créations dépend des formats choisis.</p>
        <table className="rk-compare">
          <caption className="rk-sr-only">Ce qui change d’une offre à l’autre</caption>
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              {landingPlans.map(({ plan }) => <th key={plan.id} scope="col">{plan.free ? "Gratuit · 0 €" : plan.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {landingPlans.map(({ plan, index }) => {
                  const v = row.values[index];
                  return <td key={plan.id} data-plan={plan.name}>
                    {v === true ? <span className="rk-compare__yes" aria-label="Inclus">✓</span>
                     : v === false ? <span className="rk-compare__no" aria-label="Non inclus">—</span>
                     : v}
                  </td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
          </div>
        </details>
      </div>
    </section>
  );
}
