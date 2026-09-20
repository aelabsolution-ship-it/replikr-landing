"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const plans = [
  {
    name: "Replikr", price: 35, annual: 348, annualMonthly: 29, credits: "410 crédits", recharge: 110,
    description: "Pour créer vos contenus et les exporter librement.",
    features: ["Créer vos contenus", "Copier et télécharger"],
    note: "Sans publication intégrée.", featured: false,
  },
  {
    name: "Replikr + publication", price: 66, annual: 660, annualMonthly: 55, credits: "660 crédits", recharge: 150,
    description: "De la création à la publication sur vos réseaux.",
    features: ["Créer, copier et télécharger", "Publier sur les réseaux", "Programmer vos publications"],
    note: "", featured: true,
  },
  {
    name: "Agence", price: 359, annual: 3588, annualMonthly: 299, credits: "4 470 crédits", recharge: 190,
    description: "Pour accompagner plusieurs marques avec Replikr.",
    features: ["10 marques", "4 470 crédits pour vos contenus"],
    note: "", featured: false,
  },
];

// Deux mois offerts : 348 € au lieu de 12 × 35 €.
const SAVING = Math.round((1 - plans[0].annual / (plans[0].price * 12)) * 100);

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
const PLAN_NAMES = ["Essai", "Replikr", "+ publication", "Agence"];
type Cell = string | boolean;
const COMPARE: { label: string; values: Cell[] }[] = [
  { label: "Crédits", values: ["60 une seule fois", "410 par mois", "660 par mois", "4 470 par mois"] },
  { label: "Sources par note", values: ["3", "6", "6", "6"] },
  { label: "Analyser une source", values: [true, true, true, true] },
  { label: "Post avec image, infographie, script", values: [true, true, true, true] },
  { label: "Carrousel illustré", values: [false, true, true, true] },
  { label: "Publier et programmer", values: [false, false, true, true] },
  { label: "Marques", values: ["1", "1", "1", "10"] },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const periods: { key: boolean; label: string }[] = [
    { key: false, label: "Mensuel" },
    { key: true, label: "Annuel" },
  ];

  return (
    <section className="section oi-cta rk-pricing" id="essai" aria-labelledby="pricing-title">
      <div className="container">
        <span className="eyebrow">Essayez Replikr</span>
        <h2 id="pricing-title">Ajoutez votre matière.<br />Regardez ce qui en sort.</h2>
        <p>Une vidéo, un document ou une note : commencez avec votre propre contenu et découvrez ce que Replikr vous aide à en faire.</p>
        <p className="rk-pricing__trial"><strong>60 crédits d’essai offerts</strong><span>Sans carte bancaire et sans engagement.</span></p>

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
            <article key={plan.name} className={`rk-card${plan.featured ? " rk-card--featured" : ""}`}>
              <div className="rk-card__head">
                {plan.featured && <span className="rk-card__badge">Le plus choisi</span>}
                <p className="rk-card__price">
                  <Amount value={annual ? plan.annualMonthly : plan.price} />
                  <span>€/mois</span>
                </p>
                <p className="rk-card__annual">
                  {annual ? `${euros(plan.annual)} € facturés par an` : "Facturation mensuelle"}
                </p>
                <h3>{plan.name}</h3>
                <p className="rk-card__description">{plan.description}</p>
              </div>
              <p className="rk-card__credits">{plan.credits} par mois</p>
              <ul className="rk-card__features">
                {plan.features.map((feature) => (
                  <li key={feature}><span aria-hidden="true" className="rk-card__check">✓</span>{feature}</li>
                ))}
              </ul>
              {plan.note && <p className="rk-card__note">{plan.note}</p>}
              <p className="rk-card__recharge"><span>Recharge de 5 €</span><strong>+ {plan.recharge} crédits</strong></p>
              <a className="rk-card__button" href="https://app.replikr.io"
                 aria-label={`Démarrer gratuitement avec ${plan.name}`}>
                Démarrer gratuitement<span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
        <table className="rk-compare">
          <caption>Ce qui change d’une offre à l’autre</caption>
          <thead>
            <tr>
              <th scope="col">&nbsp;</th>
              <th scope="col">Essai gratuit</th>
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
        <p className="rk-pricing__caption">Commencez par l’essai gratuit. Choisissez votre offre ensuite.</p>
      </div>
    </section>
  );
}
