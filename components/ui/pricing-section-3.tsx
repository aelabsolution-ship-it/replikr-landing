"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Gratuit", price: 0, annual: 0, annualMonthly: 0, credits: "60 crédits offerts",
    features: ["2 notebooks", "5 contenus par notebook", "1 marque", "3 sources par notebook", "Posts, images, infographies et scripts", "Tournage et téléchargement du rush brut"],
    excluded: ["Carrousels illustrés", "Montage et sous-titres", "Publication et programmation"],
    featured: false, free: true,
    highlights: ["60 crédits offerts", "2 notebooks", "Posts, images, scripts"],
  },
  {
    name: "Replikr", price: 35, annual: 348, annualMonthly: 29, credits: "410 crédits / mois",
    base: "Gratuit",
    features: ["10 notebooks, 30 contenus chacun", "6 sources par notebook", "Carrousels illustrés", "Montage et sous-titres des shorts", "Copier et télécharger", "Recharges de crédits"],
    excluded: ["Publication et programmation"],
    featured: false, free: false,
    highlights: ["410 crédits / mois", "10 notebooks", "Carrousels et montage"],
  },
  {
    name: "Replikr + publication", price: 66, annual: 660, annualMonthly: 55, credits: "660 crédits / mois",
    base: "Replikr",
    features: ["30 notebooks, 50 contenus chacun", "Publication directe sur vos réseaux", "Programmation dans le calendrier", "2 vidéos conservées par notebook"],
    excluded: [], featured: true, free: false,
    highlights: ["660 crédits / mois", "30 notebooks", "Publication directe"],
  },
  {
    name: "Agence", price: 359, annual: 3588, annualMonthly: 299, credits: "4 470 crédits / mois",
    base: "Replikr + publication",
    features: ["10 marques", "100 notebooks, 100 contenus chacun", "Recharge de 5 € = 190 crédits"],
    excluded: [], featured: false, free: false, booking: true,
    highlights: ["4 470 crédits / mois", "10 marques", "100 notebooks"],
  },
];

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
const PLAN_NAMES = ["Gratuit", "Replikr", "+ publication", "Agence"];
type Cell = string | boolean;
const COMPARE: { label: string; values: Cell[] }[] = [
  { label: "Crédits", values: ["60 une seule fois", "410 par mois", "660 par mois", "4 470 par mois"] },
  { label: "Recharge de 5 €", values: [false, "110 crédits", "150 crédits", "190 crédits"] },
  { label: "Notebooks conservés", values: ["2", "10", "30", "100"] },
  { label: "Contenus par notebook", values: ["5", "30", "50", "100"] },
  { label: "Sources par notebook", values: ["3", "6", "6", "6"] },
  { label: "Analyser une source", values: [true, true, true, true] },
  { label: "Post avec image, infographie, script", values: [true, true, true, true] },
  { label: "Carrousel illustré", values: [false, true, true, true] },
  { label: "Filmer et télécharger le rush brut", values: [true, true, true, true] },
  { label: "Montage et sous-titres des shorts", values: [false, true, true, true] },
  { label: "Vidéos conservées par notebook", values: ["Aucune", "Aucune", "2", "2"] },
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
          {plans.map((plan) => (
            <article key={plan.name} className={`rk-card${plan.featured ? " rk-card--featured" : ""}${plan.free ? " rk-card--free" : ""}`}>
              <div className="rk-card__head">
                <p className="rk-card__price">
                  <Amount value={annual ? plan.annualMonthly : plan.price} />
                  <span>{plan.free ? "€" : "€/mois"}</span>
                </p>
                {!annual && (
                  <p className="rk-card__annual">{plan.free ? "" : "Facturation mensuelle"}</p>
                )}
                <h3>{plan.name}</h3>
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
              <a className="rk-card__button" href="https://app.replikr.io"
                 aria-label={plan.free ? "Commencer gratuitement" : `Choisir ${plan.name}`}>
                <span className="rk-card__label-long">{plan.free ? "Commencer gratuitement" : plan.featured ? "Choisir Créer + Publier" : "Choisir cette offre"}</span>
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
        <table className="rk-compare">
          <caption className="rk-sr-only">Ce qui change d’une offre à l’autre</caption>
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">Gratuit · 0 €</th>
              <th scope="col">Replikr</th>
              <th scope="col">+ publication</th>
              <th scope="col">Agence</th>
            </tr>
          </thead>
          <tbody>
            {COMPARE.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                {row.values.map((v, i) => (
                  <td key={i} data-plan={PLAN_NAMES[i]}>
                    {v === true ? <span className="rk-compare__yes" aria-label="Inclus">✓</span>
                     : v === false ? <span className="rk-compare__no" aria-label="Non inclus">—</span>
                     : v}
                  </td>
                ))}
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
