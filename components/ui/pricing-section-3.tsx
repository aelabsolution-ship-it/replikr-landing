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
        <p className="rk-pricing__trial"><strong>30 crédits d’essai offerts</strong><span>Sans carte bancaire et sans engagement.</span></p>

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
        <p className="rk-pricing__caption">Commencez par l’essai gratuit. Choisissez votre offre ensuite.</p>
      </div>
    </section>
  );
}
